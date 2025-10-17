const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const cancelBtn = document.getElementById('cancelBtn');
const itemList = document.getElementById('itemList');

let editIndex = null;

addBtn.addEventListener('click', () => {
  const value = itemInput.value.trim();
  if (value === "") return;

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${value}</span>
    <div>
      <button class="edit-btn">Editar</button>
      <button class="delete-btn">Excluir</button>
    </div>
  `;

  itemList.appendChild(li);
  itemInput.value = "";

  // Editar
  li.querySelector('.edit-btn').addEventListener('click', () => {
    editIndex = Array.from(itemList.children).indexOf(li);
    itemInput.value = li.querySelector('span').textContent;
    toggleEditMode(true);
  });

  // Excluir
  li.querySelector('.delete-btn').addEventListener('click', () => {
    itemList.removeChild(li);
    resetForm();
  });
});

// Atualizar item
updateBtn.addEventListener('click', () => {
  const value = itemInput.value.trim();
  if (value === "" || editIndex === null) return;

  const li = itemList.children[editIndex];
  li.querySelector('span').textContent = value;

  resetForm();
  toggleEditMode(false);
});

// Cancelar edição
cancelBtn.addEventListener('click', () => {
  resetForm();
  toggleEditMode(false);
});

// Utilitários
function toggleEditMode(isEditing) {
  addBtn.classList.toggle('hidden', isEditing);
  updateBtn.classList.toggle('hidden', !isEditing);
  cancelBtn.classList.toggle('hidden', !isEditing);
}

function resetForm() {
  itemInput.value = "";
  editIndex = null;
}
