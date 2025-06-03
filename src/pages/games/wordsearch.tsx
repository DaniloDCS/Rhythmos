function Wordsearch () {
  return (
    <h1 className="page-title">
      <i className="fi fi-sr-user-nurse"></i> Caça-palavras
    </h1>
  );
}

export default Wordsearch;

/*

extends ../layout
block content


  style.  
    body {
      font-family: "Arial", sans-serif;
      background-color: #f4f4f9;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }


    header {
        background-color: #6c63ff;
        color: white;
        padding: 20px;
        width: 100%;
        text-align: center;
        font-size: 1.5rem;
        font-weight: bold;
    }


    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        margin: 20px;
        width: 80%;
    }


    .perguntas {
        list-style-type: none;
        padding: 0;
        margin: 0;
        width: 100%;
        text-align: left;
        font-size: 1.2rem;
    }


    .perguntas li {
        padding: 5px;
        margin: 5px 0;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }


    .perguntas li:hover {
        background-color: #dcdcff;
    }


    .highlight {
        background-color: #ffcc00;
        font-weight: bold;
    }


    .word-space {
        text-align: center;
        border: 2px solid black;
        color: blue;
        text-transform: uppercase;
        font-weight: bold;
        border-radius: 4px;
        outline-color: blue;
        width: 40px;
        height: 40px;
        margin: 2px;
    }


    table {
        border-spacing: 0;
        border-collapse: collapse;
        margin-top: 20px;
    }


    table td {
        padding: 0;
        text-align: center;
    }


    input[type="text"] {
        width: 40px;
        height: 40px;
        font-size: 20px;
        text-align: center;
        border: 2px solid #ccc;
        border-radius: 4px;
        outline: none;
        transition: background-color 0.3s;
    }


    input:disabled {
        background-color: transparent;
        border: none;
    }


    input.correct {
        background-color: #4caf50;
        color: white;
    }


    input.incorrect {
        background-color: #f44336;
        color: white;
    }


    .footer {
        margin-top: 30px;
        color: #666;
        font-size: 0.8rem;
        text-align: center;
    }
  
  h1 Caça-palavras - Desafio de Conhecimento
  .container
    div
      h3 Responda as perguntas:
      ul#perguntas.perguntas


    #tabela-container


  script.
    const letrasLinha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let grade = {};
    let ocupadas = {};
    let minX = 0,
        maxX = 0,
        minY = 0,
        maxY = 0;


    const palavras = [
        { pergunta: "Planeta vermelho", resposta: "MARTE" },
        { pergunta: "Maior oceano", resposta: "PACIFICO" },
        { pergunta: "Metal líquido", resposta: "MERCURIO" },
        {
            pergunta: "Sistema de escrita japonesa",
            resposta: "HIRAGANA"
        }
    ];


    function adicionarLetra(x, y, letra) {
        const posicao = `${x},${y}`;
        grade[posicao] = letra;
        ocupadas[posicao] = letra;


        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
    }


    function posicionarPalavraInicial() {
        const palavra =
            palavras[Math.floor(Math.random() * palavras.length)]
                .resposta;
        const direcao = Math.random() < 0.5 ? "H" : "V";
        const inicioX = 0,
            inicioY = 0;


        for (let i = 0; i < palavra.length; i++) {
            let x = direcao === "H" ? inicioX + i : inicioX;
            let y = direcao === "V" ? inicioY + i : inicioY;
            adicionarLetra(x, y, palavra[i]);
        }


        return palavra;
    }


    function podeColocarPalavra(palavra, x, y, direcao) {
        for (let i = 0; i < palavra.length; i++) {
            let nx = direcao === "H" ? x + i : x;
            let ny = direcao === "V" ? y + i : y;
            let pos = `${nx},${ny}`;


            if (ocupadas[pos] && ocupadas[pos] !== palavra[i])
                return false;
        }
        return true;
    }


    function colocarPalavra(palavra, x, y, direcao) {
        for (let i = 0; i < palavra.length; i++) {
            let nx = direcao === "H" ? x + i : x;
            let ny = direcao === "V" ? y + i : y;
            adicionarLetra(nx, ny, palavra[i]);
        }
    }


    function encontrarPosicaoParaPalavra(palavra) {
        let tentativas = 0;
        while (tentativas < 100) {
            let [ex, ey] = Object.keys(ocupadas)
                [
                    Math.floor(
                        Math.random() * Object.keys(ocupadas).length
                    )
                ].split(",")
                .map(Number);
            let direcao = Math.random() < 0.5 ? "H" : "V";
            let offset = Math.floor(Math.random() * palavra.length);
            let x = direcao === "H" ? ex - offset : ex;
            let y = direcao === "V" ? ey - offset : ey;


            if (podeColocarPalavra(palavra, x, y, direcao)) {
                colocarPalavra(palavra, x, y, direcao);
                return;
            }
            tentativas++;
        }
    }


    function posicionarPalavras() {
        palavras.sort(() => Math.random() - 0.5);
        for (let i = 0; i < palavras.length; i++) {
            encontrarPosicaoParaPalavra(palavras[i].resposta);
        }
    }


    function criarTabelaHTML() {
        const tabela = document.createElement("table");


        for (let y = minY; y <= maxY; y++) {
            const linha = document.createElement("tr");


            for (let x = minX; x <= maxX; x++) {
                const posicao = `${x},${y}`;
                const celula = document.createElement("td");
                const input = document.createElement("input");


                input.type = "text";
                input.maxLength = 1;
                input.dataset.posicao = posicao;


                if (grade[posicao]) {
                    input.className = "word-space";
                    input.dataset.word = grade[posicao];
                    input.value = grade[posicao];
                } else {
                    input.disabled = true;
                    input.style.border = "none";
                    input.style.background = "transparent";
                }


                input.addEventListener("input", function () {
                    this.value = this.value.toUpperCase();
                    verificarPalavra();


                    if (this.value.length === 1) {
                        const [x, y] = this.dataset.posicao
                            .split(",")
                            .map(Number);
                        const palavraAssociada = grade[`${x},${y}`];


                        if (palavraAssociada) {
                            const palavra = palavras.find(p =>
                                p.resposta.includes(palavraAssociada)
                            );
                            destacarPergunta(palavra.resposta); // Destacar a pergunta correspondente
                        }


                        let direcao;
                        const nextInput = document.querySelector(
                            `input[data-posicao="${
                                direcao === "H" ? x + 1 : x
                            },${direcao === "V" ? y + 1 : y}"]`
                        );
                        if (nextInput) nextInput.focus();
                    }
                });
                celula.appendChild(input);
                linha.appendChild(celula);
            }


            tabela.appendChild(linha);
        }


        document.getElementById("tabela-container").appendChild(tabela);
    }


    function verificarPalavra() {
        palavras.forEach(item => {
            const inputsDaPalavra = Array.from(
                document.querySelectorAll(
                    `input[data-word="${item.resposta}"]`
                )
            );


            const palavraDigitada = inputsDaPalavra
                .map(input => input.value)
                .join("");


            if (palavraDigitada.length === item.resposta.length) {
                if (palavraDigitada === item.resposta) {
                    inputsDaPalavra.forEach(input => {
                        input.classList.add("correct");
                        input.disabled = true;
                    });
                } else {
                    inputsDaPalavra.forEach(input => {
                        input.classList.add("incorrect");
                    });
                }
            }
        });
    }


    function atualizarPerguntasDestaque() {
        const perguntaList = document.getElementById("perguntas");
        perguntaList.innerHTML = "";
        palavras.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.pergunta;
            li.dataset.word = item.resposta;
            li.onclick = function () {
                destacarPergunta(item.resposta);
            };
            perguntaList.appendChild(li);
        });
    }


    function destacarPergunta(palavra) {
        document.querySelectorAll("#perguntas li").forEach(li => {
            if (li.dataset.word === palavra) {
                li.classList.add("highlight");
            } else {
                li.classList.remove("highlight");
            }
        });
    }


    posicionarPalavraInicial();
    posicionarPalavras();
    criarTabelaHTML();
    atualizarPerguntasDestaque();
  



*/