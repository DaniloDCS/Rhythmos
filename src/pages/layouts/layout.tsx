import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ScrollEffect from "../../utils/scrollEffect";

export default function LayoutMain() {
  const themes = [
    { value: "light-theme", label: "Light", emoji: "☀️" },
    { value: "dark-theme", label: "Dark", emoji: "🌑" },
    { value: "grape-theme", label: "Grape", emoji: "🍇" },
    { value: "cherry-theme", label: "Cherry", emoji: "🍒" },
    { value: "florest-theme", label: "Florest", emoji: "🌲" },
    { value: "sunset-theme", label: "Sunset", emoji: "🌇" },
    { value: "midnight-theme", label: "Midnight", emoji: "🌌" },
    { value: "ocean-theme", label: "Ocean", emoji: "🌊" },
    { value: "desert-theme", label: "Desert", emoji: "🏜️" },
    { value: "lavender-theme", label: "Lavender", emoji: "💜" },
    { value: "mint-theme", label: "Mint", emoji: "🌿" },
    { value: "volcano-theme", label: "Volcano", emoji: "🌋" },
    { value: "snow-theme", label: "Snow", emoji: "❄️" },
    { value: "sunflower-theme", label: "Sunflower", emoji: "🌻" },
    { value: "peach-theme", label: "Peach", emoji: "🍑" },
    { value: "cyberpunk-theme", label: "Cyberpunk", emoji: "⚡" },
  ];

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scroll, setScroll] = useState(0);

  const handleSelect = (value: string) => {
    setTheme(value);
    setOpen(false);
  };

  const [theme, setTheme] = useState("ocean-theme");
  const [menuView, setMenuView] = useState(true);

  const changeMenuView = () => {
    setMenuView((menuView) => !menuView);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.querySelectorAll("[data-link]")?.forEach((link) => {
      if (link.getAttribute("data-link") === active)
        link.classList.add("active");
      else link.classList.remove("active");
    });
  }, [active]);

  useEffect(() => {
    document.querySelectorAll("[data-link]")?.forEach((link) => {
      link.addEventListener("click", () => {
        const value = link.getAttribute("data-link") || "";
        return setActive(value);
      });
    });
  }, [active]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;

      setScroll(Math.min(100, Math.max(0, scrolled)));
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container">
      <ScrollEffect />
      <div
        className={`nav-menu ${menuView ? "nav-compressed" : "nav-extended"}`}
      >
        <Link to="/" className="menu-item app-title">
          <span> Rhythmos </span>
          <i className="fi fi-rr-heart-rate"></i>
        </Link>

        <i
          className={`menu-item fi fi-${
            menuView ? "br-menu-burger" : "rr-rectangle-xmark"
          }`}
          onClick={changeMenuView}
        ></i>
        <Link
          className="menu-item"
          to="/me"
          data-link="perfil"
          title="Acesse o seu perfil"
        >
          <i className="fi fi-sr-user-nurse"></i> <span> Meu perfil </span>
        </Link>
        <Link
          className="menu-item"
          to="/base"
          data-link="base"
          title="Reveja os fundamentos e teoria do ECG"
        >
          <i className="fi fi-rr-book-alt"></i> <span>Central de Estudos</span>
        </Link>
        <Link
          className="menu-item"
          to="/labCardio"
          data-link="labCardio"
          title="Simule casos e pratique a leitura de traçados"
        >
          <i className="fi fi-rr-flask"></i> <span>LabCardio</span>
        </Link>
        <Link
          className="menu-item"
          to="/diagnostic"
          data-link="diagnostic"
          title="Teste seus conhecimentos em ritmo com casos interativos"
        >
          <i className="fi fi-rr-stethoscope"></i> <span>Diagnostica Aí</span>
        </Link>
        <Link
          className="menu-item"
          to="/games"
          data-link="games"
          title="Desafios rápidos para identificar alterações no ritmo"
        >
          <i className="fi fi-rr-gamepad"></i> <span>Games</span>
        </Link>
        <Link
          className="menu-item"
          to="/flashcards"
          data-link="flashcards"
          title="Reforce o conteúdo com flashcards objetivos"
        >
          <i className="fi fi-rr-brain"></i> <span>Flashcards</span>
        </Link>
        <Link
          className="menu-item"
          to="/about"
          data-link="about"
          title="Saiba mais sobre o projeto Rhythmos"
        >
          <i className="fi fi-rr-folder"></i> <span>Sobre</span>
        </Link>

        <div className="menu-item theme-dropdown">
          <button className="theme-trigger" onClick={() => setOpen(!open)}>
            <strong>{themes.find((t) => t.value === theme)?.emoji}</strong>
            <span className="theme-text">
              {themes.find((t) => t.value === theme)?.label}
            </span>
            <span className="fi fi-rr-angle-small-down"></span>
          </button>
          {open && (
            <div className="theme-options">
              {themes.map((t) => (
                <div
                  key={t.value}
                  className={`theme-option ${
                    theme === t.value ? "active" : ""
                  }`}
                  onClick={() => handleSelect(t.value)}
                >
                  {t.emoji}
                  <span className="theme-text">{t.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="app-content">
        <div className="scroll-progress">
          <div
            className="progress-scroll"
            style={{ width: `${scroll}%` }}
          ></div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
