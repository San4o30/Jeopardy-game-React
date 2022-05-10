import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/UI/Modal/Modal';
import { changeGameStatus, clearCurrentGame, setClock, setUserName } from '../../store/reducers/jeopardy.reducer';
import './Home.css'
function Home() {
  const [show, setShow] = useState(true);
  const [user, setUser] = useState('')
  const [userValid, setUserValid] = useState(false)
  const [userValidError, setUserValidError] = useState('Valid')


  const changeHandler = (e) => {
    setUser(e.target.value)
    const res = /^[А-яA-z0-9_.]+$/.exec(user);
    if (!res) {
      setUserValid(true)
      setUserValidError('Некорректное имя')
    } else {
      setUserValidError('')
      setUserValid(false)
    }
  }

  const dispatch = useDispatch()
  const startGame = (play) => {

    setShow(true)
    if (play === false) {
      dispatch(changeGameStatus(play));
      dispatch(clearCurrentGame());
    } else {
      dispatch(changeGameStatus(play));
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (userValid === false) {
      setShow(false);
      nav('/game')
      const now = new Date().toLocaleString();
      dispatch(setClock(now));
      dispatch(changeGameStatus(true))
    }
  }

  const nav = useNavigate()
  return (
    <div className='home'>
      <button className='continued-btn mt' onClick={() => startGame(true)}>Играть</button>
      <Modal show={show} close={() => setShow(false)}>
        <div className='login'>
          <form className="form" onSubmit={submitHandler}>
            {(userValid && userValidError) && <div style={{ color: "red" }}>{userValidError}</div>}
            <label htmlFor="login">Как вас зовут</label>
            <input
              value={user}
              name='user'
              type="text"
              id='login'
              onChange={e => changeHandler(e)}
              placeholder='Имя'
              required="user"
            />
            <input onClick={() => dispatch(setUserName(user))} className='continued-btn' type="submit" value="Войти" />
          </form>
        </div>
      </Modal>

    </div>
  )



}

export default Home