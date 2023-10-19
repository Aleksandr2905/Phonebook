import React from 'react';
import { useDispatch } from 'react-redux';
import { requestLogIn } from 'redux/authSlice';

export const LogInPage = () => {
  const dispatch = useDispatch();

  const handleLogInSubmit = event => {
    event.preventDefault();

    const email = event.currentTarget.elements.email.value;
    const password = event.currentTarget.elements.password.value;

    dispatch(requestLogIn({ email, password }));
    event.currentTarget.reset();

    // .unwrap()
    // .then(() => event.currentTarget.reset())
    // .catch(error => alert('err.message'));
  };

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={handleLogInSubmit}>
        <label>Email</label>
        <input type="text" name="email" required placeholder="Email" />
        <label>Password</label>
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
