const apiUrl = 'https://reqres.in/api/users';
const itemsPerPage = 3; 

async function fetchAllUsers() {
    const allUsers = [];
    let page = 1;
    let totalPages = 1;

    do {
        const response = await fetch(`${apiUrl}?page=${page}`);
        const data = await response.json();
        totalPages = data.total_pages;
        allUsers.push(...data.data);
        page++;
    } while (page <= totalPages);

    return allUsers;
}
async function renderGallery(page = 1) {
    const allUsers = await fetchAllUsers();
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const users = allUsers.slice(start, end);
    const totalPages = Math.ceil(allUsers.length / itemsPerPage);

    const galleryContainer = document.getElementById('app');
    galleryContainer.innerHTML = '';

    const gallery = document.createElement('div');
    gallery.classList.add('gallery');

    users.forEach(user => {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.innerHTML = `
            <img src="${user.avatar}" alt="${user.first_name}" />
            <h2>${user.first_name} ${user.last_name}</h2>
            <p>${user.email}</p>
            <a href="user.html?id=${user.id}">Know More</a>
        `;
        gallery.appendChild(tile);
    });

    galleryContainer.appendChild(gallery);

    const pagination = document.createElement('div');
    pagination.classList.add('pagination');

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.addEventListener('click', () => renderGallery(i));
        pagination.appendChild(button);
    }

    galleryContainer.appendChild(pagination);
}
async function renderUserDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    const userDetailsContainer = document.getElementById('app');
    const response = await fetch(`https://reqres.in/api/users/${userId}`);
    const data = await response.json();
    const user = data.data;

    userDetailsContainer.innerHTML = `
        <div class="user-details">
            <img src="${user.avatar}" alt="${user.first_name}" class="user-avatar" />
            <h2>${user.first_name} ${user.last_name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <a href="index.html" class="back-link">Back to Home Screen</a>
        </div>
    `;
}

if (window.location.pathname.endsWith('index.html')) {
    renderGallery(); 
} else if (window.location.pathname.endsWith('user.html')) {
    renderUserDetails(); 
}
