import React, { useEffect, useState, useRef } from "react";
import { questionsECG } from "../../assets/tsx/rhythms.ts";
import {
  AudioPool,
  chopEffect,
  successEffect,
  errorEffect
} from "../../assets/tsx/audio.ts";

function Memory() {
  const [cartas, setCartas] = useState<any[]>([]);
  const [cartasSelecionadas, setCartasSelecionadas] = useState<HTMLElement[]>(
    []
  );
  const [pontos, setPontos] = useState(0);
  const [jogoIniciado, setJogoIniciado] = useState(false);
  const [tempo, setTempo] = useState("00:00:00");

  const intervalo = useRef<NodeJS.Timeout | null>(null);
  const barProgressRef = useRef<HTMLDivElement>(null);
  const barInfoRef = useRef<HTMLSpanElement>(null);

  const correctEffectRef = useRef(successEffect);
  const errorEffectRef = useRef(errorEffect);
  const chopEffectRef = useRef(chopEffect);

  useEffect(() => {
    gerarCartas();
    return () => {
      if (intervalo.current) clearInterval(intervalo.current);
    };
  }, []);

  const startTimer = () => {
    let seconds = 0,
      minutes = 0,
      hours = 0;
    intervalo.current = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      const format = `${
        hours > 0 ? String(hours).padStart(2, "0") + ":" : ""
      }${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      setTempo(format);
    }, 1000);
  };

  const embaralharCartas = (arr: any[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  const gerarCartas = () => {
    const novasCartas: any[] = [];
    questionsECG.forEach((par, index) => {
      novasCartas.push({
        id: "question-" + index,
        tipo: "question",
        valor: par.question
      });
      novasCartas.push({
        id: "answer-" + index,
        tipo: "answer",
        valor: par.answer
      });
    });
    embaralharCartas(novasCartas);
    setCartas(novasCartas);
  };

  const iniciarJogo = () => {
    setCartasSelecionadas([]);
    setPontos(0);
    setJogoIniciado(false);
    gerarCartas();
    if (intervalo.current) clearInterval(intervalo.current);
    startTimer();
    setTimeout(() => setJogoIniciado(true), 1500);
  };

  const virarCarta = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!jogoIniciado) return;
    chopEffectRef.current.play();
    const carta = e.currentTarget;
    if (cartasSelecionadas.length < 2 && !carta.classList.contains("flipped")) {
      carta.classList.add("flipped", "flip-animation");
      const novasSelecionadas = [...cartasSelecionadas, carta];
      setCartasSelecionadas(novasSelecionadas);
      if (novasSelecionadas.length === 2) {
        setTimeout(() => verificarPares(novasSelecionadas), 1000);
      }
    }
  };

  const verificarPares = (selecionadas: HTMLElement[]) => {
    const [carta1, carta2] = selecionadas;
    const valor1 = carta1.dataset.valor!;
    const valor2 = carta2.dataset.valor!;
    const par = questionsECG.some(
      p =>
        (p.question === valor1 && p.answer === valor2) ||
        (p.question === valor2 && p.answer === valor1)
    );
    if (par) {
      correctEffectRef.current.play();
      const novoPonto = pontos + 1;
      setPontos(novoPonto);
      if (barProgressRef.current)
        barProgressRef.current.style.width = `${
          (novoPonto * 100) / (cartas.length / 2)
        }%`;
      if (barInfoRef.current)
        barInfoRef.current.innerText = `${novoPonto}/${cartas.length / 2}`;
      carta1.style.pointerEvents = "none";
      carta2.style.pointerEvents = "none";
      carta1.style.boxShadow = carta2.style.boxShadow =
        "0 0 10px 4px rgba(0, 128, 0, 0.6)";
      if (novoPonto === questionsECG.length) fimDeJogo();
    } else {
      errorEffectRef.current.play();
      carta1.classList.remove("flipped");
      carta2.classList.remove("flipped");
    }
    setCartasSelecionadas([]);
  };

  const fimDeJogo = () => {
    if (intervalo.current) clearInterval(intervalo.current);
    document
      .querySelectorAll(".card")
      .forEach(el => el.classList.add("brilho-final"));
    alert("Parabéns! Você encontrou todos os pares!");
  };

  return (
    <div className="memory-game">
      <h1>Jogo da Memória</h1>
      <div className="game-infos">
        <div className="progress-bar">
          <div className="bar">
            <div ref={barProgressRef} id="bar-progress"></div>
          </div>
          <i className="fi fi-rr-trophy"></i>
          <span ref={barInfoRef} id="bar-info">
            0/{questionsECG.length}
          </span>
          <i className="fi fi-rr-time-fast"></i>
          <span id="time">{tempo}</span>
        </div>
      </div>
      <button onClick={iniciarJogo}>Iniciar jogo</button>
      <div className={`game-container ${jogoIniciado ? "ativo" : ""}`}>
        {cartas.map((carta, index) => (
          <div
            key={index}
            className="card"
            data-id={carta.id}
            data-valor={carta.valor}
            onClick={virarCarta}
          >
            <div className="front">
              <i className="fi fi-rr-heart-rate"></i>
            </div>
            <div className="back">{carta.valor}</div>
          </div>
        ))}
      </div>
      <style>{`
        .game-container {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
          pointer-events: none; 
          color: red;
        }
        
        .game-container.ativo {
          pointer-events: auto;
        }
        
        .card {
          width: 220px;
          height: 180px;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-size: 1em;
          position: relative;
          transition: transform 0.6s;
          transform-style: preserve-3d;
          padding: 8px;
          word-wrap: wrap;
        }
        
        .card.flip-animation {
          animation: flipIn 0.6s ease-in-out;
        }
        
        @keyframes flipIn {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(180deg); }
        }
        
        .card .front,
        .card .back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 8px;
          border-radius: 8px;
        }
        
        .card .front {
          color: white;
          font-size: 2em;
        }
        
        .card .back {
          background-color: white;
          color: black;
          display: none;
          transform: rotateY(180deg);
        }
        
        .card.flipped {
          transform: rotateY(180deg);
        }
        
        .card.flipped .back {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          text-align: center;
          font-weight: 600;
          border: 2px solid;
        }
        
        .card.flipped .front {
          display: none;
        }
        
        .card-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .card-container .card {
          width: 50px;
          height: 50px;
          background-color: #e3f2fd;
          border: 1px solid #2196f3;
          text-align: center;
          line-height: 50px;
          font-size: 1.2em;
          margin: 0 auto;
        }
        
        .score-board {
          margin-top: 30px;
          font-size: 1.5em;
        }
        
        #score {
          font-weight: bold;
        }
        
        .game-infos {
          width: 100%;
          padding: 20px;
          display: flex;
          gap: 10px;
          justify-content: space-around;
          align-items: center;
          font-weight: 800;
          color: inherit;
          padding: 10px;
          border-radius: 20px;
          margin-bottom: 10px;
        }
        
        .red-theme .game-infos {
          background-color: var(--red-dark);
        }
        
        .blue-theme .game-infos {
          background-color: var(--blue-dark);
        }
        
        .green-theme .game-infos {
          background-color: var(--green-dark);
        }
        
        .dark-theme .game-infos {
          background-color: var(--black-dark);
        }
        
        .light-theme .game-infos {
          background-color: var(--white-dark);
          color: black;
        }
        
        .final-message {
          position: fixed;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border: 2px solid #4caf50;
          padding: 20px 40px;
          font-size: 1.8em;
          font-weight: bold;
          color: #4caf50;
          border-radius: 12px;
          box-shadow: 0 0 20px rgba(0,0,0,0.2);
          animation: fadeIn 1s ease-out forwards;
          z-index: 999;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -60%); }
          to { opacity: 1; transform: translate(-50%, -50%); }
        }
        
        .brilho-final {
          animation: pulse-brilho 1s infinite;
        }
        
        @keyframes pulse-brilho {
          0% { box-shadow: 0 0 10px 4px rgba(76, 175, 80, 0.6); }
          50% { box-shadow: 0 0 20px 8px rgba(76, 175, 80, 0.8); }
          100% { box-shadow: 0 0 10px 4px rgba(76, 175, 80, 0.6); }
        }
        
        .shuffle {
          animation: shuffle 0.6s ease-in-out alternate;
        }
        
        @keyframes shuffle {
          0%   { transform: translateY(0px) rotate(0deg); }
          50%  { transform: translateY(-8px) rotate(3deg); }
          100% { transform: translateY(0px) rotate(-3deg); }
        }
        
        button {
          padding: 10px 20px;
          background-color: #4caf50;
          color: white;
          font-size: 1.1em;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-bottom: 20px;
        }
        
        button:hover {
          background-color: #43a047;
        }
        
        .progress-bar {
          width: 80%;
          height: 30px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .bar {
          height: 100%;
          width: 100%;
          background-color: #ccc;
          border-radius: 50px;
        }
        
        #bar-progress {
          height: 100%;
          width: 0%;
          background-color: var(--green-dark);
          border-radius: 50px;
        }
        
        #bar-info {
          font-weight: 800;
          font-size: 1.5em;
        }
      `}</style>
    </div>
  );
}

export default Memory;
