import SessionForm from "../../components/SessionForm/SessionForm";
import styles from "./EditSesionPage.module.css";

function EditSesionPage({ sesion, onUpdate, onCancel }) {
  const handleSubmit = (data) => {
    const sesionEditada = {
      ...sesion,
      fecha: data.fecha,
      fechaDePago: data.fechaDePago || null,
      estado: data.estado,
      paciente: { nombre: data.paciente },
      precio: Number(data.precio),
      adjunto: data.adjunto ? data.adjunto.name : sesion.adjunto,
    };
    onUpdate(sesionEditada);
  };

  return (
    <div className={styles.container}>
      <SessionForm
        title="Editar Sesión"
        initialData={sesion}
        onSubmit={handleSubmit}
        onCancel={onCancel} 
      />
    </div>
  );
}

export default EditSesionPage;