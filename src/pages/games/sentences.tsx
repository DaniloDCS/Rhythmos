import { useState, useRef, useEffect } from "react";
import { sentencesECG } from "../../assets/tsx/rhythms";
import {
  AudioPool,
  selectedEffect,
  successEffect,
  errorEffect,
  removeEffect,
  backgroundEffect
} from "../../assets/tsx/audio.ts";

function shuffleArray<T>(array: T[]): T[] {
  const copiedArray = [...array];
  for (let i = copiedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
  }
  return copiedArray;
}

function gerarNumerosAleatorios(
  qtd: number,
  min: number,
  max: number
): number[] {
  const intervalo = max - min + 1;
  if (qtd > intervalo)
    throw new Error("Intervalo insuficiente para gerar números únicos.");

  const numeros = new Set<number>();
  while (numeros.size < qtd) {
    const numero = Math.floor(Math.random() * intervalo) + min;
    numeros.add(numero);
  }

  return Array.from(numeros);
}

function organizarSentencas(array: string[]) {
  const ordenadas = [];
  const sentencasComEspacos = [];

  for (let frase of array) {
    const palavras = frase.split(" ");
    let posicoes: number[] = [];

    if (palavras.length <= 5)
      posicoes = gerarNumerosAleatorios(3, 0, palavras.length - 1);
    else if (palavras.length <= 7)
      posicoes = gerarNumerosAleatorios(4, 0, palavras.length - 1);
    else if (palavras.length < 10)
      posicoes = gerarNumerosAleatorios(5, 0, palavras.length - 1);
    else posicoes = gerarNumerosAleatorios(7, 0, palavras.length - 1);

    const palavrasFaltantes = posicoes.map(pos => ({
      word: palavras[pos],
      position: pos
    }));
    posicoes.forEach(pos => (palavras[pos] = "@@"));

    ordenadas.push(palavrasFaltantes);
    sentencasComEspacos.push(palavras.join(" "));
  }

  return { ordenadas, sentencasComEspacos };
}

function Sentences() {
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [time, setTime] = useState("00:00:00");
  const [points, setPoints] = useState(0);
  const [sentences, setSentences] = useState<string[]>([]);
  const [missingWords, setMissingWords] = useState<
    { word: string; position: number }[][]
  >([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [options, setOptions] = useState<string[]>([]);
  const [sounds, setSounds] = useState(true);
  const [effects, setEffects] = useState(true);

  const correctEffectRef = useRef(successEffect);
  const errorEffectRef = useRef(errorEffect);
  const selectedEffectRef = useRef(selectedEffect);
  const removeEffectRef = useRef(removeEffect);
  const backgroundEffectRef = useRef(backgroundEffect);

  useEffect(() => {
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, []);

  useEffect(() => {
    if (!sounds) backgroundEffect.stop();
    else backgroundEffect.play();
  }, [sounds]);

  const iniciarCronometro = () => {
    let segundos = 0,
      minutos = 0,
      horas = 0;
    if (interval.current) clearInterval(interval.current);

    interval.current = setInterval(() => {
      segundos++;
      if (segundos === 60) {
        segundos = 0;
        minutos++;
        if (minutos === 60) {
          minutos = 0;
          horas++;
        }
      }

      const tempoFormatado = `${String(horas).padStart(2, "0")}:${String(
        minutos
      ).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
      setTime(tempoFormatado);
    }, 1000);
  };

  const startGame = () => {
    const embaralhadas = shuffleArray(sentencesECG);
    const { ordenadas, sentencasComEspacos } = organizarSentencas(embaralhadas);

    setSentences(sentencasComEspacos);
    setMissingWords(ordenadas);
    setCurrentSentenceIndex(0);
    setPoints(0);
    setAnswers({});
    setOptions(shuffleArray(ordenadas[0].map(item => item.word)));
    iniciarCronometro();

    if (sounds) backgroundEffectRef.current.play();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    const word = e.dataTransfer.getData("text");

    setAnswers(prev => {
      const prevWord = prev[position];
      if (prevWord && prevWord !== word)
        setOptions(opts => [...opts, prevWord]);
      return { ...prev, [position]: word };
    });

    setOptions(prev => prev.filter(w => w !== word));
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, word: string) => {
    e.dataTransfer.setData("text", word);
    if (effects) selectedEffectRef.current.play();
  };

  const checkAnswer = () => {
    const currentMissing = missingWords[currentSentenceIndex];
    const isCorrect = currentMissing.every(
      ({ position, word }) => answers[position] === word
    );

    if (isCorrect) {
      setPoints(prev => prev + 1);
      if (effects) correctEffectRef.current.play();
      const nextIndex = currentSentenceIndex + 1;
      if (nextIndex < sentences.length) {
        setCurrentSentenceIndex(nextIndex);
        setAnswers({});
        setOptions(
          shuffleArray(missingWords[nextIndex].map(item => item.word))
        );
      } else {
        alert("Jogo finalizado!");
        if (interval.current) clearInterval(interval.current);
      }
    } else {
      if (effects) errorEffectRef.current.play();
      alert("Alguma resposta está incorreta. Tente novamente.");
    }
  };

  const renderSentence = () => {
    if (!sentences[currentSentenceIndex]) return null;

    const words = sentences[currentSentenceIndex].split(" ");

    return words.map((word, index) => {
      if (word === "@@") {
        const filledWord = answers[index];

        return (
          <span
            key={index}
            onDragOver={e => e.preventDefault()}
            onDrop={e => onDrop(e, index)}
            className="drop-zone"
            onDoubleClick={() => {
              if (filledWord) {
                if (!effects) removeEffectRef.current.play();
                setOptions(prev => [...prev, filledWord]);
                setAnswers(prev => {
                  const updated = { ...prev };
                  delete updated[index];
                  return updated;
                });
              }
            }}
          >
            {filledWord || "______"}
          </span>
        );
      } else {
        return (
          <span key={index} style={{ marginRight: 5 }}>
            {word}
          </span>
        );
      }
    });
  };

  return (
    <div className="game-content">
      <h1 className="page-title">
        <i className="fi fi-br-text-box"></i> Complete as sentenças
      </h1>

      <div className="game-metrics">
        <p>
          <i className="fi fi-sr-time-quarter-to"></i>
          <strong>{time}</strong>
        </p>
        <p>
          {points}/{sentences.length}
          <i class="fi fi-rr-trophy"></i>
        </p>
        <button className="btn" onClick={startGame} id="game-button-start">
          <i class="fi fi-tr-joystick"></i> Iniciar jogo
        </button>
        <div>
          <button className="btn btn-sound" onClick={() => setSounds(!sounds)}>
            <i className={`fi fi-bs-music-${sounds ? "alt" : "slash"}`}></i>{" "}
          </button>
          <button className="btn" onClick={() => setEffects(!effects)}>
            <i className={`fi fi-bs-bell-${effects ? "ring" : "slash"}`}></i>{" "}
          </button>
        </div>
      </div>

      {sentences.length > 0 && (
        <div className="game-container">
          <div className="show-sentence">{renderSentence()}</div>

          <div className="show-options">
            {options.map((word, index) => (
              <div
                key={index}
                className="option"
                draggable
                onDragStart={e => onDragStart(e, word)}
              >
                {word}
              </div>
            ))}
          </div>

          <button className="btn" onClick={checkAnswer}>
            Verificar resposta <i class="fi fi-sr-check-circle"></i>
          </button>
        </div>
      )}

      <style>{`
        .btn-sound {
          margin-right: 8px;
        }
        
        .game-metrics {
          width: 50%;
          padding: 10px 0;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          margin: 10px auto;
        }
        
        .drop-zone {
          display: inline-block;
          min-width: 80px;
          padding: 5px 10px;
          margin: 0 5px;
          border-bottom: 2px dashed #ccc;
          background-color: #f9f9f9;
          text-align: center;
          font-weight: bold;
          border-radius: 8px;
        }
        
        .option {
          display: inline-block;
          padding: 8px 12px;
          margin: 5px;
          background: white;
          border: 1px solid #00acc1;
          border-radius: 6px;
          cursor: grab;
        }
        
        .game-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center; 
          flex-direction: column;
          gap: 10px;
        }
        
        .show-sentence,
        .show-options {
          width: 70%;
          padding: 20px 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          flex-wrap: wrap;
          border-radius: 8px;
        }
        
        .cherry-theme .show-sentence {
          background-color: var(--red-light);
        }
        
        .blueberry-theme .show-sentence {
          background-color: var(--blue-light);
        }
        
        .florest-theme .show-sentence {
          background-color: var(--green-light);
        }
      
        .dark-theme .show-sentence {
          background-color: var(--black-light);
        }
        
        .ligth-theme .show-sentence {
          background-color: var(--withe-light);
        }
        
        .cherry-theme .show-options .option {
          filter: drop-shadow(0 0 4px var(--red-main));
        }
        
        .blueberry-theme .show-options .option {
          filter: drop-shadow(0 0 4px var(--blue-main));
        }
        
        .florest-theme .show-options .option {
          filter: drop-shadow(0 0 4px var(--green-main));
        }
      
        .dark-theme .show-options .option {
          filter: drop-shadow(0 0 4px var(--black-main));
        }
        
        .ligth-theme .show-options .option {
          filter: drop-shadow(0 0 4px var(--withe-main));
        }
        
      `}</style>
    </div>
  );
}

export default Sentences;
