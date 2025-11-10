import { useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Usuarios } from './components/ListaUsuario'
import { TarjetaUsuario } from './components/Card'
import { Route } from 'react-router'
import { Routes } from 'react-router'
import { Link } from 'react-router' 
import { Productos } from './pages/Productos'
import { Inicio } from './pages/Inicio'
import Divisa from './pages/Divisa'



function App() {
  const [count, setCount] = useState(0)


    return (
      <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-link" to={"/"}>Inicio</Link>
        <Link className="nav-link" to={"/clientes"}>Clientes</Link>
        <Link className="nav-link" to={"/productos"}>Productos</Link>
        <Link className="nav-link" to={"/divisa"}>Divisa</Link>
        <Link className="nav-link" to={"/acercade"}>Acerca de</Link>
        <Link className="nav-link" to={"/tiempo"}>Tiempo</Link>
      </div>
    </div>
  </div>
</nav>
       {/* <nav>
        <Link to={"/"}>Inicio</Link>
        <Link to={"/clientes"}>Clientes</Link>
        <Link to={"/productos"}>Productos</Link>
        <Link to={"/acercade"}>Acerca de</Link>
        <Link to={"/tiempo"}>Tiempo</Link>
       </nav> */}

       <Routes>
        <Route path = '/' element = {<Inicio />}/>
        <Route path = '/clientes' element = {<Usuarios /> }/>
        <Route path = '/productos' element = {<Productos /> }/>
        <Route path = '/divisa' element = {<Divisa /> }/>
       </Routes>
      </>
    )
  } 


export default App
