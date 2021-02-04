import React from 'react'

const Button = ({color,text,OnClick}) => {
    return (
        <div>
             <button onClick = {OnClick} className='btn' style = {{backgroundColor : color}}>{text}</button>
        </div>
    )
}

export default Button
