import React from 'react';
import { Link } from 'react-router-dom';
import css from './Page.module.css';

export const NotFoundPage = () => {
  return (
    <div className={css.notFoundWrap}>
      <h1 className={css.notFoundTitle}>404</h1>
      <p className={css.notFoundText}>Opsss! This page does not exist...</p>
      <Link className={css.notFoundLink} to="/">
        Open home page
      </Link>
    </div>
  );
};
