import { useEffect, useState } from "react";
import { Card, CardContent, Typography, TextField, Box, Chip, CircularProgress, Button } from "@mui/material";

export function Tiempo() {
  const [datosTiempo, setDatosTiempo] = useState(null);
  const [error, setError] = useState("");
  const [buscar, datoBuscar] = useState("La Ceiba");
  const [cargando, setCargando] = useState(true);

  const controladorInput = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      datoBuscar(e.target.value.trim());
    }
  };

  useEffect(() => {
    const miTiempo = async () => {
      setCargando(true);
      try {
        const responder = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=833ef9b76f004ca384f232620252210&q=${buscar}&aqi=no`
        );
        const datosJson = await responder.json();
        setDatosTiempo(datosJson);
        setError("");
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };
    miTiempo();
  }, [buscar]);

  return (
    <Card
      sx={{
        maxWidth: 380,
        margin: "24px auto",
        borderRadius: 3,
        boxShadow: "0 10px 30px rgba(2,6,23,0.08)",
        overflow: "visible",
        position: "relative",
        background: "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
      }}
    >
      {/* Imagen del clima */}
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          pt: 3,
          pb: 1,
        }}
      >
        {cargando ? (
          <CircularProgress size={36} sx={{ mt: 4 }} />
        ) : (
          <img
            src={
              datosTiempo?.current?.condition?.icon
                ? `https:${datosTiempo.current.condition.icon}`
                : "https://via.placeholder.com/100x100?text=No+Image"
            }
            alt={datosTiempo?.current?.condition?.text || "imagen tiempo"}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
            }}
          />
        )}
      </Box>

      <CardContent sx={{ pt: 1, pb: 3, px: 3, textAlign: "center" }}>
        {error && (
          <Typography variant="body2" sx={{ color: "error.main", mb: 1 }}>
            Error: {error}
          </Typography>
        )}

        {!cargando && !error && datosTiempo && (
          <>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 0.5,
                background: "linear-gradient(90deg, #a07cfe, #fe8fb5, #ffbe7b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {datosTiempo.location?.name ?? "--"}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 1.5 }}
            >
              {datosTiempo.location?.country ?? ""}
            </Typography>

            <Chip
              label={`${datosTiempo.current?.temp_c ?? "--"} °C`}
              color="primary"
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                py: 1,
                px: 1.5,
                mb: 1.5,
                background: "linear-gradient(90deg, #16a34a, #4ade80)",
                color: "#fff",
              }}
            />

            <Typography variant="body1" sx={{ mb: 1 }}>
              {datosTiempo.current?.condition?.text ?? "--"}
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Viento: {datosTiempo.current?.wind_kph ?? "--"} km/h
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              Humedad: {datosTiempo.current?.humidity ?? "--"}%
            </Typography>
          </>
        )}

        <TextField
          fullWidth
          label="Buscar ciudad..."
          variant="outlined"
          onKeyDown={controladorInput}
          sx={{
            mt: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              px: 1,
            },
            "& .MuiInputLabel-root": { fontWeight: 600 },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          disableElevation
          sx={{
            mt: 2,
            py: 1.25,
            borderRadius: 2,
            fontWeight: 700,
            textTransform: "none",
            background: "linear-gradient(90deg,#a07cfe,#fe8fb5,#ffbe7b)",
            "&:hover": {
              background: "linear-gradient(90deg,#8e6ce2,#f87ba2,#f7b66b)",
            },
          }}
          onClick={() => datoBuscar(buscar)}
        >
          Actualizar clima
        </Button>
      </CardContent>
    </Card>
  );
}
