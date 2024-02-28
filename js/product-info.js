function isLoggedOrNot(){
  const isLogged = sessionStorage.getItem("nombre")
  if (!isLogged){
    window.location.href = "login.html"
  }else {
      const itemNavNameLogged = document.getElementById("item-nav-name-logged")
      itemNavNameLogged.classList.add("text-white", "mt-2")
      itemNavNameLogged.innerHTML = isLogged
  }
}
isLoggedOrNot()