document.addEventListener("DOMContentLoaded", function(){

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

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});