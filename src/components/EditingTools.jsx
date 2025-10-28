
import React from 'react'

export default function EditingTools({ onKeyPress, language, setLanguage }) {
    const deleteText = (type) => {

        if (type === "char") {
            onKeyPress((t) => t.slice(0, -1));
            return;
        }

        if (type === "word") {
            onKeyPress((t) => {
                if (t.length === 0) return [];
                let i = t.length - 1;
                while (i >= 0 && (t[i].text === ' ' || t[i].text === '\n'))
                    i--;
                while (i >= 0 && (t[i].text !== ' ' && t[i].text !== '\n'))
                    i--;
                return t.slice(0, i + 1);
            });
            return;
        }
        else {
            onKeyPress((t) => [])
        }
    };

    const undo = () => {

    }
    return (
        <div className="editing-tools">
            <button onClick={() => { deleteText("word") }}>מחק מילה</button>
            <button onClick={() => { deleteText("all") }}>מחק הכל</button>
            <button onClick={() => { deleteText("char") }}>מחק אות</button>
            <button onClick={() => { onChange('א', "ב") }}>שינוי</button>
            <button onClick={undo}>ביטול</button>
            <button onClick={() => { onSearch('א') }}>חפש</button>
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
        </div>
    );


}
