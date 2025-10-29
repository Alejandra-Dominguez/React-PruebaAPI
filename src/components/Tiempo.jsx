import { useEffect, useState } from "react"

export function Tiempo(){

    const [datosTiempo, setDatosTiempo] = useState(null);
    const [error, setError] = useState ("");
    const [buscar, datoBuscar] = useState ("La Ceiba");
    const [cargando, setCargando] = useState (true);

    const controladorInput = (e) => {
        if(e.key==="Enter"){
            datoBuscar(e.target.value);
        }
    }
    
    useEffect(()=>{
        
        const miTiempo = async () => {
            setCargando(true);
            try {
                const responder = await fetch (`http://api.weatherapi.com/v1/current.json?key=833ef9b76f004ca384f232620252210&q=${buscar}&aqi=no`);
                const datosJson = await responder.json();
                setDatosTiempo(datosJson);
            } catch (error) {
                setError(error.message)
            }
            finally {
                setCargando(false);
            }
            
        }
        miTiempo();
    },[buscar]);

    if (cargando) {
        return <p>Cargando...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return(
        <>
            <div className="card mx-auto" style={{width: '320px', overflow: 'hidden', borderRadius: '8px'}}>
                <img
                    src={datosTiempo?.current?.condition?.icon ? `https:${datosTiempo.current.condition.icon}` : 'https://via.placeholder.com/320x160?text=No+Image'}
                    className="card-img-top"
                    alt={datosTiempo?.current?.condition?.text || 'imagen tiempo'}
                    style={{width:'50%', height: '120px', objectFit: 'cover', display: 'block'}}
                />
                <div className="card-body" style={{paddingBottom: '0.75rem'}}>
                    <h5 className ="card-title" style={{marginBottom: '0.5rem'}}>Temperatura: {datosTiempo?.current?.temp_c ?? '--'} °C</h5>
                    <p className ="card-text" style={{marginBottom: '0.25rem'}}>Lugar: {datosTiempo?.location?.name ?? '--'}</p>
                    <p className ="card-text" style={{marginBottom: '0.5rem'}}>Descripción: {datosTiempo?.current?.condition?.text ?? '--'}</p>

                    <input
                        style={{width : "100%", marginTop : "8px", padding: '8px', boxSizing: 'border-box'}}
                        type="text"
                        className="form-control"
                        placeholder="Buscar ciudad..."
                        onKeyDown={(e)=>controladorInput(e)}
                    />
                </div>
            </div>
        </>
    )
}