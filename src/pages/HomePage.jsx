import React from 'react';
import image from '../components/image/smartphone.jpg';
import css from './Page.module.css';

export const HomePage = () => {
  return (
    <div>
      <img className={css.homeImg} src={image} alt="phone" />
    </div>
  );
};
