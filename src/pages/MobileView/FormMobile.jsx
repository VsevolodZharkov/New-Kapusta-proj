import React, { useEffect } from 'react';
import { Icons } from '../../components/Icons/Icons';
import { TransactionForm } from 'components/TransactionForm/TransactionForm';
import styles from './FormMobile.module.css';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDate } from 'redux/date/date-selector';
import {
  getCategoriesExpanses,
  getCategoriesIncome,
} from 'redux/categories/catrgories-selectors';
import {
  addExpanses,
  addIncome,
} from 'redux/transaction/transaction-operations';
import {
  getExpansesCategories,
  getIncomeCategories,
} from 'redux/categories/catrgories-operation';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
//------------------------------------------------//
//-----------------------------------------------helpers
const engCategoryExp = [
  'Products',
  'Alcohol',
  'Entertainment',
  'Health',
  'Transport',
  'Housing',
  'Technique',
  'Communal, communication',
  'Sports, hobbies',
  'Education',
  'Other',
];
const engCategoryInc = ['salary', 'additional income'];

export default function FormMobile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //------------------------------------get location str
  const { location } = useParams();

  //--------------------------------getting categories
  const categoriesExpanses = useSelector(getCategoriesExpanses);
  const categoriesIncome = useSelector(getCategoriesIncome);

  //------------------------------------get current date
  const currentDate = useSelector(getCurrentDate);

  //------------------------------------------useeffect
  useEffect(() => {
    dispatch(getExpansesCategories());
    dispatch(getIncomeCategories());
  }, [dispatch]);

  // -----------------------------------------------submits
  const onSubmitExp = data => {
    dispatch(
      addExpanses({ ...data, date: currentDate ? currentDate : dateNow })
    )
      .unwrap()
      .then(() => {
        navigate('/main');
      });
  };
  const onSubmitInc = data => {
    dispatch(addIncome({ ...data, date: currentDate ? currentDate : dateNow }))
      .unwrap()
      .then(() => {
        navigate('/main');
      });
  };

  const nowData = new Date();

  const [day, setDay] = useState(nowData.getDate());
  if (day.length === 1) {
    setDay(`0${day}`);
  }
  const [month, setMonth] = useState(`${nowData.getMonth() + 1}`);
  if (month.length === 1) {
    setMonth(`0${month}`);
  }

  // const month = nowData.getMonth() + 1;
  const year = nowData.getFullYear();
  const dateNow = `${year}-${month}-${day}`;

  return (
    <div>
      <p className={styles.text}>
        {`Current date : ${currentDate ? currentDate : dateNow}`}
      </p>

      <NavLink to="/main" className={styles.backBtn}>
        <Icons
          name="long-arrow-left"
          className=""
          color="#FF751D"
          width="18"
          height="12"
        />
      </NavLink>
      {location === 'expanse' ? (
        <TransactionForm
          isRenderDate={false}
          engCategory={engCategoryExp}
          rCategory={categoriesExpanses}
          onSubmit={onSubmitExp}
        />
      ) : (
        <TransactionForm
          isRenderDate={false}
          engCategory={engCategoryInc}
          rCategory={categoriesIncome}
          onSubmit={onSubmitInc}
        />
      )}
    </div>
  );
}
