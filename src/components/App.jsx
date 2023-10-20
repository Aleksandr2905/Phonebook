import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import css from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HomePage } from 'pages/HomePage';
import { ContactsPage } from 'pages/ContactsPage';
import { LogInPage } from 'pages/LogInPage';
import { RegisterPage } from 'pages/RegisterPage';
import { requestAutoLogIn } from 'redux/authSlice';
import { selectIsAuthenticated } from 'redux/selectors';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import { fetchContacts } from 'redux/phonebookReducer';
import { UserMenu } from './UserMenu/UserMenu';

export const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(requestAutoLogIn());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <header className={css.header}>
        <nav className={css.navWrap}>
          <div className={css.navBtnWrap}>
            <NavLink
              className={`${css.navBtn} ${
                location.pathname === '/' ? css.active : ''
              }`}
              to="/"
            >
              Home
            </NavLink>
            {isAuthenticated ? (
              <NavLink
                className={`${css.navBtn} ${
                  location.pathname === '/contacts' ? css.active : ''
                }`}
                to="/contacts"
              >
                Contacts
              </NavLink>
            ) : (
              <>
                <NavLink
                  className={`${css.navBtn} ${
                    location.pathname === '/register' ? css.active : ''
                  }`}
                  to="/register"
                >
                  Register
                </NavLink>
                <NavLink
                  className={`${css.navBtn} ${
                    location.pathname === '/login' ? css.active : ''
                  }`}
                  to="/login"
                >
                  Login
                </NavLink>
              </>
            )}
          </div>

          {isAuthenticated ? <UserMenu /> : null}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage to="/" />} />
          <Route
            path="/contacts"
            element={
              <ProtectedRoute>
                <ContactsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/contacts">
                <RegisterPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts">
                <LogInPage />
              </RestrictedRoute>
            }
          />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  );
};
