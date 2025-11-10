import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

export default function Conversor() {
  const API_KEY = "b2185bdace75fd85292492d0";
  const [dolares, setDolares] = useState('');
  const [resultado, setResultado] = useState(null);
  const [tasaCambio, setTasaCambio] = useState(null);
  const [cargandoTasa, setCargandoTasa] = useState(true);
  const [errorTasa, setErrorTasa] = useState(null);

  useEffect(() => {
    const obtenerTasa = async () => {
      setCargandoTasa(true);
      setErrorTasa(null);
      try {
        const res = await fetch('https://v6.exchangerate-api.com/v6/${API_KEY}/pair/USD/HNL');
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        const tasa = data?.conversion_rate ?? null;
        if (!tasa) throw new Error('Tasa no encontrada en la respuesta');
        setTasaCambio(tasa);
      } catch (err) {
        setErrorTasa(err.message);
        setTasaCambio(null);
      } finally {
        setCargandoTasa(false);
      }
    };

    obtenerTasa();
    // opcional: actualizar cada 10 minutos
    const id = setInterval(obtenerTasa, 10 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const convertir = () => {
    if (dolares === '' || isNaN(dolares)) {
      setResultado('Por favor, ingresa un número válido');
      return;
    }
    if (!tasaCambio) {
      setResultado('Tasa no disponible. Intenta de nuevo más tarde.');
      return;
    }
    const lempiras = (parseFloat(dolares) * tasaCambio).toFixed(2);
    setResultado(`${lempiras} Lempiras`);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', mt: 4 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://paradigma.hn/wp-content/uploads/2021/10/dolares-lempiras-696x422-1.jpg"
        alt="dólares a lempiras"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign="center">
          Conversor de Moneda
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          Convierte dólares (USD) a lempiras (HNL)
        </Typography>

        <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
          {cargandoTasa ? 'Cargando tasa...' : (tasaCambio ? `1 USD = ${tasaCambio} HNL` : (errorTasa ? `Error: ${errorTasa}` : 'Tasa no disponible'))}
        </Typography>

        <TextField
          fullWidth
          label="Cantidad en dólares"
          variant="outlined"
          type="number"
          value={dolares}
          onChange={(e) => setDolares(e.target.value)}
          sx={{ mt: 2 }}
        />

        {resultado && (
          <Typography variant="h6" textAlign="center" sx={{ mt: 2 }}>
            {resultado}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          variant="contained"
          disableElevation
          sx={{
            backgroundColor: '#4CAF50',
            '&:hover': { backgroundColor: '#45A049' },
          }}
          onClick={convertir}
        >
          Convertir
        </Button>
      </CardActions>
    </Card>
  );
}
