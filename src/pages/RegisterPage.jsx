import React from 'react';
import { useDispatch } from 'react-redux';
import { requestRegister } from 'redux/authSlice';
import css from './Page.module.css';

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    const email = event.currentTarget.elements.email.value;
    const password = event.currentTarget.elements.password.value;
    const name = event.currentTarget.elements.name.value;

    dispatch(requestRegister({ email, password, name }));
    event.currentTarget.reset();
  };

  return (
    <div className={css.registerWrap}>
      <h1 className={css.registerText}>Register page</h1>
      <form className={css.registerForm} onSubmit={handleSubmit}>
        <label className={css.registerLabel}>Email</label>
        <input
          className={css.registerInput}
          type="text"
          name="email"
          required
          placeholder="Email address"
        />
        <label className={css.registerLabel}>Name</label>
        <input
          className={css.registerInput}
          type="text"
          name="name"
          required
          placeholder="Name"
        />
        <label className={css.registerLabel}>Password</label>
        <input
          className={css.registerInput}
          type="password"
          name="password"
          required
          placeholder="Password"
          minLength="7"
        />
        <button className={css.registerBtn} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};
