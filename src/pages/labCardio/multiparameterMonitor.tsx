import { useState, useRef, useEffect } from "react";
import {
  monitorStaticTextWrite,
  MonitorTexts,
  MonitorText,
  initialMonitorTexts,
} from "../../utils/monitor.utils";
import { canvasClear } from "../../utils/canvas.utils";
import { drawWaveECG } from "../../utils/ecg.utils";

export interface waveECG {
  p: number;
  q: number;
  r: number;
  s: number;
  t: number;
}

function MultiparameterMonitor() {
  const [hour, setHour] = useState("00:00:00");
  const [mute, setMute] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      setHour(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const ECG1Ref = useRef<HTMLCanvasElement | null>(null);
  const ECG2Ref = useRef<HTMLCanvasElement | null>(null);
  const PlethRef = useRef<HTMLCanvasElement | null>(null);
  const RespRef = useRef<HTMLCanvasElement | null>(null);

  const [frequency, setFrequency] = useState(87);
  const [staO2, setStaO2] = useState(99);
  const [rpm, setRpm] = useState(14);
  const [pas, setPas] = useState(118);
  const [pad, setPad] = useState(81);

  const [ecg1, setECG1] = useState<MonitorText>(initialMonitorTexts.ecg1);
  const [ecg2, setECG2] = useState<MonitorText>(initialMonitorTexts.ecg2);
  const [pleth, setPleth] = useState<MonitorText>(initialMonitorTexts.pleth);
  const [resp, setResp] = useState<MonitorText>(initialMonitorTexts.resp);

  useEffect(() => {
    if (ECG1Ref.current) monitorStaticTextWrite(ECG1Ref, "ecg1", ecg1);
  }, [ecg1]);

  useEffect(() => {
    if (ECG2Ref.current) monitorStaticTextWrite(ECG2Ref, "ecg2", ecg2);
  }, [ecg2]);

  useEffect(() => {
    if (PlethRef.current) monitorStaticTextWrite(PlethRef, "pleth", pleth);
  }, [pleth]);

  useEffect(() => {
    if (RespRef.current) monitorStaticTextWrite(RespRef, "resp", resp);
  }, [resp]);

  function drawWaveECG(
    ctx: CanvasRenderingContext2D | null,
    x: number,
    y: number,
    wave: waveECG,
    largura: number,
    progresso: number
  ) {
    if (!ctx) return;

    const passo = largura / 40;
    const scale = 0.6;

    const p = wave.p * scale;
    const q = wave.q * scale;
    const r = wave.r * scale;
    const s = wave.s * scale;
    const t = wave.t * scale;

    const comprimentoVisivel = largura * progresso;

    ctx.save();
    ctx.beginPath();
    ctx.rect(x, 0, comprimentoVisivel, ctx.canvas.height);
    ctx.clip();

    ctx.beginPath();
    ctx.moveTo(x, y);

    ctx.lineTo(x + passo * 2, y);
    ctx.quadraticCurveTo(x + passo * 3, y - p, x + passo * 4, y);
    ctx.lineTo(x + passo * 6, y);
    ctx.quadraticCurveTo(x + passo * 6.5, y + q, x + passo * 7, y + q);
    ctx.quadraticCurveTo(x + passo * 8, y - r, x + passo * 9, y);
    ctx.quadraticCurveTo(x + passo * 10, y + s, x + passo * 11, y);
    ctx.lineTo(x + passo * 14, y);
    ctx.quadraticCurveTo(x + passo * 15.5, y - t, x + passo * 17, y);
    ctx.lineTo(x + passo * 20, y);

    ctx.strokeStyle = "#0afa0e";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
  }

  useEffect(() => {
    if (!ECG1Ref.current) return;

    const canvas = ECG1Ref.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    monitorStaticTextWrite(ECG1Ref, "ecg1", ecg1);

    const colunas = 4;
    const waveWidth = width / colunas;

    let cursorX = 0;
    let activeWaves: { startX: number }[] = [{ startX: 0 }];
    let lastTime = 0;
    const speed = 80;
    const y = 60;

    function animate(timestamp: number) {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      if (!ctx) return;

      cursorX += (speed * deltaTime) / 1000;

      const cleaningX = cursorX;
      canvasClear(ctx, cleaningX, 30, 10, height - 20 * 2);

      for (const wave of activeWaves) {
        const progresso = Math.min(1, (cursorX - wave.startX) / waveWidth);

        drawWaveECG(
          ctx,
          wave.startX,
          y,
          { p: 5, q: 3, r: 60, s: 10, t: 15 },
          waveWidth,
          progresso
        );
      }

      const last = activeWaves[activeWaves.length - 1];
      if (cursorX - last.startX >= 100) {
        activeWaves.push({ startX: cursorX });
      }

      if (cursorX >= width) cursorX = 0;

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [ecg1, frequency]);

  return (
    <div className="page-container">
      <h1 className="page-title">
        <i className="fi fi-rr-flask"></i> Monitor multiparamêtro
      </h1>

      <div className="monitor">
        <div className="monitor-screen">
          <div className="monitor-person-info">
            <div>
              <i className="fi fi-sr-person-simple"></i>
              <p>Adulto</p>
            </div>
            <p>José da Silva</p>
            <div>
              <div>
                <i className="fi fi-sr-charging-station text-green p-2"></i>
                <i
                  className={`fi fi-sr-volume${mute ? "-slash text-red" : ""}`}
                ></i>
              </div>
              <p>{hour}</p>
            </div>
          </div>
          <div className="monitor-parameters">
            <div className="parameters-col-1">
              <div className="parameters-2">
                <canvas ref={ECG1Ref} className="parameter"></canvas>
                <canvas ref={ECG2Ref} className="parameter"></canvas>
              </div>
              <div className="parameters-2">
                <canvas ref={PlethRef} className="parameter">
                  SPO2
                </canvas>
                <canvas ref={RespRef} className="parameter">
                  etCO2
                </canvas>
              </div>
              <div className="parameters">
                <input
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  type="range"
                  name=""
                  min="0"
                  max="300"
                  value={frequency}
                />
              </div>
            </div>
            <div className="parameters-col-2">
              <div className="parameters-2">
                <div className="parameter h1 text-green">{frequency}</div>
              </div>
              <div className="parameters">
                <div className="parameter h2 text-cyan">{staO2}</div>
              </div>
              <div className="parameters">
                <div className="parameter h2 text-yellow">{rpm}</div>
              </div>
              <div className="parameters">
                <div className="parameter h4 text-gray">
                  {pas}/{pad}
                </div>
              </div>
            </div>
          </div>
          <div className="monitor-configs"></div>
        </div>
        <div className="monitor-controls">
          <button onClick={() => setMute(!mute)}>
            <i className="fi fi-sr-volume-slash"></i>
          </button>
        </div>
      </div>

      <style>{`
        .page-container {
          width: 100%;
        }

        .monitor {
          width: 100%;
          height: 700px;
          background-color: #1d1d1d;
          padding: 40px;
          border-radius: 20px;
          margin-top: 20px;
        }

        .monitor-screen {
          width: 100%;
          height: 90%;
          border-radius: 20px;
          background-color: #020f02;
          color: white;
          padding: 20px;
        }

        .monitor-screen * {
          color: white;
        }

        .monitor-person-info {
          height: 8%; 
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .monitor-parameters {
          display: flex;
          height: 84%;
        }

        .parameters-col-1 {
          width: 75%;
        }

        .parameters-col-2 {
          width: 25%;
          padding: 10px;
        }

        .parameters {
          width: 100%;
          height: calc(100% / 5);
        }

        .parameters-2 {
          width: 100%;
          height: calc((100% / 5) * 2);
        }
        
        .parameters .parameter {
          width: 100%;
          height: 100%;
        }

        .parameters-2 .parameter {
          width: 100%;
          height: 50%;
        }

        .h1, .h2, .h4 {
          font-weigth: 800;
        }

        .h1 {
          font-size: 7em;
        }

        .h2 {
          font-size: 5em;
        }

        .h4 {
          font-size: 3em;
        }

        .text-yellow {
          color: #fffd13;
        }

        .text-cyan {
          color: #13fbff;
        }

        .text-green {
          color: #0afa0e;
        }

        .text-gray {
          color: #5e5d63;
        }

        .text-gray-ligth {
          color: #d6d6d6;
        }

        .text-red {
          color: red;
        }

        .w-100 {
          width: 100%;
        }

        .p-2 {
          padding: 8px;
        }

        .d-flex {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .text-center {
          text-align: center;
        }






        .monitor-controls {
          width: 100%;
          height: 8%;
          display: flex;
          align-items: right;
          justify-content: flex-end;
        }

      `}</style>
    </div>
  );
}

export default MultiparameterMonitor;
