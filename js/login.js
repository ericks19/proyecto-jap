const usernameInput = document.getElementById("input-username")
const usernamePassword = document.getElementById("input-password")
const buttonLoggin = document.getElementById("button-loggin")
const logginForm = document.getElementById("loggin-form")

function saveDataLoggin(){
  sessionStorage.setItem("nombre", usernameInput.value)
  alert(`Bienvenido ${usernameInput.value}`)
  window.location.href = "index.html"
}

logginForm.addEventListener("submit", function (event){
  event.preventDefault();
  saveDataLoggin()
})