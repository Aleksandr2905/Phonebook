import style from './Filter.module.css';

export const Filter = ({ name, onChange }) => {
  return (
    <div>
      <h2 className={style.titleContact}>Contacts</h2>
      <p className={style.textFilter}>Find contact by name</p>
      <input
        className={style.inputFilter}
        type="text"
        name="name"
        value={name}
        onChange={onChange}
      />
    </div>
  );
};
