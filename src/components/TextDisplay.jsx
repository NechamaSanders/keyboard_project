import React from "react";
export default function TextDisplay({ text, language, style }) {
    const direction = (language === "hebrew")
    return (
        <div className="text-display" style={{
            direction: direction ? "rtl" : "ltr",
            ...style,
        }}>
            {text.map((char, i) => (
                <span key={i} style={char.style}>
                    {char.text}
                </span>))}
            <span className="cursor"></span>
        </div>
    );
}