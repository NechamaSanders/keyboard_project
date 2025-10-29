export default function DesignTools({ style, setStyle, text, setTextWithHistory }) {
    function changeColor(color) {
        setStyle((prev) => ({ ...prev, color }));
    }

    function changeFont(fontFamily) {
        setStyle((prev) => ({ ...prev, fontFamily }));
    }
    
    function changeSize(fontSize) {
        setStyle((prev) => ({ ...prev, fontSize }));
    }

    function toggleBold() {
        setStyle((prev) => ({
            ...prev,
            fontWeight: prev.fontWeight === "bold" ? "normal" : "bold",
        }));
    }

    function toggleItalic() {
        setStyle((prev) => ({
            ...prev,
            fontStyle: prev.fontStyle === "italic" ? "normal" : "italic",
        }));
    }
    
    function applyToAll() {
        setTextWithHistory(text.map(c => ({ ...c, style: style })));
    }
    
    return (
        <div className="editing-tools">
            <select onChange={(e) => changeFont(e.target.value)} value={style.fontFamily}>
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
                <option value="Courier New">Courier New</option>
                <option value="Tahoma">Tahoma</option>
            </select>
            <button onClick={applyToAll}>Apply to all</button>
            <select
                value={style.color}
                onChange={(e) => changeColor(e.target.value)}
                style={{ marginBottom: 10 }}
            >
                <option value="red">Red</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
                <option value="pink">Pink</option>
                <option value="black">Black</option>
                <option value="brown">Brown</option>
                <option value="gray">Gray</option>
            </select>
            <select
                value={style.fontSize}
                onChange={(e) => changeSize(e.target.value)}
                style={{ marginBottom: 10 }}
            >
                <option value="10px">10</option>
                <option value="11px">11</option>
                <option value="12px">12</option>
                <option value="14px">14</option>
                <option value="16px">16</option>
                <option value="18px">18</option>
                <option value="20px">20</option>
                <option value="22px">22</option>
                <option value="24px">24</option>
                <option value="26px">26</option>
            </select>
            <button onClick={toggleBold}><b>B</b></button>
            <button onClick={toggleItalic}><i>I</i></button>
        </div>
    );
}