export class AudioPool {
  private pool: HTMLAudioElement[] = [];
  private index: number = 0;

  constructor(
    caminho: string,
    tamanho: number = 5,
    private infinite: boolean = false,
    volume: number = 1
  ) {
    const safeVolume = Math.max(0, Math.min(volume, 1));

    for (let i = 0; i < tamanho; i++) {
      const audio = new Audio(caminho);
      audio.preload = "auto";
      audio.loop = infinite;
      audio.volume = safeVolume;
      this.pool.push(audio);
    }
  }

  play() {
    const audio = this.pool[this.index];
    audio.currentTime = 0;
    audio.play().catch((err) => console.error("Erro ao tocar som:", err));
    this.index = (this.index + 1) % this.pool.length;
  }

  stop() {
    this.pool.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }
}

export const bipEffect = new AudioPool("/public/sounds/bip.mp3", 4);
export const chopEffect = new AudioPool("/public/sounds/chop.mp3", 4);
export const removeEffect = new AudioPool("/public/sounds/remove.wav", 4);
export const errorEffect = new AudioPool("/public/sounds/error.mp3", 4);
export const successEffect = new AudioPool("/public/sounds/success.mp3", 4);
export const selectedEffect = new AudioPool("/public/sounds/selected.mp3", 4);
export const backgroundEffect = new AudioPool("/public/sounds/background.mp3", 2, true, 0.02);
