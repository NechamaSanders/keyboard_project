import { useState } from "react";
import Keyboard from "./Keyboard";
import TextDisplay from "./TextDisplay";
import EditingTools from './EditingTools'


export default function App() {
   const [text, setText] = useState("");
   const [language, setLanguage] = useState("english");

   function handleKeyPress(key) {
      if (key === "Enter") {
       setText((t) => t + "\n");
     } else if (key === "Space") {
       setText((t) => t + " ");
     } else {
     setText((t) => t + key);
     }
   }
function handleTextChange(callback) {
    setText((prev) => callback(prev))
   }
  return (
    <div style={{ padding: 20 }}>
<<<<<<< HEAD
     
=======
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ marginBottom: 10 }}
      >
        <option value="english">English</option>
        <option value="hebrew">Hebrew</option>
        <option value="emojis">Emojis</option>
        <option value="numbers">Numbers</option>
        <option value="symbols">Symbols</option>
      </select>
>>>>>>> b0d6cb83ff9d786420ee6bf0b1b080e8905dcaeb
      <TextDisplay text={text} language={language} />
      <Keyboard language={language} onKeyPress={handleKeyPress}/>
      <EditingTools onKeyPress={handleTextChange} language={language} setLanguage={setLanguage}/>  
        </div>
  );
}
