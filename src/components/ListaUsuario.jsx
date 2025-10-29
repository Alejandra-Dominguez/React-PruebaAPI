import { useEffect, useState } from 'react';
import './ListaUsuario.css';
import { TarjetaUsuario } from './Card';
import React from 'react';

export function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const mostrarUsuario = async () => {
            try {
                const usuarios = await fetch('https://jsonplaceholder.typicode.com/users');
                const datosJson = await usuarios.json();
                setUsuarios(datosJson);
                setCargando(false);
            } catch (error) {
                setError("Error al cargar los datos");
            } finally {
                setCargando(false);
            }
        }
        mostrarUsuario();
    }, []);

    if (cargando) {
        return (<span className="loader"></span>);
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div className="tarjeta-usuario">
            {
                usuarios.map((usuario) => {
                   return <TarjetaUsuario key={usuario.id} usuario={usuario} />
                })
            }
        </div>
    );
}