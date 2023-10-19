// import { nanoid } from 'nanoid';
import style from './Contact.module.css';

export const Contact = ({ contacts, handleDeleteContact }) => (
  <>
    <ul className={style.contactTitle}>
      {contacts.map(({ id, name, number }) => (
        <li className={style.contactItem} key={id}>
          <p>{name}</p>
          <p className={style.contactPhone}>{number}</p>
          <button
            className={style.btnDelete}
            type="button"
            onClick={() => handleDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </>
);
