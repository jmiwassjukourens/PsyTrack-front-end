import { useEffect, useState } from "react";
import styles from "./NotificationsPage.module.css";
import NotificationCard from "../../components/NotificationCard/NotificationCard";
import { notificationsService } from "../../services/notificationsService";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const sub = notificationsService.getNotifications().subscribe(setNotifications);
    return () => sub.unsubscribe();
  }, []);

  const handleMarkAllAsRead = () => notificationsService.markAllAsRead();
  const handleDeleteAll = () => notificationsService.deleteAll();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Notificaciones</h2>

      <div className={styles.actions}>
        <button onClick={handleMarkAllAsRead} className={styles.btnSecondary}>Marcar todas como leídas</button>
        <button onClick={handleDeleteAll} className={styles.btnDanger}>Eliminar todas</button>
      </div>

      <div className={styles.list}>
        {notifications.length === 0 ? (
          <p className={styles.empty}>No tenés notificaciones</p>
        ) : (
          notifications.map(n => (
            <NotificationCard key={n.id} notification={n} />
          ))
        )}
      </div>
    </div>
  );
}