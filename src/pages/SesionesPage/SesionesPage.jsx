import { useState } from "react";
import styles from "./SesionesPage.module.css";
import SessionCards from "../../components/SessionCards/SessionCards";
import NewSessionButton from "../../components/NewSessionButton/NewSessionButton";
import FiltersBar from "../../components/FiltersBar/FiltersBar";
import NewSesionPage from "../NewSesionPage/NewSesionPage";
import EditSesionPage from "../EditSesionPage/EditSesionPage";



function SesionesPage() {
  const [sesiones, setSesiones] = useState([
    {
      id: 1,
      fecha: "2025-05-07T10:00:00",
      fechaDePago: "2025-10-09T18:00:00",
      estado: "Pagado",
      paciente: { nombre: "Juan Pérez" },
      precio: 1500,
      adjunto: "recibo-juan.pdf",
    },
    {
      id: 2,
      fecha: "2025-10-08T14:30:00",
      fechaDePago: null,
      estado: "Pagado",
      paciente: { nombre: "María García" },
      precio: 2000,
      adjunto: null,
    },
    {
      id: 3,
      fecha: "2025-10-09T09:00:00",
      fechaDePago: null,
      estado: "Pendiente",
      paciente: { nombre: "Carlos López" },
      precio: 1000,
      adjunto: null,
    },
  ]);

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

  const handleCreate = (nuevaSesion) => {
    setSesiones((prev) => [...prev, nuevaSesion]);
    setView("list");
  };

  const handleUpdate = (editada) => {
    setSesiones((prev) => prev.map((s) => (s.id === editada.id ? editada : s)));
    setView("list");
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que querés eliminar esta sesión?")) {
      setSesiones((prev) => prev.filter((s) => s.id !== id));
    }
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
      />
    </div>
  );
}

export default SesionesPage;
