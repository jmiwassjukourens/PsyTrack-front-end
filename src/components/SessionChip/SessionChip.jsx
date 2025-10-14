import styles from "./SessionChip.module.css";

import { useState } from "react";
import { CancelModal } from "../CancelModal/CancelModal";
import { PayModal } from "../PayModal/PayModal";

export default function SessionChip({ session, onCancel, onMarkPaid }) {
  const [openCancel, setOpenCancel] = useState(false);
  const [openPay, setOpenPay] = useState(false);

  const handleConfirmCancel = (data) => {
    onCancel(session.id, data);
    setOpenCancel(false);
  };

  const handleConfirmPay = (data) => {
    const fechaISO = new Date(data.fechaPago).toISOString();
    onMarkPaid(session.id, fechaISO, data.monto);
    setOpenPay(false);
  };

  const time = new Date(session.fecha).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className={`${styles.chip} ${styles[session.estado?.toLowerCase() || "pendiente"]}`}>
        <div className={styles.left}>
          <div className={styles.name}>{session.paciente?.nombre || "—"}</div>
          <div className={styles.meta}>
            <span className={styles.time}>{time}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.payBtn}
            title={session.fechaDePago ? "Ya marcado como pagado" : "Registrar pago"}
            disabled={!!session.fechaDePago}
            onClick={() => setOpenPay(true)}
          >
            💰
          </button>

          <button
            className={styles.delBtn}
            title="Cancelar sesión"
            onClick={() => setOpenCancel(true)}
          >
            🛑
          </button>
        </div>
      </div>

      <CancelModal
        open={openCancel}
        onClose={() => setOpenCancel(false)}
        onConfirm={handleConfirmCancel}
        sesion={session}
      />

      <PayModal
        open={openPay}
        onClose={() => setOpenPay(false)}
        onConfirm={handleConfirmPay}
        sesion={session}
      />
    </>
  );
}
