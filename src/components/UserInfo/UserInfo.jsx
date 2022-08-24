import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserInfo.module.css';
import { logOut } from 'redux/auth/auth-operations';
import { getIsLogged, getUserEmail } from 'redux/auth/auth-selectors';
import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { Icons } from '../Icons/Icons'
//---------------------------------------------------//

export default function UserInfo() {
  const dispath = useDispatch();
  const isLogged = useSelector(getIsLogged);
  const email = useSelector(getUserEmail);

  const handlerLogOut = () => {
    dispath(logOut());
    setIsModalOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    isLogged && (
      <div className={styles.wrapper}>
        <Avatar
          style={{
            fontWeight: 700,
          }}
          size={32}
          fgColor={'#000000'}
          color={'#F5F6FA'}
          round={true}
          name={email}
        />
				<p className={styles.text}>{email}</p>
       	<button className={styles.btn} type="button" onClick={handleOpenModal}>
         		Exit
				<span className={styles.svg_iconLogoutDiv} onClick={handleOpenModal}>
				 <Icons
						name='logout'
				  	className={styles.svg_iconLogout}
						width='16'
						height='16'
				 />
				 </span>
				</button>
        {isModalOpen && (
          <ConfirmationModal
            isExit={true}
            onSubmit={handlerLogOut}
            onClose={handleCloseModal}
            title="Do you really want to leave?"
          />
        )}
      </div>
    )
  );
}
