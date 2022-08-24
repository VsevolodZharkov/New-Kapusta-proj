import { useState } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '../TransactionForm/TransactionForm.module.css';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import svg from '../../images/svg-icon-project/symbol-defs.svg';
import DatePickerComponent from 'components/DatePickerComponent/DatePickerComponent';

//----------------------------------------------------------------------------//

export const TransactionForm = ({
  engCategory,
  rCategory,
  onSubmit,
  isRenderDate = true,
}) => {
  const [date, setDate] = useState(new Date());
  const [active, setActive] = useState(false);
  const [category, setCategory] = useState('');

  const handleChangedate = changeDate => {
    setDate(changeDate);
  };

  const handlerSubmit = evt => {
    evt.preventDefault();

    if (isRenderDate) {
      const { date: x, description, amount } = evt.target.elements;

      const date = x.value.replaceAll('.', '-');
      onSubmit({
        description: description.value,
        category: category,
        amount: Number(amount.value),
        date,
      });
    } else {
      const { description, amount } = evt.target.elements;
      onSubmit({
        description: description.value,
        category: category,
        amount: Number(amount.value),
      });
    }

    evt.target.reset();
    setCategory('');
  };

  const onClick = evt => {
    if (
      evt.target.textContent === 'Product Category' ||
      evt.target.textContent.length > 25
    ) {
      setActive(!active);
      return;
    }

    rCategory.map((el, i) => {
      if (evt.target.textContent === engCategory[i]) {
        setCategory(rCategory[i]);
      }
      return '';
    });

    setActive(!active);
  };
  const returnEngcategory = () => {
    let res;
    rCategory.forEach((el, i) => {
      if (category === el) {
        res = engCategory[i];
      }
    });
    return res;
  };

  const validate = Yup.object().shape({
    amount: Yup.number().min(2).required('Required'),
    description: Yup.string()
      .min(3, 'Must be at least 3 charaters')
      .required('Required'),
  });

  return (
    <>
      <Formik
        initialValues={{
          amount: '',
          description: '',
          category: '',
        }}
        validationSchema={validate}
      >
        {({
          errors,
          touched,
          isValid,
          dirty,
          handleChange,
          handleReset,
          values,
        }) => {
          return (
            <Form className={styles.form} onSubmit={handlerSubmit}>
              <div className={styles.inputsWrap}>
                {isRenderDate && (
                  <DatePickerComponent
                    name="date"
                    date={date}
                    handler={handleChangedate}
                  />
                )}

                <label className={styles.label}>
                  <Field
                    className={styles.description}
                    name="description"
                    type="text"
                    onChange={handleChange}
                    placeholder="Product description"
                  />
                  {errors.description && touched.description && (
                    <span className={styles.errorMessage}>
                      {errors.description}
                    </span>
                  )}
                </label>
                {/* Custom select start------------------------------------------------------------ ------------------------------------------------*/}
                <div className={styles.wrapper}>
                  <div
                    // style={category&&{}}
                    onClick={onClick}
                    className={
                      category || active
                        ? styles.dropdownSelected
                        : styles.dropdown
                    }
                  >
                    {!active ? (
                      <svg
                        className={styles.selectionIcon}
                        width="15"
                        height="10"
                      >
                        <use href={`${svg}#icon-arrow-to-down`}></use>
                      </svg>
                    ) : (
                      <svg
                        className={styles.selectionIconRev}
                        width="15"
                        height="10"
                      >
                        <use href={`${svg}#icon-arrow-to-down`}></use>
                      </svg>
                    )}

                    <div className={styles.dropdownBtn}>
                      {category ? returnEngcategory() : 'Product Category'}
                      <div
                        className={
                          active
                            ? styles.dropdownContent
                            : styles.dropdownContentDisable
                        }
                      >
                        {active &&
                          engCategory.map((el, i) => {
                            return (
                              <p key={i} className={styles.dropdownItem}>
                                {el}
                              </p>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  {/* Custom select END------------------------------------------------------------ -----------------------------------*/}
                </div>
                <label className={styles.label}>
                  <div className={styles.calcWrap}>
                    <svg
                      className={styles.iconCalculator}
                      width="20"
                      height="20"
                    >
                      <use href={`${svg}#icon-calculator`}></use>
                    </svg>

                    <Field
                      onChange={handleChange}
                      className={styles.amount}
                      name="amount"
                      type="number"
                      placeholder="0,00"
                    />
                    <div className={styles.calcRightSide}></div>
                    {errors.amount && touched.amount && (
                      <span className={styles.errorMessage}>
                        {errors.amount}
                      </span>
                    )}
                  </div>
                </label>
              </div>

              <div className={styles.btnWrap}>
                <button
                  className={styles.inputBtn}
                  type="submit"
                  disabled={
                    !isValid ||
                    !dirty ||
                    !category ||
                    values.description.toLowerCase() === 'total'
                  }
                >
                  INPUT
                </button>
                <button
                  className={styles.clearBtn}
                  type="button"
                  onClick={() => {
                    handleReset();
                    setCategory('');
                  }}
                >
                  CLEAR
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
