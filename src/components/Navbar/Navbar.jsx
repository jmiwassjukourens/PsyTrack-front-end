import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../auth/AuthContext";
import logonav from "../../assets/logoNav.png";
import { notificationsService } from "../../services/notificationsService";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user, logout } = useAuth();

  useEffect(() => {
    const sub = notificationsService.getNotifications().subscribe(n => {
      setUnreadCount(n.filter(notif => !notif.leida).length);
    });
    return () => sub.unsubscribe();
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/sesiones">
          <img src={logonav} alt="Logo" className={styles.logo} />
        </Link>
      </div>

      {user && (
        <nav className={`${styles.nav} ${menuOpen ? styles.active : ""}`}>
          <button className={styles.menuToggle} onClick={toggleMenu}>
            {menuOpen ? "✖" : "☰"}
          </button>

          <ul className={styles.navList}>
            <li><Link to="/agenda" onClick={toggleMenu}>Agenda</Link></li>
            <li><Link to="/sesiones" onClick={toggleMenu}>Sesiones</Link></li>
            <li><Link to="/reportes" onClick={toggleMenu}>Reportes</Link></li>
            <li>
              <Link to="/notificaciones" onClick={toggleMenu}>
                Notificaciones{" "}
                {unreadCount > 0 && (
                  <span className={styles.notificationBadge}>
                    {unreadCount}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <button className={styles.logout} onClick={logout}>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
