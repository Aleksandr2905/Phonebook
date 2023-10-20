import React from 'react';
import { useDispatch } from 'react-redux';
import { requestLogIn } from 'redux/authSlice';
import css from './Page.module.css';

export const LogInPage = () => {
  const dispatch = useDispatch();

  const handleLogInSubmit = event => {
    event.preventDefault();

    const email = event.currentTarget.elements.email.value;
    const password = event.currentTarget.elements.password.value;

    dispatch(requestLogIn({ email, password }));
    event.currentTarget.reset();
  };

  return (
    <div className={css.loginWrap}>
      <h1 className={css.loginText}>Login Page</h1>
      <form className={css.loginForm} onSubmit={handleLogInSubmit}>
        <label className={css.loginLabel}>Email</label>
        <input
          className={css.loginInput}
          type="text"
          name="email"
          required
          placeholder="Email"
        />
        <label className={css.loginLabel}>Password</label>
        <input
          className={css.loginInput}
          type="password"
          name="password"
          required
          placeholder="Password"
        />
        <button className={css.loginBtn} type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};
