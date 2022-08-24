import React from 'react';
import Logo from 'components/Logo/Logo';
import UserInfo from 'components/UserInfo/UserInfo';
import styles from './Header.module.css';
//-------------------------------------------------------//
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <UserInfo />
      </div>
    </header>
  );
}
