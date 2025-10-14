import { useState } from "react";
import styles from "./SessionModal.module.css";

export default function SessionModal({ defaultDate, onClose, onSave }) {
  const defaultDateTime = defaultDate ? defaultDate + "T09:00" : "";
  const [fecha, setFecha] = useState(defaultDateTime || "");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [adjunto, setAdjunto] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fecha || !nombre) {
      alert("Completá fecha y nombre del paciente");
      return;
    }
    const payload = {
      fecha: new Date(fecha).toISOString(),
      fechaDePago: null,
      estado: "Pendiente",
      paciente: { nombre },
      precio: Number(precio) || 0,
      adjunto: adjunto || null,
    };
    onSave(payload);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Nueva sesión</h3>
          <button className={styles.closeBtn} onClick={onClose}>✖</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Fecha y hora
            <input type="datetime-local" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </label>

          <label>
            Nombre paciente
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Ana López" />
          </label>

          <label>
            Precio
            <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          </label>

          <label>
            Comprobante (nombre archivo)
            <input type="text" value={adjunto} onChange={(e) => setAdjunto(e.target.value)} />
          </label>

          <div className={styles.actions}>
            <button type="button" className={styles.cancel} onClick={onClose}>Cancelar</button>
            <button type="submit" className={styles.save}>Crear</button>
          </div>
        </form>
      </div>
    </div>
  );
}
