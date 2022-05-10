import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Logo.css'
import logo from './Jeopardy.svg'
import { useDispatch } from 'react-redux'
import { resetClues } from '../../../store/reducers/jeopardy.reducer'
function Logo() {
  const nav = useNavigate()
  const dispatch = useDispatch()
  return (
    <div className='logo' onClick={() => {dispatch(resetClues());nav('/')}}>
        <img src={logo} alt="" className="logo__img" />
    </div>
  )
}

export default Logo