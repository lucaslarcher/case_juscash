import React from 'react';
import { useDrag } from 'react-dnd';

const Card = ({ processo }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { processo: processo.processo, status: processo.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="card"
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#fff',
      }}
    >
      <h3>{processo.processo}</h3>
      <p>{processo.data_disponibilizacao}</p>
      <p>Status: {processo.status}</p>
    </div>
  );
};

export default Card;
