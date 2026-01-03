import { useState, useEffect } from 'react'
import TaskForm from '../components/tasks/TaskForm'
import TaskList from '../components/tasks/TaskList'
import AddTaskBtn from '../components/tasks/AddTaskBtn'
import HeaderTitle from '../components/common/HeaderTitle'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

function TasksPage() {
    const [tasks, setTasks] = useState([])
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        getDocs(collection(db, "tasks"))
            .then((snapshot) => {
                const tasksFromDB = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTasks(tasksFromDB);
            })
            .catch((error) => {
                console.error("Error al cargar tareas", error);
            });
    }, []);

    const addTask = (task) => {
        setTasks([...tasks, task]);
        setShowForm(false);
    }

    const deleteTask = (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
            return;
        }

        deleteDoc(doc(db, "tasks", id))
            .then(() => {
                setTasks(tasks.filter((t) => t.id !== id));
            })
            .catch((error) => {
                console.error("Error al eliminar la tarea:", error);
            });
    };

    return (
        <div>
            <HeaderTitle title="Gestor de Tareas" />

            <AddTaskBtn onClick={() => setShowForm(!showForm)} showForm={showForm} />
            {showForm && <TaskForm onAddTask={addTask} />}

            <TaskList tasks={tasks} onDeleteTask={deleteTask} />
        </div>
    )
}

export default TasksPage;