const apiUrl = "https://sampledev.pythonanywhere.com/api/students/";

let students = [];
let filteredStudents = [];
let currentPage = 1;
const rowsPerPage = 3;

const tableBody = document.querySelector("#studentTable tbody");
const pagination = document.getElementById("pagination");
const studentModal = document.getElementById("studentModal");
const studentForm = document.getElementById("studentForm");
const cancelBtn = document.getElementById("cancelBtn");
const modalTitle = document.getElementById("modalTitle");
const addStudentBtn = document.getElementById("addStudentBtn");
const searchBox = document.getElementById("searchBox");
const clearSearch = document.getElementById("clearSearch");

let editingId = null;

window.addEventListener("DOMContentLoaded", () => {
  fetchStudents();
});

async function fetchStudents() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch student data");
    students = await response.json();
    displayStudents();
  } catch (error) {
    alert(error.message);
  }
}

function displayStudents() {
  const dataToDisplay = filteredStudents.length ? filteredStudents : students;
  const start = (currentPage - 1) * rowsPerPage;
  const paginated = dataToDisplay.slice(start, start + rowsPerPage);

  tableBody.innerHTML = "";
  if (paginated.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='8'>No students found</td></tr>";
  } else {
    paginated.forEach((student, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${start + index + 1}</td>
        <td>${student.first_name} ${student.last_name}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>${student.dob}</td>
        <td>${student.gender}</td>
        <td>${student.address}</td>
        <td>
          <button onclick="editStudent(${student.id})">Edit</button>
          <button onclick="deleteStudent(${student.id})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  updatePagination(dataToDisplay.length);
  updateStudentCount(dataToDisplay.length);
}

function updatePagination(totalItems) {
  pagination.innerHTML = "";
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    pageBtn.classList.toggle("active", i === currentPage);
    pageBtn.onclick = () => {
      currentPage = i;
      displayStudents();
    };
    pagination.appendChild(pageBtn);
  }
}

function updateStudentCount(total) {
  const start = (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(currentPage * rowsPerPage, total);
  document.getElementById("studentCount").textContent = `Showing ${start}–${end} of ${total}`;
}

// Add Student Modal
addStudentBtn.addEventListener("click", () => {
  editingId = null;
  studentModal.style.display = "block";
  modalTitle.textContent = "Add Student";
  studentForm.reset();
});

cancelBtn.addEventListener("click", () => {
  studentModal.style.display = "none";
});

studentForm.onsubmit = async (e) => {
  e.preventDefault();
  const studentData = {
    first_name: document.getElementById("first_name").value,
    last_name: document.getElementById("last_name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
    address: document.getElementById("address").value,
  };

  if (editingId) {
    await updateStudent(editingId, studentData);
  } else {
    await addStudent(studentData);
  }

  studentModal.style.display = "none";
  editingId = null;
};

async function addStudent(studentData) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });
    if (!response.ok) throw new Error("Failed to add student");
    await fetchStudents();
  } catch (error) {
    alert(error.message);
  }
}

function editStudent(id) {
  const student = students.find((s) => s.id === id);
  if (!student) return;
  editingId = id;
  modalTitle.textContent = "Edit Student";
  studentModal.style.display = "block";

  document.getElementById("first_name").value = student.first_name;
  document.getElementById("last_name").value = student.last_name;
  document.getElementById("email").value = student.email;
  document.getElementById("phone").value = student.phone;
  document.getElementById("dob").value = student.dob;
  document.getElementById("gender").value = student.gender;
  document.getElementById("address").value = student.address;
}

async function updateStudent(id, studentData) {
  try {
    const response = await fetch(`${apiUrl}${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });
    if (!response.ok) throw new Error("Failed to update student");
    await fetchStudents();
  } catch (error) {
    alert(error.message);
  }
}

async function deleteStudent(id) {
  const confirmDelete = confirm("Are you sure you want to delete this student?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`${apiUrl}${id}/`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete student");
    await fetchStudents();
  } catch (error) {
    alert(error.message);
  }
}

// Search Functionality
searchBox.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  filteredStudents = students.filter(
    (s) =>
      s.first_name.toLowerCase().includes(term) ||
      s.last_name.toLowerCase().includes(term) ||
      s.email.toLowerCase().includes(term) ||
      s.phone.includes(term)
  );
  currentPage = 1;
  displayStudents();
});

clearSearch.addEventListener("click", () => {
  searchBox.value = "";
  filteredStudents = [];
  currentPage = 1;
  displayStudents();
});
