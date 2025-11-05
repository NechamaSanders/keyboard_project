import React, { useState } from "react";

export default function FileTools({
    currentUser,
    text,
    openTexts,
    setOpenTexts,
    activeIndex,
    setActiveIndex,
    setText,
    setHistory,
    setHistoryIndex,
}) {
    const [showFiles, setShowFiles] = useState(false);

    if (!currentUser) return null;

    const getUserData = () => {
        const data = JSON.parse(localStorage.getItem(`user:${currentUser}`));
        return data || { savedTexts: {} };
    };

    const saveUserData = (updatedFiles) => {
        const userData = getUserData();
        userData.savedTexts = updatedFiles;
        localStorage.setItem(`user:${currentUser}`, JSON.stringify(userData));
    };

    const userFiles = getUserData().savedTexts;

    const loadFile = (name) => {
        const data = userFiles[name];
        if (data) {
            const newOpenTexts = [
                { name, content: data, history: [data], historyIndex: 0 },
                ...openTexts,
            ];
            setOpenTexts(newOpenTexts);
            setActiveIndex(0);
            setText(data);
            setHistory([data]);
            setHistoryIndex(0);
            setShowFiles(false);
        }
    };

    const save = () => {
        if (activeIndex === null) return;
        const currentName = openTexts[activeIndex].name;
        if (/^Untitled \d+$/.test(currentName)) {
            saveAs();
            return;
        }
        saveUserData({ ...userFiles, [currentName]: text });
        alert("הקובץ נשמר!");
    };

    const saveAs = () => {
        if (activeIndex === null) return;
        const newName = prompt("הכניסי שם חדש לקובץ:");
        if (!newName) return;
        saveUserData({ ...userFiles, [newName]: text });

        const updatedOpenTexts = [...openTexts];
        updatedOpenTexts[activeIndex] = { ...updatedOpenTexts[activeIndex], name: newName };
        setOpenTexts(updatedOpenTexts);

        alert("הקובץ נשמר בשם חדש!");
    };

    const newFile = () => {
        const untitledCount =
            openTexts.filter((t) => t.name.startsWith("Untitled")).length + 1;
        const newText = { name: `Untitled ${untitledCount}`, content: [], history: [[]], historyIndex: 0 };
        setOpenTexts([newText, ...openTexts]);
        setActiveIndex(0);
        setText([]);
        setHistory([[]]);
        setHistoryIndex(0);
    };

    return (
        <div className="editing-tools">
            <button onClick={newFile}>חדש</button>
            <button onClick={save}>שמור</button>
            <button onClick={() => setShowFiles(!showFiles)}>פתח</button>
            <button onClick={saveAs}>שמור בשם</button>

            {showFiles && (
                <div className="file-popup">
                    {Object.keys(userFiles).length === 0 && <p>אין קבצים שמורים</p>}
                    {Object.keys(userFiles).map((key) => (
                        <div
                            key={key}
                            className="file-card"
                            onClick={() => loadFile(key)}
                        >
                            📄 {key}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
