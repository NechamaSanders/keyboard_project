import React from "react";

export default function Header({ currentUser, setCurrentUser, setOpenTexts, setActiveIndex, setText, setHistory, setHistoryIndex, setLanguage }) {
  function handleLogout() {
    setCurrentUser("");
    setOpenTexts([
      {
        name: "Untitled 1",
        content: [],
        history: [[]],
        historyIndex: 0,
        language: "english"
      }
    ]);
    setActiveIndex(0);
    setText([]);
    setHistory([[]]);
    setHistoryIndex(0);
    setLanguage("english");
  }
  return (
    <div className="header">
      <div className="user-info">
        Hello, {currentUser}!
      </div>
      <button className="logout-btn" onClick={() => handleLogout()}>
        Logout
      </button>
    </div>
  );
}