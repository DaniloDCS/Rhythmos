import React, { useEffect } from "react";
import { drawRespWave, drawSpo2Wave } from "./canvas.utils";

interface Wave {
  id: string;
  type: "spo2" | "resp";
}

const waves: Wave[] = [
  { id: "sat-wave-1", type: "spo2" },
  { id: "sat-wave-2", type: "resp" },
];

interface Props {
  type: "spo2" | "resp";
}

const OxygenationComponent: React.FC<Props> = ({ type }) => {
  useEffect(() => {
    waves.forEach((wave) => {
      const canvas = document.getElementById(wave.id) as HTMLCanvasElement;
      const ctx = canvas?.getContext("2d");
      if (!ctx || !canvas) return;

      let x = 0;
      const yBase = 40;

      const interval = setInterval(
        () => {
          if (wave.type === "spo2") {
            drawSpo2Wave(ctx, x, yBase);
            x += 25;
          } else if (wave.type === "resp") {
            drawRespWave(ctx, x, yBase);
            x += 40;
          }

          if (x > canvas.width) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            x = 0;
          }
        },
        wave.type === "spo2" ? 1000 : 1500
      );

      return () => clearInterval(interval);
    });
  }, [type]);

  return (
    <>
      {waves.map((wave) => (
        <canvas key={wave.id} id={wave.id} width={400} height={100}></canvas>
      ))}
    </>
  );
};

export default OxygenationComponent;
