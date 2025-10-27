// TextDisplay.jsx
import React from "react";
import "./TextDisplay.css";
export default function TextDisplay({ text, language }) {
    const direction = (language === "hebrew")
    return (
        <div className="text-display" style={{
            direction: direction ? "rtl" : "ltr",
        }}>
            {text}
            <span className="cursor"></span>
        </div>
    );
}
