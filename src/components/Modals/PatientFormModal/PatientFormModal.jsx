import React, { useState } from "react";
import styles from "./PatientFormModal.module.css";

export default function PatientFormModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    dni: "",
    email: "",
    phone: "",
    debt: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: Date.now(), ...form, debt: Number(form.debt) });
  };

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Dar alta paciente</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Nombre y apellido"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            value={form.dni}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="number"
            name="debt"
            placeholder="Deuda (0 si no tiene)"
            value={form.debt}
            onChange={handleChange}
          />

          <div className={styles.buttons}>
            <button type="submit" className={styles.saveBtn}>
              Guardar
            </button>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
