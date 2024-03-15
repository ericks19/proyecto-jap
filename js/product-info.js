const idProduct = localStorage.getItem("productId") || "";
const URLProduct = `https://japceibal.github.io/emercado-api/products/${idProduct}.json`;
const PRODUCT_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${idProduct}.json`;
const containerDiv = document.getElementById("product-container")
const newTextComment = document.getElementById("new-comment");
const sendCommentButton =document.getElementById("send-comment");
const commentRating = document.getElementById("comment-rating");
const relatedProductsDiv = document.getElementById("related-products")
const stars = document.querySelectorAll(".fa-star")
let fetchedData;
let rating = 1
sendCommentButton.addEventListener("click",AddingNewComment);

fetchingData(URLProduct);
starsMouseOver()

document.addEventListener("DOMContentLoaded", function() {
  const modo = localStorage.getItem("modo")
  if(modo === "oscuro"){
    document.body.classList.add("dark-mode")
  }else{
    document.body.classList.remove("dark-mode")
  }
});
async function showRelatedProducts(list){
  for(let relProduct of list){
    const img = document.createElement("img")
    img.setAttribute("src", relProduct.image);
    img.setAttribute("alt", relProduct.name);
    const productName = document.createElement("p")
    productName.innerText = relProduct.name
    const relatedProductCard = document.createElement("div")
    relatedProductCard.id = "relatedProductCard"
    relatedProductCard.appendChild(productName)
    relatedProductCard.appendChild(img)
    relatedProductCard.addEventListener("click", () => {
      localStorage.setItem("productId", relProduct.id)
      location.reload()
    })
    relatedProductsDiv.appendChild(relatedProductCard)
  }
}
async function fetchingData(url) {
  try {
      const response = await fetch(url);
      fetchedData = await response.json();
      showProduct(fetchedData)
      createBtnAddToCart(fetchedData)
      fetch(PRODUCT_COMMENTS_URL)
      .then((response) => response.json())
      .then((data) => showComments(data))
      .then(showRelatedProducts(fetchedData.relatedProducts))
  } catch (error) {
      console.error('Error al cargar los productos:', error);
  }
}
function makingCartList(){
  let listItems = localStorage.getItem("cartList")
  if(!listItems){
    localStorage.setItem("cartList", JSON.stringify([]))
  }
}
function addProductsToCart(product){
  makingCartList()
  let listItems = JSON.parse(localStorage.getItem("cartList"))
  let existProduct = listItems.find((item) => {
    return item.id === product.id
  })
  if(!existProduct){
    listItems.push(product)
    localStorage.setItem("cartList",JSON.stringify(listItems))
    alert("el producto se agrego en su carrito, Sabpe")
  }else{
    alert("el producto ya se encuetra en su carrito")
  }
}
function createBtnAddToCart(product){
  const btnAddToCart = document.createElement("button")
  btnAddToCart.textContent = "Agregar al carrito"
  btnAddToCart.id = "btn-add-to-cart"
  btnAddToCart.classList.add("btn");
  btnAddToCart.classList.add("btn-success");
  btnAddToCart.addEventListener("click", (e) => {
    e.preventDefault()
    addProductsToCart(product)
  })
  containerDiv.appendChild(btnAddToCart)
}
function normalDate(){
  const date = new Date();
    const normalDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate()
      .toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString()
      .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
      return normalDate
}
function AddingNewComment(e){
  e.preventDefault()
  const divNewCommentContainer = document.createElement("div");
  divNewCommentContainer.classList.add("commentDiv")
  let newComment = `
    <div><p>${sessionStorage.getItem("nombre")}</p> <div>${fillStars(rating)}</div><span>${normalDate()}</span></div>
    <p>${newTextComment.value}</p>
    `
    divNewCommentContainer.innerHTML += newComment
    divCommentsContainer.appendChild(divNewCommentContainer)
    newTextComment.value = ""
}
function fillStars(number){
  if(number === 1){
   let stars = `<span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>`
            return stars
  }
  if(number === 2){
    let stars = `<span class="fa fa-star checked"></span>
                 <span class="fa fa-star checked"></span>
                 <span class="fa fa-star"></span>
                 <span class="fa fa-star"></span>
                 <span class="fa fa-star"></span>`
    return stars
   }
   if(number === 3){
    let stars = `<span class="fa fa-star checked"></span>
                 <span class="fa fa-star checked"></span>
                 <span class="fa fa-star checked"></span>
                 <span class="fa fa-star"></span>
                 <span class="fa fa-star"></span>`
    return stars
   }
   if(number === 4){
    let stars = `<span class="fa fa-star checked"></span>
                 <span class="fa fa-star checked"></span>
                 <span class="fa fa-star checked"></span>
                 <span class="fa fa-star checked"></span>
                 <span class="fa fa-star"></span>`
    return stars
   }
   if(number === 5){
    let stars = `<span class="fa fa-star checked"></span>
                 <span class="fa fa-star checked"></span>
                 <span class="fa fa-star checked"></span>
                 <span class="fa fa-star checked"></span>
                 <span class="fa fa-star checked"></span>`
    return stars
   }
}
function resetScore() {
  stars.forEach(star => {
    star.classList.remove("checked");
  });
}
function highlightStars(numero) {
  for (let i = 0; i < numero; i++) {
    stars[i].classList.add("checked");
  }
}
function starsMouseOver(){
  stars.forEach(star => {
    star.addEventListener("mouseover", function() {
      resetScore();
      rating = parseInt(this.getAttribute("data-rating"));
      highlightStars(rating);
    });
    star.addEventListener("click", function() {
      rating = parseInt(this.getAttribute("data-rating"));
    });
  });
}
// segurancaaaaa
function showComments(list){
  const divCommentsContainer = document.createElement("div");
  divCommentsContainer.id = "divCommentsContainer"
  for(let comm of list){
    let comment = `<div class = "commentDiv">
                    <div><p>${comm.user}</p> <div>${fillStars(comm.score)}</div><span>${comm.dateTime}</span></div>
                    <p>${comm.description}</p>
                  </div>`
    divCommentsContainer.innerHTML += comment;
  }
  containerDiv.insertAdjacentHTML("afterend",divCommentsContainer.outerHTML);
}
function showProduct(list){
  const productContainer = `<div>
                              <h3>${list.name}</h3>
                              <p>Cat: ${list.category}</p>
                            </div>
                            ${showCarousel(list)}
                            <div id="productDescription">
                            <div>
                            <p>Precio ${list.currency} ${list.cost}</p>
                            <p>Vendidos: ${list.soldCount}</p>
                            </div>
                              <p>${list.description}</p>
                            </div>
                          `
  containerDiv.innerHTML += productContainer
}
function showCarousel(list){
  let carousel = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
  <div id ="container-product-images" class="carousel-inner">
  ${showCarouselImages(list)}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>
  `
  return carousel
}

function showCarouselImages(list) {
  let carouselItems = '';
  for (let i = 0; i < list.images.length; i++) {
    const img = list.images[i];
    const isActive = i === 0 ? 'active' : ''; // Marca el primer elemento como activo
    carouselItems += `
      <div class="carousel-item ${isActive}">
        <img src="${img}" class="d-block w-100" alt="Imagen ${list.name}">
      </div>
    `;
  }
  return carouselItems
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
isLoggedOrNot()