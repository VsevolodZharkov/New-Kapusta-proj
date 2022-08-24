import ReactDatePicker from 'react-datepicker';
import styles from '../../components/TransactionForm/TransactionForm.module.css';
import svg from '../../images/svg-icon-project/symbol-defs.svg';
//-----------------------------------------------------------------------//

export default function DatePickerComponent({ date, handler }) {
  return (
    <label className={styles.label}>
      <svg className={styles.iconCalendar} width="20" height="20">
        <use href={`${svg}#icon-calendar`}></use>
      </svg>
      <ReactDatePicker
        className={styles.date}
        name="date"
        dateFormat="yyyy.MM.dd"
        selected={date}
        onChange={handler}
      />
    </label>
  );
}
