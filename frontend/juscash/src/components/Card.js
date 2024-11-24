import React from 'react';
import { useDrag } from 'react-dnd';

const Card = ({ processo, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { processo: processo.processo, status: processo.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // A função handleClick chama o onClick passado como prop
  const handleClick = () => {
    onClick(processo);  // Chamando a função openModal com o processo
  };

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
      onClick={handleClick}  // Adicionando o evento de clique
    >
      <h3>{processo.processo}</h3>
      <p>{processo.data_disponibilizacao}</p>
      <p>Status: {processo.status}</p>
    </div>
  );
};

export default Card;