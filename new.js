// Array to hold user data
let users = [];

// Select form elements
const userForm = document.getElementById("userForm");
const userList = document.getElementById("userList");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const userIdInput = document.getElementById("userId");
const saveBtn = document.getElementById("saveBtn");
const updateBtn = document.getElementById("updateBtn");
const cancelBtn = document.getElementById("cancelBtn");

// Handle form submit for 'Add' user
userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addUser();
});

// Add User
function addUser() {
  const name = nameInput.value;
  const email = emailInput.value;

  const user = {
    id: Date.now(),
    name,
    email,
  };

  users.push(user);
  renderUsers();
  clearForm();
}

// Render users to the table
function renderUsers() {
  userList.innerHTML = "";
  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td class="actions">
                <button onclick="editUser(${user.id})">Edit</button>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
    userList.appendChild(row);
  });
}

// Edit User
function editUser(id) {
  const user = users.find((user) => user.id === id);
  userIdInput.value = user.id;
  nameInput.value = user.name;
  emailInput.value = user.email;

  saveBtn.style.display = "none";
  updateBtn.style.display = "inline-block";
  cancelBtn.style.display = "inline-block";
}

// Update User
updateBtn.addEventListener("click", () => {
  const id = userIdInput.value;
  const user = users.find((user) => user.id == id);
  user.name = nameInput.value;
  user.email = emailInput.value;

  renderUsers();
  clearForm();
});

// Cancel edit
cancelBtn.addEventListener("click", () => {
  clearForm();
});

// Delete User
function deleteUser(id) {
  users = users.filter((user) => user.id !== id);
  renderUsers();
}

// Clear form inputs and reset buttons
function clearForm() {
  nameInput.value = "";
  emailInput.value = "";
  userIdInput.value = "";

  saveBtn.style.display = "inline-block";
  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
}
