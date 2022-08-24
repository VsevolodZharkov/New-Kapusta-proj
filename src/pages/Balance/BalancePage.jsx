import { Balance } from 'components/Balance/Balance';
import Navigation from 'components/Navigation/Navigation';
import { Outlet } from 'react-router';
import { ReportBtn } from 'components/ReportBtn/ReportBtn';
import Styles from './BalancePage.module.css';
export default function BalancePage() {
  return (
    <>
      <div
        style={{
          margin: '0 auto',
          maxWidth: '1098px',
          position: 'relative',
        }}
      >
        <div className={Styles.paddingTop}>
          <Balance />
          <ReportBtn />
        </div>
        <Navigation />
        <Outlet />
      </div>
    </>
  );
}
