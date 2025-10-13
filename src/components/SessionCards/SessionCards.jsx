import styles from "./SessionCards.module.css";

function SessionCards({ sesiones, onEdit, onDelete }) {
  const handleDownload = (adjunto) => {
    if (!adjunto) return;
    alert(`Descargando archivo: ${adjunto}`);

  };

  return (
    <div className={styles.cardsContainer}>
      {sesiones.length === 0 ? (
        <p className={styles.noResults}>No hay sesiones que coincidan.</p>
      ) : (
        sesiones.map((s) => (
          <div key={s.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.paciente}>{s.paciente.nombre}</h3>
              <span className={`${styles.badge} ${styles[s.estado.toLowerCase()]}`}>
                {s.estado}
              </span>
            </div>

            <div className={styles.cardBody}>
              <p>
                <span className={styles.label}>Fecha sesión:</span>{" "}
                {new Date(s.fecha).toLocaleString()}
              </p>
              <p>
                <span className={styles.label}>Fecha de pago:</span>{" "}
                {s.fechaDePago ? new Date(s.fechaDePago).toLocaleString() : "—"}
              </p>
              <p>
                <span className={styles.label}>Precio:</span> ${s.precio}
              </p>
            </div>

            <div className={styles.cardActions}>
              <button
                className={`${styles.btnAttach} ${!s.adjunto ? styles.disabled : ""}`}
                title={s.adjunto ? "Descargar Comprobante" : "Sin Comprobante"}
                disabled={!s.adjunto}
                onClick={() => handleDownload(s.adjunto)}
              >
                📎
              </button>

              <button
                className={styles.btnEdit}
                title="Editar sesión"
                onClick={() => onEdit(s)}
              >
                ✏️
              </button>

              <button
                className={styles.btnDelete}
                title="Eliminar sesión"
                onClick={() => onDelete(s.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default SessionCards;