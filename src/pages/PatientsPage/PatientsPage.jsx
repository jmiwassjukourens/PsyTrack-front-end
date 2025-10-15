import React, { useState, useEffect } from "react";
import styles from "./PatientsPage.module.css";
import PatientsFilterBar from "../../components/PatientsFilterBar/PatientsFilterBar";
import PatientCard from "../../components/PatientCard/PatientCard";
import PatientFormModal from "../../components/Modals/PatientFormModal/PatientFormModal";
import { getPatients } from "../../services/PatientService.js";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterDebt, setFilterDebt] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const data = getPatients();
    setPatients(data);
    setFiltered(data);
  }, []);

  useEffect(() => {
    let temp = [...patients];

    if (filterName.trim() !== "") {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    if (filterDebt) {
      temp = temp.filter((p) => p.debt > 0);
    }

    setFiltered(temp);
  }, [filterName, filterDebt, patients]);

  const handleNotifyAll = () => {
    alert("Notificaciones enviadas a todos los pacientes con deuda 💬");
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este paciente?")) {
      setPatients((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAddPatient = (newPatient) => {
    setPatients((prev) => [...prev, newPatient]);
    setOpenForm(false);
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>Pacientes</h2>

      <PatientsFilterBar
        filterName={filterName}
        setFilterName={setFilterName}
        filterDebt={filterDebt}
        setFilterDebt={setFilterDebt}
      />

      <div className={styles.actionsRow}>
        <button className={styles.notifyAllBtn} onClick={handleNotifyAll}>
          📢 Notificar a todos los pacientes con deuda
        </button>
        <button className={styles.addBtn} onClick={() => setOpenForm(true)}>
          ➕ Dar alta paciente
        </button>
      </div>

      <div className={styles.cardsGrid}>
        {filtered.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {openForm && (
        <PatientFormModal
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSubmit={handleAddPatient}
        />
      )}
    </div>
  );
}