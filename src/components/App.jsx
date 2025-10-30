import { useState } from "react";
import Keyboard from "./Keyboard";
import TextDisplay from "./TextDisplay";
import EditingTools from './EditingTools'
import DesignTools from "./DesignTools";
import FileTools from "./FileTools";


export default function App() {
  const [text, setText] = useState([]);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [language, setLanguage] = useState("english");
  const [style, setStyle] = useState({
    color: "black",
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
    <div style={{ padding: 20 }}>
      <TextDisplay text={text} language={language} style={style} />
      <Keyboard language={language} onKeyPress={handleKeyPress} />
      <EditingTools 
        text={text}
        setTextWithHistory={setTextWithHistory}  
        history={history}
        historyIndex={historyIndex}
        setHistoryIndex={setHistoryIndex}
        setText={setText}
        language={language} 
        setLanguage={setLanguage}
      />
      <FileTools
      text={text}
        setTextWithHistory={setTextWithHistory}  

      />
      <DesignTools 
        style={style} 
        setStyle={setStyle} 
        text={text}
        setTextWithHistory={setTextWithHistory}  
      />
    </div>
  );
}