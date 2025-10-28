
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

            onKeyPress((t) => t.trimEnd().replace(/\S+$/, ''));
            return;
        }
        else { onKeyPress((t) => '') }
    };

    const undo = () => {

    }
    const onSearch = () => {
        onKeyPress((t) => {
            const index = t.indexOf(searchTerm);
            if (index >= 0) alert(`נמצא במיקום ${index + 1}`);
            else alert("לא נמצא 😕");
            return t;
        });
    }
    const changeChar = () => {
        onKeyPress((t) => {
            return t.split(changeFrom).join(changeTo);
        });
    }

    return (
        <div className="editing-tools">
            <button onClick={() => { deleteText("word") }}>מחק מילה</button>
            <button onClick={() => { deleteText("all") }}>מחק הכל</button>
            <button onClick={() => { deleteText("char") }}>מחק אות</button>
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
            <button onClick={() => { changeChar() }}>שינוי</button>
            <button onClick={undo}>ביטול</button>
            <input
                type="text"
                placeholder="הקלידי מילה לחיפוש..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={onSearch}>חפש</button>
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
