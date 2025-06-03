import { useEffect } from "react";
import { successEffect, errorEffect, selectedEffect } from "../../assets/tsx/audio";

function Eletrocardiograph() {
  const precordiais = [
    { id: "V1", cor: "vermelho" },
    { id: "V2", cor: "verde" },
    { id: "V3", cor: "roxo" },
    { id: "V4", cor: "laranja" },
    { id: "V5", cor: "azul" },
    { id: "V6", cor: "amarelo" },
  ];
  const perifericos = [
    { id: "RA", cor: "branco" },
    { id: "LA", cor: "preto" },
    { id: "RL", cor: "verde" },
    { id: "LL", cor: "vermelho" },
  ];

  useEffect(() => {
    let draggedEl: HTMLElement | null = null;

    const handleDragStart = (e: DragEvent) => {
      draggedEl = e.target as HTMLElement;
      selectedEffect.play();
    };

    const handleDragOver = (e: DragEvent, zone: HTMLElement) => {
      e.preventDefault();
      zone.style.background = "rgba(0, 128, 255, 0.4)";
    };

    const handleDragLeave = (zone: HTMLElement) => {
      zone.style.background = "rgba(0, 128, 255, 0.2)";
    };

    const handleDrop = (e: DragEvent, zone: HTMLElement) => {
      e.preventDefault();

      if (!draggedEl) {
        alert("Eletrodo não encontrado!");
        return;
      } 

      const draggedId = draggedEl.dataset.ventosa;
      const accepted = zone.dataset.accept;

      if (draggedId === accepted) {
        zone.innerHTML = "";
        draggedEl.style.width = "30px";
        draggedEl.style.cursor = "default";
        draggedEl.setAttribute("draggable", "false");
        zone.appendChild(draggedEl);
        // zone.style.background = "rgba(0, 255, 0, 0.2)";
        zone.style.background = "transparent";
        zone.style.border = "none";
        successEffect.play();
      } else {
        // alert(`Essa zona aceita apenas o eletrodo: ${accepted}.`);
        zone.style.background = "rgba(255, 0, 0, 0.2)";
        errorEffect.play();
      }

      draggedEl = null;
    };

    const draggableEls = document.querySelectorAll<HTMLElement>("[draggable]");
    const dropZones = document.querySelectorAll<HTMLElement>(".drop-zone");

    draggableEls.forEach((el) => {
      el.addEventListener("dragstart", handleDragStart);
    });

    dropZones.forEach((zone) => {
      const dragOver = (e: DragEvent) => handleDragOver(e, zone);
      const dragLeave = () => handleDragLeave(zone);
      const drop = (e: DragEvent) => handleDrop(e, zone);

      zone.addEventListener("dragover", dragOver);
      zone.addEventListener("dragleave", dragLeave);
      zone.addEventListener("drop", drop);

      // Cleanup on unmount
      return () => {
        zone.removeEventListener("dragover", dragOver);
        zone.removeEventListener("dragleave", dragLeave);
        zone.removeEventListener("drop", drop);
      };
    });

    return () => {
      draggableEls.forEach((el) => {
        el.removeEventListener("dragstart", handleDragStart);
      });
    };
  }, []);

  return (
    <div>
      <h1 className="page-title">
        <i className="fi fi-rr-flask"></i> Eletrocardiográfo
      </h1>

      <div className="lab">
        <div className="body-image-container">
          <img
            src="/public/images/eletrocardiografo/corpo-humano.png"
            alt="Corpo Humano"
            className="body-image"
          />
          // Zonas de drop para ventosas (V1-V6)
          <div
            className="drop-zone"
            data-accept="V1"
            style={{ left: "160px", top: "165px" }}
          >
            {" "}
            V1{" "}
          </div>
          <div
            className="drop-zone"
            data-accept="V2"
            style={{ left: "190px", top: "165px" }}
          >
            {" "}
            V2{" "}
          </div>
          <div
            className="drop-zone"
            data-accept="V3"
            style={{ left: "210px", top: "175px" }}
          >
            {" "}
            V3{" "}
          </div>
          <div
            className="drop-zone"
            data-accept="V4"
            style={{ left: "240px", top: "220px" }}
          >
            {" "}
            V4{" "}
          </div>
          <div
            className="drop-zone"
            data-accept="V5"
            style={{ left: "260px", top: "220px" }}
          >
            {" "}
            V5{" "}
          </div>
          <div
            className="drop-zone"
            data-accept="V6"
            style={{ left: "280px", top: "220px" }}
          >
            {" "}
            V6{" "}
          </div>
          // Zonas de drop para cardioclips (RA, LA, RL, LL)
          <div
            className="drop-zone"
            data-accept="RA"
            style={{ left: "111px", top: "455px" }}
          >
            {" "}
            RA{" "}
          </div>
          <div
            className="drop-zone"
            data-accept="LA"
            style={{ left: "445px", top: "455px" }}
          >
            {" "}
            LA{" "}
          </div>
          <div
            className="drop-zone"
            data-accept="RL"
            style={{ left: "207px", top: "800px" }}
          >
            {" "}
            RL{" "}
          </div>
          <div
            className="drop-zone"
            data-accept="LL"
            style={{ left: "350px", top: "800px" }}
          >
            {" "}
            LL{" "}
          </div>
          button#reval(onclick="reval()") Revelar
        </div>
        <div className="eletrodos">
          <div>
            <h5> Eletrodos Precordiais (Ventosas) </h5>
            {precordiais.map((eletrodo, index) => (
              <img
                className="ventosa"
                src={`/public/images/eletrocardiografo/eletrodo-${eletrodo.cor}.png`}
                alt={`${eletrodo.id}`}
                draggable
                data-ventosa={`${eletrodo.id}`}
              />
            ))}
          </div>
          <div>
            <h5>Eletrodos Periféricos (Cardioclips) </h5>
            {perifericos.map((clip, index) => (
              <img
                className="cardioclip"
                src={`/public/images/eletrocardiografo/cardioclip-${clip.cor}.png`}
                alt={`${clip.id}`}
                draggable
                data-ventosa={`${clip.id}`}
              />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .lab {
          display: flex;
        }

        .page-title {
          position: fixed;
        }

        .ecg-layout {
          display: flex;
          flex-direction: row;
          gap: 3rem;
          justify-content: center;
          padding: 2rem;
        }

        .body-area {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .body-image-container {
          position: relative;
          width: 600px;
          height: auto;
          border: 1px dashed #ccc;
          background: #f8f8f8;
        }

        .body-image {
          width: 600px;
          height: auto;
        }

        .drop-zone {
          position: absolute;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: rgba(0, 128, 255, 0.2);
          border: 2px dashed #0080ff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0055aa;
          font-weight: bold;
          font-size: 14px;
        }

        .eletrodos {
          width: 100%;
          padding: 10px;
          position: fixed;
          bottom: 0;
          background: red;
          display: flex;
          justify-content: space-between;
          align-items: cnter;
        }

        .eletrodos-area {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .ventosas-container, .perifericos {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .ventosa, .cardioclip {
          width: 40px;
          cursor: grab;
        }
      
      `}</style>
    </div>
  );
}

export default Eletrocardiograph;

/*

extends ../layout


block content
  style.
    .ecg-layout {
      display: flex;
      flex-direction: row;
      gap: 3rem;
      justify-content: center;
      padding: 2rem;
    }


    .body-area {
      display: flex;
      flex-direction: column;
      align-items: center;
    }


    .body-image-container {
      position: relative;
      width: auto;
      height: auto;
      border: 1px dashed #ccc;
      background: #f8f8f8;
    }


    .body-image {
      width: 100%;
      height: auto;
    }


    .drop-zone {
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(0, 128, 255, 0.2);
      border: 2px dashed #0080ff;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0055aa;
      font-weight: bold;
      font-size: 14px;
    }


    .eletrodos-area {
      display: flex;
      flex-direction: column;
      align-items: center;
    }


    .ventosas-container, .perifericos {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 1.5rem;
    }


    .ventosa, .cardioclip {
      width: 50px;
      cursor: grab;
    }


  h1 Eletrocardiógrafo


  .app-container
    .ecg-layout
      .body-area
        h2 Arraste os eletrodos até o corpo


        .body-image-container
          img(src="/public/images/eletrocardiografo/corpo-humano.png", alt="Corpo Humano", class="body-image")
          
          // Zonas de drop para ventosas (V1-V6)
          .drop-zone(data-accept="V1", style="left: 160px; top: 165px") V1
          .drop-zone(data-accept="V2", style="left: 190px; top: 165px") V2
          .drop-zone(data-accept="V3", style="left: 210px; top: 175px") V3
          .drop-zone(data-accept="V4", style="left: 240px; top: 220px") V4
          .drop-zone(data-accept="V5", style="left: 260px; top: 220px") V5
          .drop-zone(data-accept="V6", style="left: 280px; top: 220px") V6
            
          // Zonas de drop para cardioclips (RA, LA, RL, LL)
          .drop-zone(data-accept="RA", style="left: 68px; top: 275px") RA
          .drop-zone(data-accept="LA", style="left: 275px; top: 275px") LA
          .drop-zone(data-accept="RL", style="left: 127px; top: 490px") RL
          .drop-zone(data-accept="LL", style="left: 217px; top: 490px") LL
          
          button#reval(onclick="reval()") Revelar


      .eletrodos-area
        h3 Eletrodos Precordiais (Ventosas)
        .ventosas-container
          each eletrodo in [{ id: 'V1', cor: 'vermelho' }, { id: 'V2', cor: 'verde' }, { id: 'V3', cor: 'roxo' }, { id: 'V4', cor: 'laranja' }, { id: 'V5', cor: 'azul' }, { id: 'V6', cor: 'amarelo' }]
            img.ventosa.draggable(
              src=`/public/images/eletrocardiografo/eletrodo-${eletrodo.cor}.png`,
              alt=`${eletrodo.id}`,
              draggable="true",
              data-ventosa=eletrodo.id
            )


        h3 Eletrodos Periféricos (Cardioclips)
        .perifericos
          each clip in [{ id: 'RA', cor: 'branco' }, { id: 'LA', cor: 'preto' }, { id: 'RL', cor: 'verde' }, { id: 'LL', cor: 'vermelho' }]
            img.cardioclip.draggable(
              src=`/public/images/eletrocardiografo/cardioclip-${clip.cor}.png`,
              alt=`${clip.id}`,
              draggable="true",
              data-ventosa=clip.id
            )


  script.
    document.addEventListener('DOMContentLoaded', () => {
      let draggedEl = null;


      document.querySelectorAll('.draggable').forEach(el => {
        el.addEventListener('dragstart', (e) => {
          draggedEl = e.target;
        });
      });


      document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.addEventListener('dragover', (e) => {
          e.preventDefault();
          zone.style.background = 'rgba(0, 128, 255, 0.4)';
        });


        zone.addEventListener('dragleave', () => {
          zone.style.background = 'rgba(0, 128, 255, 0.2)';
        });


        zone.addEventListener('drop', (e) => {
          e.preventDefault();


          if (!draggedEl) {
            alert('Eletrodo não encontrado.');
            return;
          }


          const draggedId = draggedEl.dataset.ventosa;
          const accepted = zone.dataset.accept;


          if (draggedId === accepted) {
            zone.innerHTML = '';
            draggedEl.style.width = '30px';
            draggedEl.style.cursor = 'default';
            draggedEl.setAttribute('draggable', false);
            zone.appendChild(draggedEl);
            zone.style.background = 'rgba(0, 255, 0, 0.2)';
          } else {
            alert(`Essa zona aceita apenas o eletrodo: ${accepted}.`);
            zone.style.background = 'rgba(255, 0, 0, 0.2)';
          }


          draggedEl = null;
        });
      });
    });
    
    const bodyImage = document.querySelector(".body-image");
    let statusBody = false;
    
    function reval(){
      statusBody = !statusBody;
      bodyImage.src = statusBody ? "/public/images/eletrocardiografo/esqueleto-humano.png" : "/public/images/eletrocardiografo/corpo-humano.png";
    }
    bodyImage.addEventListener("touchstart", function(event) {
      const touch = event.touches[0]; // ou event.changedTouches[0]
      const rect = bodyImage.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      console.log("Posição relativa ao elemento:", { x, y });
   });    

*/

/*
extends ../layout
block content
  h1 LabCardio
  ul
    li Posicionamento dos Eletrodos 
    li Gerador de ECG
    li Monitor Cardíaco
    li Modo avaliação
    
    
  a(href="/labCardio/eletrocardiografo") Eletrocardiógrafo




  h2 Papel Milimetrado ECG
  style.
    canvas {
      display: block;
      width: 100vw;
      height: 100vh;
      background-color: white;
      scale: 0.9;
    }
    
  canvas#ecgGrid


  script.
    const canvas = document.getElementById('ecgGrid');
    const ctx = canvas.getContext('2d');


    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    const mm = 4;
    const smallGrid = mm;
    const bigGrid = mm * 5;


    const smallLine = '#ffdddd';
    const bigLine = '#ff6666';


    // Grid horizontal
    for (let y = 0; y < canvas.height; y += smallGrid) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.strokeStyle = (y % bigGrid === 0) ? bigLine : smallLine;
      ctx.lineWidth = (y % bigGrid === 0) ? 1 : 0.5;
      ctx.stroke();
    }


    // Grid vertical
    for (let x = 0; x < canvas.width; x += smallGrid) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.strokeStyle = (x % bigGrid === 0) ? bigLine : smallLine;
      ctx.lineWidth = (x % bigGrid === 0) ? 1 : 0.5;
      ctx.stroke();
    }


    // Derivações em blocos (4 colunas x 3 linhas)
    const derivacoes = ['DI', 'DII', 'DIII', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6'];
    const colunas = 4;
    const linhas = 3;


    const blocoLargura = canvas.width / colunas;
    const blocoAltura = canvas.height / linhas;


    ctx.fillStyle = '#222';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'left';


    derivacoes.forEach((nome, i) => {
      const col = i % colunas;
      const lin = Math.floor(i / colunas);


      const x = col * blocoLargura + 10;
      const y = lin * blocoAltura + 20;


      ctx.fillText(nome, x, y);
    });


    function desenharOndaECG(ctx, x, y, largura, altura, p) {
      const passo = largura / 40;


      ctx.beginPath();
      ctx.moveTo(x, y);


      // Linha isoelétrica inicial (antes da onda P)
      ctx.lineTo(x + passo * 2, y);


      // Onda P (curva suave)
      ctx.quadraticCurveTo(x + passo * 3, y - p.p, x + passo * 4, y);


      // Segmento PR
      ctx.lineTo(x + passo * 6, y);


      // Onda Q (descida rápida)
      ctx.quadraticCurveTo(x + passo * 6.5, y + p.q, x + passo * 7, y + p.q);


      // Onda R (subida rápida)
      ctx.quadraticCurveTo(x + passo * 8, y - p.r, x + passo * 9, y);


      // Onda S (descida rápida)
      ctx.quadraticCurveTo(x + passo * 10, y + p.s, x + passo * 11, y);


      // Segmento ST
      ctx.lineTo(x + passo * 14, y);


      // Onda T (subida e descida suaves)
      ctx.quadraticCurveTo(x + passo * 15.5, y - p.t, x + passo * 17, y);
      ctx.lineTo(x + passo * 20, y); // fim do intervalo QT


      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();
    }


    // Exemplo de onda sinusal
    desenharOndaECG(ctx, 20, 80, blocoLargura, blocoAltura, {
      p: 10,
      q: 5,
      r: 100,
      s: 15,
      t: 20
    });


    desenharOndaECG(ctx, 200, 80, blocoLargura, blocoAltura, {
      p: 10,
      q: 5,
      r: 100,
      s: 15,
      t: 20
    });


    desenharOndaECG(ctx, 380, 80, blocoLargura, blocoAltura, {
      p: 10,
      q: 5,
      r: 100,
      s: 15,
      t: 20
    });















*/