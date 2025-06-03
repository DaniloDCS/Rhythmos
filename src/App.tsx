import { Routes, Route } from "react-router-dom";

import LayoutMain from "./pages/layouts/layout";

import Flashcards from "./pages/flashcards/flashcards";

import About from "./pages/about/about";

import Me from "./pages/me/me";

import Diagnostic from "./pages/diagnostic/diagnostic";

import LabCardio from "./pages/labCardio/labCardio";
import Eletrocardiograph from "./pages/labCardio/eletrocardiograph";
import InfusionPump from "./pages/labCardio/infusionPump";
import MultiparameterMonitor from "./pages/labCardio/multiparameterMonitor.tsx";

import Base from "./pages/base/base";

import Games from "./pages/games/games";
import Quiz from "./pages/games/quiz";
import Memory from "./pages/games/memory";
import Bingo from "./pages/games/bingo";
import Crossword from "./pages/games/crossword";
import Rhythms from "./pages/games/rhythms";
import Sentences from "./pages/games/sentences";
import WhoAmI from "./pages/games/whoAmI";
import Wordsearch from "./pages/games/wordsearch";

import Anathomy from "./pages/base/anathomy.tsx";
import Fisiology from "./pages/base/fisiology.tsx";
import Electrocardiogram from "./pages/base/electrocardiogram.tsx";
import Monitor from "./pages/base/monitor.tsx";
import Emergency from "./pages/base/emergency.tsx";
import Guidelines from "./pages/base/guidelines.tsx";

import "./App.css";
import "./assets/styles/animations.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutMain />}>
        <Route path="/about" element={<About />} />

        <Route path="/flashcards" element={<Flashcards />} />

        <Route path="/me" element={<Me />} />

        <Route path="/diagnostic" element={<Diagnostic />} />

        <Route path="/labCardio" element={<LabCardio />} />
        <Route path="/eletrocardiograph" element={<Eletrocardiograph />} />
        <Route path="/infusionPump" element={<InfusionPump />} />
        <Route
          path="/multiparameterMonitor"
          element={<MultiparameterMonitor />}
        />

        <Route path="/base" element={<Base />} />
        <Route path="/trail/anathomy" element={<Anathomy />} />
        <Route path="/trail/fisiology" element={<Fisiology />} />
        <Route
          path="/trail/electrocardiogram"
          element={<Electrocardiogram />}
        />
        <Route path="/trail/monitor" element={<Monitor />} />
        <Route path="/trail/emergency" element={<Emergency />} />
        <Route path="/trail/guidelines" element={<Guidelines />} />

        <Route path="/games" element={<Games />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/bingo" element={<Bingo />} />
        <Route path="/crossword" element={<Crossword />} />
        <Route path="/rhythms" element={<Rhythms />} />
        <Route path="/Sentences" element={<Sentences />} />
        <Route path="/whoAmI" element={<WhoAmI />} />
        <Route path="/wordsearch" element={<Wordsearch />} />
      </Route>
    </Routes>
  );
}

export default App;
