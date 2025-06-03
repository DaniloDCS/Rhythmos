import React, { useEffect } from "react";
import { drawWaveECG, canvasText } from "./canvas.utils";

interface Derivation {
  id: string;
  invert?: boolean;
}

interface ECGProps {
  bpm: number;
  derivations: Derivation[];
}

const ECGComponent: React.FC<ECGProps> = ({ bpm, derivations }) => {
  useEffect(() => {
    const interval = 60000 / bpm;

    derivations.forEach((d) => {
      const canvas = document.getElementById(d.id) as HTMLCanvasElement;
      const ctx = canvas?.getContext("2d");
      if (!ctx || !canvas) return;

      if (d.id === "d-ii") {
        canvasText(ctx, "II", 10, 15);
      } else if (d.id === "d-v") {
        canvasText(ctx, "V", 10, 15);
      }

      let x = 20;
      const y = d.invert ? 60 : 100;

      const colunas = 4;
      const linhas = 3;
      const blocoLargura = canvas.width / colunas;
      const blocoAltura = canvas.height / linhas;

      const p = 10,
        q = 5,
        r = 120,
        s = 15,
        t = 20;

      setInterval(() => {
        drawWaveECG(ctx, x, y, blocoLargura, blocoAltura, {
          p: d.invert ? -p : p,
          q: d.invert ? -q : q,
          r: d.invert ? -r : r,
          s: d.invert ? -s : s,
          t: d.invert ? -t : t,
        });

        x += 35;
      }, interval);
    });
  }, [bpm, derivations]);

  return (
    <>
      {derivations.map((d) => (
        <canvas key={d.id} id={d.id} width={400} height={150}></canvas>
      ))}
    </>
  );
};

export default ECGComponent;
