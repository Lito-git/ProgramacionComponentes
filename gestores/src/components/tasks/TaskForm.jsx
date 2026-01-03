import { useState, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

function TaskForm({ onAddTask }) {
    const [taskName, setTaskName] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [, forceUpdate] = useState(0);

    const validator = useRef(
        new SimpleReactValidator({
            messages: {
                required: "El campo :attribute es obligatorio."
            },
            validators: {
                valid_date: {
                    message: "La :attribute no es una fecha válida (hoy o una futura).",
                    rule: (val) => {
                        if (!val) return false;
                        const selectedDate = new Date(val + "T00:00:00");
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return selectedDate >= today;
                    }
                }
            }
        })
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validator.current.allValid()) {
            validator.current.showMessages();
            forceUpdate(1);
            return;
        }

        axios
            .get("https://jsonplaceholder.typicode.com/todos/1")
            .then((response) => {
                const newTask = {
                    name: taskName,
                    dueDate,
                    priority: response.data.completed ? "Baja" : "Alta",
                    apiData: response.data,
                    createdAt: new Date().toDateString()
                };

                addDoc(collection(db, "tasks"), newTask)
                    .then((docRef) => {
                        onAddTask({ id: docRef.id, ...newTask });
                        setTaskName("");
                        setDueDate("");
                        validator.current.hideMessages();
                    })
                    .catch((error) => {
                        console.error("Error al guardar en Firestore:", error);
                    });
            })
            .catch((error) => {
                console.error("Error al obtener datos de la API:", error);
            });
    };

    return (
        <div className="Form">
            <h2>Nueva Tarea</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de la tarea</label>
                    <input
                        name="nombre_tarea"
                        type="text"
                        value={taskName}
                        onChange={(e) => {
                            setTaskName(e.target.value);
                            validator.current.showMessageFor("nombre_tarea");
                        }}
                    />
                    {validator.current.message(
                        "nombre_tarea",
                        taskName,
                        "required"
                    )}
                </div>

                <div>
                    <label>Fecha límite</label>
                    <input
                        name="fecha_limite"
                        type="date"
                        value={dueDate}
                        onChange={(e) => {
                            setDueDate(e.target.value);
                            validator.current.showMessageFor("fecha_limite");
                        }}
                    />
                    {validator.current.message(
                        "fecha_limite",
                        dueDate,
                        "required|valid_date"
                    )}
                </div>

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default TaskForm;