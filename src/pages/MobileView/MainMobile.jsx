import { Balance } from 'components/Balance/Balance';
import Navigation from 'components/Navigation/Navigation';
import { ReportBtn } from 'components/ReportBtn/ReportBtn';
import Tablelist from 'components/TableList/TableList';
import Styles from '../Balance/BalancePage.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllTransactions,
  getIsLogged,
  getStartBalance,
} from 'redux/auth/auth-selectors';
import { deleteTrancaction } from 'redux/transaction/transaction-operations';
import DatePickerComponent from 'components/DatePickerComponent/DatePickerComponent';
import { refreshUserInfo } from 'redux/auth/auth-operations';
import { setDateStore } from 'redux/date/date-slice';
import { getCurrentDate } from 'redux/date/date-selector';

//---------------------------------------------------------------//
export default function MainMobile() {
  const isLog = useSelector(getIsLogged);
  const bal = useSelector(getStartBalance);
  /////
  const currentDate = useSelector(getCurrentDate);

  ///////
  const [date, setDate] = useState(new Date());
  const allTransactions = useSelector(getAllTransactions);
  const dispatch = useDispatch();
  ////////
  const forPicerData = new Date(currentDate ? currentDate : new Date());

  if (date.getTime() !== forPicerData.getTime()) {
    setDate(forPicerData);
  }

  const deleteItem = id => {
    dispatch(deleteTrancaction(id))
      .unwrap()
      .then(() => {
        dispatch(refreshUserInfo());
      });
  };
  const handleChangedate = changeDate => {
    setDate(changeDate);

    const year = changeDate.getFullYear();

    const month =
      changeDate.getMonth() + 1 < 10
        ? '0' + (changeDate.getMonth() + 1)
        : changeDate.getMonth() + 1;

    const day =
      changeDate.getDate() < 10
        ? '0' + changeDate.getDate()
        : changeDate.getDate();

    dispatch(setDateStore(`${year}-${month}-${day}`));
  };
  useEffect(() => {
    if (!isLog) return;
    dispatch(refreshUserInfo());
  }, [bal, isLog, dispatch]);

  return (
    <>
      <div className={Styles.paddingTop}>
        <Balance />
        <ReportBtn />
        <DatePickerComponent
          name="date"
          date={date ? date : new Date()}
          handler={handleChangedate}
          //////////

          ////
        />
      </div>

      {!!allTransactions?.length && (
        <Tablelist list={allTransactions} delTrans={deleteItem} />
      )}
      <Navigation expenses={'create/expanse'} income={'create/income'} />
    </>
  );
}
