document.addEventListener("DOMContentLoaded", function(){
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