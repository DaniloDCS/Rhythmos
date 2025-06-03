import React, { useEffect, useRef, useState } from "react";
import { ritmosCardiacos } from "../../assets/tsx/rhythms.ts"; 
import { AudioPool, chopEffect, removeEffect } from "../../assets/tsx/audio.ts"; 

function Quiz () {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState("00:00");
  const [showInfos, setShowInfos] = useState(true);

  const secondsRef = useRef(0);
  const minutesRef = useRef(0);
  
  const chopEffectRef = useRef(chopEffect);
  const removeEffectRef = useRef(removeEffect);

  useEffect(() => {
    const timer = setInterval(() => {
      secondsRef.current++;
      if (secondsRef.current === 60) {
        secondsRef.current = 0;
        minutesRef.current++;
      }
      setTime(
        `${String(minutesRef.current).padStart(2, "0")}:${String(
          secondsRef.current
        ).padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const allowDrop = (e: React.DragEvent) => e.preventDefault();

  const drag = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text", e.currentTarget.id);
  };

  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const dragged = document.getElementById(id);
    const dropZone = e.currentTarget;

    if (!dragged || !dropZone) return;

    const existing = dropZone.querySelector(".ritmo-info");
    if (existing && existing !== dragged) {
      existing.removeAttribute("ondblclick");
      document.querySelector(".options-rithmos")?.appendChild(existing);
    }

    dropZone.appendChild(dragged);
    chopEffectRef.current.play();

    dragged.ondblclick = () => {
      document.querySelector(".options-rithmos")?.appendChild(dragged);
      removeEffectRef.current.play();
    };
  };

  return (
    <div className="game-container">
      <div className="header">
        <h2 className="game-title">Quiz do ECG</h2>
        <div id="time">{time}</div>
        <div className="scoreboard">
          Pontuação: <span id="score">{score}</span>
        </div>
      </div>

      <div className="game-content">
        <div className="list-of-rithmos">
          {ritmosCardiacos.map((ritmo, index) => (
            <div className="ritmo-image" key={index}>
              <img src={`/public/images/${ritmo.img ? "ritmos/" + ritmo.img : "image.png"}`} />
              <div
                id={`drop-zone-${index}`}
                onDrop={drop}
                onDragOver={allowDrop}
                className="drag-local"
              ></div>
            </div>
          ))}
        </div>

        <div className="options-rithmos">
          {ritmosCardiacos.map((ritmo, index) => (
            <div
              key={index}
              id={`ritmo-${index}`}
              className="ritmo-info"
              draggable
              onDragStart={drag}
            >
              {ritmo.ritmo}
            </div>
          ))}
        </div>

        {showInfos && (
          <div id="infos">
            <button id="btnStartGame" onClick={() => setShowInfos(false)}>
              Iniciar Jogo
            </button>
          </div>
        )}
      </div>

      <style>{`
        .game-content {
          position: relative;
        }
        .list-of-rithmos {
          width: 100%;
          padding: 8px;
          border: 1px solid;
          border-radius: 20px;
          display: flex;
          flex-wrap: wrap;
        }
        .ritmo-image {
          width: 32%;
          margin: 0.5%;
        }
        .drag-local {
          width: 100%;
          height: 60px;
          margin-top: 6px;
          border-radius: 8px;
          background-color: #333;
        }
        .drag-local div {
          width: 100%;
          height: 100%;
        }
        .ritmo-image img {
          border-radius: 8px;
          width: 100%;
        }
        .options-rithmos {
          display: flex;
          flex-wrap: wrap;
        }
        .ritmo-info {
          border-radius: 8px;
          width: 19%;
          height: 60px;
          margin: 0.5%;
          font-weight: 600;
          padding: 8px;
          color: white;
          background-color: blue;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        #infos {
          background-color: rgba(0, 0, 0, 0.7);
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #btnStartGame {
          width: 120px;
          height: 50px;
          color: white;
          border: none;
          border-radius: 50px;
          background-color: #0070f3;
        }
      `}</style>
    </div>
  );
};

export default Quiz;