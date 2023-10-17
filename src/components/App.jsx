import { Form } from './Form/Form';
import { Contact } from './Contact/Contact';
import { Filter } from './Filter/Filter';
import style from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeFilter,
  fetchAddContacts,
  fetchContacts,
  fetchDeleteContacts,
} from './redux/phonebookReducer';
import { useEffect } from 'react';

export const App = () => {
  const contacts = useSelector(state => state.phonebook.contacts);
  const filter = useSelector(state => state.phonebook.filter);
  const isLoading = useSelector(state => state.phonebook.isLoading);
  const error = useSelector(state => state.phonebook.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = ({ name, phone }) => {
    const hasDuplicateContacts = contacts.find(
      contact => contact.name === name && contact.phone === phone
    );

    if (hasDuplicateContacts) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(
      fetchAddContacts({
        name,
        phone,
      })
    );
  };

  const handleFilterChange = event => {
    const inputFilter = event.target.value;
    dispatch(changeFilter(inputFilter));
  };

  const handleDeleteContact = contactId => {
    dispatch(fetchDeleteContacts(contactId));
  };

  const filterContacts = contacts.filter(contact => {
    return (
      contact.name.toLowerCase().includes(filter.trim().toLowerCase()) ||
      contact.phone.includes(filter)
    );
  });

  return (
    <div className={style.wrap}>
      <h1 className={style.title}>Phonebook</h1>
      <Form handleAddContact={handleAddContact} />
      <h2 className={style.titleContact}>Contacts</h2>
      <Filter onChange={handleFilterChange} value={filter} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error && <div>{error}</div>}
          <Contact
            contacts={filterContacts}
            handleDeleteContact={handleDeleteContact}
          />
        </>
      )}
    </div>
  );
};
