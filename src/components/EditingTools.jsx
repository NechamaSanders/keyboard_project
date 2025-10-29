
import React from 'react'
import { useState } from "react";
import "./EditingTools.css";


export default function EditingTools({ onKeyPress, language, setLanguage }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [changeFrom, setChangeFrom] = useState("");
    const [changeTo, setChangeTo] = useState("");


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

    const onSearch = () => {
        onKeyPress((t) => {
            if (!searchTerm.trim())
                return t.map(c => ({
                    ...c,
                    style: { ...c.style, backgroundColor: "transparent" }
                }));
            const fullText = t.map(c => c.text).join("");

            // find all matches (their start indices)
            const matches = [];
            let index = fullText.indexOf(searchTerm);
            while (index !== -1) {
                matches.push(index);
                index = fullText.indexOf(searchTerm, index + 1);
            }
            if (matches.length === 0) {
                alert("לא נמצא 😕");
                return t.map(c => ({
                    ...c,
                    style: { ...c.style, backgroundColor: "transparent" }
                }));
            }

            let currentPosition = 0;
            const highlighted = t.map(c => {
                const inMatch = matches.some(start =>
                    currentPosition >= start && currentPosition < start + searchTerm.length
                );
                const newStyle = {
                    ...c.style,
                    backgroundColor: inMatch ? "#83c3c3ff" : "transparent"
                };
                currentPosition += 1;
                return { ...c, style: newStyle };
            });

            return highlighted;
        });

    };

    const changeChar = () => {
        onKeyPress((t) => {
            return t.map(c => {
                if (c.text === changeFrom) {
                    return { ...c, text: changeTo };
                }
                return c;
            });
        });
    }

    return (
        <div className="editing-tools">
            <div className="keyboard-row">
                <button onClick={() => deleteText("char")}>מחק אות</button>
                <button onClick={() => deleteText("word")}>מחק מילה</button>
                <button onClick={() => deleteText("all")}>מחק הכל</button>
            </div>

            <div className="keyboard-row">
                <input
                    type="text"
                    placeholder="החלף מ"
                    value={changeFrom}
                    onChange={(e) => setChangeFrom(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="החלף ל"
                    value={changeTo}
                    onChange={(e) => setChangeTo(e.target.value)}
                />
                <button onClick={changeChar}>שינוי</button>
            </div>

            <div className="keyboard-row">
                <input
                    type="text"
                    placeholder="הקלידי מילה לחיפוש..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={onSearch}>חפש</button>
            </div>

            <div className="keyboard-row">
                <button onClick={undo}>ביטול</button>
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
        </div>

    );


}
