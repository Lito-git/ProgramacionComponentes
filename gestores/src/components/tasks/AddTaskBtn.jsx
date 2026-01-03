
function AddTaskBtn({ showForm, onClick }) {
    return (
        <button onClick={onClick}>
            {showForm ? "Cancelar" : "Agregar Tarea"}
        </button>
    );
}

export default AddTaskBtn;