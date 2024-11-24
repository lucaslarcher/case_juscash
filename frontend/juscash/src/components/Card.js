import React from 'react';

const Card = ({ processo, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(processo)}>
      <h3>{processo.processo}</h3>
      <p>{processo.data_disponibilizacao}</p>
    </div>
  );
};

export default Card;