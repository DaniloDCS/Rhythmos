import { Link } from "react-router-dom";
import { list } from "./base";

function Trails() {
  return (
    <div className="trails box">
      {list.map((trail) => (
        <Link className="trail" to={`/trail/${trail.url}`}>
          <img src="/public/images/image.png" alt={trail.title} />
          <h5>{trail.title}</h5>
        </Link>
      ))}
      <style>{`
        .trails {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 10px;
          padding: 10px 0;
        }

        .trail {
          width: 31%;
          margin: 0.5%;
          padding: 5px;
          text-decoration: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          display: flex;
          color: var(--text-color);
          border: 1px solid var(--text-color);
          background-color: var(--color-4);
        }

        .trail:hover {
          transform: scale(1.1);
          transition: 0.8s;
          filter: drop-shadow(0 0 4px #ccc);
        }

        .trail img {
          width: 20%;
          margin-right: 6px;
        }

        .trail h5 {
          text-wrap: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default Trails;
