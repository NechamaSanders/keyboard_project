import { useState } from "react";
import Keyboard from "./Keyboard";
import TextDisplay from "./TextDisplay";

export default function App() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("english");

  function handleKeyPress(key) {
    if (key === "Backspace") {
      setText((t) => t.replace(/[\s\S]$/u, ""));
    } else if (key === "Enter") {
      setText((t) => t + "\n");
    } else if (key === "Space") {
      setText((t) => t + " ");
    } else {
      setText((t) => t + key);
    }
  }
  return (
    <div style={{ padding: 20 }}>
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
      <TextDisplay text={text} language={language} />
      <Keyboard language={language} onKeyPress={handleKeyPress} />
    </div>
  );
}
