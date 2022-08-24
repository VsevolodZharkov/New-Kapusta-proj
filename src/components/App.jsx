import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUser, googleAuthUser } from 'redux/auth/auth-operations';
// import { getIsLogged } from 'redux/auth/auth-selectors';
import { SignInView } from '../pages/SignInView/SignInView';
import { NotFound } from 'pages/NotFound/NotFound';
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import SharedLayout from 'pages/SharedLayout';
import ExpensesView from 'pages/ExpenseView/ExpensesView';
import { ReportView } from 'pages/ReportView';
import IncomeView from 'pages/IncomeView';
import PublicRoute from './PublicRoute/PublicRoute';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import { getIsLoading, getSuccessToken } from 'redux/auth/auth-selectors';
import { MainContainer } from './MainContainer/MainContainer';
import { LoaderLine } from './Loaders/LoaderLine/LoaderLine';
import Media from 'react-media';
import MainMobile from 'pages/MobileView/MainMobile';
import FormMobile from 'pages/MobileView/FormMobile';

//---------------------------------------------------------------//
export const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(getSuccessToken);
  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(getCurrentUser());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  //---//
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const sid = searchParams.get('sid');

    if (!accessToken) return;
    dispatch(googleAuthUser({ accessToken, refreshToken, sid }));

    navigate('/main');
  }, [searchParams, dispatch, navigate]);

  const isLoading = useSelector(getIsLoading);

  return (
    <>
      {isLoading ? (
        <LoaderLine />
      ) : (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route
              index
              element={
                <PublicRoute>
                  <SignInView />
                </PublicRoute>
              }
            />
            <Route path="main">
              <Route
                index
                element={
                  <PrivateRoute>
                    <Media
                      queries={{
                        small: '(max-width: 767.92px)',
                        medium: '(min-width: 768px)',
                      }}
                    >
                      {({ small, medium }) => (
                        <>
                          {small && <MainMobile />}
                          {medium && <ExpensesView />}
                        </>
                      )}
                    </Media>
                  </PrivateRoute>
                }
              />
              <Route
                path={'income'}
                element={
                  <PrivateRoute>
                    <Media
                      queries={{
                        small: '(min-width: 319px) and (max-width: 767.92px)',
                        medium: '(min-width: 768px)',
                      }}
                    >
                      {({ small, medium }) => (
                        <>
                          {small && <Navigate to="/main" />}
                          {medium && <IncomeView />}
                        </>
                      )}
                    </Media>
                  </PrivateRoute>
                }
              />
              <Route
                path={'create/:location'}
                element={
                  <PrivateRoute>
                    <Media
                      queries={{
                        small: '(min-width: 319px) and (max-width: 767.92px)',
                        medium: '(min-width: 768px)',
                      }}
                    >
                      {({ small, medium }) => (
                        <>
                          {small && <FormMobile />}
                          {medium && <Navigate to="/main" />}
                        </>
                      )}
                    </Media>
                  </PrivateRoute>
                }
              />
            </Route>
            <Route
              path={'reports'}
              element={
                <PrivateRoute>
                  <ReportView />
                </PrivateRoute>
              }
            />
          </Route>

          <Route
            path="*"
            element={
              <MainContainer>
                <NotFound />
              </MainContainer>
            }
          />
        </Routes>
      )}
    </>
  );
};
