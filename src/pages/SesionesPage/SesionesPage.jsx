import { useState,useEffect } from "react";
import styles from "./SesionesPage.module.css";
import SessionCards from "../../components/SessionCards/SessionCards";
import NewSessionButton from "../../components/NewSessionButton/NewSessionButton";
import FiltersBar from "../../components/FiltersBar/FiltersBar";
import NewSesionPage from "../NewSesionPage/NewSesionPage";
import EditSesionPage from "../EditSesionPage/EditSesionPage";
import { 
  getSessions, 
  addSession, 
  deleteSession, 
  updateSession 
} from "../../services/sessionService";

function SesionesPage() {
  const [sesiones, setSesiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    estado: "",
    busqueda: "",
    fechaDesde: "",
    fechaHasta: "",
    fechaPagoDesde: "",
    fechaPagoHasta: "",
  });

  const [view, setView] = useState("list");
  const [selectedSesion, setSelectedSesion] = useState(null);


  useEffect(() => {
    async function fetchData() {
      const data = await getSessions();
      setSesiones(data);
      setLoading(false);
    }
    fetchData();
  }, []);


  const handleCreate = async (nuevaSesion) => {
    const creada = await addSession(nuevaSesion);
    setSesiones((prev) => [...prev, creada]);
    setView("list");
  };

  const handleUpdate = async (editada) => {
    const actualizada = await updateSession(editada.id, editada);
    setSesiones((prev) =>
      prev.map((s) => (s.id === actualizada.id ? actualizada : s))
    );
    setView("list");
  };

  const handleDelete = async (id) => {
    await deleteSession(id);
    setSesiones((prev) => prev.filter((s) => s.id !== id));
  };


  const handleMarkAsPaid = async (id, fechaPago) => {
    const actualizada = await updateSession(id, {
      fechaDePago: fechaPago,
      estado: "Pagado",
    });
    setSesiones((prev) =>
      prev.map((s) => (s.id === id ? actualizada : s))
    );
  };


  const handleFilterChange = (filtrosRecibidos) => {
    setFiltros(filtrosRecibidos);
  };

  const sesionesFiltradas = sesiones.filter((s) => {
    const matchEstado = filtros.estado === "" || s.estado === filtros.estado;
    const matchBusqueda = s.paciente.nombre
      .toLowerCase()
      .includes(filtros.busqueda.toLowerCase());

    const matchFechaSesion =
      (!filtros.fechaDesde || new Date(s.fecha) >= new Date(filtros.fechaDesde)) &&
      (!filtros.fechaHasta || new Date(s.fecha) <= new Date(filtros.fechaHasta));

    const matchFechaPago =
      (!filtros.fechaPagoDesde ||
        (s.fechaDePago && new Date(s.fechaDePago) >= new Date(filtros.fechaPagoDesde))) &&
      (!filtros.fechaPagoHasta ||
        (s.fechaDePago && new Date(s.fechaDePago) <= new Date(filtros.fechaPagoHasta)));

    return matchEstado && matchBusqueda && matchFechaSesion && matchFechaPago;
  });


  if (loading) return <p>Cargando sesiones...</p>;

  if (view === "create") {
    return <NewSesionPage onCreate={handleCreate} onCancel={() => setView("list")} />;
  }

  if (view === "edit" && selectedSesion) {
    return (
      <EditSesionPage
        sesion={selectedSesion}
        onUpdate={handleUpdate}
        onCancel={() => setView("list")}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Gestión de Sesiones</h2>
        <NewSessionButton onClick={() => setView("create")} />
      </div>

      <div className={styles.filtersWrapper}>
        <FiltersBar onFilterChange={handleFilterChange} />
      </div>

      <SessionCards
        sesiones={sesionesFiltradas}
        onEdit={(s) => {
          setSelectedSesion(s);
          setView("edit");
        }}
        onDelete={handleDelete}
        onMarkAsPaid={handleMarkAsPaid}
      />
    </div>
  );
}

export default SesionesPage;