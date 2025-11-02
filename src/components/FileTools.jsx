import React, { useState } from "react";

export default function FileTools({ text, setTextWithHistory, openTexts, setOpenTexts }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showFiles, setShowFiles] = useState(false);
    const [fileName, setFileName] = useState("");
    const [currentIndex, setCurrentIndex] = useState(null);

    const keys = Object.keys(localStorage);

    const loadFileList = () => setShowFiles(!showFiles);

    const loadFile = (name) => {
        const data = localStorage.getItem(name);
        if (data) {
            const parsed = JSON.parse(data);
            const newTab = { name, content: parsed };
            setOpenTexts(prev => [...prev, newTab]);
            setCurrentIndex(openTexts.length);
            setFileName(name);
            setTextWithHistory(parsed);
        }
    };

    const newFile = () => {
        const untitledCount = openTexts.filter(t => t.name.startsWith("Untitled")).length + 1;
        const newTab = { name: `Untitled ${untitledCount}`, content: [] };
        setOpenTexts(prev => [...prev, newTab]);
        setCurrentIndex(openTexts.length);
        setFileName(newTab.name);
        setTextWithHistory([]);
    };

    const save = () => {
        if (!fileName || /^Untitled \d+$/.test(fileName)) {
            alert("יש להזין שם לקובץ או להשתמש ב'שמור בשם'");
            return;
        }

        localStorage.setItem(fileName, JSON.stringify(text));
        alert("הקובץ נשמר!");

        if (currentIndex !== null) {
            setOpenTexts(prev => {
                const updated = [...prev];
                updated[currentIndex] = {
                    ...updated[currentIndex],
                    name: fileName,
                    content: text
                };
                return [...updated]; // יכריח רינדור חדש
            });
        }
    };

    const saveAs = () => {
        const newName = prompt("הכניסי שם חדש לקובץ:");
        if (newName) {
            localStorage.setItem(newName, JSON.stringify(text));
            setFileName(newName); alert("הקובץ נשמר בשם חדש!");
            // Update openTexts with new name 
            setOpenTexts((prev) => prev.map((t) => t.content === text ?
                { ...t, name: newName } : t));
        }
    };

    const closeFile = (index) => {
        const updated = openTexts.filter((_, i) => i !== index);
        setOpenTexts(updated);
        if (index === currentIndex) {
            setTextWithHistory([]);
            setFileName("");
            setCurrentIndex(null);
        }
    };

    const switchTab = (i) => {
        setCurrentIndex(i);
        setFileName(openTexts[i].name);
        setTextWithHistory(openTexts[i].content);
    };

    return (
        <div className="fileTools">
            <button onClick={() => setShowMenu(!showMenu)}>📁 FILE</button>

            {showMenu && (
                <div className="file-menu">
                    <button onClick={newFile}>חדש</button>
                    <button onClick={loadFileList}>פתח</button>

                    {showFiles && (
                        <div className="file-list">
                            {keys.map((key) => (
                                <button key={key} onClick={() => loadFile(key)}>
                                    {key}
                                </button>
                            ))}
                        </div>
                    )}

                    <button onClick={save}>שמור</button>
                    <button onClick={saveAs}>שמור בשם</button>
                </div>
            )}

            {/* Tabs */}
            <div className="tabs">
                {openTexts.map((t, i) => (
                    <div
                        key={i}
                        className={`tab ${i === currentIndex ? "active" : ""}`}
                        onClick={() => switchTab(i)}
                    >
                        {t.name || "Untitled"}
                        <button
                            className="close-tab"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeFile(i);
                            }}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
