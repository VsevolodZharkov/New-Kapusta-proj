import Tablelist from 'components/TableList/TableList';
import React, { useEffect } from 'react';
import BalancePage from './Balance/BalancePage';
import { TransactionForm } from 'components/TransactionForm/TransactionForm';
import {
  addIncome,
  deleteTrancaction,
  fetchIncome,
} from 'redux/transaction/transaction-operations';
import {
  getIncomeList,
  getIncomeMonth,
} from 'redux/transaction/transactions-selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getIncomeCategories } from 'redux/categories/catrgories-operation';
import { getIsLogged, getStartBalance } from 'redux/auth/auth-selectors';
import { getCategoriesIncome } from 'redux/categories/catrgories-selectors';

import styles from './ExpenseView/ExpenseView.module.css';
//------------------------------------------------------------------------------------//
export default function IncomeView() {
  const dispatch = useDispatch();
  const engCategory = ['salary', 'additional income'];
  const ruCategory = useSelector(getCategoriesIncome);
  const incomeArr = useSelector(getIncomeList);
  const bal = useSelector(getStartBalance);
  const isLog = useSelector(getIsLogged);

  const stats = useSelector(getIncomeMonth);

  useEffect(() => {
    if (!isLog) {
      return;
    }
    dispatch(getIncomeCategories());
    dispatch(fetchIncome());
  }, [dispatch, isLog, bal]);

  const onSubmit = data => {
    dispatch(addIncome(data));
  };

  const deleteItem = id => {
    dispatch(deleteTrancaction(id));
  };

  return (
    <div>
      <BalancePage />
      <div className={styles.expenseViewWrapper}>
        <TransactionForm
          rCategory={ruCategory}
          onSubmit={onSubmit}
          engCategory={engCategory}
        />

        <Tablelist
          stats={stats}
          list={incomeArr}
          delTrans={deleteItem}
          categorys={ruCategory}
        />
      </div>
    </div>
  );
}
