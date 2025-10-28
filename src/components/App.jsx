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
     
      <TextDisplay text={text} language={language} />
      <Keyboard language={language} onKeyPress={handleKeyPress}/>
      <EditingTools onKeyPress={handleTextChange} language={language} setLanguage={setLanguage}/>  
        </div>
  );
}
