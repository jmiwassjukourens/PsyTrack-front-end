import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./SesionesPage.module.css";
import SessionCards from "../../components/SessionCards/SessionCards";
import NewSessionButton from "../../components/NewSessionButton/NewSessionButton";
import FiltersBar from "../../components/FiltersBar/FiltersBar";
import EditSesionModal from "../../components/Modals/EditSesionModal/EditSesionModal"; 
import SessionModal from "../../components/Modals/SessionModal/SessionModal"; 
import { getSessions, addSession, deleteSession, updateSession } from "../../services/sessionService";
 
function SesionesPage() {
const [sesiones, setSesiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [selectedSesion, setSelectedSesion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filtros, setFiltros] = useState({
    estado: "",
    busqueda: "",
    fechaDesde: "",
    fechaHasta: "",
    fechaPagoDesde: "",
    fechaPagoHasta: "",
  });

  const [searchParams] = useSearchParams();
  const pacienteParam = searchParams.get("paciente");
  const fechaParam = searchParams.get("fecha"); 

  useEffect(() => {
    async function fetchData() {
      const data = await getSessions();
      setSesiones(data);
      setLoading(false);
    }
    fetchData();
  }, []);


useEffect(() => {
  if (pacienteParam || fechaParam) {
    let fechaISO = "";
    if (fechaParam) {
      const fecha = new Date(fechaParam);
      fecha.setHours(0, 0, 0, 0);
      fechaISO = fecha.toISOString().slice(0, 10);
    }

    setFiltros((prev) => ({
      ...prev,
      busqueda: pacienteParam || "",
      fechaDesde: fechaISO,
      fechaHasta: fechaISO,
    }));
  }
}, [pacienteParam, fechaParam]);




  const handleFilterChange = (filtrosRecibidos) => {
    setFiltros(filtrosRecibidos);
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


  const handleUpdate = async (id, updatedData) => {
    const actualizada = await updateSession(id, updatedData);
    setSesiones((prev) =>
      prev.map((s) => (s.id === id ? actualizada : s))
    );
    setView("list");
  };


  const handleCreate = async (data) => {
    try {
      if (Array.isArray(data)) {

        const nuevas = await Promise.all(data.map((s) => addSession(s)));
        setSesiones((prev) => [...prev, ...nuevas]);
      } else {

        const nueva = await addSession(data);
        setSesiones((prev) => [...prev, nueva]);
      }
      setShowModal(false); 
    } catch (err) {
      console.error("Error al crear sesión:", err);
      alert("Hubo un error al crear la sesión");
    }
  };


  const sesionesFiltradas = sesiones.filter((s) => {
    const matchEstado = filtros.estado === "" || s.estado === filtros.estado;
    const matchBusqueda = s.paciente.nombre
      .toLowerCase()
      .includes(filtros.busqueda.toLowerCase());
    const matchFechaSesion =
      (!filtros.fechaDesde || 
        new Date(s.fecha).toISOString().slice(0,10) >= filtros.fechaDesde) &&
      (!filtros.fechaHasta || 
        new Date(s.fecha).toISOString().slice(0,10) <= filtros.fechaHasta);

    const matchFechaPago =
      (!filtros.fechaPagoDesde ||
        (s.fechaDePago && new Date(s.fechaDePago) >= new Date(filtros.fechaPagoDesde))) &&
      (!filtros.fechaPagoHasta ||
        (s.fechaDePago && new Date(s.fechaDePago) <= new Date(filtros.fechaPagoHasta)));

    return matchEstado && matchBusqueda && matchFechaSesion && matchFechaPago;
  });

  if (loading) return <p>Cargando sesiones...</p>;

  if (view === "edit" && selectedSesion)
    return (
      <EditSesionModal
        sesion={selectedSesion}
        onUpdate={handleUpdate}
        onCancel={() => setView("list")}
      />
    );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Gestión de Sesiones</h2>
        <NewSessionButton onClick={() => setShowModal(true)} />
      </div>

      <div className={styles.filtersWrapper}>
        <FiltersBar
          onFilterChange={handleFilterChange}
          defaultBusqueda={pacienteParam || ""}
          defaultFechaDesde={
            fechaParam
              ? new Date(fechaParam).toISOString().slice(0, 10)
              : ""
          }
          defaultFechaHasta={
            fechaParam
              ? new Date(fechaParam).toISOString().slice(0, 10)
              : ""
          }
        />


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

      {showModal && (
        <SessionModal
          onClose={() => setShowModal(false)}
          onSave={handleCreate}
        />
      )}
    </div>
  );
}

export default SesionesPage;