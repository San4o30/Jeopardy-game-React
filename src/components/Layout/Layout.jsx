import React, { useEffect } from 'react'
import Toolbar from './Toolbar/Toolbar'
import './Layout.css'
import { useDispatch } from 'react-redux'
import { setClues } from '../../store/reducers/jeopardy.reducer'

function Layout(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    const categoriesID = [11551, 11502, 11539, 11529, 7824]
    const fetchCategories = () => {
      const allCategories = categoriesID.map(category_id => {
        return new Promise(resolve => {
          fetch(`https://jservice.io/api/category?id=${category_id}`)
            .then(response => response.json()).then(data => {
              resolve(data);
            });
        });
      });
      Promise.all(allCategories).then(results => {        
        dispatch(setClues(results))
      });

    }
    fetchCategories()
  }, [dispatch])
  return (
    <>
      <Toolbar />
      <main className="main-wrapper">
        {props.children}
      </main>
    </>
  )
}

export default Layout
