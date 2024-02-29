const currentCatId = localStorage.getItem("catID");
const URL = `https://japceibal.github.io/emercado-api/cats_products/${currentCatId}.json`;

const containerList = document.getElementById("container-list");
const inputMaximo = document.getElementById("filter-maximo")
const inputMinimo = document.getElementById("filter-minimo")
const filterButton = document.getElementById("filter-button")

function filterList() {
  const productList = fetchData.products
  const filteredList = productList.filter((product) => {
    if(!inputMaximo.value){
      return product.cost >= inputMinimo.value
    }
    else if(!inputMinimo.value){
      return product.cost <= inputMaximo.value
    }else
    return product.cost >= inputMinimo.value && product.cost <= inputMaximo.value
  })
  makeList(filteredList)
}

filterButton.addEventListener("click", filterList)

let fetchData; // Variable global para almacenar los datos de la lista de productos

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

function makeList(productsList){
    containerList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos productos
    for(let product of productsList){
        let divProductContainer = document.createElement("div");
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


