import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }
            >
                CASO I
            </NavLink>

            <NavLink
                to="/tareas"
                className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }
            >
                CASO II
            </NavLink>
        </nav>
    );
}

export default Navbar;
