import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeGameStatus, colorChanger, corrects, incorrects, setCurrentClue } from '../../store/reducers/jeopardy.reducer';
import './CardModal.css'

function CardModal({ clues, setCurrentPoints, setAnswered, setAnswerStatus, close, timer, value, category }) {
  const [answer, setAnswer] = useState('');


  const submitHandler = (e) => {
    dispatch(setCurrentClue(clues.id));
    e.preventDefault();
    if (answer !== cleanseAnswer(clues.answer)) {
      dispatch(incorrects(clues?.value));
      setAnswerStatus(false);
      dispatch(colorChanger(false));
      dispatch(changeGameStatus(false))
    } else if (answer === cleanseAnswer(clues.answer)) {
      dispatch(corrects(clues?.value));
      setAnswerStatus(true);
      dispatch(colorChanger(true));
    }
    close()
    setAnswered(true);
    setCurrentPoints(clues?.value);
    setAnswer('')
    
  };

  const dispatch = useDispatch()




  const cleanseAnswer = (input) => {
    input = input.replace("<i>", "");
    input = input.replace("</i>", "");
    return input.trim();
  }
  return (
    <div className='card-modal'>
      <p onClick={submitHandler} className='close'>×</p>
      <div className='card-modal__header'>
        <h3 className='category-title'>{category}</h3>
        <h4>{clues.value}</h4>
      </div>
      <h5>{clues.answer}</h5>
      <div className="">
        <h2 className='clue'>{clues.question}</h2>
        <p className='timer'> Осталось:
          {timer}
        </p>
        <form autoComplete='off' onSubmit={submitHandler} className='quiz-ques'>
          <input
            autoFocus
            className='answer-inp'
            type="text"
            value={answer}
            onChange={e => setAnswer(e.target.value)} />
          <button className='submit-btn' type='submit'>Ответить</button>
        </form>
      </div>
    </div>
  )
}

export default CardModal