import { useMemo } from "react";
import styles from "./CalendarGrid.module.css";
import SessionChip from "../../components/SessionChip/SessionChip";

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function buildDates(startIso, endIso) {
  const start = new Date(startIso + "T00:00:00");
  const end = new Date(endIso + "T00:00:00");
  const arr = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    arr.push(new Date(d));
  }
  return arr;
}

export default function CalendarGrid({ rangeStart, rangeEnd, sessions, onCreateForDate, onCancel, onMarkPaid }) {
  const dates = useMemo(() => buildDates(rangeStart, rangeEnd), [rangeStart, rangeEnd]);

  const grouped = useMemo(() => {
    const map = {};
    sessions.forEach((s) => {
      const key = s.fecha.slice(0, 10);
      if (!map[key]) map[key] = [];
      map[key].push(s);
    });
    Object.keys(map).forEach((k) => map[k].sort((a, b) => new Date(a.fecha) - new Date(b.fecha)));
    return map;
  }, [sessions]);

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.grid}>
        {dates.map((d) => {
          const key = d.toISOString().slice(0, 10);
          const daySessions = grouped[key] || [];
          const isToday = new Date().toISOString().slice(0, 10) === key;

          return (
            <div className={styles.cell} key={key}>
              <div className={styles.cellHeader}>
                <div>
                  <div className={styles.dayNumber}>{d.getDate()}</div>
                  <div className={styles.dayName}>
                    {d.toLocaleDateString("es-ES", { weekday: "short" })}
                  </div>
                </div>
                <button
                  className={styles.cellAdd}
                  title={`Crear sesión ${key}`}
                  onClick={() => onCreateForDate(key)}
                >
                  +
                </button>
              </div>

              <div className={`${styles.cellBody} ${isToday ? styles.todayBg : ""}`}>
                {daySessions.length === 0 ? (
                  <div className={styles.emptyText}>—</div>
                ) : (
                  daySessions.map((s) => (
                    <SessionChip
                      key={s.id}
                      session={s}
                      onCancel={onCancel}
                      onMarkPaid={(fechaPago) => onMarkPaid(s.id, fechaPago)}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
