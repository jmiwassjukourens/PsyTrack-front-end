
import { useEffect, useState } from "react";
import { getSessions, addSession, deleteSession, updateSession } from "../../services/sessionService";
import CalendarGrid from "../../components/CalendarGrid/CalendarGrid";
import SessionModal from "../../components/SessionModal/SessionModal";
import styles from "./AgendaPage.module.css";

export default function AgendaPage() {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0,10);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().slice(0,10);

  const [sessions, setSessions] = useState([]);
  const [rangeStart, setRangeStart] = useState(startOfMonth);
  const [rangeEnd, setRangeEnd] = useState(endOfMonth);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const s = await getSessions();
    setSessions(s);
  };

  const handleAdd = async (payload) => {
    const newS = await addSession(payload);
    setSessions((prev) => [...prev, newS]);
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar sesión?")) return;
    await deleteSession(id);
    setSessions((prev) => prev.filter((p) => p.id !== id));
  };

  const handleMarkPaid = async (id, fechaPago) => {
    await updateSession(id, { fechaDePago: fechaPago, estado: "Pagado" });
    setSessions((prev) => prev.map(s => s.id===id ? {...s, fechaDePago, estado:"Pagado"} : s));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>Agenda</h2>
          <p className={styles.subtitle}>Ve tus sesiones entre dos fechas y gestionalas rápido</p>
        </div>

        <div className={styles.controls}>
          <label className={styles.rangeLabel}>
            Desde
            <input
              type="date"
              value={rangeStart}
              onChange={(e) => setRangeStart(e.target.value)}
            />
          </label>
          <label className={styles.rangeLabel}>
            Hasta
            <input
              type="date"
              value={rangeEnd}
              onChange={(e) => setRangeEnd(e.target.value)}
            />
          </label>
        </div>
      </div>

      <CalendarGrid
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        sessions={sessions}
        onCreateForDate={(isoDate) => { setModalDate(isoDate); setModalOpen(true); }}
        onDelete={handleDelete}
        onMarkPaid={handleMarkPaid}
      />

      {modalOpen && (
        <SessionModal
          defaultDate={modalDate}
          onClose={() => setModalOpen(false)}
          onSave={handleAdd}
        />
      )}
    </div>
  );
}
