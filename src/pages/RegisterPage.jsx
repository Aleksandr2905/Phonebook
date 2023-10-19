import React from 'react';
import { useDispatch } from 'react-redux';
import { requestRegister } from 'redux/authSlice';

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
    <div>
      <h1>Register page</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" name="email" required placeholder="Email address" />
        <label>Name</label>
        <input type="text" name="name" required placeholder="Name" />
        <label>Password</label>
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          minLength="7"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
