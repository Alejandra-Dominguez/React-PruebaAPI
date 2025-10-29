import './TarjetaUsuario.css';

export function TarjetaUsuario({ usuario }) {
    return (
        <div>
            <div className="tarjeta-usuario">
                <h3>{usuario.name}</h3>
                <img src={`https://i.pravatar.cc/200?img=${usuario.id}`} alt="imagen del usuario" />
                <p><strong>City:</strong> {usuario.address.city}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
             </div>
        </div>
      
    );
}