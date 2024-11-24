import React, { useState, useEffect } from 'react';
import { getProcessos, updateProcessoStatus } from '../api/api';
import Card from './Card';
import { useDrop } from 'react-dnd';
import '../styles/Board.css'; 


const Board = () => {
  const [processos, setProcessos] = useState([]);
  const [modalProcesso, setModalProcesso] = useState(null);

  // Carregar os processos do backend
  useEffect(() => {
    const fetchProcessos = async () => {
      const processosData = await getProcessos();
      setProcessos(processosData);
    };
    fetchProcessos();
  }, []);

  // Função para atualizar o status de um processo
  const moveCard = async (id, status) => {
    await updateProcessoStatus(id, status);  // Atualiza o status do processo no backend
    const updatedProcessos = processos.map((p) =>
      p.processo === id ? { ...p, status } : p
    );
    setProcessos(updatedProcessos);  // Atualiza o estado com o novo status
  };

  // Função para lidar com o drop do card nas colunas
  const handleDrop = (item, status) => {
    moveCard(item.processo, status);  // Atualiza o status do processo ao ser solto em uma nova coluna
  };

  // Função para abrir o modal com as informações do processo
  const openModal = (processo) => {
    setModalProcesso(processo);  // Armazenando o processo no estado do modal
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModalProcesso(null);
  };

  // Definição dos drop targets (colunas)
  const [{ isOver: isOverNovaPublicacao }, dropNovaPublicacao] = useDrop({
    accept: 'CARD',
    drop: (item) => handleDrop(item, 'Publicações Novas'),
  });

  const [{ isOver: isOverPublicacaoLida }, dropPublicacaoLida] = useDrop({
    accept: 'CARD',
    drop: (item) => handleDrop(item, 'Publicações Lidas'),
  });

  const [{ isOver: isOverEnviado }, dropEnviado] = useDrop({
    accept: 'CARD',
    drop: (item) => handleDrop(item, 'Publicações Enviadas para ADV'),
  });

  const [{ isOver: isOverConcluido }, dropConcluido] = useDrop({
    accept: 'CARD',
    drop: (item) => handleDrop(item, 'Concluídas'),
  });

  return (
    <div className="board">
      <div className="column" ref={dropNovaPublicacao} style={{ border: isOverNovaPublicacao ? '2px dashed #000' : '' }}>
        <h2>Nova Publicação</h2>
        {processos
          .filter((p) => p.status === 'Publicações Novas')
          .map((processo) => (
            <Card
              key={processo.processo}
              processo={processo}
              onClick={openModal}  // Passando a função openModal como prop
            />
          ))}
      </div>

      <div className="column" ref={dropPublicacaoLida} style={{ border: isOverPublicacaoLida ? '2px dashed #000' : '' }}>
        <h2>Publicação Lida</h2>
        {processos
          .filter((p) => p.status === 'Publicações Lidas')
          .map((processo) => (
            <Card
              key={processo.processo}
              processo={processo}
              onClick={openModal}
            />
          ))}
      </div>

      <div className="column" ref={dropEnviado} style={{ border: isOverEnviado ? '2px dashed #000' : '' }}>
        <h2>Enviado para Advogado Responsável</h2>
        {processos
          .filter((p) => p.status === 'Publicações Enviadas para ADV')
          .map((processo) => (
            <Card
              key={processo.processo}
              processo={processo}
              onClick={openModal}
            />
          ))}
      </div>

      <div className="column" ref={dropConcluido} style={{ border: isOverConcluido ? '2px dashed #000' : '' }}>
        <h2>Concluído</h2>
        {processos
          .filter((p) => p.status === 'Concluídas')
          .map((processo) => (
            <Card
              key={processo.processo}
              processo={processo}
              onClick={openModal}
            />
          ))}
      </div>

      {modalProcesso && (
        <div className="modal">
          <div className="modal-content">
            <h2>Detalhes do Processo</h2>
            <p>Processo: {modalProcesso.processo}</p>
            <p>Data: {modalProcesso.data_disponibilizacao}</p>
            <p>Autor(es): {modalProcesso.autor}</p>
            <p>Réu: {modalProcesso.reu}</p>
            <p>Advogado(s): {modalProcesso.advogado}</p>
            <p>Valor Principal: R$ {modalProcesso.valor_principal_bruto}</p>
            <p>Juros Moratórios: R$ {modalProcesso.juros_moratorios}</p>
            <p>Honorários: R$ {modalProcesso.honorarios_adv}</p>
            <p>Conteúdo: {modalProcesso.conteudo_publicacao}</p>
            <label htmlFor="closeModal" className="close-btn">×</label> {/* Label com o "X" */}
            <input type="checkbox" id="closeModal" style={{ display: 'none' }} onChange={closeModal} /> {/* Caixa de seleção oculta para controlar o clique */}
          </div>
        </div>
      )}

    </div>
  );
};

export default Board;
