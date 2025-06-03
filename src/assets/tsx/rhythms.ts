export const sentencesECG: string[]  = [
    "O ECG registra a atividade elétrica do coração.",
    "Cada batimento cardíaco gera um padrão elétrico detectável.",
    "A onda P representa a despolarização atrial.",
    "O complexo QRS indica a despolarização ventricular.",
    "A onda T reflete a repolarização dos ventrículos.",
    "O ECG é essencial para diagnosticar arritmias.",
    "Eletrodos são colocados no tórax e membros para captar os sinais.",
    "A frequência cardíaca pode ser calculada pelo ECG.",
    "Alterações no segmento ST podem indicar infarto.",
    "Um ECG normal tem ritmo regular e ondas bem definidas."
];

export interface ECGQuestion {
  question: string;
  answer: string;
}

export const questionsECG: ECGQuestion[] = [
    {
        question: "O que o eletrocardiograma (ECG) registra no coração?",
        answer: "ELETRICIDADE ⚡"
    },
    {
        question: "Qual onda do ECG indica a despolarização dos átrios?",
        answer: "ONDA-P"
    },
    {
        question:
            "Qual parte do ECG representa a despolarização dos ventrículos?",
        answer: "COMPLEXO-QRS"
    },
    {
        question: "Qual onda do ECG indica a repolarização ventricular?",
        answer: "ONDA-T"
    },
    {
        question:
            "Como é chamada a alteração na frequência ou regularidade dos batimentos cardíacos identificada no ECG?",
        answer: "ARRITMIA"
    },
    {
        question:
            "Qual equipamento utiliza eletrodos para captar sinais elétricos do coração?",
        answer: "ELETROCARDIÓGRAFO"
    },
    {
        question:
            "Em qual região do corpo os eletrodos são geralmente colocados?",
        answer: "TÓRAX 🦴"
    },
    {
        question: "Qual condição pode provocar alterações no segmento ST?",
        answer: "INFARTO ❤️‍🩹"
    },
    {
        question: "Qual órgão é avaliado por meio do ECG?",
        answer: "CORAÇÃO ❤️"
    },
    {
        question: "Além do ritmo, o que mais o ECG permite calcular?",
        answer: "FREQUÊNCIA"
    }
];

export interface RitmoCardiaco {
  ritmo: string;
  caracteristicas: string;
  img?: string; // imagem opcional
}

export const ritmosCardiacos: RitmoCardiaco[] = [
    {
        ritmo: "Ritmo Sinusal Normal",
        caracteristicas:
            "Frequência 60-100 bpm, regular, onda P antes de cada QRS, intervalo PR normal, QRS estreito",
        img: "sinusal.jpeg"
    },
    {
        ritmo: "Bradicardia Sinusal",
        caracteristicas:
            "Frequência < 60 bpm, regular, onda P antes de cada QRS, intervalo PR normal, QRS estreito",
        img: "bradicardia-sinusal.jpg"
    },
    {
        ritmo: "BAV de 2º grau Mobitz I (Wenckebach)",
        caracteristicas:
            "Intervalo PR progressivamente prolongado até falha na condução (QRS ausente), QRS estreito"
    },
    {
        ritmo: "BAV de 3º grau (bloqueio total)",
        caracteristicas:
            "Sem relação entre ondas P e QRS, ritmo de escape ventricular, QRS largo"
    },
    {
        ritmo: "Taquicardia Sinusal",
        caracteristicas:
            "Frequência > 100 bpm, regular, onda P antes de cada QRS, intervalo PR normal, QRS estreito"
    },
    {
        ritmo: "Fibrilação Atrial",
        caracteristicas:
            "Frequência ventricular variável, ritmo irregular, ausência de ondas P, presença de ondas fibrilatórias"
    },
    {
        ritmo: "Flutter Atrial",
        caracteristicas:
            "Frequência atrial 250-350 bpm, ondas em dente de serra, condução AV variável, QRS estreito"
    },
    {
        ritmo: "Taquicardia Supraventricular",
        caracteristicas:
            "Frequência 150-250 bpm, regular, ondas P ausentes ou retrógradas, QRS estreito"
    },
    {
        ritmo: "Taquicardia Ventricular",
        caracteristicas:
            "Frequência 100-250 bpm, regular, sem onda P, QRS largo e bizarro"
    },
    {
        ritmo: "Fibrilação Ventricular",
        caracteristicas:
            "Atividade elétrica caótica, sem ritmo definido, sem ondas P, sem QRS identificáveis"
    },
    {
        ritmo: "Assistolia",
        caracteristicas:
            "Ausência completa de atividade elétrica, linha reta no ECG"
    },
    {
        ritmo: "Atividade Elétrica Sem Pulso (AESP)",
        caracteristicas:
            "Atividade elétrica presente no ECG, mas sem pulso palpável, pode ter QRS estreito ou largo"
    }
];

export interface interfaceRitmo {
  name: string;
  caracteristicas: string[];
};

export const ritmosWhoAmI: interfaceRitmo[] = [
  {
    name: "Ritmo Sinusal Normal",
    caracteristicas: [
      "frequência entre 60 e 100",
      "ritmo regular",
      "onda P presente",
      "onda P positiva em DII",
      "intervalo PR normal",
      "QRS estreito"
    ]
  },
  {
    name: "Bradicardia Sinusal",
    caracteristicas: [
      "frequência < 60",
      "ritmo regular",
      "onda P presente",
      "QRS estreito"
    ]
  },
  {
    name: "Taquicardia Sinusal",
    caracteristicas: [
      "frequência > 100",
      "ritmo regular",
      "onda P presente",
      "QRS estreito"
    ]
  },
  {
    name: "Arritmia Sinusal",
    caracteristicas: [
      "frequência variável",
      "ritmo irregular",
      "onda P presente",
      "QRS estreito"
    ]
  },
  {
    name: "Fibrilação Atrial",
    caracteristicas: [
      "ritmo irregular",
      "sem onda P",
      "atividade fibrilatória",
      "QRS estreito",
      "frequência ventricular variável"
    ]
  },
  {
    name: "Flutter Atrial",
    caracteristicas: [
      "ritmo regular ou irregular",
      "ondas em serrilhado",
      "sem onda P",
      "frequência atrial ~300",
      "QRS estreito"
    ]
  },
  {
    name: "Taquicardia Supraventricular",
    caracteristicas: [
      "frequência geralmente >150",
      "ritmo regular",
      "onda P pode estar ausente",
      "QRS estreito"
    ]
  },
  {
    name: "Taquicardia Ventricular",
    caracteristicas: [
      "frequência geralmente >120",
      "ritmo regular",
      "sem onda P",
      "QRS largo",
      "padrão monomórfico ou polimórfico"
    ]
  },
  {
    name: "Fibrilação Ventricular",
    caracteristicas: [
      "ritmo totalmente desorganizado",
      "sem QRS identificável",
      "sem pulso",
      "atividade elétrica caótica"
    ]
  },
  {
    name: "Assistolia",
    caracteristicas: [
      "sem atividade elétrica",
      "linha reta",
      "sem QRS",
      "sem pulso"
    ]
  },
  {
    name: "Atividade Elétrica Sem Pulso",
    caracteristicas: [
      "atividade elétrica presente",
      "sem pulso",
      "ritmo pode parecer organizado"
    ]
  },
  {
    name: "BAV de 1º grau",
    caracteristicas: [
      "ritmo regular",
      "intervalo PR > 0,20s",
      "onda P presente",
      "QRS estreito"
    ]
  },
  {
    name: "BAV de 2º grau tipo I (Wenckebach)",
    caracteristicas: [
      "PR progressivamente prolongado",
      "falha de condução eventual do QRS",
      "ritmo irregular",
      "QRS estreito"
    ]
  },
  {
    name: "BAV de 2º grau tipo II",
    caracteristicas: [
      "PR fixo",
      "bloqueio súbito de QRS",
      "ritmo irregular",
      "QRS estreito ou largo"
    ]
  },
  {
    name: "BAV de 3º grau (completo)",
    caracteristicas: [
      "dissociação AV",
      "frequência atrial ≠ frequência ventricular",
      "ritmo regular",
      "QRS estreito ou largo"
    ]
  },
  {
    name: "Marcapasso Atrial",
    caracteristicas: [
      "espícula antes da onda P",
      "ritmo regular",
      "QRS estreito"
    ]
  },
  {
    name: "Marcapasso Ventricular",
    caracteristicas: [
      "espícula antes do QRS",
      "ritmo regular",
      "QRS largo"
    ]
  },
  {
    name: "Marcapasso Bicameral",
    caracteristicas: [
      "espículas antes da onda P e QRS",
      "ritmo regular",
      "QRS largo"
    ]
  }
];