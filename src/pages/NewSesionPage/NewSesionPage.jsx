import SessionForm from "../../components/SessionForm/SessionForm";
import styles from "./NewSesionPage.module.css";


function NewSesionPage({ onCreate, onCancel }) {
  const handleSubmit = (data) => {
    const nuevaSesion = {
      id: Date.now(),
      fecha: data.fecha,
      fechaDePago: data.fechaDePago || null,
      estado: data.estado,
      paciente: { nombre: data.paciente },
      precio: Number(data.precio),
      adjunto: data.adjunto ? data.adjunto.name : null,
    };
    onCreate(nuevaSesion);
  };

  return (
    <div className={styles.container}>
      <SessionForm
        title="Nueva Sesión"
        onSubmit={handleSubmit}
        onCancel={onCancel} 
      />
    </div>
  );
}

export default NewSesionPage;