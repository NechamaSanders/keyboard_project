
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
  const [showMenu, setShowMenu] = useState(false);
  const [showFiles, setShowFiles] = useState(false);

  if (!currentUser) return null; // safety check

  // Helper to get current user's data
  const getUserData = () => {
    const data = JSON.parse(localStorage.getItem(`user:${currentUser}`));
    return data || { email: "", password: "", savedTexts: {} };
  };

  // Helper to save updated user data
  const saveUserData = (updatedFiles) => {
    const userData = getUserData();
    userData.savedTexts = updatedFiles;
    localStorage.setItem(`user:${currentUser}`, JSON.stringify(userData));
  };

  // Load list of user files
  const userFiles = getUserData().savedTexts;

  const loadFileList = () => setShowFiles(!showFiles);

  const loadFile = (name) => {
    const data = userFiles[name];
    if (data) {
      const parsed = data;
      const newOpenTexts = [
        { name, content: parsed, history: [parsed], historyIndex: 0 },
        ...openTexts,
      ];
      setOpenTexts(newOpenTexts);
      setActiveIndex(0);
      setText(parsed);
      setHistory([parsed]);
      setHistoryIndex(0);
    }
  };

  const save = () => {
    if (activeIndex === null) return;
    const currentName = openTexts[activeIndex].name;

    if (/^Untitled \d+$/.test(currentName)) {
      saveAs();
      return;
    }

    const updatedFiles = { ...userFiles, [currentName]: text };
    saveUserData(updatedFiles);
    alert("הקובץ נשמר!");
  };

  const saveAs = () => {
    if (activeIndex === null) return;
    const oldName = openTexts[activeIndex].name;
    const newName = prompt("הכניסי שם חדש לקובץ:")?.trim();
    if (!newName) return;

    // בדיקה אם השם כבר קיים
    if (userFiles[newName] && newName !== oldName) {
      const overwrite = confirm(`קובץ בשם "${newName}" כבר קיים. האם לדרוס אותו?`);
      if (!overwrite) return;
    }

    const updatedFiles = { ...userFiles, [newName]: text };
    
    // מחק את הקובץ הישן אם השם השתנה וזה לא Untitled
    if (oldName !== newName && !oldName.startsWith("Untitled")) {
      delete updatedFiles[oldName];
    }
    
    saveUserData(updatedFiles);

    const updatedOpenTexts = [...openTexts];
    updatedOpenTexts[activeIndex] = {
      ...updatedOpenTexts[activeIndex],
      name: newName,
    };
    setOpenTexts(updatedOpenTexts);

    alert("הקובץ נשמר בשם חדש!");
  };

  const newFile = () => {
    const untitledCount =
      openTexts.filter((t) => t.name.startsWith("Untitled")).length + 1;
    const newText = {
      name: `Untitled ${untitledCount}`,
      content: [],
      history: [[]],
      historyIndex: 0,
    };
    setOpenTexts([newText, ...openTexts]);
    setActiveIndex(0);
    setText([]);
    setHistory([[]]);
    setHistoryIndex(0);
  };

  const closeFile = (index) => {
    const updated = openTexts.filter((_, i) => i !== index);
    setOpenTexts(updated);

    if (activeIndex === index) {
      if (updated.length > 0) {
        setActiveIndex(0);
        setText(updated[0].content);
        setHistory(updated[0].history || [[]]);
        setHistoryIndex(updated[0].historyIndex || 0);
      } else {
        setActiveIndex(null);
        setText([]);
        setHistory([[]]);
        setHistoryIndex(0);
      }
    } else if (activeIndex > index) {
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
              {Object.keys(userFiles).map((key) => (
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

      <div className="tabs">
        {openTexts.map((t, i) => (
          <div
            key={i}
            className={`tab ${i === activeIndex ? "active" : ""}`}
            onClick={() => {
              setActiveIndex(i);
              setText(t.content);
              setHistory(t.history || [[]]);
              setHistoryIndex(t.historyIndex || 0);
            }}
          >
            {t.name}
            <button className="close-tab" onClick={() => closeFile(i)}>
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
