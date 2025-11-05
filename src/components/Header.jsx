import React from "react";

export default function Header({ currentUser, setCurrentUser }) {
  return (
    <div className="header">
      <div className="user-info">
        Hello, {currentUser}!
      </div>
      <button className="logout-btn" onClick={() => setCurrentUser("")}>
         Logout
      </button>
    </div>
  );
}