import { useEffect, useRef, useState } from "react";
import Trails from "./trails";

function toMarkdown(text: string): string {
  const result = document.createElement("div");
  const rows = text.split("\n");

  let inTable = false;
  let table: HTMLTableElement | null = null;
  let tbody: HTMLTableSectionElement | null = null;

  // Função para formatar negrito, itálico e código inline
  function formatInline(text: string): string {
    return text
      .replace(/`([^`]+?)`/g, "<code>$1</code>") // código inline
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") // negrito
      .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>") // itálico (evita conflito com negrito)
      .replace(/__([^_]+?)__/g, "<u>$1</u>") // sublinhado
      .replace(/~~(.+?)~~/g, "<s>$1</s>") // traçado
      .replace(/\^(.+?)\^/g, "<sup>$1</sup>") // superscrito
      .replace(/~(.+?)~/g, "<sub>$1</sub>"); // subscrito
  }

  rows.forEach((row) => {
    const trimmed = row.trim();

    // Ignora linha vazia
    if (!trimmed) {
      if (inTable) {
        inTable = false;
        table = null;
        tbody = null;
      }
      return;
    }

    // Imagem: ![alt](url)
    if (/\!\[.*\]\(.*\)/.test(trimmed)) {
      const match = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
      if (match) {
        const img = document.createElement("img");
        img.alt = match[1];
        img.src = match[2];
        result.appendChild(img);
        return;
      }
    }

    // Link: [text](url)
    if (/^\[.*\]\(.*\)$/.test(trimmed)) {
      const match = trimmed.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        const a = document.createElement("a");
        a.href = match[2];
        a.innerHTML = formatInline(match[1]);
        result.appendChild(a);
        return;
      }
    }

    // Títulos: #, ##, ###, etc.
    const headerMatch = trimmed.match(/^(#{1,6})\s+(.*)/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const content = headerMatch[2];
      const heading = document.createElement(`h${level}`);
      heading.innerHTML = formatInline(content);
      result.appendChild(heading);
      return;
    }

    // Lista: - ou *
    if (/^[-*]\s+/.test(trimmed)) {
      const li = document.createElement("li");
      li.innerHTML = formatInline(trimmed.slice(2));

      // Se não houver UL anterior, cria
      let ul = result.lastElementChild;
      if (!ul || ul.tagName !== "UL") {
        ul = document.createElement("ul");
        result.appendChild(ul);
      }

      ul.appendChild(li);
      return;
    }

    // Tabela: linha com "|"
    if (trimmed.includes("|")) {
      const cells = trimmed
        .split("|")
        .map((cell) => cell.trim())
        .filter(Boolean);

      // Linha separadora (|---|---|), ignora
      if (/^\|?\s*-+\s*\|/.test(trimmed)) return;

      if (!inTable) {
        table = document.createElement("table");
        tbody = document.createElement("tbody");
        table.appendChild(tbody);
        result.appendChild(table);
        inTable = true;
      }

      const row = document.createElement("tr");
      cells.forEach((cellText) => {
        const cell = document.createElement("td");
        cell.innerHTML = formatInline(cellText);
        row.appendChild(cell);
      });
      tbody?.appendChild(row);
      return;
    }

    // Bloco de citação: > texto
    if (/^>\s+/.test(trimmed)) {
      const blockquote = document.createElement("blockquote");
      blockquote.innerHTML = formatInline(trimmed.slice(2));
      result.appendChild(blockquote);
      return;
    }

    // Parágrafo padrão
    const p = document.createElement("p");
    p.innerHTML = formatInline(trimmed);
    result.appendChild(p);
  });

  return result.innerHTML;
}

const highlightMarkdown = (text: string): string => {
  // Escapa HTML
  text = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Título
  text = text.replace(/^# (.+)$/gm, `<span class="title"># $1</span>`);

  // Negrito
  text = text.replace(/\*\*(.+?)\*\*/g, `<span class="bold">**$1**</span>`);

  // Itálico (com lookahead/lookbehind para evitar conflito com negrito)
  text = text.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, `<span class="italic">*$1*</span>`);

  // Sublinhado
  text = text.replace(/__([^_]+?)__/g, `<span class="underline">__$1__</span>`);

  // Traçado
  text = text.replace(/~~(.+?)~~/g, `<span class="strikethrough">~~$1~~</span>`);

  // Superscrito
  text = text.replace(/\^(.+?)\^/g, `<span class="sup">^$1^</span>`);

  // Subscrito
  text = text.replace(/~(.+?)~/g, `<span class="sub">~$1~</span>`);

  // Código inline
  text = text.replace(/`([^`]+)`/g, `<span class="inline-code">\`$1\`</span>`);

  // Lista não ordenada
  text = text.replace(/^[-*] (.+)$/gm, `<span class="list">- $1</span>`);

  // Lista ordenada
  text = text.replace(/^\d+\. (.+)$/gm, `<span class="list">• $1</span>`);

  // Link
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<span class="link">[$1]($2)</span>`);

  // Imagem
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, `<span class="image">![$1]($2)</span>`);

  // Citação
  text = text.replace(/^> (.+)$/gm, `<span class="quote">&gt; $1</span>`);

  // Tabela
  text = text.replace(/^\|(.+)\|$/gm, `<span class="table">|$1|</span>`);

  return text;
};

const saveCaretPosition = (el: HTMLElement) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(el);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  const caretOffset = preCaretRange.toString().length;

  return caretOffset;
};

const restoreCaretPosition = (el: HTMLElement, offset: number) => {
  const selection = window.getSelection();
  if (!selection) return;

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
  let currentOffset = 0;
  let node: Text | null = null;
  let found = false;

  while ((node = walker.nextNode() as Text | null)) {
    const length = node.textContent?.length ?? 0;
    if (currentOffset + length >= offset) {
      const range = document.createRange();
      const localOffset = offset - currentOffset;
      range.setStart(node, localOffset);
      range.setEnd(node, localOffset);
      selection.removeAllRanges();
      selection.addRange(range);
      found = true;
      break;
    }
    currentOffset += length;
  }

  if (!found) {
    // Fallback: coloca o cursor no final
    el.focus();
  }
};

function Anathomy() {
  const markText = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<string>(`# Título principal

Este é um **texto em negrito** e este é um *texto em itálico*.

- Item 1
- Item 2 com \`código inline\`

1. Aaaaa
2. Aaaaa

[Link para o Google](https://google.com)

![Imagem de exemplo](https://example.com/image.png)

| Nome | Idade |
|------|-------|
| Ana  | 30    |
| João | 25    |

> Isso é um bloco de citação.`);

  const markView = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = markText.current;
    if (editor) {
      editor.innerHTML = highlightMarkdown(content);
    }
  }, [content]);

  const handleInput = () => {
    const coder = markText.current;
    const view = markView.current;
    if (!coder || !view) return;

    const caretPos = saveCaretPosition(coder); // salvar posição
    const updated = toMarkdown(coder.innerText);
    view.innerHTML = updated; // modificar DOM

    // restaurar posição
    if (caretPos !== null) {
      restoreCaretPosition(coder, caretPos);
    }

    setContent(coder.innerText); // atualizar estado (opcional)
  };


  return (
    <div>
      <Trails />
      <h1>Anatomia</h1>
      <div
        className="editor"
        ref={markText}
        onInput={handleInput}
        contentEditable
        suppressContentEditableWarning
      >
        {content}
      </div>
      <div ref={markView}></div>
      <style>{`
        .editor {
          border: 1px solid #ccc;
          padding: 1rem;
          min-height: 300px;
          white-space: pre-wrap;
          outline: none;
          font-family: sans-serif;
        }
        .editor .title { font-weight: bold; color: #6610f2; font-size: 1.5rem; }
        .editor .bold { font-weight: bold; color: #d63384; }
        .editor .italic { font-style: italic; color: #fd7e14; }
        .editor .inline-code {
          background: #f0f0f0;
          font-family: monospace;
          padding: 0 4px;
          border-radius: 4px;
          color: #0d6efd;
        }
        .editor .link { color: #0d6efd; text-decoration: underline; }
        .editor .image { color: #20c997; }
        .editor .list { color: #6f42c1; }
        .editor .quote { color: #198754; font-style: italic; }
        .editor .table { color: #adb5bd; font-family: monospace; }
      `}</style>
    </div>
  );
}

export default Anathomy;
