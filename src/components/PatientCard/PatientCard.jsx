import React from "react";
import styles from "./PatientCard.module.css";

export default function PatientCard({ patient, onDelete }) {
  const handleNotify = () => {
    alert(`Notificación enviada a ${patient.name}`);
  };

  const handlePending = () => {
    alert(`Mostrando sesiones pendientes de pago de ${patient.name}`);
  };

  const handleHistory = () => {
    alert(`Mostrando historial de sesiones de ${patient.name}`);
  };

  const hasDebt = patient.debt > 0;

  return (
    <div
      className={`${styles.card} ${hasDebt ? styles.debt : ""}`}
      title={hasDebt ? "Paciente con deuda" : ""}
    >
      <div className={styles.info}>
        <h3 className={styles.name}>{patient.name}</h3>
        <p>DNI: {patient.dni}</p>
        <p>Email: {patient.email}</p>
        <p>Tel: {patient.phone}</p>
        {hasDebt && <p className={styles.debtText}>💰 Deuda: ${patient.debt}</p>}
      </div>

      <div className={styles.actions}>
        <button title="Notificar deuda" onClick={handleNotify}>
          💬
        </button>
        <button title="Ver sesiones pendientes" onClick={handlePending}>
          ⏳
        </button>
        <button title="Ver historial de sesiones" onClick={handleHistory}>
          📜
        </button>
        <button title="Editar paciente" onClick={() => alert("Editar...")}>
          ✏️
        </button>
        <button title="Eliminar paciente" onClick={() => onDelete(patient.id)}>
          🗑️
        </button>
      </div>
    </div>
  );
}
