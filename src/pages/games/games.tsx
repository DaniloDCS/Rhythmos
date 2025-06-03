import { Link } from "react-router-dom";

function Games() {
  const games = [
    {
      title: "Deu match nos ritmos?",
      to: "/quiz",
      img: ""
    },
    {
      title: "Memória cardiológica",
      to: "/memory",
      img: ""
    },
    {
      title: "Complete as sentença",
      to: "/sentences",
      img: ""
    },
    {
      title: "Palavras-cruzadas",
      to: "/crossword",
      img: ""
    },
    {
      title: "Caça-palavras",
      to: "/wordsearch",
      img: ""
    },
    {
      title: "Bingo",
      to: "/bingo",
      img: ""
    },
    {
      title: "Qual ritmo eu sou?",
      to: "/whoAmI",
      img: ""
    }
  ];

  const colors = [
    "#e74645",
    "#fb7756",
    "#facd60",
    "#fdfa66",
    "#1ac0c6",
    "#1f306e",
    "#f5487f"
  ];

  return (
    <div>
      <h1 className="page-title">
        <i className="fi fi-rr-gamepad"></i> Games
      </h1>

      <div className="list-of-games">
        {games.map((game, index) => (
          <Link
            to={game.to}
            className="link-game"
            style={{ backgroundColor: colors[index] }}
          >
            <img src="/public/images/image.png" alt={game.title} />
            <div className="game-details">
              <p className="game-title">{game.title}</p>
              <p className="game-description"></p>
            </div>
          </Link>
        ))}
      </div>
      <style>{`
        .list-of-games {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          padding: 8px;
        }
        
        .link-game {
          width: 32%;
          height: 100px;
          margin: 0.5%;
          background-color: red;
          display: flex;
          border-radius: 10px;
          color: white;
          text-decoration: none;
        }
        
        .link-game img {
          width: 100px;
          height: 100px;
          border-radius: 10px 0 0 10px;
        }
        
        .game-details {
          width: 100%;
          padding: 8px;
        }
        
        .game-title {
          font-size: 1.1em;
          font-weight: 600;
        }
        
        .game-description {
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          text-wrap: nowrap;
        }
      `}</style>
    </div>
  );
}

export default Games;
