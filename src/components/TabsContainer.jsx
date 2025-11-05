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
    
    // בדיקה אם יש תוכן בטאב (אם יש תוכן = יש שינויים)
    const hasContent = currentTab.content && currentTab.content.length > 0;
    
    if (hasContent) {
      const shouldSave = window.confirm("יש תוכן בטאב. האם לשמור לפני סגירה?");
      if (shouldSave) {
        // שמירה זמנית של הטאב הפעיל
        const oldActiveIndex = activeIndex;
        const oldText = text;
        
        // מעבר לטאב שרוצים לסגור
        setActiveIndex(index);
        setText(currentTab.content);
        
        // שמירה
        saveFile();
        
        // חזרה לטאב הקודם
        if (oldActiveIndex !== index) {
          setActiveIndex(oldActiveIndex);
          setText(oldText);
        }
      }
    }

    // סגירת הטאב
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
    setActiveIndex(index);
    setText(openTexts[index].content);
    setHistory(openTexts[index].history || [[]]);
    setHistoryIndex(openTexts[index].historyIndex || 0);
  };

  return (
    <div className="tabs">
      {openTexts.map((t, i) => (
        <div
          key={i}
          className={`tab ${i === activeIndex ? "active" : ""}`}
          onClick={() => switchTab(i)}
        >
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
        </div>
      ))}
    </div>
  );
}