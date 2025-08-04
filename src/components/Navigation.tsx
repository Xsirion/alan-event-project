import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
<nav className={styles.sidebar}>
    <h2>Menu</h2>
    <ul className={styles.list}>
        <li>
            <NavLink 
            to="/"
            className={({ isActive }) => isActive ? styles.active : undefined}
            >Wydarzenia</NavLink>
        </li>
        <li>
            <NavLink 
            to="/add-event"
            className={({ isActive }) => isActive ? styles.active : undefined}
            >Dodaj wydarzenie</NavLink>
        </li>
    </ul>
</nav>
  );
}