const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"

const productList = document.getElementById("container-list")

function autos(listaDeAutos){
  for(let auto of listaDeAutos){
    let divProductContainer = document.createElement("div")
    divProductContainer.classList.add("car-card")
    productList.appendChild(divProductContainer)
    divProductContainer.innerHTML += `<img src="${auto.image}" alt= "imagen del producto" >`
    divProductContainer.innerHTML += `<p> ${auto.name} - ${auto.currency} ${auto.cost} 
    <span class="product-value"> ${auto.soldCount} vendidos </span> </p>`
    divProductContainer.innerHTML += `<p> ${auto.description} </p>`
  }
}

function categoria (categoria){
  let categoryParagraph = document.getElementById("category-paragraph")
  categoryParagraph.innerHTML += `Categoria ${categoria} `
}

fetch (URL)
.then(response => response.json())
.then(data => {
  categoria(data.catName)
  autos(data.products)
})