import React from 'react'
export default function Key({ label, onClick }) {

    return (<>
        <button onClick={() => { onClick(label) }} className='key'>{label}</button>
    </>);
}