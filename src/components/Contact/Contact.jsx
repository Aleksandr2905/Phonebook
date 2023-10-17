import { nanoid } from 'nanoid';
import style from './Contact.module.css';

export const Contact = ({ contacts, handleDeleteContact }) => (
  <>
    <ul className={style.contactTitle}>
      {contacts.map(({ id, name, phone }) => (
        <li className={style.contactItem} key={nanoid()}>
          <p>{name}</p>
          <p className={style.contactPhone}>{phone}</p>
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
