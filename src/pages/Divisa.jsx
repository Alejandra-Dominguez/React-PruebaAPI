import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';

export default function Divisa() {
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
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/USD/HNL`);
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
    const id = setInterval(obtenerTasa, 10 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const convertir = () => {
    setResultado(null);
    if (dolares === '' || isNaN(dolares)) {
      setResultado({ ok: false, text: 'Por favor, ingresa un número válido' });
      return;
    }
    if (!tasaCambio) {
      setResultado({ ok: false, text: 'Tasa no disponible. Intenta de nuevo más tarde.' });
      return;
    }
    const lempiras = (parseFloat(dolares) * tasaCambio).toFixed(2);
    setResultado({ ok: true, text: `${lempiras} HNL` });
  };

  return (
    <Card
      sx={{
        maxWidth: 380,
        margin: '40px auto',
        borderRadius: 3,
        overflow: 'visible',
        position: 'relative',
        boxShadow: '0 10px 30px rgba(2,6,23,0.08)',
        border: '3px solid transparent',
        backgroundClip: 'padding-box',
        backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #A07CFE, #FE8FB5, #FFBE7B)',
        backgroundOrigin: 'border-box',
      }}
    >
      {/* Imagen con overlay */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="160"
          image="https://paradigma.hn/wp-content/uploads/2021/10/dolares-lempiras-696x422-1.jpg"
          alt="dólares a lempiras"
          sx={{ objectFit: 'cover', filter: 'brightness(0.85)' }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: 'rgba(255,255,255,0.95)',
              fontWeight: 700,
              textShadow: '0 6px 18px rgba(0,0,0,0.45)',
              letterSpacing: 0.2,
            }}
          >
            Conversor USD → HNL
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ pt: 3, px: 3 }}>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', textAlign: 'center', mb: 1 }}
        >
          Convierte dólares (USD) a lempiras (HNL)
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mb: 1.5,
            flexWrap: 'wrap',
          }}
        >
          {cargandoTasa ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={18} />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Cargando tasa...
              </Typography>
            </Box>
          ) : tasaCambio ? (
            <Chip
              label={`1 USD = ${tasaCambio} HNL`}
              color="primary"
              variant="filled"
              sx={{ fontWeight: 600 }}
            />
          ) : (
            <Typography variant="caption" sx={{ color: 'error.main' }}>
              {errorTasa ? `Error: ${errorTasa}` : 'Tasa no disponible'}
            </Typography>
          )}
        </Box>

        <TextField
          fullWidth
          label="Cantidad en dólares"
          variant="outlined"
          type="number"
          value={dolares}
          onChange={(e) => setDolares(e.target.value)}
          sx={{
            mt: 1,
            mb: 1.5,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              px: 1,
            },
            '& .MuiInputLabel-root': { fontWeight: 600 },
          }}
          inputProps={{ inputMode: 'decimal', min: 0 }}
        />

        {resultado && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <Chip
              label={resultado.text}
              variant={resultado.ok ? 'filled' : 'outlined'}
              color={resultado.ok ? 'success' : 'default'}
              sx={{
                fontWeight: 700,
                px: 2,
                py: 1,
                bgcolor: resultado.ok ? 'success.light' : 'background.paper',
              }}
            />
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'center', pb: 3, px: 3 }}>
        <Button
          variant="contained"
          disableElevation
          fullWidth
          onClick={convertir}
          sx={{
            py: 1.25,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #A07CFE, #FE8FB5, #FFBE7B)',
            backgroundSize: '300% 300%',
            animation: 'shine 4s linear infinite',
            '&:hover': {
              background: 'linear-gradient(135deg, #A07CFE, #FE8FB5, #FFBE7B)',
            },
          }}
        >
          Convertir
        </Button>
      </CardActions>
    </Card>
  );
}
