function drawWavePleth(
  ctx: CanvasRenderingContext2D | null,
  x: number,
  y: number,
  amplitude: number,
  largura: number,
  progresso: number
) {
  if (!ctx) return;

  const passo = largura / 40;
  const scale = 0.3; // O tamanho da onda pode ser ajustado para visualização

  const p1 = amplitude * scale; // O valor de p1 representa a amplitude da onda
  const p2 = amplitude * 0.8 * scale; // p2 pode ser uma segunda variação da onda

  const comprimentoVisivel = largura * progresso;

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, 0, comprimentoVisivel, ctx.canvas.height);
  ctx.clip();

  ctx.beginPath();
  ctx.moveTo(x, y);

  // Criar a onda do Pleth, com variações baseadas na amplitude
  ctx.lineTo(x + passo * 2, y);
  ctx.quadraticCurveTo(x + passo * 3, y - p1, x + passo * 4, y); // A parte ascendente da onda
  ctx.lineTo(x + passo * 6, y);
  ctx.quadraticCurveTo(x + passo * 7, y + p2, x + passo * 8, y); // A parte descendente da onda

  ctx.strokeStyle = "#13fbff"; // Cor azul para o Pleth
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

useEffect(() => {
  if (!PlethRef.current) return;

  const canvas = PlethRef.current;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  canvas.width = width;
  canvas.height = height;

  monitorStaticTextWrite(PlethRef, "pleth", pleth);

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

      drawWavePleth(
        ctx,
        wave.startX,
        y,
        staO2, // O valor de SpO2 pode ser usado como a amplitude da onda
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
}, [staO2]); // Atualizar sempre que o valor de SpO2 mudar

function drawWaveResp(
  ctx: CanvasRenderingContext2D | null,
  x: number,
  y: number,
  amplitude: number,
  largura: number,
  progresso: number
) {
  if (!ctx) return;

  const passo = largura / 40;
  const scale = 0.1; // Ajustar a escala para que a onda tenha uma amplitude adequada

  const p1 = amplitude * scale; // A amplitude do movimento respiratório
  const p2 = amplitude * 0.7 * scale; // Um ajuste para a ondulação respiratória

  const comprimentoVisivel = largura * progresso;

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, 0, comprimentoVisivel, ctx.canvas.height);
  ctx.clip();

  ctx.beginPath();
  ctx.moveTo(x, y);

  // Criar a onda respiratória, com variações baseadas na frequência respiratória
  ctx.lineTo(x + passo * 2, y);
  ctx.quadraticCurveTo(x + passo * 3, y - p1, x + passo * 4, y); // A parte ascendente da onda respiratória
  ctx.lineTo(x + passo * 6, y);
  ctx.quadraticCurveTo(x + passo * 7, y + p2, x + passo * 8, y); // A parte descendente da onda

  ctx.strokeStyle = "#fffd13"; // Cor amarela para a respiração
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}
useEffect(() => {
  if (!RespRef.current) return;

  const canvas = RespRef.current;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  canvas.width = width;
  canvas.height = height;

  monitorStaticTextWrite(RespRef, "resp", resp);

  const colunas = 4;
  const waveWidth = width / colunas;

  let cursorX = 0;
  let activeWaves: { startX: number }[] = [{ startX: 0 }];
  let lastTime = 0;
  const speed = 60; // Velocidade mais baixa para a respiração
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

      drawWaveResp(
        ctx,
        wave.startX,
        y,
        rpm, // Usar rpm como a amplitude da onda respiratória
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
}, [rpm]); // Atualizar sempre que o valor de rpm mudar
