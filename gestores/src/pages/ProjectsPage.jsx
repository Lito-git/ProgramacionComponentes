import { useState, useEffect } from "react";
import ProjectForm from "../components/projects/ProjectForm";
import ProjectList from "../components/projects/ProjectList";
import HeaderTitle from "../components/common/HeaderTitle";
import AddProjectBtn from "../components/projects/AddProjectBtn";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        getDocs(collection(db, "projects"))
            .then((snapshot) => {
                const projectsFromDB = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProjects(projectsFromDB);
            })
            .catch((error) => {
                console.error("Error al cargar proyectos:", error);
            });
    }, []);

    const addProject = (project) => {
        setProjects([...projects, project]);
        setShowForm(false);
    };

    const deleteProject = (id) => {
        if(!window.confirm("¿Estás seguro de que deseas eliminar este proyecto?")) {
            return;
        }

        deleteDoc(doc(db, "projects", id))
            .then(() => {
                setProjects(projects.filter((p) => p.id !== id));
            })
            .catch((error) => {
                console.error("Error al eliminar proyecto:", error);
            });
    };

    return (
        <div>
            <HeaderTitle title="Gestor de Proyectos" />

            <AddProjectBtn
                onClick={() => setShowForm(!showForm)}
                showForm={showForm}
            />

            {showForm && <ProjectForm onAddProject={addProject} />}

            <ProjectList
                projects={projects}
                onDeleteProject={deleteProject}
            />
        </div>
    );
}

export default ProjectsPage;

