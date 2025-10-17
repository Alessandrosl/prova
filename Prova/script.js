const items = JSON.parse(localStorage.getItem("items")) || ["Prova 1"]
let editingIndex = null
let deletingIndex = null

function renderItems() {
  const itemsList = document.getElementById("items-list")
  itemsList.innerHTML = ""

  items.forEach((item, index) => {
    const itemDiv = document.createElement("div")
    itemDiv.className = "item"
    itemDiv.innerHTML = `
            <span>${item}</span>
            <div class="item-actions">
                <button class="btn-edit" onclick="startEdit(${index})">Editar</button>
                <button class="btn-delete" onclick="startDelete(${index})">Excluir</button>
            </div>
        `
    itemsList.appendChild(itemDiv)
  })
}

function addItem() {
  const input = document.getElementById("item-input")
  const value = input.value.trim()

  if (value) {
    items.push(value)
    localStorage.setItem("items", JSON.stringify(items))
    input.value = ""
    renderItems()
  }
}

function startEdit(index) {
  editingIndex = index
  document.getElementById("edit-input").value = items[index]
  document.querySelector(".edit-item-text").textContent = items[index]
  switchScreen("edit")
}

function updateItem() {
  const input = document.getElementById("edit-input")
  const value = input.value.trim()

  if (value && editingIndex !== null) {
    items[editingIndex] = value
    localStorage.setItem("items", JSON.stringify(items))
    switchScreen("add")
    renderItems()
  }
}

function cancelEdit() {
  switchScreen("add")
}

function startDelete(index) {
  deletingIndex = index
  document.getElementById("modal").classList.add("active")
}

function startDeleteFromDisplay() {
  if (editingIndex !== null) {
    deletingIndex = editingIndex
    document.getElementById("modal").classList.add("active")
  }
}

function confirmEditFromDisplay() {
  // This allows editing from the display item in edit screen
  // Currently just keeps the edit mode active
}

function closeModal() {
  document.getElementById("modal").classList.remove("active")
  deletingIndex = null
}

function confirmDelete() {
  if (deletingIndex !== null) {
    items.splice(deletingIndex, 1)
    localStorage.setItem("items", JSON.stringify(items))
    renderItems()
    closeModal()
    if (editingIndex !== null) {
      switchScreen("add")
      editingIndex = null
    }
  }
}

function switchScreen(screen) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"))
  document.getElementById(`screen-${screen}`).classList.add("active")
}

document.getElementById("item-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") addItem()
})

document.getElementById("edit-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") updateItem()
})

renderItems()

