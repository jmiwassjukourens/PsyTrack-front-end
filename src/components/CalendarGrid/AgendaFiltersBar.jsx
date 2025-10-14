import { useState, useEffect } from "react";
import styles from "./AgendaFiltersBar.module.css";

export default function AgendaFilterBar({ onShortcutRangeChange }) {

  useEffect(() => {
    aplicarAtajo("esteMes");
  }, []);

  const aplicarAtajo = (tipo) => {
    const hoy = new Date();
    let desde = new Date();
    let hasta = new Date();

    switch (tipo) {
      case "estaSemana": {
        const dia = hoy.getDay();
        const diffInicio = dia === 0 ? 6 : dia - 1;
        desde.setDate(hoy.getDate() - diffInicio);
        hasta = new Date(desde);
        hasta.setDate(desde.getDate() + 6);
        break;
      }
      case "proximaSemana": {
        const dia = hoy.getDay();
        const diffInicio = dia === 0 ? 1 : 8 - dia;
        desde.setDate(hoy.getDate() + diffInicio);
        hasta = new Date(desde);
        hasta.setDate(desde.getDate() + 6);
        break;
      }
      case "proximos15": {
        hasta.setDate(hoy.getDate() + 15);
        break;
      }
      case "esteMes": {
        desde = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        hasta = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
        break;
      }
      case "ultimoMes": {
        desde = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1);
        hasta = new Date(hoy.getFullYear(), hoy.getMonth(), 0);
        break;
      }
      case "ultimos15": {
        desde.setDate(hoy.getDate() - 15);
        break;
      }
      default:
        break;
    }

    const dIso = desde.toISOString().split("T")[0];
    const hIso = hasta.toISOString().split("T")[0];
    onShortcutRangeChange?.(dIso, hIso);
  };

  return (
    <div className={styles.filtrosWrapper}>
      <div className={styles.atajosTiempo}>
        <button onClick={() => aplicarAtajo("estaSemana")}>Esta semana</button>
        <button onClick={() => aplicarAtajo("proximaSemana")}>Próxima semana</button>
        <button onClick={() => aplicarAtajo("proximos15")}>Próximos 15 días</button>
        <button onClick={() => aplicarAtajo("esteMes")}>Este mes</button>
        <button onClick={() => aplicarAtajo("ultimos15")}>⏪ Últimos 15 días</button>
        <button onClick={() => aplicarAtajo("ultimoMes")}>⏪ Mes anterior</button>
      </div>
    </div>
  );
}