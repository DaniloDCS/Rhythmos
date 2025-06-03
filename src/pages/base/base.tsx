import { useState } from "react";
import { Link } from "react-router-dom";

export const list = [
  {
    title: "Anatomia cardiovascular",
    url: "anathomy",
    disponible: true,
    modules: [
      {
        title: "Módulo 1",
        classes: [
          {
            title: "Aula 1 - Introdução",
            resume: "Resumo da aula 1",
          },
          {
            title: "Aula 2 - Introdução",
            resume: "Resumo da aula 2",
          },
          {
            title: "Aula 3 - Introdução",
            resume: "Resumo da aula 3",
          },
        ],
      },
      {
        title: "Módulo 1",
        classes: [
          {
            title: "Aula 1 - Introdução",
            resume: "Resumo da aula 1",
          },
          {
            title: "Aula 2 - Introdução",
            resume: "Resumo da aula 2",
          },
          {
            title: "Aula 3 - Introdução",
            resume: "Resumo da aula 3",
          },
        ],
      },
    ],
  },
  {
    title: "Fisiologia cardíaca",
    url: "fisiology",
    disponible: true,
    modules: [
      {
        title: "Módulo 1",
        classes: [
          {
            title: "Aula 1 - Introdução",
            resume: "Resumo da aula 1",
          },
          {
            title: "Aula 2 - Introdução",
            resume: "Resumo da aula 2",
          },
          {
            title: "Aula 3 - Introdução",
            resume: "Resumo da aula 3",
          },
        ],
      },
      {
        title: "Módulo 1",
        classes: [
          {
            title: "Aula 1 - Introdução",
            resume: "Resumo da aula 1",
          },
          {
            title: "Aula 2 - Introdução",
            resume: "Resumo da aula 2",
          },
          {
            title: "Aula 3 - Introdução",
            resume: "Resumo da aula 3",
          },
        ],
      },
    ],
  },
  {
    title: "Dominando o ECG",
    url: "electrocardiogram",
    disponible: false,
    modules: [
      {
        title: "Módulo 1",
        classes: [
          {
            title: "Aula 1 - Introdução",
            resume: "Resumo da aula 1",
          },
          {
            title: "Aula 2 - Introdução",
            resume: "Resumo da aula 2",
          },
          {
            title: "Aula 3 - Introdução",
            resume: "Resumo da aula 3",
          },
        ],
      },
      {
        title: "Módulo 1",
        classes: [
          {
            title: "Aula 1 - Introdução",
            resume: "Resumo da aula 1",
          },
          {
            title: "Aula 2 - Introdução",
            resume: "Resumo da aula 2",
          },
          {
            title: "Aula 3 - Introdução",
            resume: "Resumo da aula 3",
          },
        ],
      },
    ],
  },
  {
    title: "Monitor multiparametro",
    url: "monitor",
    disponible: false,
    modules: [
      {
        title: "Módulo 1",
        classes: [
          {
            title: "Aula 1 - Introdução",
            resume: "Resumo da aula 1",
          },
          {
            title: "Aula 2 - Introdução",
            resume: "Resumo da aula 2",
          },
          {
            title: "Aula 3 - Introdução",
            resume: "Resumo da aula 3",
          },
        ],
      },
      {
        title: "Módulo 1",
        classes: [
          {
            title: "Aula 1 - Introdução",
            resume: "Resumo da aula 1",
          },
          {
            title: "Aula 2 - Introdução",
            resume: "Resumo da aula 2",
          },
          {
            title: "Aula 3 - Introdução",
            resume: "Resumo da aula 3",
          },
        ],
      },
    ],
  },
  {
    title: "Emergencias Cardiovasculares",
    url: "emergency",
    disponible: false,
    modules: [
      {
        title: "Módulo 1",
        classes: [
          {
            title: "Aula 1 - Introdução",
            resume: "Resumo da aula 1",
          },
          {
            title: "Aula 2 - Introdução",
            resume: "Resumo da aula 2",
          },
          {
            title: "Aula 3 - Introdução",
            resume: "Resumo da aula 3",
          },
        ],
      },
      {
        title: "Módulo 1",
        classes: [
          {
            title: "Aula 1 - Introdução",
            resume: "Resumo da aula 1",
          },
          {
            title: "Aula 2 - Introdução",
            resume: "Resumo da aula 2",
          },
          {
            title: "Aula 3 - Introdução",
            resume: "Resumo da aula 3",
          },
        ],
      },
    ],
  },
  {
    title: "Protocolos",
    url: "guidelines",
    disponible: false,
    modules: [
      {
        title: "Módulo 1",
        classes: [
          {
            title: "Aula 1 - Introdução",
            resume: "Resumo da aula 1",
          },
          {
            title: "Aula 2 - Introdução",
            resume: "Resumo da aula 2",
          },
          {
            title: "Aula 3 - Introdução",
            resume: "Resumo da aula 3",
          },
        ],
      },
      {
        title: "Módulo 1",
        classes: [
          {
            title: "Aula 1 - Introdução",
            resume: "Resumo da aula 1",
          },
          {
            title: "Aula 2 - Introdução",
            resume: "Resumo da aula 2",
          },
          {
            title: "Aula 3 - Introdução",
            resume: "Resumo da aula 3",
          },
        ],
      },
    ],
  },
];

function Base() {
  const [trails, setTrails] = useState(list);

  return (
    <div className="page-container">
      <h1 className="page-title">
        <i className="fi fi-rr-book-alt"></i> Central de Estudos
      </h1>
      <div className="trails">
        {trails.map((trail, index) => (
          <div className="trail">
            <span className="trail-index"># {index + 1}</span>
            <div className="trail-award">
              <span
                className={`trail-status trail-${
                  trail.disponible ? "disponible" : "indisponible"
                }`}
              >
                <i
                  className={`fi fi-bs-${
                    trail.disponible ? "lock-open-alt" : "unlock"
                  }`}
                ></i>
                {trail.disponible ? " Disponível" : " Indisponível"}
              </span>
              <button className="text-yellow btn-award">
                <i className={`fi fi-${true ? "rr" : "sr"}-star`}></i>
              </button>
            </div>
            <img src="/public/images/image.png" alt={trail.title} />
            <h5 className="trail-title">{trail.title}</h5>
            <span className="trail-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              culpa obcaecati hic commodi ducimus ratione at similique! Adipisci
              commodi repellendus voluptatem sint? Enim libero vero numquam
              alias quasi tempora temporibus!
            </span>
            <div className="trail-infos">
              <div>
                <i className="fi fi-sr-module"></i>{" "}
                {trail.modules.reduce((cont, index) => cont + 1, 0)} módulos
              </div>
              <div>
                <i className="fi fi-rr-lesson"></i>{" "}
                {trail.modules.reduce(
                  (cont, index) => cont + index.classes.length,
                  0
                )}{" "}
                aulas
              </div>
              <div>
                <i className="fi fi-rr-workshop"></i> 10 alunos
              </div>
              <div>
                <i className="fi fi-rr-badget-check-alt"></i> 8.9/10
              </div>
            </div>
            <div className="trail-progress">
              <div className="progress-trail">100%</div>
            </div>
            <div className="trail-configs">
              <Link className="btn trail-link" to={`/trail/${trail.url}`}>
                Acessar <i className="fi fi-sr-angle-double-small-right"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .trails {
          display: flex;
          align-items: stretch;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          padding: 10px;
        }

        .trail {
          width: 23%;
          height: 100%;
          margin: 0.5%;
          padding: 10px;
          text-decoration: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          border: 1px solid var(--text-color);
          background-color: var(--color-3);
        }

        .trail-index {
          padding: 10px;
          border-radius: 6px;
          background-color: #333;
          color: white;
          display: flex;
          width: fit-content;
          transform: translate(-26px, -20px);
        }

        .trail:hover {
          transform: scale(1.1);
          transition: 0.8s;
          filter: drop-shadow(0 0 4px #ccc);
        }

        .trail-status {
          padding: 6px 10px;
          border-radius: 6px;
          color: white;
          font-weight: 600;
          margin: 5px 0;
          font-size: small;
        }
        
        .trail-disponible {
          background-color: green;
        }

        .trail-indisponible {
          background-color: red;
        }

        .trail img {
          width: 100%;
          margin-top: 10px;
          margin-bottom: 10px;
        }

        .trail-title {
        
        }

        .trail-description {
          font-size: small;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 8px;
        }

        .trail-infos {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: center;
        }

        .trail-infos div {
          width: 48%;
          margin: 5px 0.5%;
          padding: 6px;
          border-radius: 20px;
          color: white;
          font-weight: 600;
          text-align: center;
          font-size: small;
        }

        .trail-infos div:nth-child(1){
          background-color: #43874d;
        }
        .trail-infos div:nth-child(2){
          background-color: #3b3c72;
        }
        .trail-infos div:nth-child(3){
          background-color: #025e73;
        }
        .trail-infos div:nth-child(4){
          background-color: #ff0090;
        }
        
        .trail-progress {
          width: 100%;
          border-radius: 20px;
          background-color: #ccc;
        }
        
        .progress-trail {
          height: fit-content;
          border-radius: 20px;
          background-color: green;
          color: white;
          font-weigth: 600;
          font-size: xx-small;
          text-align: right;
          padding: 2px;
        }

        .trail-link {
          text-decoration: none;
          margin-top: 6px;
          width: 100%;
        }

        .trail-link,
        .trail-award {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .text-yellow {
          color: yellow;
        }

        .btn-award,
        .btn-award:hover {
          border: none;
          background-color: transparent;
          outline: none;
          font-size: large;
        }

      `}</style>
    </div>
  );
}

export default Base;
