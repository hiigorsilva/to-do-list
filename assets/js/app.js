const localStorageKey = "to-do-list"

function validateIfExistNewTask() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  let inputValue = document.querySelector("#inputNewTask").value
  let exists = values.find((x) => x.name == inputValue)
  return !exists ? false : true
}

function newTak() {
  let input = document.querySelector("#inputNewTask")

  //validation
  if (!input.value) {
    alert("Você precisa digitar algo para adicionar na sua lista")
  } else if (validateIfExistNewTask()) {
    alert("Essa tarefa já foi adicionada")
  } else {
    //increment to LocalStorage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    values.push({
      name: input.value,
    })
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues()
  }
  input.value = ""
}

function showValues() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  let taskList = document.querySelector("#taskList")
  taskList.innerHTML = ""

  for (let i = 0; i < values.length; i++) {
    taskList.innerHTML += `<li>
      <span>${values[i]["name"]}</span>
      <button class="completed" onclick='removeItem("${values[i]["name"]}")'>
        <img src="assets/icons/checked.svg" alt="Ícone de Ckeck">
      </button>
    </li>`
  }
}

function removeItem(data) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  let index = values.findIndex((x) => x.name == data)
  values.splice(index, 1)
  localStorage.setItem(localStorageKey, JSON.stringify(values))

  showValues()
}

showValues()
