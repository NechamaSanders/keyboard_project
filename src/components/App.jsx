import { useState } from "react";
import Keyboard from "./Keyboard";
import TextDisplay from "./TextDisplay";
import EditingTools from './EditingTools'
import DesignTools from "./DesignTools";
import FileTools from "./FileTools";
import Register from "./Register";
import "./App.css";

export default function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [text, setText] = useState([]);
  const [openTexts, setOpenTexts] = useState([
    { name: "Untitled 1", content: [], history: [[]], historyIndex: 0 },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [language, setLanguage] = useState("english");
  const [style, setStyle] = useState({
    color: "#000000",
    fontFamily: "Arial",
    fontWeight: "normal",
    fontStyle: "normal",
    fontSize: "16px",
  });

  function setTextWithHistory(newText) {
    // בדיקה שיש טאב פעיל
    if (activeIndex === null || !openTexts[activeIndex]) {
      return;
    }
    
    const newHistory = [...history, newText];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setText(newText);

    const updated = [...openTexts];
    updated[activeIndex] = {
      ...updated[activeIndex],
      content: newText,
      history: newHistory,
      historyIndex: newHistory.length - 1
    };
    setOpenTexts(updated);
  }


  function handleKeyPress(key) {
    let newText;
    if (key === "Enter") {
      newText = [...text, { text: "\n", style: style }];
    } else if (key === "Space") {
      newText = [...text, { text: " ", style: style }];
    } else {
      newText = [...text, { text: key, style: style }];
    }
    setTextWithHistory(newText);
  }

  return (
    <div className="app-container">
      {!currentUser ? (
        <Register setCurrentUser={setCurrentUser} />
      ) : (<>
        <button
          className="new-text-btn"
          onClick={() => {
            const newTexts = [
              { name: `Untitled ${openTexts.length + 1}`, content: [], history: [[]], historyIndex: 0 },
              ...openTexts,
            ];
            setOpenTexts(newTexts);
            setActiveIndex(0);
            setText([]);
            setHistory([[]]);
            setHistoryIndex(0);
          }}
        >
          ➕ New Text
        </button>
        <div className="display-section">
          {openTexts.map((t, i) => (
            <div
              key={i}
              className={`text-container ${i === activeIndex ? "active" : ""}`}
              onClick={() => {
                // Save current tab's history before switching
                if (activeIndex !== null && activeIndex !== i) {
                  const updated = [...openTexts];
                  updated[activeIndex] = {
                    ...updated[activeIndex],
                    history: history,
                    historyIndex: historyIndex
                  };
                  setOpenTexts(updated);
                }

                setActiveIndex(i);
                setText(t.content);
                setHistory(t.history || [[]]);
                setHistoryIndex(t.historyIndex || 0);
              }}
            >
              <h3 className="text-title">{t.name}</h3>
              <TextDisplay text={t.content} language={language} style={style} />
            </div>
          ))}
        </div>
        <div className="tools-row">
          <div className="left-tools">
            <DesignTools style={style}
              setStyle={setStyle}
              text={text}
              setTextWithHistory={setTextWithHistory} />

            <FileTools text={text} currentUser={currentUser}
              openTexts={openTexts} setOpenTexts={setOpenTexts}
              activeIndex={activeIndex} setActiveIndex={setActiveIndex}
              setText={setText} setHistory={setHistory} setHistoryIndex={setHistoryIndex} />
          </div>

          <div className="keyboard-center">
            <Keyboard language={language} onKeyPress={handleKeyPress} />

          </div>

          <div className="right-tools">
            <EditingTools text={text}
              setTextWithHistory={setTextWithHistory}
              history={history}
              historyIndex={historyIndex}
              setHistoryIndex={setHistoryIndex}
              setText={setText}
              language={language}
              setLanguage={setLanguage}
              openTexts={openTexts}
              setOpenTexts={setOpenTexts}
              activeIndex={activeIndex} />
          </div>
        </div></>)}
    </div>
  );
}