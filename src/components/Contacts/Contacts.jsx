import ContactList from 'components/ContactList/ContactList';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';

import { getFilteredContacts } from '../../redux/contacts/contacts-selectors';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact } from '../../redux/contacts/contacts-slice';
import { setFilter } from '../../redux/filter/filter-slice';

const Contacts = () => {
  const contacts = useSelector(getFilteredContacts);

  const dispatch = useDispatch();

  const isDuplicate = ({ name }) => {
    const nameNormalized = name.toLowerCase();

    const duplicate = contacts.find(item => {
      const currentNameNormalize = item.name.toLowerCase();
      return currentNameNormalize === nameNormalized;
    });

    return Boolean(duplicate);
  };

  const onAddContact = data => {
    if (isDuplicate(data)) {
      return alert(`${data.name} is already in contacts`);
    }

    const action = addContact(data);
    dispatch(action);
  };

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const changeFilter = ({ target }) => dispatch(setFilter(target.value));

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onAddContact} />
      <h2>Contacts</h2>
      <Filter onChange={changeFilter} />
      <ContactList items={contacts} deleteContact={onDeleteContact} />
    </div>
  );
};

export default Contacts;
