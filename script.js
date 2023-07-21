class Contact {
    constructor(name, phoneNumber, email) {
      this.name = name;
      this.phoneNumber = phoneNumber;
      this.email = email;
    }
  }

  class ContactManager {
    constructor() {
      this.contacts = this.loadContactsFromLocalStorage();
    }
  
    addContact(name, phoneNumber, email) {
      const newContact = new Contact(name, phoneNumber, email);
      this.contacts.push(newContact);
      this.saveContactsToLocalStorage();
    }
  
    updateContact(index, name, phoneNumber, email) {
      if (index >= 0 && index < this.contacts.length) {
        this.contacts[index].name = name;
        this.contacts[index].phoneNumber = phoneNumber;
        this.contacts[index].email = email;
        this.saveContactsToLocalStorage();
      }
    }
  
    deleteContact(index) {
      if (index >= 0 && index < this.contacts.length) {
        this.contacts.splice(index, 1);
        this.saveContactsToLocalStorage();
      }
    }
  
    saveContactsToLocalStorage() {
      localStorage.setItem('contacts', JSON.stringify(this.contacts));
    }
  
    loadContactsFromLocalStorage() {
      const contactsJSON = localStorage.getItem('contacts');
      return contactsJSON ? JSON.parse(contactsJSON) : [];
    }
  
    displayContacts() {
      const contactsList = document.querySelector('.contacts-list');
      contactsList.innerHTML = '';
  
      this.contacts.forEach((contact, index) => {
        const contactDiv = document.createElement('div');
        contactDiv.classList.add('user');
        contactDiv.innerHTML = `
          <div class="profile">
            <span class="user-profile">
              <img src="images/profile.png" alt="userProfile">
            </span>
            <span class="user-details">
              <p>${contact.name}</p>
              <p>${contact.phoneNumber}</p>
              <p>${contact.email}</p>
            </span>
          </div>
          <div class="edit-icons">
            <img class="update" src="images/update.png" alt="updateIcon" onclick="updateContact(${index})">
            <img class="delete" src="images/delete.jpeg" alt="DeleteIcon" onclick="deleteContact(${index})">
          </div>
        `;
        contactsList.appendChild(contactDiv);
      });
    }
  }
  
  const contactManager = new ContactManager();
  
  const addButton = document.getElementById('add-contact');
  addButton.addEventListener('click', () => {
    const name = document.getElementById('add-name').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const email = document.getElementById('email').value;
  
    if (name && phoneNumber && email) {
      contactManager.addContact(name, phoneNumber, email);
      contactManager.displayContacts();
  
      document.getElementById('add-name').value = '';
      document.getElementById('phone-number').value = '';
      document.getElementById('email').value = '';
    } else {
      alert('Please fill in all the contact details!');
    }
  });
  
  function updateContact(index) {
    const contact = contactManager.contacts[index];
    if (contact) {
      document.getElementById('add-name').value = contact.name;
      document.getElementById('phone-number').value = contact.phoneNumber;
      document.getElementById('email').value = contact.email;
      addButton.textContent = 'Update';
      document.getElementById('contact-index').value = index;
    }
  }
  
  function deleteContact(index) {
    contactManager.deleteContact(index);
    contactManager.displayContacts();
  }
  