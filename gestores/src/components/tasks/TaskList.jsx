import React from "react";
import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, onDeleteTask }) {
    return (
        <React.Fragment>
            <h2>Lista de Tareas</h2>

            {tasks.length === 0 ? (
                <p>No hay tareas disponibles.</p>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onDeleteTask={onDeleteTask}
                    />
                ))
            )}
        </React.Fragment>
    )
}

export default TaskList;