import { useState } from "react";
import styles from "./FiltersBar.module.css";

function FiltersBar({ onFilterChange }) {
  const [estado, setEstado] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const handleFilter = () => {
    onFilterChange?.({ estado, busqueda });
  };

  const handleClear = () => {
    setEstado("");
    setBusqueda("");
    onFilterChange?.({ estado: "", busqueda: "" });
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className={styles.input}
      />

      <select
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        className={styles.select}
      >
        <option value="">Todos los estados</option>
        <option value="Pendiente">Pendiente</option>
        <option value="Completada">Completada</option>
        <option value="Cancelada">Cancelada</option>
      </select>

      <div className={styles.buttonsWrapper}>
        <button className={styles.btnFiltrar} onClick={handleFilter}>
          Filtrar
        </button>

        <button
          className={styles.btnLimpiar}
          onClick={handleClear}
          title="Limpiar filtros"
        >
          🧹
        </button>
      </div>
    </div>
  );
}

export default FiltersBar;