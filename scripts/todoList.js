
window.onload = function () {
  const todoText = document.querySelector(".todo")
  const addBtn = document.querySelector(".btn-add")
  const todoList = document.querySelector(".todo-list")
  let todos = document.querySelectorAll(".todo-item")
  const editContainer = document.querySelector(".edit-container")
  const btnCloseEdit = document.querySelector(".btn-close")
  const btnEdit = document.querySelector(".edit-btn")
  const editText = document.querySelector(".edit-text")
  let todoForEdit;
  let todoItemText = document.querySelectorAll('.todo-item .text')


  function getText(e) {
    if (e.key === "Enter") {
      addTodo(todoText.value)
    }


    if (e.target.classList.contains('btn-add')) {
      addTodo(todoText.value)
    }

  }

  function addTodo(todo) {
    todoText.value = ""

    const newTodo = document.createElement("li")
    newTodo.classList.add("todo-item")
    newTodo.innerHTML = `
    <p class="text">${todo}</p>
    <div class="btn-container">
    <i class="btn btn-delete fas fa-trash"></i>
    <i class="btn btn-edit fas fa-pen"></i>
    </div>
    `

    todoList.append(newTodo)
    todos = document.querySelectorAll(".todo-item")
    todoItemText = document.querySelectorAll('.todo-item .text')

    todos.forEach(todo => {
      const deleteBtn = todo.children[1].children[0]
      const editBtn = todo.children[1].children[1]

      deleteBtn.addEventListener("click", deleteTodo.bind(this, todo))
      editBtn.addEventListener("click", editTodo.bind(this, todo))

    })

    todoItemText.forEach(todoText => {
      todoText.addEventListener('click', () => todoText.classList.toggle("active"))
    })


  }

  function deleteTodo(todo) {
    todo.parentElement.removeChild(todo)
  }

  function editTodo(todo) {
    editContainer.classList.add("active")
    todoForEdit = todo
    editText.value = todoForEdit.querySelector(".text").textContent

  }

  function closeEdit() {
    editContainer.classList.remove("active")
  }

  function getEditText(e) {
    if (e.key === "Enter") {
      editTodoText(editText.value)
    }


    if (e.target.classList.contains('edit-btn')) {
      editTodoText(editText.value)
    }
  }

  function editTodoText(text) {
    todoForEdit.querySelector(".text").textContent = text
    closeEdit()
  }

  todoText.addEventListener("keyup", getText)
  addBtn.addEventListener("click", getText)
  btnCloseEdit.addEventListener('click', closeEdit)
  btnEdit.addEventListener("click", getEditText)
  editText.addEventListener("keyup", getEditText)
}