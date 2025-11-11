import { useState } from 'react';
import './App.css';
import { Usuarios } from './components/ListaUsuario';
import { Productos } from './pages/Productos';
import { Inicio } from './pages/Inicio';
import Divisa from './pages/Divisa';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" to="/">Inicio</Link>
              <Link className="nav-link" to="/clientes">Clientes</Link>
              <Link className="nav-link" to="/productos">Productos</Link>
              <Link className="nav-link" to="/divisa">Divisa</Link>
              <Link className="nav-link" to="/acercade">Acerca de</Link>
              <Link className="nav-link" to="/tiempo">Tiempo</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenedor centrado */}
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/clientes" element={<Usuarios />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/divisa" element={<Divisa />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
