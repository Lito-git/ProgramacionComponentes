import { useState, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

function ProjectForm({ onAddProject }) {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [, forceUpdate] = useState(0);

    const validator = useRef(
        new SimpleReactValidator({
            messages: {
                required: "El campo :attribute es obligatorio.",
                min: "El campo :attribute debe tener al menos :min caracteres."
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
            .get("https://jsonplaceholder.typicode.com/posts/1")
            .then((response) => {
                const newProject = {
                    name: projectName,
                    description,
                    apiData: response.data,
                    createdAt: new Date().toISOString()
                };

                addDoc(collection(db, "projects"), newProject)
                    .then((docRef) => {
                        onAddProject({ id: docRef.id, ...newProject });

                        setProjectName("");
                        setDescription("");
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
            <h2>Nuevo Proyecto</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del proyecto</label>
                    <input
                        name="nombre_proyecto"
                        type="text"
                        value={projectName}
                        onChange={(e) => {
                            setProjectName(e.target.value);
                            validator.current.showMessageFor("nombre_proyecto");
                        }}
                    />
                    {validator.current.message(
                        "nombre_proyecto",
                        projectName,
                        "required"
                    )}
                </div>

                <div>
                    <label>Descripción</label>
                    <textarea
                        name="descripcion"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            validator.current.showMessageFor("descripcion");
                        }}
                    />
                    {validator.current.message(
                        "descripcion",
                        description,
                        "required|min:10"
                    )}
                </div>

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default ProjectForm;
