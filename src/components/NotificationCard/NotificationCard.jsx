import styles from "./NotificationCard.module.css";
import { notificationsService } from "../../services/notificationsService";


export default function NotificationCard({ notification }) {
  const { id, mensaje, tipo, leida } = notification;

  const getColor = () => {
    switch (tipo) {
      case "financiera": return "#FFB74D";
      case "sesion": return "#64B5F6";
      case "analitica": return "#81C784";
      case "cliente": return "#BA68C8";
      default: return "#B0BEC5";
    }
  };

  return (
    <div
      className={`${styles.card} ${!leida ? styles.unread : ""}`}
      style={{ borderLeft: `6px solid ${getColor()}` }}
    >
      <p className={styles.text}>{mensaje}</p>

      <div className={styles.actions}>
        {!leida && (
          <button onClick={() => notificationsService.markAsRead(id)} className={styles.btnRead}>
            Marcar como leída
          </button>
        )}
        <button onClick={() => notificationsService.deleteNotification(id)} className={styles.btnDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
}