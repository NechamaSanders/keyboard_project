import { useState } from "react";
import Keyboard from "./Keyboard";
import TextDisplay from "./TextDisplay";
import EditingTools from './EditingTools'
import DesignTools from "./DesignTools";
import FileTools from "./FileTools";
import Register from "./Register";
import Header from "./Header";
import "./App.css";

export default function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [text, setText] = useState([]);
  const [openTexts, setOpenTexts] = useState([
    {
      name: "Untitled 1",
      content: [],
      history: [[]],
      historyIndex: 0,
      language: "english" // ✅ each text has its own language
    },
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
const closeText = (index) => {
  const updated = openTexts.filter((_, i) => i !== index);
  setOpenTexts(updated);
  if (activeIndex === index) setActiveIndex(updated.length ? 0 : null);
  else if (activeIndex > index) setActiveIndex(activeIndex - 1);
};

  return (
    <div className="app-container">
      {!currentUser ? (
        <Register setCurrentUser={setCurrentUser} />
      ) : (<>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <div className="display-section">
          {openTexts.map((t, i) => (
            <div
              key={i}
              className={`text-container ${i === activeIndex ? "active" : ""}`}
              onClick={() => {
                if (activeIndex !== null && activeIndex !== i) {
                  const updated = [...openTexts];
                  updated[activeIndex] = {
                    ...updated[activeIndex],
                    history,
                    historyIndex,
                    language,
                  };
                  setOpenTexts(updated);
                }

                setActiveIndex(i);
                setText(t.content);
                setHistory(t.history || [[]]);
                setHistoryIndex(t.historyIndex || 0);
                setLanguage(t.language || "english");
              }}
            >
              <h3 className="text-title">{t.name}              
                <button className="close-tab" onClick={() => closeText(i)}>
                ×
              </button></h3>

              <TextDisplay text={t.content} language={t.language} style={style} />

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
              activeIndex={activeIndex}
              setCurrentUser={setCurrentUser} />
          </div>
        </div></>)}
    </div>
  );
}