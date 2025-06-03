export function canvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  tam: number = 8,
  color: string = "#ffffff"
) {
  ctx.font = `${tam}px Arial`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

export function canvasClear(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  clearX: number = 0,
  clearY: number = 0
) {
  ctx.clearRect(w, h, clearX, clearY);
  // ctx.fillStyle = "blue";
  // ctx.fillRect(w, h, clearX, clearY);
  // console.log("desenhow")
}
