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
let productList;

selectSorter.addEventListener("input", () => {
  console.log(selectSorter.value)
  console.log(searchInput.value)
  sortList(filterList(fetchData.products),selectSorter.value)
})

searchButton.addEventListener("click", () => searchInProducts(filterList(fetchData.products), searchInput.value))

function searchInProducts(list, value){
  value.toLowerCase()
  const searchedList = list.filter((product) => {
   return product.description.toLowerCase().includes(value) || product.name.toLowerCase().includes(value)
  })
  makeList(filterList(searchedList))
  console.log(value)
  console.log(list)
  console.log(searchedList)
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
  makeList(filteredList)
  return filteredList
}
filterButton.addEventListener("click", () => filterList(fetchData.products))

function sortList(list, value){
  let newList = [...list]
  console.log("lista", list)
  if(value === "menor-precio"){
    newList = list.sort((a,b) => a.cost - b.cost)
    makeList(newList)
  }
  else if(value === "mayor-precio"){
    newList = list.sort((a,b) => b.cost - a.cost)
    makeList(newList)
  }
  else if(value === "relevancia"){
    newList = list.sort((a,b) => b.soldCount - a.soldCount)
    makeList(newList)
  }
}

function isLoggedOrNot(){
    const isLogged = sessionStorage.getItem("nombre");
    if (!isLogged){
        window.location.href = "login.html";
    } else {
        const itemNavNameLogged = document.getElementById("item-nav-name-logged");
        itemNavNameLogged.classList.add("text-white", "mt-2");
        itemNavNameLogged.innerHTML = isLogged;
    }
}
isLoggedOrNot();

function redirectToProductInfo(){
  
}

function makeList(productsList){
    containerList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos productos
    for(let product of productsList){
        let divProductContainer = document.createElement("div");
        divProductContainer.addEventListener("click", () => {
          localStorage.setItem("productId", product.id)
          window.location.href = "product-info.html"
        })
        divProductContainer.classList.add("car-card");
        containerList.appendChild(divProductContainer);
        divProductContainer.innerHTML += `<img src="${product.image}" alt= "imagen del producto" >`;
        divProductContainer.innerHTML += `<p> ${product.name} - ${product.currency} ${product.cost}
        <span class="product-value"> ${product.soldCount} vendidos </span> </p>`;
        divProductContainer.innerHTML += `<p> ${product.description} </p>`;
    }
}

function categoria (categoria){
    let categoryParagraph = document.getElementById("category-paragraph");
    categoryParagraph.innerHTML += `Categoria ${categoria} `;
}

async function fetchingData(url) {
    try {
        const response = await fetch(url); // Realiza la solicitud HTTP
        fetchData = await response.json(); // Almacena los datos en la variable global
        categoria(fetchData.catName);
        makeList(fetchData.products);
    } catch (error) {
        // Maneja el error si algo sale mal
        console.error('Error al cargar los productos:', error);
    }
}

// Llama a la función para cargar los productos
fetchingData(URL);