import React from 'react'
import { useState } from "react";
export default function FileTools({ text, setTextWithHistory }) {
    const [showMenu, setShowMenu] = useState(false);
    const [fileName, setFileName] = useState('');

    const save = () => {

    }
      const saveAs = () => {
        const newName = prompt("הכניסי שם חדש לקובץ:");
        if (newName) {
            localStorage.setItem(newName, JSON.stringify(text));
            setFileName(newName);
        }
    };
    return (
        <div className="fileTools">
            <button onClick={() => setShowMenu(!showMenu)}>
                📁 FILE
            </button>
            {showMenu && (
                <div>
                    {/* <button onClick={newFile}>קובץ חדש</button>
                    <button onClick={loadFileList}>פתח</button> */}
                    <button onClick={save}>שמור</button>
                    <button onClick={saveAs}>שמור בשם</button>
                  
                </div>
            )}
        </div>
    )
}