import { useState,useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import styles from "./FiltersBar.module.css"; 

function FiltersBar({ 
  onFilterChange, 
  defaultBusqueda = "", 
  defaultFechaDesde = "", 
  defaultFechaHasta = "" 
})  {
  const [estado, setEstado] = useState("");
  const [busqueda, setBusqueda] = useState(defaultBusqueda || "");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [fechaPagoDesde, setFechaPagoDesde] = useState("");
  const [fechaPagoHasta, setFechaPagoHasta] = useState("");

  const [activeBusqueda, setActiveBusqueda] = useState(true);
  const [activeEstado, setActiveEstado] = useState(true);
  const [activeSesion, setActiveSesion] = useState(true);
  const [activePago, setActivePago] = useState(false);

  const [mostrarFiltros, setMostrarFiltros] = useState(false);


useEffect(() => {
  setBusqueda(defaultBusqueda || "");
  setFechaDesde(defaultFechaDesde || "");
  setFechaHasta(defaultFechaHasta || "");

  handleFilter({
    estado,
    busqueda: defaultBusqueda || "",
    fechaDesde: defaultFechaDesde || "",
    fechaHasta: defaultFechaHasta || "",
    fechaPagoDesde,
    fechaPagoHasta,
    activeBusqueda,
    activeEstado,
    activeSesion,
    activePago,
  });
}, [defaultBusqueda, defaultFechaDesde, defaultFechaHasta]);


  const handleFilter = (override) => {

    const payload = {
      estado: override?.activeEstado ? override?.estado ?? estado : "",
      busqueda: override?.activeBusqueda ? override?.busqueda ?? busqueda : "",
      fechaDesde: override?.activeSesion ? override?.fechaDesde ?? fechaDesde : "",
      fechaHasta: override?.activeSesion ? override?.fechaHasta ?? fechaHasta : "",
      fechaPagoDesde: override?.activePago ? override?.fechaPagoDesde ?? fechaPagoDesde : "",
      fechaPagoHasta: override?.activePago ? override?.fechaPagoHasta ?? fechaPagoHasta : "",
    };
    onFilterChange?.(payload);
  };

  const handleClear = () => {
    setEstado("");
    setBusqueda("");
    setFechaDesde("");
    setFechaHasta("");
    setFechaPagoDesde("");
    setFechaPagoHasta("");

    onFilterChange?.({
      estado: "",
      busqueda: "",
      fechaDesde: "",
      fechaHasta: "",
      fechaPagoDesde: "",
      fechaPagoHasta: "",
    });
  };

  const setAtajo = (tipo) => {
    const hoy = new Date();
    const desde = new Date();
    switch (tipo) {
      case "7d":
        desde.setDate(hoy.getDate() - 7);
        break;
      case "15d":
        desde.setDate(hoy.getDate() - 15);
        break;
      case "1m":
        desde.setMonth(hoy.getMonth() - 1);
        break;
      case "3m":
        desde.setMonth(hoy.getMonth() - 3);
        break;
      case "6m":
        desde.setMonth(hoy.getMonth() - 6);
        break;
      default:
        break;
    }
    const desdeStr = desde.toISOString().split("T")[0];
    const hastaStr = hoy.toISOString().split("T")[0];
    setFechaDesde(desdeStr);
    setFechaHasta(hastaStr);
    onFilterChange?.({
      estado,
      busqueda,
      fechaDesde: desdeStr,
      fechaHasta: hastaStr,
      fechaPagoDesde,
      fechaPagoHasta,
    });
  };

  const filtrosActivos =
    [activeBusqueda, activeEstado, activeSesion, activePago].filter(Boolean)
      .length;

  return (
    <div className={styles.filtrosWrapper}>
      <div className={styles.header}>
        <div className={styles.statusText}>
          {filtrosActivos > 0
            ? `Filtros activos: ${filtrosActivos}`
            : "Mostrar filtros"}
        </div>
        <button
          className={`${styles.toggleBtn} ${
            mostrarFiltros ? styles.active : ""
          }`}
          onClick={() => setMostrarFiltros((prev) => !prev)}
        >
          {mostrarFiltros ? "Ocultar" : "Mostrar"}
        </button>
      </div>

      {mostrarFiltros && (
        <div className={styles.filtrosGenerales}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={activeBusqueda}
                  onChange={() => {
                    setActiveBusqueda((p) => !p);
                    // aplicar cambio inmediato
                    onFilterChange?.({
                      estado,
                      busqueda: !activeBusqueda ? busqueda : "",
                      fechaDesde,
                      fechaHasta,
                      fechaPagoDesde,
                      fechaPagoHasta,
                    });
                  }}
                />
                <span className={styles.slider}></span>
              </label>
              <span>Búsqueda por nombre</span>
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleFilter();
              }}
              className={styles.inputBusqueda}
              disabled={!activeBusqueda}
            />
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={activeEstado}
                  onChange={() => {
                    setActiveEstado((p) => !p);
                    onFilterChange?.({
                      estado: !activeEstado ? estado : "",
                      busqueda,
                      fechaDesde,
                      fechaHasta,
                      fechaPagoDesde,
                      fechaPagoHasta,
                    });
                  }}
                />
                <span className={styles.slider}></span>
              </label>
              <span>Estado</span>
            </div>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className={styles.selectEstado}
              disabled={!activeEstado}
            >
              <option value="">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Pagado">Pagado</option>
            </select>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={activeSesion}
                  onChange={() => {
                    setActiveSesion((p) => !p);
                    onFilterChange?.({
                      estado,
                      busqueda,
                      fechaDesde: !activeSesion ? fechaDesde : "",
                      fechaHasta: !activeSesion ? fechaHasta : "",
                      fechaPagoDesde,
                      fechaPagoHasta,
                    });
                  }}
                />
                <span className={styles.slider}></span>
              </label>
              <span>Fecha de sesión</span>
            </div>
            <div className={styles.dateRow}>
              <label>
                Desde:
                <input
                  type="date"
                  value={fechaDesde}
                  onChange={(e) => setFechaDesde(e.target.value)}
                  disabled={!activeSesion}
                />
              </label>
              <label>
                Hasta:
                <input
                  type="date"
                  value={fechaHasta}
                  onChange={(e) => setFechaHasta(e.target.value)}
                  disabled={!activeSesion}
                />
              </label>
              <button
                onClick={() =>
                  handleFilter()
                }
                className={styles.btnFiltrar}
                disabled={!activeSesion}
              >
                <FiFilter className={styles.iconoFiltro} />
                Filtrar
              </button>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={activePago}
                  onChange={() => {
                    setActivePago((p) => !p);
                    onFilterChange?.({
                      estado,
                      busqueda,
                      fechaDesde,
                      fechaHasta,
                      fechaPagoDesde: !activePago ? fechaPagoDesde : "",
                      fechaPagoHasta: !activePago ? fechaPagoHasta : "",
                    });
                  }}
                />
                <span className={styles.slider}></span>
              </label>
              <span>Fecha de pago</span>
            </div>
            <div className={styles.dateRow}>
              <label>
                Desde:
                <input
                  type="date"
                  value={fechaPagoDesde}
                  onChange={(e) => setFechaPagoDesde(e.target.value)}
                  disabled={!activePago}
                />
              </label>
              <label>
                Hasta:
                <input
                  type="date"
                  value={fechaPagoHasta}
                  onChange={(e) => setFechaPagoHasta(e.target.value)}
                  disabled={!activePago}
                />
              </label>
              <button
                onClick={handleClear}
                className={styles.btnLimpiar}
                disabled={!activePago}
              >
                🧹 Limpiar
              </button>
            </div>
          </div>

          <div className={styles.atajosTiempo}>
            <button onClick={() => setAtajo("7d")}>Últimos 7 días</button>
            <button onClick={() => setAtajo("15d")}>Últimas 2 semanas</button>
            <button onClick={() => setAtajo("1m")}>Último mes</button>
            <button onClick={() => setAtajo("3m")}>Últimos 3 meses</button>
            <button onClick={() => setAtajo("6m")}>Últimos 6 meses</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FiltersBar;