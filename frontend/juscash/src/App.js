import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { DndProvider } from 'react-dnd'; // Importando o DndProvider
import { HTML5Backend } from 'react-dnd-html5-backend'; // Importando o backend HTML5

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AppCard from './pages/AppCard';
import Header from './components/Header';

function App() {
  return (
    <DndProvider backend={HTML5Backend}> {/* Envolvendo a aplicação com o DndProvider */}
      <Router>
        <MainContent />
      </Router>
    </DndProvider>
  );
}

function MainContent() {
  const location = useLocation(); // Usando o useLocation dentro do Router

  return (
    <>
      {/* Exibe o Header apenas se não estiver nas páginas de login ou signup */}
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Header />}
      
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<AppCard />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
