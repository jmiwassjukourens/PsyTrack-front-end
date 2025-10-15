import { useEffect, useState } from "react";
import styles from "./NotificationsPage.module.css";
import NotificationCard from "../../components/NotificationCard/NotificationCard";
import { notificationsService } from "../../services/notificationsService";
import ConfirmModal from "../../components/Modals/confirmDeleteNotificationModal/ConfirmModal";
import { motion } from "framer-motion";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [onConfirmAction, setOnConfirmAction] = useState(null);

  useEffect(() => {
    const sub = notificationsService.getNotifications().subscribe(setNotifications);
    return () => sub.unsubscribe();
  }, []);

  const confirmDeleteAll = () => {
    setModalMessage("¿Seguro que querés eliminar todas las notificaciones?");
    setOnConfirmAction(() => () => {
      notificationsService.deleteAll();
      setShowModal(false);
    });
    setShowModal(true);
  };

  const confirmDeleteOne = (id) => {
    setModalMessage("¿Eliminar esta notificación?");
    setOnConfirmAction(() => () => {
      notificationsService.deleteNotification(id);
      setShowModal(false);
    });
    setShowModal(true);
  };

  const handleMarkAllAsRead = () => notificationsService.markAllAsRead();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🔔 Notificaciones</h2>

      <div className={styles.actions}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleMarkAllAsRead}
          className={styles.btnSecondary}
        >
          ✅ Marcar todas como leídas
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={confirmDeleteAll}
          className={styles.btnDanger}
        >
          🗑️ Eliminar todas
        </motion.button>
      </div>

      <div className={styles.list}>
        {notifications.length === 0 ? (
          <motion.div
            className={styles.empty}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>No tenés notificaciones pendientes</p>
            <span>Volvé más tarde o revisá tus <strong>reportes</strong> 👀</span>
          </motion.div>
        ) : (
          notifications.map((n) => (
            <NotificationCard
              key={n.id}
              notification={n}
              onDelete={() => confirmDeleteOne(n.id)}
            />
          ))
        )}
      </div>

      <ConfirmModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={onConfirmAction}
        message={modalMessage}
      />
    </div>
  );
}