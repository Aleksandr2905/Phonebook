import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogOut } from 'redux/authSlice';
import css from './UserMenu.module.css';
import { selectAuthUser } from 'redux/selectors';

export const UserMenu = () => {
  const user = useSelector(selectAuthUser);
  const dispatch = useDispatch();

  const handleLogOutClick = () => {
    dispatch(requestLogOut());
  };

  return (
    <div className={css.userMenuWrap}>
      <p className={css.userMenuText}>Welcome, {user.name}!</p>
      <button
        className={css.navBtnLogOut}
        type="button"
        onClick={handleLogOutClick}
      >
        Log Out
      </button>
    </div>
  );
};
