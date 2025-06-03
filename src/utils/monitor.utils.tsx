import { canvasText, canvasClear } from "./canvas.utils";

export interface TextItem {
  text: string;
  x: number;
  y: number;
  size: number;
  color: string;
}

export interface ParameterItem {
  value: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export interface Derivation {
  text: string;
  x: number;
  y: number;
  size: number;
  color: string;
}

export interface MonitorText {
  derivation: Derivation | null;
  texts: TextItem[];
  parameters: ParameterItem[] | {};
}

export interface MonitorTexts {
  ecg1: MonitorText;
  ecg2: MonitorText;
  pleth: MonitorText;
  resp: MonitorText;
}

export function monitorStaticTextWrite(
  canvas: React.RefObject<HTMLCanvasElement | null>,
  type: "pleth" | "resp" | "ecg1" | "ecg2",
  monitorTexts: MonitorText
) {
  if (!canvas.current) {
    console.log("Canvas indisponível");
    return;
  }

  const ctx = canvas.current.getContext("2d");

  if (!ctx) {
    console.log("CTX indisponível");
    return;
  }

  const width: number = canvas.current.offsetWidth,
    height: number = canvas.current.offsetHeight;

  canvas.current.width = width;
  canvas.current.height = height;

  canvasClear(ctx, width, height, width, height);

  const texts = monitorTexts.texts;
  const derivation = monitorTexts.derivation;
  const parameters = monitorTexts.parameters;

  texts.forEach((text) => {
    let x = text.x <= 0 ? width - text.x * -1 : text.x,
      y = text.y <= 0 ? height - text.y * -1 : text.y;

    canvasText(ctx, text.text, x, y, text.size, text.color);
  });

  if (derivation && typeof derivation === "object") {
    let x = derivation.x <= 0 ? width - derivation.x * -1 : derivation.x,
      y = derivation.y <= 0 ? height - derivation.y * -1 : derivation.y;

    canvasText(ctx, derivation.text, x, y, derivation.size, derivation.color);
  }

  if (parameters && typeof parameters === "object") {
    Object.keys(parameters).forEach((key) => {
      const parameter: ParameterItem =
        parameters[key as keyof typeof parameters];

      if (parameter && parameter.value !== undefined) {
        let x = parameter.x <= 0 ? width - parameter.x * -1 : parameter.x,
          y = parameter.y <= 0 ? height - parameter.y * -1 : parameter.y;

        if (type === "ecg2") {
          if (key === "p1") y = height / 2 - parameter.y * -1;
          if (key === "p2") y = height / 2 + parameter.y;
        }

        canvasText(
          ctx,
          String(parameter.value),
          x,
          y,
          parameter.size,
          parameter.color
        );
      }
    });
  }
};

export const initialMonitorTexts: MonitorTexts = {
  ecg1: {
    derivation: {
      text: "DII",
      x: 8,
      y: 10,
      size: 12,
      color: "#0afa0e",
    },
    texts: [
      { text: "ECG", x: -40, y: 10, size: 12, color: "#0afa0e" },
      { text: "bpm", x: -40, y: 20, size: 10, color: "#0afa0e" },
    ],
    parameters: {},
  },
  ecg2: {
    derivation: {
      text: "DV",
      x: 8,
      y: 10,
      size: 12,
      color: "#0afa0e",
    },
    texts: [],
    parameters: {
      p1: { value: 105, x: -40, y: -8, size: 12, color: "#0afa0e" },
      p2: { value: 80, x: -40, y: 8, size: 10, color: "#0afa0e" },
    },
  },
  pleth: {
    derivation: null,
    texts: [
      { text: "Pleth", x: 8, y: 10, size: 12, color: "#13fbff" },
      { text: "SpO₂", x: -40, y: 10, size: 12, color: "#13fbff" },
      { text: "%", x: -40, y: 20, size: 10, color: "#13fbff" },
    ],
    parameters: {
      p1: { value: 100, x: -40, y: -15, size: 10, color: "#13fbff" },
      p2: { value: 90, x: -40, y: -5, size: 10, color: "#13fbff" },
    },
  },
  resp: {
    derivation: null,
    texts: [
      { text: "Resp", x: 8, y: 20, size: 12, color: "#fffd13" },
      { text: "Resp", x: -40, y: 20, size: 10, color: "#fffd13" },
      { text: "rpm", x: -40, y: 30, size: 10, color: "#fffd13" },
    ],
    parameters: {
      p1: { value: 30, x: -40, y: -15, size: 10, color: "#fffd13" },
      p2: { value: 8, x: -40, y: -5, size: 10, color: "#fffd13" },
    },
  },
};
