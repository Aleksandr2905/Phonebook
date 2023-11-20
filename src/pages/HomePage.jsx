import React from 'react';
import image from '../components/image/smartphone.jpg';
import css from './Page.module.css';

export const HomePage = () => {
  return (
    <div>
      <h2 className={css.homeTitle}>Phonebook</h2>
      <img className={css.homeImg} src={image} alt="phone" />
    </div>
  );
};
