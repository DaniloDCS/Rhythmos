function Crossword() {
  return (
    <h1 className="page-title">
      <i className="fi fi-sr-user-nurse"></i> Palavras-cruzadas
    </h1>
  );
}

export default Crossword;


/*

<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Título da página</title>
    <style>
        input {
            width: 30px;
            height: 30px;
        }
    </style>
</head>
<body>
    <script>
        
        
        
  const letrasLinha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let grade = {};
let ocupadas = {};
let minX = 0, maxX = 0, minY = 0, maxY = 0;


const palavras = [
    { pergunta: "Planeta vermelho", resposta: "MARTE" },
    { pergunta: "Maior oceano", resposta: "PACIFICO" },
    { pergunta: "Metal líquido", resposta: "MERCURIO" },
    { pergunta: "Sistema de escrita japonesa", resposta: "HIRAGANA" },
];


// Adiciona uma letra na grade e ajusta os limites da matriz
function adicionarLetra(x, y, letra) {
    const posicao = `${x},${y}`;
    grade[posicao] = letra;
    ocupadas[posicao] = letra;


    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
}


// Posiciona a palavra inicial no centro
function posicionarPalavraInicial() {
    const palavra = palavras[Math.floor(Math.random() * palavras.length)].resposta;
    const direcao = Math.random() < 0.5 ? "H" : "V";
    const inicioX = 0, inicioY = 0;


    for (let i = 0; i < palavra.length; i++) {
        let x = direcao === "H" ? inicioX + i : inicioX;
        let y = direcao === "V" ? inicioY + i : inicioY;
        adicionarLetra(x, y, palavra[i]);
    }


    console.log("Palavra inicial:", palavra);
    return palavra;
}


// Verifica se a palavra pode ser colocada
function podeColocarPalavra(palavra, x, y, direcao) {
    for (let i = 0; i < palavra.length; i++) {
        let nx = direcao === "H" ? x + i : x;
        let ny = direcao === "V" ? y + i : y;
        let pos = `${nx},${ny}`;


        if (ocupadas[pos] && ocupadas[pos] !== palavra[i]) return false;
    }
    return true;
}


// Posiciona a palavra na grade
function colocarPalavra(palavra, x, y, direcao) {
    for (let i = 0; i < palavra.length; i++) {
        let nx = direcao === "H" ? x + i : x;
        let ny = direcao === "V" ? y + i : y;
        adicionarLetra(nx, ny, palavra[i]);
    }
}


// Tenta encaixar palavras aproveitando letras existentes
function encontrarPosicaoParaPalavra(palavra) {
    let tentativas = 0;
    while (tentativas < 100) {
        let [ex, ey] = Object.keys(ocupadas)[Math.floor(Math.random() * Object.keys(ocupadas).length)].split(",").map(Number);
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
    console.log(`Não foi possível encaixar "${palavra}", tentando outra posição.`);
}


// Posiciona todas as palavras
function posicionarPalavras() {
    palavras.sort(() => Math.random() - 0.5);
    for (let i = 0; i < palavras.length; i++) {
        encontrarPosicaoParaPalavra(palavras[i].resposta);
    }
}


// Cria a tabela HTML baseada nas posições ocupadas
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
            input.value = grade[posicao] || "";


            if (grade[posicao]) input.disabled = true;


            celula.appendChild(input);
            linha.appendChild(celula);
        }
        tabela.appendChild(linha);
    }
    document.body.appendChild(tabela);
}


posicionarPalavraInicial();
posicionarPalavras();
criarTabelaHTML();
       
       
     
    </script>
</body>
</html>


*/









/*

extends ../layout
block content


  script(src="/public/js/questions.js") 


  style.
    
    input {
      width: 30px;
      height: 30px;
    }


    .word-space {
      text-align: center;
      border: 2px solid black;
      color: blue;
      text-transform: uppercase;
      font-weight: bold;
      border-radius: 4px;
      outline-color: blue;
    }


    html, body {
      width: 100%;
      height: 100%;
    }


    #content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }


    .highlight {
      background: red;
    }


  #content


  script.
    const rowLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let grid = {};
    let occupied = {};
    let minX = 0, maxX = 0, minY = 0, maxY = 0;
    let wordNumbers = []; // Stores {x, y, number}


    function addLetter(x, y, letter) {
      const position = `${x},${y}`;
      grid[position] = letter;
      occupied[position] = letter;


      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }


    function placeInitialWord() {
      const word = questionsECG[Math.floor(Math.random() * questionsECG.length)].answer;
      const direction = Math.random() < 0.5 ? "H" : "V";
      const startX = 0, startY = 0;


      for (let i = 0; i < word.length; i++) {
        const x = direction === "H" ? startX + i : startX;
        const y = direction === "V" ? startY + i : startY;
        addLetter(x, y, word[i]);
      }


      return word;
    }


    function canPlaceWord(word, x, y, direction) {
      for (let i = 0; i < word.length; i++) {
        const nx = direction === "H" ? x + i : x;
        const ny = direction === "V" ? y + i : y;
        const pos = `${nx},${ny}`;
        if (occupied[pos] && occupied[pos] !== word[i]) return false;
      }
      return true;
    }


    function placeWord(word, x, y, direction, number) {
      for (let i = 0; i < word.length; i++) {
        const nx = direction === "H" ? x + i : x;
        const ny = direction === "V" ? y + i : y;
        addLetter(nx, ny, word[i]);
        wordNumbers.push({ x: nx, y: ny, number });
      }
    }


    function findPositionForWord(word, number) {
      let attempts = 0;
      while (attempts < 100) {
        const keys = Object.keys(occupied);
        if (keys.length === 0) return;


        const [ex, ey] = keys[Math.floor(Math.random() * keys.length)].split(",").map(Number);
        const direction = Math.random() < 0.5 ? "H" : "V";
        const offset = Math.floor(Math.random() * word.length);
        const x = direction === "H" ? ex - offset : ex;
        const y = direction === "V" ? ey - offset : ey;


        if (canPlaceWord(word, x, y, direction)) {
          placeWord(word, x, y, direction, number);
          return;
        }
        attempts++;
      }
    }


    function placeAllWords() {
      questionsECG.sort(() => Math.random() - 0.5);
      const sentencesDiv = document.createElement("div");


      for (let i = 0; i < questionsECG.length; i++) {
        findPositionForWord(questionsECG[i].answer, i + 1);
        const sentence = document.createElement("div");
        sentence.innerText = `${i + 1} - ${questionsECG[i].question}`;
        sentence.id = "sentence" + (i + 1);
        sentence.className = "sentence";
        sentencesDiv.appendChild(sentence);
      }


      document.querySelector("#content").appendChild(sentencesDiv);
    }


    function createHTMLTable() {
      const table = document.createElement("table");


      for (let y = minY; y <= maxY; y++) {
        const row = document.createElement("tr");
        let fisrt = true;


        for (let x = minX; x <= maxX; x++) {
          const position = `${x},${y}`;
          const cell = document.createElement("td");
          cell.style.position = "relative";


          const input = document.createElement("input");
          input.type = "text";
          input.maxLength = 1;
          input.dataset.position = position;


          if (!grid[position]) {
            input.disabled = true;
            input.style.border = "none";
            input.style.background = "transparent";
          } else {
            input.className = "word-space";
          }


          const number = wordNumbers.find(p => p.x === x && p.y === y)?.number;
          if (number) {
            const numberLabel = document.createElement("span");
            numberLabel.textContent = number;
            numberLabel.style.position = "absolute";
            numberLabel.style.fontSize = "10px";
            numberLabel.style.top = "4px";
            numberLabel.style.left = "6px";
            numberLabel.style.color = "black";
            numberLabel.style.fontWeight = "bold";
            cell.appendChild(numberLabel);
            fisrt = false;
          }
          
          cell.addEventListener("click", () => highlightSentence("sentence" + number));


          input.addEventListener("input", function () {
            if (this.value.length > 1) this.value = this.value.charAt(0);
            const inputs = Array.from(document.querySelectorAll("input.word-space"));


            const index = inputs.indexOf(this);
            if (index !== -1 && index < inputs.lengh - 1){
              inputs[index + 1].focus();
            }
          });
        
    


          input.addEventListener("click", () => {
            if (number) highlightSentence("sentence" + number);
          });


          cell.appendChild(input);
          row.appendChild(cell);
        }


        table.appendChild(row);
      }


      document.querySelector("#content").appendChild(table);
    }


    function highlightSentence(id) {
      document.querySelectorAll(".sentence").forEach(e => {
        e.classList.toggle("highlight", e.id === id);
      });
    }


    placeInitialWord();
    placeAllWords();
    createHTMLTable();










  //-
    script.
      const letrasLinha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      let grade = {};
      let ocupadas = {};
      let minX = 0, maxX = 0, minY = 0, maxY = 0;
      let numerosPalavras = []; // Armazena {x, y, numero}


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
        const palavra = questionsECG[Math.floor(Math.random() * questionsECG.length)].answer;
        const direcao = Math.random() < 0.5 ? "H" : "V";
        const inicioX = 0, inicioY = 0;


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
          if (ocupadas[pos] && ocupadas[pos] !== palavra[i]) return false;
        }


        return true;
      }


      function colocarPalavra(palavra, x, y, direcao, numero) {
        numerosPalavras.push({ x, y, numero });
        for (let i = 0; i < palavra.length; i++) {
          let nx = direcao === "H" ? x + i : x;
          let ny = direcao === "V" ? y + i : y;
          adicionarLetra(nx, ny, palavra[i]);
        }
      }


      function encontrarPosicaoParaPalavra(palavra, numero) {
        let tentativas = 0;
        while (tentativas < 100) {
          let chaves = Object.keys(ocupadas);
          if (chaves.length === 0) return;


          let [ex, ey] = chaves[Math.floor(Math.random() * chaves.length)].split(",").map(Number);
          let direcao = Math.random() < 0.5 ? "H" : "V";
          let offset = Math.floor(Math.random() * palavra.length);
          let x = direcao === "H" ? ex - offset : ex;
          let y = direcao === "V" ? ey - offset : ey;


          if (podeColocarPalavra(palavra, x, y, direcao)) {
            colocarPalavra(palavra, x, y, direcao, numero);
            return;
          }


          tentativas++;
        }
      }


      function posicionarPalavras() {
        questionsECG.sort(() => Math.random() - 0.5);
        let sentences = document.createElement("div");


        for (let i = 0; i < questionsECG.length; i++) {
          encontrarPosicaoParaPalavra(questionsECG[i].answer, i + 1);
          let sentence = document.createElement("div");
          sentence.innerText = `${i + 1} - ${questionsECG[i].question}`;
          sentence.id = "sentence" + (i + 1);
          sentence.className = "sentence";
          sentences.appendChild(sentence);
        }


        document.querySelector("#content").appendChild(sentences);
      }


      function criarTabelaHTML() {
        const tabela = document.createElement("table");


        for (let y = minY; y <= maxY; y++) {
          const linha = document.createElement("tr");


          for (let x = minX; x <= maxX; x++) {
            const posicao = `${x},${y}`;
            const celula = document.createElement("td");
            celula.style.position = "relative";


            const input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1;
            input.dataset.posicao = posicao;


            if (!grade[posicao]) {
              input.disabled = true;
              input.style.border = "none";
              input.style.background = "transparent";
            } else {
              input.className = "word-space";
            }


            // Verificar se é a primeira célula da palavra para mostrar o número
            const numero = numerosPalavras.find(p => p.x === x && p.y === y)?.numero;
            const palavraPos = numerosPalavras.find(p => p.x === x && p.y === y);
            const isFirstCell = palavraPos && (palavraPos.x === x && palavraPos.y === y);
      
            if (isFirstCell && numero) {
              const numeroLabel = document.createElement("span");
              numeroLabel.textContent = numero;
              numeroLabel.style.position = "absolute";
              numeroLabel.style.fontSize = "10px";
              numeroLabel.style.top = "4px";
              numeroLabel.style.left = "6px";
              numeroLabel.style.color = "black";
              numeroLabel.style.fontWeight = "bold";
              celula.appendChild(numeroLabel);
            }


            // Adicionar evento de input para navegação
            input.addEventListener("input", function () {
            if (this.value.length > 1) this.value = this.value.charAt(0);
              // Encontrar todos os inputs habilitados
              const inputs = Array.from(document.querySelectorAll("input.word-space"));
              const index = inputs.indexOf(this);


              if (index !== -1) {
                let nextInput;
          
                // Verificar se é horizontal ou vertical e ir para o próximo
                if (palavraPos && palavraPos.x === x) {  // Direção Vertical
                nextInput = inputs.find(i => i.dataset.posicao === `${x},${y + 1}`);
              } else {  // Direção Horizontal
                nextInput = inputs.find(i => i.dataset.posicao === `${x + 1},${y}`);
              }


              if (nextInput) nextInput.focus();
            }
          });
          celula.appendChild(input);
          linha.appendChild(celula);
        }
        tabela.appendChild(linha);
      }
      document.querySelector("#content").appendChild(tabela);
    }


      function sentenceDestaque(id) {
        document.querySelectorAll(".sentence").forEach(e => {
          if (e.id === id) e.classList.add("destaque");
          else e.classList.remove("destaque");
        });
      }


      posicionarPalavraInicial();
      posicionarPalavras();
      criarTabelaHTML();



*/
