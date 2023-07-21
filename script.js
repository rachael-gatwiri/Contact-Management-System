class UserDetails {
    constructor(username, phonenumber, useremail) {
      this.username = username;
      this.phonenumber = phonenumber;
      this.useremail = useremail;
    }
  }

  class Users  {
    constructor() {
      this.details = this.loadUsersFromLocalStorage();
    }
  
    addUser(username, phonenumber, useremail) {
      const newUser = new UserDetails(username, phonenumber, useremail);
      this.details.push(newUser);
      this.saveUsersToLocalStorage();
    }
  
    updateUser(index, username, phonenumber, useremail) {
      if (index >= 0 && index < this.details.length) {
        this.details[index].username = username;
        this.details[index].phonenumber = phonenumber;
        this.details[index].useremail = useremail;
        this.saveUsersToLocalStorage();
      }
    }
  
    deleteUser(index) {
      if (index >= 0 && index < this.details.length) {
        this.details.splice(index, 1);
        this.saveUsersToLocalStorage();
      }
    }
  
    saveUsersToLocalStorage() {
      localStorage.setItem('contacts', JSON.stringify(this.details));
    }
  
    loadUsersFromLocalStorage() {
      const detailsJSON = localStorage.getItem('contacts');
      return detailsJSON ? JSON.parse(detailsJSON) : [];
    }
  
    displayUsers() {
      const detailsList = document.querySelector('.contacts-list');
      detailsList.innerHTML = '';
  
      this.details.forEach((detail, index) => {
        const detailDiv = document.createElement('div');
        detailDiv.classList.add('user');
        detailDiv.innerHTML = `
          <div class="profile">
            <span class="user-profile">
              <img src="images/profile.png" alt="userProfile">
            </span>
            <span class="user-details">
              <p>${detail.username}</p>
              <p>${detail.phonenumber}</p>
              <p>${detail.useremail}</p>
            </span>
          </div>
          <div class="edit-icons">
            <img class="update" src="images/update.png" alt="updateIcon" onclick="updateUser(${index})">
            <img class="delete" src="images/delete.jpeg" alt="DeleteIcon" onclick="deleteUser(${index})">
          </div>
        `;
        detailsList.appendChild(detailDiv);
      });
    }
  }
  
  const details = new Users();
  
  const addButton = document.getElementById('add-contact');
  addButton.addEventListener('click', () => {
    const username = document.getElementById('add-name').value;
    const phonenumber = document.getElementById('phone-number').value;
    const useremail = document.getElementById('email').value;
  
    if (username && phonenumber && useremail) {
        details.addUser(username, phonenumber, useremail);
        details.displayUsers();
  
      document.getElementById('add-name').value = '';
      document.getElementById('phone-number').value = '';
      document.getElementById('email').value = '';
    } else {
      alert('Please fill in all the contact details!');
    }
  });
  
  function updateUser(index) {
    const detail = details.details[index];
    if (detail) {
      document.getElementById('add-name').value = detail.username;
      document.getElementById('phone-number').value = detail.phonenumber;
      document.getElementById('email').value = detail.useremail;
      addButton.textContent = 'Update';
      document.getElementById('contact-index').value = index;
    }
  }
  
  function deleteUser(index) {
    details.deleteUser(index);
    details.displayUsers();
  }
  