class Details {
    constructor(username, phonenumber, useremail) {
      this.username = username;
      this.phonenumber = phonenumber;
      this.useremail = useremail;
    }
  }

  class Contacts  {
    constructor() {
      this.contacts = this.loadContactsFromLocalStorage();
    }
  
    addContact(username, phonenumber, useremail) {
      const newContact = new Details(username, phonenumber, useremail);
      this.contacts.push(newContact);
      this.saveContactsToLocalStorage();
    }
  
    updateContact(index, username, phonenumber, useremail) {
      if (index >= 0 && index < this.contacts.length) {
        this.contacts[index].username = username;
        this.contacts[index].phonenumber = phonenumber;
        this.contacts[index].useremail = useremail;
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
              <p>${contact.username}</p>
              <p>${contact.phonenumber}</p>
              <p>${contact.useremail}</p>
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
  
  const contacts = new Contacts();
  
  const addButton = document.getElementById('add-contact');
  addButton.addEventListener('click', () => {
    const username = document.getElementById('add-name').value;
    const phonenumber = document.getElementById('phone-number').value;
    const useremail = document.getElementById('email').value;
  
    if (username && phonenumber && useremail) {
        contacts.addContact(username, phonenumber, useremail);
        contacts.displayContacts();
  
      document.getElementById('add-name').value = '';
      document.getElementById('phone-number').value = '';
      document.getElementById('email').value = '';
    } else {
      alert('Please fill in all the contact details!');
    }
  });
  
  function updateContact(index) {
    const contact = contacts.contacts[index];
    if (contact) {
      document.getElementById('add-name').value = contact.username;
      document.getElementById('phone-number').value = contact.phonenumber;
      document.getElementById('email').value = contact.useremail;
      addButton.textContent = 'Update';
      document.getElementById('contact-index').value = index;
    }
  }
  
  function deleteContact(index) {
    contacts.deleteContact(index);
    contacts.displayContacts();
  }
  