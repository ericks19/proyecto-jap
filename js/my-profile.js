const inputEmail = document.getElementById("InputEmail");
const btnGuardarCambios = document.getElementById("guardarCambios")
const email = sessionStorage.getItem("nombre")
const inputFirstName = document.getElementById("primerNombre");
const secondNameInput = document.getElementById("segundoNombre");
const inputFirstSurname = document.getElementById("primerApellido");
const secondSurnameInput = document.getElementById("segundoApellido");
const inputContactNumber = document.getElementById("telefonoDeContacto");
const inputFile = document.getElementById("inputFile")
const profileImage = document.getElementById('profileImage')
inputEmail.value = email

function isLoggedOrNot(){
  const loggedName = sessionStorage.getItem("nombre")
  if (!loggedName){
    window.location.href = "login.html"
  }else {
      const itemNavNameLogged = document.getElementById("navbarDarkDropdownMenuLink");
      itemNavNameLogged.innerText = loggedName;
      const miCarrito = document.getElementById("mi-carrito");
      const miPerfil = document.getElementById("mi-perfil");
      const cerrarSesion = document.getElementById("cerrar-sesion");
      miCarrito.addEventListener("click", () => window.location.href = "cart.html");
      miPerfil.addEventListener("click", () => window.location.href = "my-profile.html");
      cerrarSesion.addEventListener("click", () => {
        sessionStorage.removeItem("nombre");
        window.location.href = "login.html"
      })
      const btnSelectMode = document.getElementById("modo-dia-o-noche")
        btnSelectMode.addEventListener("click", () => {
          if(!document.body.classList.contains("dark-mode")){
            document.body.classList.add("dark-mode")
            localStorage.setItem("modo","oscuro")
          }else{
            document.body.classList.remove("dark-mode")
            localStorage.setItem("modo","claro")
          }
        })
  }
}
function updateProfileImg(){
  const newProfileImage = localStorage.getItem('profileImg');
  if (newProfileImage) {
    profileImage.src = newProfileImage;
    } else {
    console.log('No hay ninguna imagen almacenada en el localStorage.');
    }
  }
function fillInFields(){
  let infoProfile = localStorage.getItem("infoProfile")
  if(infoProfile){
    infoProfile = JSON.parse(infoProfile);
    inputFirstName.value = infoProfile.firstName;
    secondNameInput.value = infoProfile.secondName;
    inputFirstSurname.value = infoProfile.firstSurname;
    secondSurnameInput.value = infoProfile.secondSurname;
    inputContactNumber.value = infoProfile.contactNumber
  }
}
btnGuardarCambios.addEventListener("click", (e) => {
  e.preventDefault();
  if(inputFirstName.value && inputFirstSurname.value && inputContactNumber.value){
    const infoProfile = {
      firstName: inputFirstName.value,
      secondName: secondNameInput.value,
      firstSurname: inputFirstSurname.value,
      secondSurname: secondSurnameInput.value,
      contactNumber: inputContactNumber.value
    }
    localStorage.setItem("infoProfile", JSON.stringify(infoProfile))
    alert("la informacion se guardo correctamente")
  }else{
    alert("rellene los campos requeridos cara")
  }
})
inputFile.addEventListener('change', function(event) {
  const archivo = event.target.files[0];
  const lector = new FileReader();
  lector.onload = function(event) {
    const imagenBase64 = event.target.result;
    localStorage.setItem('profileImg', imagenBase64);
    updateProfileImg()
  };
  lector.readAsDataURL(archivo);
});

updateProfileImg()
fillInFields()
isLoggedOrNot()