import { Contact } from 'components/Contact/Contact';
import { Filter } from 'components/Filter/Filter';
import { Form } from 'components/Form/Form';
import { Loader } from 'components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import {
  changeFilter,
  fetchAddContacts,
  fetchDeleteContacts,
} from 'redux/phonebookReducer';
import {
  selectContacts,
  selectError,
  selectFilter,
  selectFilteredContacts,
  selectIsLoading,
} from 'redux/selectors';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ContactsPage = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filteredContacts = useSelector(selectFilteredContacts);

  const dispatch = useDispatch();

  const handleAddContact = ({ name, number }) => {
    const hasDuplicateContacts = contacts.find(
      contact => contact.name === name && contact.number === number
    );

    if (hasDuplicateContacts) {
      toast.warning(`${name} is already in contacts.`);
      return;
    }

    dispatch(
      fetchAddContacts({
        name,
        number,
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

  return (
    <div>
      <Form handleAddContact={handleAddContact} />
      <Filter onChange={handleFilterChange} value={filter} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {error && <div>{error}</div>}
          <Contact
            contacts={filteredContacts}
            handleDeleteContact={handleDeleteContact}
          />
          <ToastContainer />
        </>
      )}
    </div>
  );
};