import React from "react";
import Key from './Key'
export default function Keyboard({ language, setTextWithHistory, text, style }) {

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
            ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊"],
            ["😇", "🙂", "😋", "🤐", "😔", "😵", "😮", "😢", "😡"],
            ["🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚"],
            ["😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔"],
            ["🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥"],
            ["😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🥴"],
            ["🤯", "🤠", "🥳", "😎", "🤓", "🧐", "😕", "😟", "🙁"],
            ["😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥"],
            ["😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "😤"],
            ["😠", "🤬", "🤡", "💀", "☠️", "👻", "👽", "🤖", "🎃"]
        ],
        symbols: [
            ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"],
            ["-", "_", "=", "+", "[", "]", "{", "}", ";", ":"],
            ["'", '"', ",", ".", "/", "?", "\\", "|", "<", ">"],
        ],
        numbers:
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],

    };

    const chosenKeyboard = keyboards[language];

    return (
        <div className="keyboard">
            <div className="keyboard-top">
                <div style={{ marginBottom: "5px" }}>
                    {keyboards.numbers.map((keyLabel, keyIndex) => (
                        <Key
                            key={keyIndex}
                            label={keyLabel}
                            setTextWithHistory={setTextWithHistory}
                            text={text}
                            style={style}
                        />
                    ))}
                </div>

            </div>
            <div className="keyboard-scroll">
                {chosenKeyboard.map((row, i) => (
                    <div key={i} style={{ marginBottom: "5px" }}>
                        {row.map((keyLabel, keyIndex) => (
                            <Key
                                key={`${i}-${keyIndex}`}
                                label={keyLabel}
                                setTextWithHistory={setTextWithHistory}
                                text={text}
                                style={style}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className="keyboard-bottom">
                <Key label="Space" setTextWithHistory={setTextWithHistory} text={text} style={style} />
                <Key label="Enter" setTextWithHistory={setTextWithHistory} text={text} style={style} />
            </div>
        </div>
    );
}