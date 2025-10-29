import { useState } from "react";
import Keyboard from "./Keyboard";
import TextDisplay from "./TextDisplay";
import EditingTools from './EditingTools'
import DesignTools from "./DesignTools";


export default function App() {
  const [text, setText] = useState([]);
  const [language, setLanguage] = useState("english");
  const [style, setStyle] = useState({
    color: "black",
    fontFamily: "Arial",
    fontWeight: "normal",
    fontStyle: "normal",
    fontSize: "16px",
  });
  const [history, setHistory] = useState([]);
  const updateText = (updater) => {
    setHistory((h) => [...h, text]);
    setText(updater);
  };
  const undo = () => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const last = h[h.length - 1];
      setText(last);
      return h.slice(0, -1); 
    });
  };
  function handleKeyPress(key) {
    if (key === "Enter") {
      updateText((t) => [...t, { text: "\n", style: style }]);
    } else if (key === "Space") {
      updateText((t) => [...t, { text: " ", style: style }]);
    } else {
      updateText((t) => [...t, { text: key, style: style }]);
    }
  }
  function handleTextChange(callback) {
    updateText((prev) => callback(prev))
  }
  return (
    <div style={{ padding: 20 }}>
      <TextDisplay text={text} language={language} style={style} />
      <Keyboard language={language} onKeyPress={handleKeyPress} />
      <EditingTools onKeyPress={handleTextChange} language={language} setLanguage={setLanguage} />
      <DesignTools style={style} setStyle={setStyle} updateText={updateText} />
      <button onClick={undo}>Undo</button>
    </div>
  );
}
