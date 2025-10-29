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

  function handleKeyPress(key) {
    if (key === "Enter") {
      setText((t) => [...t, { text: "\n", style: style }]);
    } else if (key === "Space") {
      setText((t) => [...t, { text: " ", style: style }]);
    } else {
      setText((t) => [...t, { text: key, style: style }]);
    }
  }
  function handleTextChange(callback) {
    setText((prev) => callback(prev))
  }
  return (
    <div style={{ padding: 20 }}>
      <TextDisplay text={text} language={language} style={style} />
      <Keyboard language={language} onKeyPress={handleKeyPress} />
      <EditingTools onKeyPress={handleTextChange} language={language} setLanguage={setLanguage} />
      <DesignTools style={style} setStyle={setStyle} setText={setText}/>
    </div>
  );
}
