import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectsPage from "../pages/ProjectsPage";
import TasksPage from "../pages/TasksPage";
import Navbar from "../components/common/Navbar";

function AppRouter() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<ProjectsPage />} />
                <Route path="/tareas" element={<TasksPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
