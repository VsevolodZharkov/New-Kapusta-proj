import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

export const Navigation = ({ expenses = '', income = 'income' }) => {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      <li className={styles.link_btn}>
        <NavLink
          to={`/main/${expenses}`}
          state={location}
          className={({ isActive }) =>
            isActive
              ? `${styles.link_tab} ${styles.active}`
              : `${styles.link_tab}`
          }
        >
          Expenses
        </NavLink>
      </li>
      <li className={styles.link_btn}>
        <NavLink
          to={`/main/${income}`}
          state={location}
          className={({ isActive }) =>
            isActive
              ? `${styles.link_tab_inc} ${styles.active}`
              : `${styles.link_tab_inc}`
          }
        >
          Income
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
