import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

export function PayModal({ open, onClose, onConfirm, sesion }) {
  const [fechaPago, setFechaPago] = useState("");
  const [monto, setMonto] = useState(sesion?.precio || "");

  const handleConfirm = () => {
    if (!fechaPago) {
      alert("Por favor ingresá una fecha de pago.");
      return;
    }
    onConfirm({ fechaPago, monto });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Registrar pago</DialogTitle>

      <DialogContent dividers>
        <p>
          Vas a registrar el pago de la sesión con{" "}
          <strong>{sesion?.paciente?.nombre}</strong> el{" "}
          <strong>{new Date(sesion?.fecha).toLocaleString()}</strong>.
        </p>

        <TextField
          label="Fecha de pago"
          type="datetime-local"
          value={fechaPago}
          onChange={(e) => setFechaPago(e.target.value)}
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Monto pagado"
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          fullWidth
          margin="dense"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="success">
          Confirmar pago
        </Button>
      </DialogActions>
    </Dialog>
  );
}
