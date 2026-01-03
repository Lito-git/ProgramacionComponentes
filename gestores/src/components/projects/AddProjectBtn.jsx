
function AddProjectBtn({ showForm, onClick }) {
    return (
        <button onClick={onClick}>
            {showForm ? "Cancelar" : "Agregar Proyecto"}
        </button>
    );
}

export default AddProjectBtn;