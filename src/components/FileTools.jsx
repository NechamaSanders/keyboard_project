import React from 'react'
import { useState } from "react";
export default function FileTools({ text, setTextWithHistory,openTexts,setOpenTexts }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showFiles, setShowFiles] = useState(false);
    const [fileName, setFileName] = useState('');
    const loadFileList = () => {
        setShowFiles(!showFiles)

    }
    const loadFile = (name) => {
        const data = localStorage.getItem(name);
        console.log(data)
        if (data) {
            setTextWithHistory(JSON.parse(data));
            setFileName(name);
        }
    };
    const save = () => {
        if (!fileName) {
            alert("יש להזין שם קובץ לפני השמירה");
            return;
        }
        localStorage.setItem(fileName, JSON.stringify(text));
        alert("הקובץ נשמר!");
    };

    const saveAs = () => {
        const newName = prompt("הכניסי שם חדש לקובץ:");
        if (newName) {
            localStorage.setItem(newName, JSON.stringify(text));
            setFileName(newName);
        }
    };
    const keys = Object.keys(localStorage);
    const openFile = () => {setOpenTexts([...openTexts, []])

    }
    return (
        <div className="fileTools">
            <button onClick={() => setShowMenu(!showMenu)}>
                📁 FILE
            </button>
            {showMenu && (
                <div>
                    {/* <button onClick={newFile}>קובץ חדש</button>*/}
                    <button onClick={loadFileList}>פתח</button>
                    {showFiles && (
                        <div className="file-list">
                            <button onClick={openFile}>+</button>
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
        </div>
    )
}
