import React, { useState } from "react";

export default function FileTools({ text, setTextWithHistory, openTexts, setOpenTexts, activeIndex, setActiveIndex, setText, setHistory, setHistoryIndex }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showFiles, setShowFiles] = useState(false);
    const [fileName, setFileName] = useState("");

    const keys = Object.keys(localStorage);

    // Open list of saved files
    const loadFileList = () => setShowFiles(!showFiles);

    // Load one file → add it as a new open text
    const loadFile = (name) => {
        const data = localStorage.getItem(name);
        if (data) {
            const parsed = JSON.parse(data);
            setOpenTexts([{ name, content: parsed, history: [parsed], historyIndex: 0 }, ...openTexts]);
            setActiveIndex(0);
            setFileName(name);
            setText(parsed);
            setHistory([parsed]);
            setHistoryIndex(0);
        }
    };

    // Save (overwrite current file)
    const save = () => {
        // בדיקה שיש טאב פעיל
        if (activeIndex === null || activeIndex === undefined || !openTexts[activeIndex]) {
            alert("אין טאב פעיל לשמירה");
            return;
        }
        
        const currentTabName = openTexts[activeIndex].name;
        
        // If it's still a default "Untitled X", force Save As
        if (/^Untitled \d+$/.test(currentTabName)) {
            saveAs();
            return;
        }
        
        localStorage.setItem(currentTabName, JSON.stringify(text));
        alert("הקובץ נשמר!");
    };

    // Save as (new name)
    const saveAs = () => {
        // בדיקה שיש טאב פעיל
        if (activeIndex === null || activeIndex === undefined || !openTexts[activeIndex]) {
            alert("אין טאב פעיל לשמירה");
            return;
        }
        
        const oldName = openTexts[activeIndex].name;
        const newName = prompt("הכניסי שם חדש לקובץ:")?.trim();
        
        if (newName && newName !== oldName) {
            // בדיקה אם השם כבר קיים
            if (localStorage.getItem(newName)) {
                const overwrite = confirm(`קובץ בשם "${newName}" כבר קיים. האם לדרוס אותו?`);
                if (!overwrite) return;
            }
            
            // מחק את הקובץ הישן אם השם השתנה וזה לא Untitled
            if (oldName && !oldName.startsWith("Untitled")) {
                localStorage.removeItem(oldName);
            }
            
            // שמור בשם החדש
            localStorage.setItem(newName, JSON.stringify(text));
            setFileName(newName);
            alert("הקובץ נשמר בשם חדש!");
            
            // עדכן את שם הטאב
            setOpenTexts((prev) => {
                const updated = [...prev];
                updated[activeIndex] = { ...updated[activeIndex], name: newName };
                return updated;
            });
        }
    };

    // New empty text
    const newFile = () => {
        const untitledCount = openTexts.filter(t => t.name.startsWith("Untitled")).length + 1;
        const newName = `Untitled ${untitledCount}`;
        setOpenTexts([{ name: newName, content: [], history: [[]], historyIndex: 0 }, ...openTexts]);
        setActiveIndex(0);
        setFileName(newName);
        setText([]);
        setHistory([[]]);
        setHistoryIndex(0);
    };

    // Close a text
    const closeFile = (index) => {
        const updated = openTexts.filter((_, i) => i !== index);
        setOpenTexts(updated);
        
        // עדכון activeIndex
        if (updated.length === 0) {
            setActiveIndex(null);
            setText([]);
            setHistory([[]]);
            setHistoryIndex(0);
        } else if (index === activeIndex) {
            // אם סגרנו את הטאב הפעיל, עבור לטאב הקודם או הבא
            const newActiveIndex = index > 0 ? index - 1 : 0;
            setActiveIndex(newActiveIndex);
            setText(updated[newActiveIndex].content);
            setHistory(updated[newActiveIndex].history || [[]]);
            setHistoryIndex(updated[newActiveIndex].historyIndex || 0);
        } else if (index < activeIndex) {
            // אם סגרנו טאב לפני הפעיל, הקטן את האינדקס
            setActiveIndex(activeIndex - 1);
        }
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
                                <button
                                    key={key}
                                    onClick={() => loadFile(key)}
                                >
                                    {key}
                                </button>
                            ))}
                        </div>
                    )}

                    <button onClick={save}>שמור</button>
                    <button onClick={saveAs}>שמור בשם</button>
                </div>
            )}

            {/* Tabs for open texts */}
            <div className="tabs">
                {openTexts.map((t, i) => (
                    <div key={i} className="tab">
                        {t.name}
                        <button
                            className="close-tab"
                            onClick={() => closeFile(i)}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}