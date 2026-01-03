import React from "react";
import ProjectItem from "./ProjectItem";

function ProjectList({ projects, onDeleteProject }) {
    return (
        <React.Fragment>
            <h2>Lista de Proyectos</h2>

            {projects.length === 0 ? (
                <p>No hay proyectos.</p>
            ) : (
                projects.map((project) => (
                    <ProjectItem
                        key={project.id}
                        project={project}
                        onDeleteProject={onDeleteProject}
                    />
                ))
            )}
        </React.Fragment>
    );
}

export default ProjectList;
