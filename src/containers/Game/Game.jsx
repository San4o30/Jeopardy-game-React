import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CardModal from '../../components/CardModal/CardModal';
import Modal from '../../components/UI/Modal/Modal';
import { corrects, incorrects } from '../../store/reducers/jeopardy.reducer';
import './Game.css'
function Game() {

  const [show, setShow] = useState(false);
  const [currentClue, setCurrentClue] = useState(null)
  const [seconds, setSeconds] = useState(60)
  const [isCounting, setIsCounting] = useState(false)
  const [value, setValue] = useState('');
  const [currentCategory, setCurrentCategory] = useState(null)
  const [answered, setAnswered] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(0);



  const dispatch = useDispatch()


  const categories = useSelector(store => store.jeopardy.categories)
  const currGame = useSelector((store) => store.jeopardy.currentGame);
  const clues = useSelector((store) => store.jeopardy.clues);
  const answer = useSelector((store) => store.jeopardy.answer);




  const getCategory = (id) => {
    setCurrentCategory(categories[id]);
  };

  const onClickClue = (clue, i) => {
    setCurrentClue(clue)
    setShow(true)
    setIsCounting(true)
    setValue(clue.value)
    getCategory(i)
  }

  const nav = useNavigate()

  useEffect(() => {
    if (currGame.attemps === 25) {
      nav('/statistic')
    }
    const interval = setInterval(() => {
      isCounting &&
        setSeconds(seconds => (seconds > 0 ? seconds - 1 : timeReset()))
    }, 1000);
    return () => {
      clearInterval(interval)
    }

  }, [isCounting])

  const timeReset = () => {
    setShow(false)
    setSeconds(60)
    setIsCounting(false)
    if (answer !== currentClue.answer) {
      dispatch(incorrects(currentClue?.value));
      setAnswerStatus(false);
    } else if (answer === currentClue.answer) {
      dispatch(corrects(currentClue?.value));
      setAnswerStatus(true);
    }
  }



  return (
    <div className='board'>
      {categories &&
        categories.map((cat, i) => (
          <div key={i} className='categories'>
            <p className='category-title'>{cat}</p>
            <div className='category'>
              {clues &&
                clues[i].map((clue, index) => (
                  <div key={index}>
                    {clue.right === true && (
                      <p className=" value correct-answer">
                        Верно
                      </p>
                    )}
                    {clue.right === false && (
                      <p className=" value fail">
                        Неверно
                      </p>
                    )}
                    {clue.right === null && (
                      <button
                        className="value"
                        onClick={() => onClickClue(clue, i)}
                      >
                        {clue.value}
                      </button>
                    )}
                  </div>
                ))
              }
              {currentClue && (
                <Modal show={show}>
                  <CardModal
                    timer={seconds}
                    close={() => { setShow(false); setSeconds(60); setIsCounting(false) }}
                    clues={currentClue}
                    category={currentCategory}
                    value={value}
                    setAnswerStatus={setAnswerStatus}
                    setAnswered={setAnswered}
                    setCurrentPoints={setCurrentPoints}
                  />
                </Modal>
              )
              }
            </div>
          </div>
        ))
      }
      <div className='game-end'>
        {answer &&
          <div className="correctness">
            {answerStatus ?
              <>
                <p>Ответ правильный!</p>
                <p>+ {value}</p>
              </> :
              <>
                <p className='incorrect'>Ответ неправильный!</p>
                <p className='incorrect'>- {value}</p>
              </>
            }
          </div>}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p className='score'>Счет: {currGame.points}</p>
          <Link to='/statistic' className=' statistic-btn end'>Завершить игру</Link>
        </div>
      </div>
    </div>
  )
}

export default Game



