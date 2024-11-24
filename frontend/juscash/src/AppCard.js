import React from 'react';
import './styles/AppCard.css';
import Board from './components/Board';

function AppCard() {
  return (
    <div className="App">
      <h1>Publicações</h1>
      <Board />
    </div>
  );
}

export default AppCard;