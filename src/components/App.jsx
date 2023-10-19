import { NavLink, Route, Routes } from 'react-router-dom';
import css from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HomePage } from 'pages/HomePage';
import { ContactsPage } from 'pages/ContactsPage';
import { LogInPage } from 'pages/LogInPage';
import { RegisterPage } from 'pages/RegisterPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { requestAutoLogIn, requestLogOut } from 'redux/authSlice';
import { selectIsAuthenticated } from 'redux/selectors';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import { fetchContacts } from 'redux/phonebookReducer';

export const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAutoLogIn());
  }, [dispatch]);

  const handleLogOutClick = () => {
    dispatch(requestLogOut());
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <header>
        <nav className={css.navWrap}>
          <NavLink to="/">Home</NavLink>
          {isAuthenticated ? (
            <NavLink to="/contacts">Contacts</NavLink>
          ) : (
            <>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          )}
          {isAuthenticated ? (
            <button type="button" onClick={handleLogOutClick}>
              Log Out
            </button>
          ) : null}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  );
};
