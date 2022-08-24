import styles from '../NotFound/NotFound.module.css';
import { useNavigate } from 'react-router-dom';
export const NotFound = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/', { replace: true });
  };
  return (
    <>
      <div className={styles.bg_image}>
        <div className={styles.title}>
          <h1>404</h1>
          <h2>PAGE NOT FOUND</h2>
          <button onClick={onClick} className={styles.btn}>
            GO HOME
          </button>
        </div>
      </div>
    </>
  );
};
