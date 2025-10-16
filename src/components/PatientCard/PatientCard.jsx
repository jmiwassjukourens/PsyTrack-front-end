import {
  FaBell,
  FaClock,
  FaHistory,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import styles from "./PatientCard.module.css";

export default function PatientCard({
  patient,
  onDelete,
  onEdit,
  onViewPending,
  onViewHistory,
}) {
  const handleNotify = () => {
    alert(`Notificación enviada a ${patient.name}`);
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
        {hasDebt && <p className={styles.debtText}>Deuda: ${patient.debt}</p>}
      </div>

      <div className={styles.actions}>
        <button title="Notificar deuda" onClick={handleNotify}>
          <FaBell />
        </button>
        <button
          title="Ver sesiones pendientes de pago"
          onClick={onViewPending}
          className={styles.pendingBtn}
        >
          <FaClock />
        </button>
        <button
          title="Ver historial de sesiones"
          onClick={onViewHistory}
          className={styles.historyBtn}
        >
          <FaHistory />
        </button>
        <button title="Editar paciente" onClick={() => onEdit(patient)}>
          <FaEdit />
        </button>
        <button title="Eliminar paciente" onClick={onDelete}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
