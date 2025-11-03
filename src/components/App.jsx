import { useState } from "react";
import Keyboard from "./Keyboard";
import TextDisplay from "./TextDisplay";
import EditingTools from './EditingTools'
import DesignTools from "./DesignTools";
import FileTools from "./FileTools";
import "./App.css";

export default function App() {
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
      {/* אזור תצוגת הטקסט - למעלה */}
      <div className="top-section">
        <button
          className="new-text-btn"
          onClick={() => {
            const newTab = { 
              name: `Untitled ${openTexts.length + 1}`, 
              content: [], 
              history: [[]], 
              historyIndex: 0 
            };
            const newTexts = [newTab, ...openTexts];
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
                setActiveIndex(i);
                setText(t.content);
                setHistory(t.history || [[]]);
                setHistoryIndex(t.historyIndex || 0);
              }}
            >
              <h3 className="text-title">
                <span>{t.name}</span>
                {openTexts.length > 1 && (
                  <button 
                    className="close-tab"
                    onClick={(e) => {
                      e.stopPropagation();
                      const updated = openTexts.filter((_, index) => index !== i);
                      setOpenTexts(updated);
                      
                      if (i === activeIndex) {
                        const newActiveIndex = i > 0 ? i - 1 : 0;
                        setActiveIndex(newActiveIndex);
                        const newTab = updated[newActiveIndex];
                        if (newTab) {
                          setText(newTab.content);
                          setHistory(newTab.history || [[]]);
                          setHistoryIndex(newTab.historyIndex || 0);
                        }
                      } else if (i < activeIndex) {
                        setActiveIndex(activeIndex - 1);
                      }
                    }}
                  >
                    ×
                  </button>
                )}
              </h3>
              <TextDisplay text={t.content} language={language} style={style} />
            </div>
          ))}
        </div>
      </div>

      {/* אזור הכלים והמקלדות - למטה */}
      <div className="bottom-section">
        {/* מקלדת ראשית - הכי גדולה */}
        <div className="main-keyboard">
          <Keyboard language={language} onKeyPress={handleKeyPress} />
        </div>

        {/* פעולות מיוחדות */}
        <div className="special-tools">
          <EditingTools text={text}
            setTextWithHistory={setTextWithHistory}
            history={history}
            historyIndex={historyIndex}
            setHistoryIndex={(newIndex) => {
              setHistoryIndex(newIndex);
              const updated = [...openTexts];
              updated[activeIndex] = {
                ...updated[activeIndex],
                historyIndex: newIndex
              };
              setOpenTexts(updated);
            }}
            setText={setText}
            language={language}
            setLanguage={setLanguage}
            openTexts={openTexts}
            setOpenTexts={setOpenTexts}
            activeIndex={activeIndex} />
        </div>

        {/* כלי עיצוב */}
        <div className="design-tools-section">
          <DesignTools style={style}
            setStyle={setStyle}
            text={text}
            setTextWithHistory={setTextWithHistory} />
        </div>
      </div>

      {/* קבצים - בצד ימין */}
      <div className="file-sidebar">
        <FileTools text={text}
          setTextWithHistory={setTextWithHistory} 
          openTexts={openTexts} 
          setOpenTexts={setOpenTexts}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}/>
      </div>
    </div>
  );
}
