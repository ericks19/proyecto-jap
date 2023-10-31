function isLoggedOrNot(){
  const isLogged = sessionStorage.getItem("nombre")
  if (!isLogged){
    window.location.href = "login.html"
  }
}

isLoggedOrNot()