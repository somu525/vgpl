let contacts = [];
let isEditing = false;
let editingIndex = -1;
function displayContacts(contacts) {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
    contacts.forEach((contact, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td>${contact.address}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editContact(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteContact(${index})">Delete</button>
            </td>
        `;
        contactList.appendChild(row);
    });
    // if(x!==0){
    var card = document.getElementById('tiles');
    card.style.display = 'none';
    document.getElementById('addcontact').style.display="block";
    // }
}

document.getElementById('addcontact').onclick = function() {
    var card = document.getElementById('tiles');
    card.style.display = 'block';
    document.getElementById('addcontact').style.display='none';
};
document.getElementById('cancel').onclick=function(){
    var card = document.getElementById('tiles');
    card.style.display = 'none';
    document.getElementById('addcontact').style.display='block';
}
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    const newContact = { name, email, phone, address };

    if (isEditing) {
        contacts[editingIndex] = newContact;
        isEditing = false;
        editingIndex = -1;
    } else {
        contacts.push(newContact);
    }

    
    document.getElementById('contactForm').reset();
    displayContacts(contacts); 
});


function editContact(index) {
    const contact = contacts[index];
    document.getElementById('name').value = contact.name;
    document.getElementById('email').value = contact.email;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('address').value = contact.address;
   contacts[editingIndex] = newContact;
    document.getElementById('table').style.display='none';
}


function deleteContact(index) {
    contacts.splice(index, 1); 
    displayContacts(contacts); 
}


document.getElementById('search').addEventListener('input', function(event) {
    const query = event.target.value.toLowerCase();
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.phone.includes(query)
    );
    displayContacts(filteredContacts); 
});


function displayFilteredContacts(filteredContacts) {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
    filteredContacts.forEach((contact, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td>${contact.address}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editContact(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteContact(${index})">Delete</button>
            </td>
        `;
        contactList.appendChild(row);
    });
}


document.getElementById('sortName').addEventListener('click', function() {
    contacts.sort((a, b) => a.name.localeCompare(b.name));
    displayContacts(contacts); 
});

document.getElementById('sortEmail').addEventListener('click', function() {
    contacts.sort((a, b) => a.email.localeCompare(b.email));
    displayContacts(contacts); 
});

document.getElementById('sortPhone').addEventListener('click', function() {
    contacts.sort((a, b) => a.phone.localeCompare(b.phone));
    displayContacts(contacts); 
});
