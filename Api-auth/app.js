const apiUrl = 'http://192.168.0.188/development/bhavana/local_prod/suitecrm/index.php?entryPoint=CustomerAPI';
let token = ''; 
async function apiRequest(url, method, body = null) {
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        alert('Something went wrong! Please try again later.');
    }
}

async function getToken() {
    try {
        const response = await apiRequest(`${apiUrl}`, 'POST', {
        });
        token = response.token;
        alert('Token fetched successfully!');
        document.getElementById('get-token-btn').disabled = true; 
        document.getElementById('get-data-btn').disabled = false; 
    } catch (error) {
        console.error('Error fetching token:', error);
        alert('Error fetching token');
    }
}

async function getCustomers() {
    const customersContainer = document.getElementById('customers-container');
    customersContainer.innerHTML = ''; 
    try {
        const customers = await apiRequest(`${apiUrl}`, 'GET');
        let serialNumber = 1; 
        customers.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${serialNumber}</td>
                <td>${customer.first_name} ${customer.last_name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>${customer.dob}</td>
                <td>${customer.gender === 'M' ? 'Male' : 'Female'}</td>
                <td>${customer.address}</td>
                <td><img src="${customer.profile}" alt="${customer.first_name}" class="profile-img" /></td>
                <td>
                    <button onclick="window.location.href='editCustomer.html?id=${customer.id}'">Edit</button>
                    <button onclick="deleteCustomer(${customer.id})">Delete</button>
                </td>
            `;
            customersContainer.appendChild(row);
            serialNumber++;
        });
    } catch (error) {
        console.error('Error fetching customers:', error);
    }
}

async function deleteCustomer(id) {
    const confirmation = confirm('Are you sure you want to delete this customer?');
    if (!confirmation) return;

    try {
        await apiRequest(`${apiUrl}&id=${id}`, 'DELETE');
        alert('Customer deleted successfully');
        window.location.reload();  // Refresh the page after deletion
    } catch (error) {
        alert('Error deleting customer');
    }
}

document.getElementById('get-token-btn')?.addEventListener('click', getToken);

document.getElementById('get-data-btn')?.addEventListener('click', getCustomers);

document.getElementById('get-data-btn').disabled = true;

// const apiUrl = 'http://192.168.0.188/development/bhavana/local_prod/suitecrm/index.php?entryPoint=CustomerAPI';
// let token = '';
// let customers = [];
// let currentPage = 1;
// const rowsPerPage = 3;
// async function apiRequest(url, method, body = null) {
//     const headers = {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//     };

//     const options = { method, headers };
//     if (body) options.body = JSON.stringify(body);

//     try {
//         const response = await fetch(url, options);
//         if (!response.ok) throw new Error(`Error: ${response.status}`);
//         return await response.json();
//     } catch (error) {
//         console.error(error);
//         alert('Something went wrong! Please try again later.');
//     }
// }

// async function getToken() {
//     try {
//         const response = await apiRequest(`${apiUrl}`, 'POST', {
//         });
//         token = response.token;
//         alert('Token fetched successfully!');
//         document.getElementById('get-token-btn').disabled = true; 
//         document.getElementById('get-data-btn').disabled = false; 
//     } catch (error) {
//         console.error('Error fetching token:', error);
//         alert('Error fetching token');
//     }
// }

// // ✅ GET Customers and render to table
// async function getCustomers() {
//   try {
//     const data = await apiRequest(apiUrl);
//     customers = data;
//     currentPage = 1;
//     renderTable();
//   } catch {
//     alert('Error fetching customers');
//   }
// }

// // ✅ Render table with pagination
// function renderTable() {
//   const tbody = document.getElementById('customers-container');
//   const info = document.getElementById('page-info');
//   const controls = document.getElementById('pagination-controls');

//   if (!tbody) return; // Page protection
//   tbody.innerHTML = '';
//   controls.innerHTML = '';

//   const total = customers.length;
//   const totalPages = Math.ceil(total / rowsPerPage);
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const endIndex = Math.min(startIndex + rowsPerPage, total);

//   info.textContent = `Showing ${startIndex + 1}-${endIndex} of ${total}`;

//   customers.slice(startIndex, endIndex).forEach((c, i) => {
//     const tr = document.createElement('tr');
//     tr.innerHTML = `
//       <td>${startIndex + i + 1}</td>
//       <td>${c.first_name} ${c.last_name}</td>
//       <td>${c.email}</td>
//       <td>${c.phone}</td>
//       <td>${c.dob}</td>
//       <td>${c.gender}</td>
//       <td>${c.address}</td>
//       <td><img src="${c.profile}" class="profile-img" alt="Profile" /></td>
//       <td>
//         <button onclick="window.location.href='editCustomer.html?id=${c.id}'">Edit</button>
//         <button onclick="deleteCustomer('${c.id}')">Delete</button>
//       </td>
//     `;
//     tbody.appendChild(tr);
//   });

//   // Pagination buttons
//   for (let i = 1; i <= totalPages; i++) {
//     const btn = document.createElement('button');
//     btn.textContent = i;
//     if (i === currentPage) btn.classList.add('active');
//     btn.onclick = () => {
//       currentPage = i;
//       renderTable();
//     };
//     controls.appendChild(btn);
//   }
// }

// // ✅ DELETE Customer
// async function deleteCustomer(id) {
//   if (!confirm('Are you sure you want to delete this customer?')) return;
//   try {
//     await apiRequest(`${apiUrl}?id=${id}`, 'DELETE');
//     alert('Customer deleted!');
//     getCustomers();
//   } catch {
//     alert('Failed to delete customer');
//   }
// }

// // ✅ ADD Customer
// const addForm = document.getElementById('add-customer-form');
// if (addForm) {
//   addForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const data = {
//       first_name: document.getElementById('first-name').value,
//       last_name: document.getElementById('last-name').value,
//       dob: document.getElementById('dob').value,
//       phone: document.getElementById('phone').value,
//       email: document.getElementById('email').value,
//       gender: document.getElementById('gender').value,
//       address: document.getElementById('address').value,
//       profile: document.getElementById('profile').files[0]?.name || 'default.jpg'
//     };
//     try {
//       await apiRequest(apiUrl, 'POST', data);
//       alert('Customer added successfully!');
//       window.location.href = 'index.html';
//     } catch {
//       alert('Failed to add customer.');
//     }
//   });
// }

// // ✅ EDIT Customer
// const editForm = document.getElementById('edit-customer-form');
// if (editForm) {
//   const id = new URLSearchParams(window.location.search).get('id');
//   (async () => {
//     try {
//       const data = await apiRequest(`${apiUrl}&id=${id}`, 'GET');
//       document.getElementById('edit-first-name').value = data.first_name;
//       document.getElementById('edit-last-name').value = data.last_name;
//       document.getElementById('edit-dob').value = data.dob;
//       document.getElementById('edit-phone').value = data.phone;
//       document.getElementById('edit-email').value = data.email;
//       document.getElementById('edit-gender').value = data.gender;
//       document.getElementById('edit-address').value = data.address;
//     } catch {
//       alert('Failed to load customer data.');
//     }
//   })();

//   editForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const data = {
//       first_name: document.getElementById('edit-first-name').value,
//       last_name: document.getElementById('edit-last-name').value,
//       dob: document.getElementById('edit-dob').value,
//       phone: document.getElementById('edit-phone').value,
//       email: document.getElementById('edit-email').value,
//       gender: document.getElementById('edit-gender').value,
//       address: document.getElementById('edit-address').value,
//       profile: document.getElementById('edit-profile').files[0]?.name || 'default.jpg'
//     };
//     try {
//       await apiRequest(`${apiUrl}&id=${id}`, 'PATCH', data);
//       alert('Customer updated successfully!');
//       window.location.href = 'index.html';
//     } catch {
//       alert('Failed to update customer.');
//     }
//   });
// }
