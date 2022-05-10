import React from 'react'

import './Backdrop.css';

function BackDrop({ show }) {
  return show ? <div className="back-drop" /> : null;
}

export default BackDrop
