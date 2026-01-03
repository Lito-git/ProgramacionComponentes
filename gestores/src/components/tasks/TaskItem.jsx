
function TaskItem({ task, onDeleteTask }) {
    return (
        <div className="Items">
            <div>
                <h3>{task.name}</h3>
                <p>Fecha límite: {new Date(task.dueDate + "T00:00:00").toLocaleDateString("es-CL")}</p>
                <p>Prioridad: {task.priority}</p>
            </div>
            <button
                onClick={() => onDeleteTask(task.id)}>
                Eliminar
            </button>
        </div>
    );
}

export default TaskItem;