import React from 'react'
export default function Key({ label, text, style, setTextWithHistory }) {

    function handleKeyPress(key) {
        let newText;
        if (key === "Enter") {
          newText = [...text, { text: "\n", style: style }];
        } else if (key === "Space") {
          newText = [...text, { text: " ", style: style }];
        } else {
          newText = [...text, { text: key, style: style }];
        }
        setTextWithHistory(newText);
      }
    return (<>
        <button onClick={() => { handleKeyPress(label) }} className='key'>{label}</button>
    </>);
}