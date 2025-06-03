export interface waveECG {
  p: number;
  q: number;
  r: number;
  s: number;
  t: number;
}

export function drawWaveECG(
  ctx: CanvasRenderingContext2D | null,
  x: number,
  y: number,
  wave: waveECG,
  largura: number,
  progresso: number,
  frequency: number // Agora recebendo a frequência
) {
  if (!ctx) return;

  const passo = largura / 40;
  const scale = 0.6;

  // Ajusta o tamanho da onda com base na frequência
  const p = wave.p * scale * (1 / frequency); // Menor frequência, maior amplitude
  const q = wave.q * scale * (1 / frequency);
  const r = wave.r * scale * (1 / frequency);
  const s = wave.s * scale * (1 / frequency);
  const t = wave.t * scale * (1 / frequency);

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