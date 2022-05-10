import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'
function Navigation() {
  return (
    <div className='toolbar-nav'>
        <NavLink className='nav__link link1' to="/game">Игра</NavLink>
        <NavLink className='nav__link link2' to="/statistic">Статистика</NavLink>
    
    </div>
  )
}

export default Navigation
