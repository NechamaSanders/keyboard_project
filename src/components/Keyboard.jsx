import React from "react";
import Key from './Key'

export default function Keyboard({ language, onKeyPress }) {
    const keyboards = {
        english: [
            ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
            ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
            ["z", "x", "c", "v", "b", "n", "m"]
        ],
        hebrew: [
            ["ק", "ר", "א", "ט", "ו", "ן", "ם", "פ"],
            ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", "ף"],
            ["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ"]
        ],
        emojis: [
            ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇"],
            ["🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚"],
            ["😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔"],
            ["🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥"],
            ["😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🥴"],
            ["😵", "🤯", "🤠", "🥳", "😎", "🤓", "🧐", "😕", "😟", "🙁"],
            ["😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥"],
            ["😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "😤"],
            ["😡", "😠", "🤬", "🤡", "💀", "☠️", "👻", "👽", "🤖", "🎃"]
        ]
    }

    const currentKeyboard = keyboards[language];
    return (
        <div>
            {currentKeyboard.map((row, i) => (
                <div key={i} style={{ marginBottom: "5px" }}>
                    {row.map((keyLabel, keyIndex) => (
                        <Key
                            key={`${i}-${keyIndex}`}
                            label={keyLabel}
                            onClick={onKeyPress}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
