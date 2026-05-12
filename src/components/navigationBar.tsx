import { NavLink } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav className="navBar">
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Rochy
      </NavLink>
      <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : "")}>
        Projects
      </NavLink>
      <NavLink to="/collection" className={({ isActive }) => (isActive ? "active" : "")}>
        Collection
      </NavLink>
      <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
        Contact
      </NavLink>
    </nav>
  );
}