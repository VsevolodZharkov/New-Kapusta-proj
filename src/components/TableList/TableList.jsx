import s from './TableList.module.css';

import TableItem from 'components/TableItem/TableItem';
import { Fragment } from 'react';

const Tablelist = ({
  stats = {},
  list = [],
  type = false,
  delTrans = [],
  categorys,
}) => {
  const month = Object.keys(stats);

  const monthValues = Object.values(stats);

  return (
    <>
      <div className={s.table_container}>
        <div className={s.table_wrapper}>
          <table className={s.table}>
            <thead className={s.table_thead}>
              <tr>
                <th className={s.table_th1}>Date</th>
                <th className={s.table_th2}>Description</th>
                <th className={s.table_th3}>Category</th>
                <th className={s.table_th4}>Summ</th>
                <th className={s.table_th5}></th>
              </tr>
            </thead>

            <tbody className={s.table_tbody}>
              {list.length ? (
                list.map(el => {
                  return (
                    <Fragment key={el._id}>
                      <TableItem
                        delTrans={delTrans}
                        id={el._id}
                        date={el.date}
                        description={el.description}
                        category={el.category}
                        amount={el.amount}
                        type={type}
                        categorys={categorys}
                      />
                    </Fragment>
                  );
                })
              ) : (
                <tr className={s.noTransactionsLabel}>
                  {type ? (
                    <td>There is no expenses yet</td>
                  ) : (
                    <td>There is no incomes yet</td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={s.summary_wrapper}>
          <table className={s.summary_table}>
            <caption className={s.summary_head}>Summary</caption>

            <tbody className={s.summary_tbody}>
              {/* eslint-disable-next-line array-callback-return */}
              {month?.map((el, i) => {
                if (monthValues[i] !== 'N/A') {
                  return (
                    <tr key={i}>
                      <td className={s.summary_td1}>{el}</td>
                      <td className={s.summary_td2}>{monthValues[i]}</td>
                    </tr>
                  );
                }
              })}
              {monthValues.every(el => el === 'N/A') && (
                <tr className={s.noSummary}>
                  <td>No summary yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tablelist;
