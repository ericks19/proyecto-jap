const currentCatId = localStorage.getItem("catID");
const URL = `https://japceibal.github.io/emercado-api/cats_products/${currentCatId}.json`;

const containerList = document.getElementById("container-list");
const inputMaximo = document.getElementById("filter-maximo");
const inputMinimo = document.getElementById("filter-minimo");
const filterButton = document.getElementById("filter-button");
const selectSorter = document.getElementById("select-sorter");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
let fetchData; // Variable global para almacenar los datos de la lista de productos

selectSorter.addEventListener("input", () => makeList(addFilters(fetchData.products)))
searchButton.addEventListener("click", () => makeList(addFilters(fetchData.products)))
filterButton.addEventListener("click", () => makeList(addFilters(fetchData.products)))

function makeList(productsList){
  containerList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos productos
  for(let product of productsList){
      let divProductContainer = document.createElement("div");
      divProductContainer.addEventListener("click", () => redirectToProductInfo(product.id))
      divProductContainer.classList.add("car-card");
      containerList.appendChild(divProductContainer);
      divProductContainer.innerHTML += `<img src="${product.image}" alt= "imagen del producto" >`;
      divProductContainer.innerHTML += `<p> ${product.name} - ${product.currency} ${product.cost}
      <span class="product-value"> ${product.soldCount} vendidos </span> </p>`;
      divProductContainer.innerHTML += `<p> ${product.description} </p>`;
  }
}
function addFilters(list){
  list = sortList(list, selectSorter.value) || fetchData.products;
  list = searchInProducts(list, searchInput.value) || fetchData.products;
  list = filterList(list, searchInput.value) || fetchData.products;
  return list
}
function searchInProducts(list, value){
  value.toLowerCase()
  const searchedList = list.filter((product) => {
   return product.description.toLowerCase().includes(value) || product.name.toLowerCase().includes(value)
  })
  return searchedList
}
function filterList(list) {
  const filteredList = list.filter((product) => {
    if(!inputMaximo.value){
      return product.cost >= inputMinimo.value
    }
    else if(!inputMinimo.value){
      return product.cost <= inputMaximo.value
    }else
    return product.cost >= inputMinimo.value && product.cost <= inputMaximo.value
  })
  return filteredList
}
function sortList(list, value){
  let newList = [...list]
  if(value === "menor-precio"){
    newList = list.sort((a,b) => a.cost - b.cost)
    return newList
  }
  else if(value === "mayor-precio"){
    newList = list.sort((a,b) => b.cost - a.cost)
    return newList
  }
  else if(value === "relevancia"){
    newList = list.sort((a,b) => b.soldCount - a.soldCount)
    return newList
  }
}
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
function redirectToProductInfo(productId){
  localStorage.setItem("productId", productId)
  window.location.href = "product-info.html"
}
function category (category){
    let categoryParagraph = document.getElementById("category-paragraph");
    categoryParagraph.innerHTML += `Categoria ${category} `;
}
async function fetchingData(url) {
    try {
        const response = await fetch(url); // Realiza la solicitud HTTP
        fetchData = await response.json(); // Almacena los datos en la variable global
        category(fetchData.catName);
        makeList(fetchData.products);
    } catch (error) {
        // Maneja el error si algo sale mal
        console.error('Error al cargar los productos:', error);
    }
}

isLoggedOrNot();
fetchingData(URL);