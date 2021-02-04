import React from 'react'
import Button from './Button'
import {useLocation} from 'react-router-dom'

const Header = ({title,onAdd,show}) => {

  const location = useLocation();
    return (
        <header className='header'>
            <h1>{title}</h1>
           {location.pathname==='/'?(<Button color = {`${show ? 'red' :'green'}`} text = {show ?'Close' :'Add'} OnClick = {onAdd}/>):''}
        </header>
    )
}

export default Header
