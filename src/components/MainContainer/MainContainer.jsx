import styles from './MainContainer.module.css';

import LogoKapusta from './images/LogoKapusta.png';
import { useSelector } from 'react-redux';
import { getSuccessToken } from 'redux/auth/auth-selectors';
import svg from '../MainContainer/images/Component_3.svg';
import Nutsmini from './images/Nutsmini.png';
import LogoKapustaMobile from './images/Kapusta-mobile-title.svg';
import FooterKapustaMobile from './images/kapusta-header-mobile.svg';
import LogoKapustaTablet from './images/Kapusta-tablet-title.svg';

import footerKapustaDesktop from '../MainContainer/images/Component_4.svg';

export const MainContainer = ({ children }) => {
  const hasToken = useSelector(getSuccessToken);
  return hasToken ? (
    <>
      <div className={styles.Container2}>
        <div className={styles.bgColor2}></div>
        {children}
        {/* <img className={styles.Fon} src={Rectangle} alt="Fon" width="100%" />
        <img
          className={styles.FonNutsInAuth}
          src={NutsFon}
          alt=""
          width="100%"
        /> */}
        <picture>
          <source srcSet={footerKapustaDesktop} />
          <img src={svg} alt="1" className={styles.bgImageHomeView} />
        </picture>

        {/* <div className={styles.bgImageHomeView}></div> */}
      </div>
    </>
  ) : (
    <>
      <div className={styles.bgColor}></div>
      <div className={styles.innerWrapperForm}>
        <picture className={styles.LogoKapusta}>
          <source
            srcSet={`${LogoKapusta} 1x`}
            media="(min-width: 1280px)"
            width="377"
            height="139"
          />
          <source
            srcSet={`${LogoKapustaTablet} 1x`}
            media="(min-width: 768px)"
            width="306"
            height="101"
          />
          <source
            srcSet={`${LogoKapustaMobile} 1x`}
            media="(max-width: 767px)"
          />

          <img src={LogoKapustaMobile} alt="2" />
        </picture>

        {children}
        {/* <img className={styles.Fon} src={Rectangle} alt="Fon" width="100%" />
          <img className={styles.FonNuts} src={NutsFon} alt="" width="100%" /> */}
      </div>

      <picture className={styles.Nutsmini}>
        <source srcSet={Nutsmini} media="(min-width: 768px)" />
        <source srcSet={FooterKapustaMobile} media="(max-width: 767px)" />
        <img src={Nutsmini} alt="" className={styles.Nutsmini} />
      </picture>
    </>
  );
};
