
function ProjectItem({ project, onDeleteProject }) {
    const createDate = new Date(project.createdAt);

    return (
        <div className="Items">
            <h3>{project.name}</h3>
            <p>Descripción: {project.description}</p>
            <p>Fecha de creación: {createDate.toLocaleDateString("es-CL")}</p>
            <p>API Info: {JSON.stringify(project.apiData, null, 2)}</p>
            <button onClick={() => onDeleteProject(project.id)}>
                Eliminar
            </button>
        </div>
    );
}

export default ProjectItem;