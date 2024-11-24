import React, { useState, useEffect } from 'react';
import { getProcessos, updateProcessoStatus } from '../api/api';
import Card from './Card';
import { useDrop } from 'react-dnd';

const Board = () => {
  const [processos, setProcessos] = useState([]);

  useEffect(() => {
    const fetchProcessos = async () => {
      const processosData = await getProcessos();
      setProcessos(processosData);
    };
    fetchProcessos();
  }, []);

  const moveCard = async (id, status) => {
    await updateProcessoStatus(id, status);
    const updatedProcessos = processos.map((p) =>
      p.processo === id ? { ...p, status } : p
    );
    setProcessos(updatedProcessos);
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => moveCard(item.processo, item.status),
  });

  // Adicionando uma classe condicional para quando o item está sendo arrastado
  const boardStyle = isOver ? { border: '2px dashed #000' } : {};

  return (
    <div className="board" ref={drop} style={boardStyle}>
      <div className="column">
        <h2>Nova Publicação</h2>
        {processos
          .filter((p) => p.status === 'em andamento')
          .map((processo) => (
            <Card
              key={processo.processo}
              processo={processo}
              onClick={(processo) => alert(JSON.stringify(processo))}
            />
          ))}
      </div>

      <div className="column">
        <h2>Publicação Lida</h2>
        {processos
          .filter((p) => p.status === 'lida')
          .map((processo) => (
            <Card
              key={processo.processo}
              processo={processo}
              onClick={(processo) => alert(JSON.stringify(processo))}
            />
          ))}
      </div>

      <div className="column">
        <h2>Enviado para Advogado Responsável</h2>
        {processos
          .filter((p) => p.status === 'enviado')
          .map((processo) => (
            <Card
              key={processo.processo}
              processo={processo}
              onClick={(processo) => alert(JSON.stringify(processo))}
            />
          ))}
      </div>

      <div className="column">
        <h2>Concluído</h2>
        {processos
          .filter((p) => p.status === 'concluído')
          .map((processo) => (
            <Card
              key={processo.processo}
              processo={processo}
              onClick={(processo) => alert(JSON.stringify(processo))}
            />
          ))}
      </div>
    </div>
  );
};

export default Board;