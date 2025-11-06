import React from "react";
import TextDisplay from "./TextDisplay";

export default function TabsContainer({
  currentUser,
  openTexts,
  setOpenTexts,
  activeIndex,
  setActiveIndex,
  setText,
  setHistory,
  setHistoryIndex,
  style,
  language,
  setLanguage,
}) {
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

  const saveFile = (index) => {
    if (index === null) return;
    const currentName = openTexts[index].name;
    const currentContent = openTexts[index].content;

    if (/^Untitled \d+$/.test(currentName)) {
      const newName = prompt("הכניסי שם לקובץ:");
      saveUserData({ ...userFiles, [newName]: currentContent });

      const updatedOpenTexts = [...openTexts];
      updatedOpenTexts[index] = { ...updatedOpenTexts[index], name: newName };
      setOpenTexts(updatedOpenTexts);
    } else {
      saveUserData({ ...userFiles, [currentName]: currentContent });
    }
  };

  const closeTab = (index) => {
    const currentTab = openTexts[index];
    const savedVersion = userFiles[openTexts[index].name];
    const hasUnsavedChanges = currentTab.content.length > 0 &&
      (!savedVersion || JSON.stringify(currentTab.content) !== JSON.stringify(savedVersion));
    if (hasUnsavedChanges) {
      const shouldSave = window.confirm("There are unsaved changes in the text. Would you like to save?");
      if (shouldSave) {
        saveFile(index);
      }
    }
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

  const switchTab = (index) => {
    if (activeIndex !== null && activeIndex !== index) {
      const updated = [...openTexts];
      updated[activeIndex] = {
        ...updated[activeIndex],
        history: [...(updated[activeIndex].history || [[]])],
        historyIndex: updated[activeIndex].historyIndex || 0,
        language,
      };
      setOpenTexts(updated);
    }
    setActiveIndex(index);
    setText(openTexts[index].content);
    setHistory(openTexts[index].history || [[]]);
    setHistoryIndex(openTexts[index].historyIndex || 0);
    setLanguage(openTexts[index].language || "english");
  };

  return (
    <div className="display-section">
      {openTexts.map((t, i) => (
        <div
          key={i}
          className={`text-container ${i === activeIndex ? "active" : ""}`}
          onClick={() => switchTab(i)}
        >
          <h3 className="text-title">
            {t.name}
            <button
              className="close-tab"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(i);
              }}
            >
              ×
            </button>
          </h3>
          <TextDisplay text={t.content} language={t.language} style={style} />
        </div>
      ))}
    </div>
  );
}