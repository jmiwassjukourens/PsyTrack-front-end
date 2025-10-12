import { useState } from "react";
import styles from "./SesionesPage.module.css";
import SessionCards from "../../components/SessionCards/SessionCards";
import NewSessionButton from "../../components/NewSessionButton/NewSessionButton";
import FiltersBar from "../../components/FiltersBar/FiltersBar";

function SesionesPage() {
  const [sesiones, setSesiones] = useState([
    {
      id: 1,
      fecha: "2025-10-07T10:00:00",
      estado: "Pendiente",
      paciente: { nombre: "Juan Pérez" },
      precio: 1500,
    },
    {
      id: 2,
      fecha: "2025-10-08T14:30:00",
      estado: "Completada",
      paciente: { nombre: "María García" },
      precio: 2000,
    },
    {
      id: 3,
      fecha: "2025-10-09T09:00:00",
      estado: "Cancelada",
      paciente: { nombre: "Carlos López" },
      precio: 1000,
    },
  ]);

  const [filtros, setFiltros] = useState({ estado: "", busqueda: "" });


  const handleCreate = () => {
    const nombre = prompt("Nombre del paciente:");
    if (!nombre) return;

    const nueva = {
      id: Date.now(),
      fecha: new Date().toISOString(),
      estado: "Pendiente",
      paciente: { nombre },
      precio: 1500,
    };

    setSesiones([...sesiones, nueva]);
  };


  const handleEdit = (sesion) => {
    const nuevoNombre = prompt(
      "Editar nombre del paciente:",
      sesion.paciente.nombre
    );
    if (!nuevoNombre) return;

    const nuevoEstado = prompt(
      "Editar estado (Pendiente, Completada, Cancelada):",
      sesion.estado
    );

    const nuevoPrecio = prompt("Editar precio:", sesion.precio);

    setSesiones((prev) =>
      prev.map((s) =>
        s.id === sesion.id
          ? {
              ...s,
              paciente: { nombre: nuevoNombre },
              estado: nuevoEstado || s.estado,
              precio: Number(nuevoPrecio) || s.precio,
            }
          : s
      )
    );
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
    const matchEstado =
      filtros.estado === "" || s.estado === filtros.estado;
    const matchBusqueda = s.paciente.nombre
      .toLowerCase()
      .includes(filtros.busqueda.toLowerCase());
    return matchEstado && matchBusqueda;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Gestión de Sesiones</h2>
        <NewSessionButton onClick={handleCreate} />
      </div>

      <div className={styles.filtersWrapper}>
        <FiltersBar onFilterChange={handleFilterChange} />
      </div>

      <SessionCards
        sesiones={sesionesFiltradas}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default SesionesPage;
