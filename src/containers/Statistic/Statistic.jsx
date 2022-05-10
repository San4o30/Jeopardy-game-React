import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { changeGameStatus, cleanHistory, clearCurrentGame, endGame, resetClues, setClockEnd, setClues } from '../../store/reducers/jeopardy.reducer';
import './Statistic.css'
function Statisctic() {
  const nav = useNavigate()
  const result = useSelector(store => store.jeopardy.currentGame)
  const history = useSelector(store => store.jeopardy.history)
  const dispatch = useDispatch()
  const gameOver = () => {
    const now = new Date().toLocaleString();
    dispatch(setClockEnd(now));
    dispatch(endGame())
    dispatch(clearCurrentGame())
    dispatch(changeGameStatus(false));
    dispatch(clearCurrentGame())
    dispatch(resetClues())
    nav('/')
    
  }

  
  return (
    <div className='statistic__wrapper'>
        <h1>Имя игрока: {result.user}</h1>
      <div className='current-statistic'>
        <h1>Текущая игра</h1>
        <div className='statistic-main'>
          <div className='column'>
            <p className='statistic-title first'>Кол-во вопросов</p>
            <p>{result.attemps}</p>
          </div>
          <div className='column'>
            <p className='statistic-title'>Верные ответы</p>
            <p>{result.correct}</p>
          </div>
          <div className='column'>
            <p className='statistic-title'>Неверные ответы</p>
            <p>{result.incorrect}</p>
          </div>
          <div className='column'>
            <p className='statistic-title'>Сумма баллов</p>
            <p>{result.points}</p>
          </div>
          <div className='column'>
            <p className='statistic-title'>Создано</p>
            <p>{result.clock}</p>
          </div>
          <div className="column">
            <p className='statistic-title last'>Действия</p>
            <div className='btnHandler'>
              <button onClick={gameOver} className='statistic-btn end'>Завершить</button>
              <Link to='/game' className='statistic-btn continue'>Продолжить</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="statistic-history">
        <div className='statistic-header'>
          <h1>История игр</h1>
          <button onClick={() => dispatch(cleanHistory())} className='statistic-btn end'>Очистить историю</button>
        </div>
        <div className='statistic-main'>
        <div className='column'>
            <p className='statistic_title first'>Имя игрока:</p>
            {history.map((stat, index) => (
              <p key={index}>{stat.user}</p>
            ))
            }
          </div>
          <div className='column'>
            <p className='statistic_title first'>Кол-во вопросов</p>
            {history.map((stat, index) => (
              <p key={index}>{stat.attemps}</p>
            ))
            }
          </div>
          <div className='column'>
            <p className='statistic_title'>Верные ответы</p>
            {history.map((stat, index) => (
              <p key={index}>{stat.correct}</p>
            ))
            }
          </div>
          <div className='column'>
            <p className='statistic_title'>Неверные ответы</p>
            {history.map((stat, index)=> (
              <p key={index}>{stat.incorrect}</p>
            ))
            }
          </div>
          <div className='column'>
            <p className='statistic_title'>Сумма баллов</p>
            {history.map((stat, index)=> (
              <p key={index}>{stat.points}</p>
            ))
            }
          </div>
          <div className='column'>
            <p className='statistic_title pd'>Создано</p>

            {history.map((stat, index) => (
              <p className='created' key={index}>{stat.clock[0]}</p>
            ))
            }
          </div>
          <div className="column">
            <p className='statistic_title last'>Действия</p>
            {history.map((stat, index) => (
              <p key={index}>{stat.clockEnd[0]}</p>
            ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statisctic