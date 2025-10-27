import React from 'react'
import "./key.css";
export default function Key({label, onClick}) {
    return (<>
        <button onClick={() => { onClick(label) }} className='key'>{label}</button>
    </>);
}