import { useState } from 'react';
import style from './Form.module.css';

export const Form = ({ handleAddContact }) => {
  const [formData, setFormData] = useState({ name: '', number: '' });

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleAddContact(formData);
    setFormData({ name: '', number: '' });
  };

  const { name, number } = formData;

  return (
    <>
      <h1 className={style.title}>Phonebook</h1>
      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>
          <span className={style.spanText}>Name</span>
          <input
            className={style.inputForm}
            onChange={handleChange}
            type="text"
            name="name"
            required
            value={name}
            placeholder="Rosie Simpson"
          />
        </label>
        <label className={style.label}>
          <span className={style.spanText}>Number</span>
          <input
            className={style.inputForm}
            onChange={handleChange}
            type="tel"
            name="number"
            required
            placeholder="111-22-33"
            value={number}
          />
        </label>
        <button className={style.formBtn} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};
