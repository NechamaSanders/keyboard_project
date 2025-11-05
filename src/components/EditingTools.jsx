import React from 'react'
import { useState } from "react";
//import "./EditingTools.css";

export default function EditingTools({
    text,
    setTextWithHistory,
    history,
    historyIndex,
    setHistoryIndex,
    setText,
    language,
    setLanguage,
    openTexts,
    setOpenTexts,
    activeIndex
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [changeFrom, setChangeFrom] = useState("");
    const [changeTo, setChangeTo] = useState("");

    const deleteText = (type) => {
        if (type === "char") {
            setTextWithHistory(text.slice(0, -1));
            return;
        }

        if (type === "word") {
            if (text.length === 0) return;
            let i = text.length - 1;
            while (i >= 0 && (text[i].text === ' ' || text[i].text === '\n'))
                i--;
            while (i >= 0 && (text[i].text !== ' ' && text[i].text !== '\n'))
                i--;
            setTextWithHistory(text.slice(0, i + 1));
            return;
        }
        else {
            setTextWithHistory([]);
        }
    };

    const undo = () => {
        // בדיקה שיש טאב פעיל
        if (activeIndex === null || !openTexts[activeIndex] || historyIndex <= 0) {
            return;
        }

        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setText(history[newIndex]);

        // Update openTexts as well
        const updated = [...openTexts];
        updated[activeIndex] = {
            ...updated[activeIndex],
            content: history[newIndex],
            historyIndex: newIndex
        };
        setOpenTexts(updated);
    };

    const redo = () => {
        // בדיקה שיש טאב פעיל
        if (activeIndex === null || !openTexts[activeIndex] || historyIndex >= history.length - 1) {
            return;
        }

        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setText(history[newIndex]);

        // Update openTexts as well
        const updated = [...openTexts];
        updated[activeIndex] = {
            ...updated[activeIndex],
            content: history[newIndex],
            historyIndex: newIndex
        };
        setOpenTexts(updated);
    };

    const onSearch = () => {
        if (!searchTerm.trim()) {
            setTextWithHistory(text.map(c => ({
                ...c,
                style: { ...c.style, backgroundColor: "transparent" }
            })));
            return;
        }

        const fullText = text.map(c => c.text).join("");
        const matches = [];
        let index = fullText.indexOf(searchTerm);
        while (index !== -1) {
            matches.push(index);
            index = fullText.indexOf(searchTerm, index + 1);
        }

        if (matches.length === 0) {
            alert("לא נמצא 😕");
            return;
        }

        let currentPosition = 0;
        const highlighted = text.map(c => {
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

        setTextWithHistory(highlighted);
    };

    const changeChar = () => {
        const newText = text.map(c => {
            if (c.text === changeFrom) {
                return { ...c, text: changeTo };
            }
            return c;
        });
        setTextWithHistory(newText);
    };
    function changeLanguage(newLang) {
        setLanguage(newLang);
        const updated = [...openTexts];
        if (activeIndex !== null && updated[activeIndex]) {
            updated[activeIndex] = { ...updated[activeIndex], language: newLang };
        }
        setOpenTexts(updated);
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
                <button
                    onClick={undo}
                    disabled={activeIndex === null || !openTexts[activeIndex] || historyIndex <= 0}
                    style={{
                        opacity: (activeIndex !== null && openTexts[activeIndex] && historyIndex > 0) ? 1 : 0.5,
                        cursor: (activeIndex !== null && openTexts[activeIndex] && historyIndex > 0) ? "pointer" : "not-allowed"
                    }}
                >
                    Undo
                </button>
                <button
                    onClick={redo}
                    disabled={activeIndex === null || !openTexts[activeIndex] || historyIndex >= history.length - 1}
                    style={{
                        opacity: (activeIndex !== null && openTexts[activeIndex] && historyIndex < history.length - 1) ? 1 : 0.5,
                        cursor: (activeIndex !== null && openTexts[activeIndex] && historyIndex < history.length - 1) ? "pointer" : "not-allowed"
                    }}
                >
                    Redo
                </button>
                <select
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
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