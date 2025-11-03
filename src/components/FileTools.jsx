import React, { useState } from "react";

export default function FileTools({ text, setTextWithHistory, openTexts, setOpenTexts, activeIndex, setActiveIndex }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showFiles, setShowFiles] = useState(false);
    const [fileName, setFileName] = useState("");

    const keys = Object.keys(localStorage);

    const loadFileList = () => setShowFiles(!showFiles);

    const loadFile = (name) => {
        const data = localStorage.getItem(name);
        if (data) {
            const parsed = JSON.parse(data);
            const newTab = { 
                name, 
                content: parsed, 
                history: [[], parsed], 
                historyIndex: 1 
            };
            setOpenTexts(prev => [...prev, newTab]);
            setActiveIndex(openTexts.length);
            setFileName(name);
            setTextWithHistory(parsed);
        }
    };

    const newFile = () => {
        const untitledCount = openTexts.filter(t => t.name.startsWith("Untitled")).length + 1;
        const newTab = { 
            name: `Untitled ${untitledCount}`, 
            content: [], 
            history: [[]], 
            historyIndex: 0 
        };
        setOpenTexts(prev => [newTab, ...prev]);
        setActiveIndex(0);
        setFileName(newTab.name);
        setText([]);
    };

    const save = () => {
        if (!fileName || /^Untitled \d+$/.test(fileName)) {
            alert("יש להזין שם לקובץ או להשתמש ב'שמור בשם'");
            return;
        }

        localStorage.setItem(fileName, JSON.stringify(text));
        alert("הקובץ נשמר!");

        if (activeIndex !== null) {
            setOpenTexts(prev => {
                const updated = [...prev];
                updated[activeIndex] = {
                    ...updated[activeIndex],
                    name: fileName,
                    content: text
                };
                return updated;
            });
        }
    };

   const saveAs = () => {
    const newName = prompt("הכניסי שם חדש לקובץ:");
    if (newName) {
        localStorage.setItem(newName, JSON.stringify(text));
        setFileName(newName);
        alert("הקובץ נשמר בשם חדש!");
        
        if (activeIndex !== null) {
            setOpenTexts(prev => {
                const updated = [...prev];
                updated[activeIndex] = {
                    name: newName,
                    content: text
                };
                return updated;
            });
        }
    }
};

    const closeFile = (index) => {
        const updated = openTexts.filter((_, i) => i !== index);
        setOpenTexts(updated);
        

        
        if (index === activeIndex) {
            setTextWithHistory([]);
            setFileName("");
            setActiveIndex(null);
        }
    };

    const switchTab = (i) => {
        setActiveIndex(i);
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
                        className={`tab ${i === activeIndex ? "active" : ""}`}
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
