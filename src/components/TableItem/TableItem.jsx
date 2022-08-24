import React, { useState } from 'react';
import vvv from '../../images/svg-icon-project/symbol-defs.svg';
import s from '../TableList/TableList.module.css';
import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { getLoading } from 'redux/transaction/transactions-selectors';
import { useSelector } from 'react-redux';
import { LoaderLineTable } from 'components/Loaders/LoaderLine/LoaderLineTable';
//-----------------------------------------------------//
export default function TableItem({
  date,
  description,
  category,
  amount,
  id,
  type: x,
  categorys = [],
  delTrans,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const type = category === 'З/П' || category === 'Доп. доход';
  const onDelete = id => {
    delTrans(id);
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const isLoading = useSelector(getLoading);
  return (
    <>
      <tr className={s.tr}>
        <td className={s.date_td1}>{date}</td>
        <td className={s.description_td2}>{description}</td>
        <td className={s.category_td3}>{category}</td>

        <td className={!type ? s.expense : s.income}>
          {!type && <span>-</span>}
          {amount} грн.
        </td>
        <td className={s.delete}>
          <div className={s.svg} onClick={handleOpenModal}>
            <svg width="17" height="17" type="button">
              <use href={vvv + '#icon-trash-can'}></use>
            </svg>
          </div>
        </td>
      </tr>

      {isModalOpen && (
        <ConfirmationModal
          isExit={true}
          onSubmit={() => onDelete(id)}
          onClose={handleCloseModal}
          title="Are you sure?"
        />
      )}
      {isLoading && (
        <tr>
          <td>
            <LoaderLineTable />
          </td>
        </tr>
      )}
    </>
  );
}
