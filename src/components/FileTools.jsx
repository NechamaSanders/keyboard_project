// import React from 'react'
// import { useState } from "react";
// export default function FileTools({ text, setTextWithHistory,openTexts,setOpenTexts }) {
//     const [showMenu, setShowMenu] = useState(false);
//     const [showFiles, setShowFiles] = useState(false);
//     const [fileName, setFileName] = useState('');
//     const loadFileList = () => {
//         setShowFiles(!showFiles)

//     }
//     const loadFile = (name) => {
//         const data = localStorage.getItem(name);
//         console.log(data)
//         if (data) {
//             setTextWithHistory(JSON.parse(data));
//             setFileName(name);
//         }
//     };
//     const save = () => {
//         if (!fileName) {
//             alert("יש להזין שם קובץ לפני השמירה");
//             return;
//         }
//         localStorage.setItem(fileName, JSON.stringify(text));
//         alert("הקובץ נשמר!");
//     };

//     const saveAs = () => {
//         const newName = prompt("הכניסי שם חדש לקובץ:");
//         if (newName) {
//             localStorage.setItem(newName, JSON.stringify(text));
//             setFileName(newName);
//         }
//     };
//     const keys = Object.keys(localStorage);
//     const openFile = () => {setOpenTexts([...openTexts, []])

//     }
//     return (
//         <div className="fileTools">
//             <button onClick={() => setShowMenu(!showMenu)}>
//                 📁 FILE
//             </button>
//             {showMenu && (
//                 <div>
//                     {/* <button onClick={newFile}>קובץ חדש</button>*/}
//                     <button onClick={loadFileList}>פתח</button>
//                     {showFiles && (
//                         <div className="file-list">
//                             <button onClick={openFile}>+</button>
//                             {keys.map((key) => (
//                                 <button
//                                     key={key}
//                                     onClick={() => loadFile(key)}
//                                 >
//                                     {key}
//                                 </button>
//                             ))}
//                         </div>
//                     )}
//                     <button onClick={save}>שמור</button>
//                     <button onClick={saveAs}>שמור בשם</button>

//                 </div>
//             )}
//         </div>
//     )
// }
import React, { useState } from "react";

export default function FileTools({ text, setTextWithHistory, openTexts, setOpenTexts }) {
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
            setOpenTexts([...openTexts, { name, content: parsed }]);
            setFileName(name);
        }
    };

    // Save (overwrite current file)
    const save = () => {
        const regex = /^Untitled \d+$/;
        if (regex.test(fileName)) {
            alert("יש להזין שם קובץ לפני השמירה");
            return;
        }
        console.log(fileName)
        localStorage.setItem(fileName, JSON.stringify(text));
        alert("הקובץ נשמר!");
        // Update openTexts entry name if it was Untitled
        setOpenTexts((prev) =>
            prev.map((t) =>
                t.content === text ? { ...t, name: fileName } : t
            )
        );
    };

    // Save as (new name)
    const saveAs = () => {
        const newName = prompt("הכניסי שם חדש לקובץ:");
        if (newName) {
            localStorage.setItem(newName, JSON.stringify(text));
            setFileName(newName);
            alert("הקובץ נשמר בשם חדש!");
            // Update openTexts with new name
            setOpenTexts((prev) =>
                prev.map((t) =>
                    t.content === text ? { ...t, name: newName } : t
                )
            );
        }
    };

    // New empty text
    const newFile = () => {
        const untitledCount = openTexts.filter(t => t.name.startsWith("Untitled")).length + 1;
        setOpenTexts([...openTexts, { name: `Untitled ${untitledCount}`, content: [] }]);
    };

    // Close a text
    const closeFile = (index) => {
        const updated = openTexts.filter((_, i) => i !== index);
        setOpenTexts(updated);
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
