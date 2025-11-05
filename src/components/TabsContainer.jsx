import React from "react";

export default function TabsContainer({
  currentUser,
  text,
  openTexts,
  setOpenTexts,
  activeIndex,
  setActiveIndex,
  setText,
  setHistory,
  setHistoryIndex,
  tabIndex,
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
  const saveFile = () => {
    if (activeIndex === null) return;
    const currentName = openTexts[activeIndex].name;
    if (/^Untitled \d+$/.test(currentName)) {
      const newName = prompt("הכניסי שם לקובץ:");
      if (!newName) return;
      saveUserData({ ...userFiles, [newName]: text });

      const updatedOpenTexts = [...openTexts];
      updatedOpenTexts[activeIndex] = { ...updatedOpenTexts[activeIndex], name: newName };
      setOpenTexts(updatedOpenTexts);
    } else {
      saveUserData({ ...userFiles, [currentName]: text });
    }
  };

  const closeTab = (index) => {
    const currentTab = openTexts[index];
    const hasContent = currentTab.content && currentTab.content.length > 0;
    if (hasContent) {
      const shouldSave = window.confirm("יש תוכן בטאב. האם לשמור לפני סגירה?");
      if (shouldSave) {
        const oldActiveIndex = activeIndex;
        const oldText = text;
        setActiveIndex(index);
        setText(currentTab.content);
        saveFile();
        if (oldActiveIndex !== index) {
          setActiveIndex(oldActiveIndex);
          setText(oldText);
        }
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



  return (
    <button
      className="close-tab"
      onClick={(e) => {
        e.stopPropagation();
        closeTab(tabIndex);
      }}
    >
      ×
    </button>
  );
}