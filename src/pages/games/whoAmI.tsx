import { useState, useRef, useEffect } from "react";
import { ritmosWhoAmI } from "../../assets/tsx/rhythms";
import {
  AudioPool,
  selectedEffect,
  successEffect,
  errorEffect,
  removeEffect
} from "../../assets/tsx/audio.ts";

function WhoAmI() {
  const userInput = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const [asks, setAsk] = useState<
    { text: string; hour: string; user: boolean }[]
  >([]);

  const correctEffectRef = useRef(successEffect);
  const errorEffectRef = useRef(errorEffect);
  const selectedEffectRef = useRef(selectedEffect);
  const removeEffectRef = useRef(removeEffect);

  function sendAsk() {
    if (inputValue.trim() === "") return;

    setAsk(prev => [
      ...prev,
      {
        text: inputValue,
        hour: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        }),
        user: true
      }
    ]);

    selectedEffectRef.current.play();
    
    setInputValue("");
  }

  return (
    <div className="game-container">
      <h1 className="page-title">
        <i className="fi fi-sr-person-circle-question"></i> Qual ritmo eu sou?
      </h1>
      <div className="game-content">
        <div className="game-chat">
          <div className="chat-messages">
            <div className="chat-text-machine animate-in">
              <span className="message-text">
                Olá! Faça uma pergunta sobre meu ritmo.
              </span>
              <span className="message-hour">12:30</span>
            </div>

            {asks.map((ask, index) => (
              <div
                className={`chat-text-${
                  ask.user ? "me" : "machine"
                } animate-in`}
              >
                <span className="message-text">{ask.text}</span>
                <span className="message-hour">{ask.hour}</span>
              </div>
            ))}
          </div>
          <div className="chat-controls">
            <input
              className="input-outline"
              ref={userInput}
              placeholder="Digite sua pergunta..."
              onInput={e => setInputValue(e.target.value)}
              value={inputValue}
            />
            <button className="btn" onClick={sendAsk}>
              <i className="fi fi-rr-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
      <style>{`
      * {
        box-sizing: border-box;
      }

      .game-container {
        max-width: 600px;
        margin: 40px auto;
        background: #f9f9f9;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        font-family: 'Segoe UI', sans-serif;
        padding: 20px;
      }

      .page-title {
        text-align: center;
        font-size: 24px;
        margin-bottom: 20px;
        color: #333;
      }

      .game-content {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .game-chat {
        display: flex;
        flex-direction: column;
        height: 400px;
        border: 1px solid #ddd;
        border-radius: 10px;
        overflow: hidden;
        background-color: #fff;
      }

      .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .chat-text-machine,
      .chat-text-me {
        max-width: 75%;
        padding: 10px 14px;
        border-radius: 10px;
        position: relative;
        animation: slideIn 0.4s ease forwards;
      }

      .chat-text-machine {
        background-color: #e0f0ff;
        align-self: flex-start;
      }

      .chat-text-me {
        background-color: #d1f7dc;
        align-self: flex-end;
      }

      .message-text {
        display: block;
        font-size: 16px;
        color: #333;
      }

      .message-hour {
        font-size: 12px;
        color: #999;
        margin-top: 4px;
        text-align: right;
      }

      .chat-controls {
        display: flex;
        padding: 10px;
        border-top: 1px solid #ddd;
        background-color: #fafafa;
      }

      .input-outline {
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 16px;
        outline: none;
        margin-right: 10px;
      }

      .btn {
        background-color: #4caf50;
        border: none;
        padding: 10px 14px;
        border-radius: 8px;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .btn:hover {
        background-color: #388e3c;
      }

      @keyframes slideIn {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `}</style>
    </div>
  );
}

export default WhoAmI;
