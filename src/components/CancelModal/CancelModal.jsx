import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

export function CancelModal({ open, onClose, onConfirm, sesion }) {
  const [motivo, setMotivo] = useState("");
  const [pagada, setPagada] = useState(false);
  const [monto, setMonto] = useState("");

  const handleConfirm = () => {
    onConfirm({ motivo, pagada, monto: pagada ? parseFloat(monto) : null });
  };

  if (!sesion) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cancelar sesión</DialogTitle>
      <DialogContent>
        <p>
          Estás cancelando la sesión de <strong>{sesion.paciente.nombre}</strong> el{" "}
          {new Date(sesion.fecha).toLocaleString()}.
        </p>

        <TextField
          fullWidth
          label="Motivo (opcional)"
          variant="outlined"
          margin="normal"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={pagada}
              onChange={(e) => setPagada(e.target.checked)}
              color="primary"
            />
          }
          label="La sesión quedó pagada"
        />

        {pagada && (
          <TextField
            fullWidth
            label="Monto pagado"
            type="number"
            variant="outlined"
            margin="normal"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
        <Button onClick={handleConfirm} color="error" variant="contained">
          Confirmar cancelación
        </Button>
      </DialogActions>
    </Dialog>
  );
}
