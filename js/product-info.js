const idProduct = localStorage.getItem("productId") || "";
const URLProduct = `https://japceibal.github.io/emercado-api/products/${idProduct}.json`;
const PRODUCT_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${idProduct}.json`;
const containerDiv = document.getElementById("product-container")
const divCommentsContainer = document.createElement("div");
const newTextComment = document.getElementById("new-comment");
const sendCommentButton =document.getElementById("send-comment");
const commentRating = document.getElementById("comment-rating");

sendCommentButton.addEventListener("click",AddingNewComment)

fetch(URLProduct)
.then((response) => response.json())
.then((data) => showProduct2(data))

fetch(PRODUCT_COMMENTS_URL)
.then((response) => response.json())
.then((data) => showComments(data))

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
  let newComment = `
    <p>${sessionStorage.getItem("nombre")}</p>
    <p>${normalDate()}</p>
    <p>${commentRating.value}</p>
    <p>${newTextComment.value}</p>
    `
    divNewCommentContainer.innerHTML += newComment
    containerDiv.appendChild(divNewCommentContainer)
}
function showComments(list){
  for(let comm of list){
    let comment = `
    <p>${comm.user}</p>
    <p>${comm.dateTime}</p>
    <p>${comm.description}</p>
    <p>${comm.score}</p>
    `
    divCommentsContainer.innerHTML += comment
    containerDiv.appendChild(divCommentsContainer)
  }
}
function showProduct2(list){
  const productContainer = `
                            <p>${list.name}</p>
                            ${renderizarImagenes(list)}
                            <p>${list.currency} ${list.cost}</p>
                            <p>${list.description}</p>
                            <p>${list.category}</p>
                            <p>${list.soldCount}</p>
                          `
  containerDiv.innerHTML += productContainer
}
function showProduct(list){
  const name = `<p>${list.name}</p>`
  const descriptionProducto = document.createElement("p")
  descriptionProducto.innerHTML += `${list.description}`
  containerDiv.innerHTML += name
  containerDiv.appendChild(descriptionProducto)
}
function renderizarImagenes(list){
  let images = document.createElement("div")
  for (let img of list.images){
    images.innerHTML += `<img src="${img}" alt="un auto"></img>`
  }
  return images.outerHTML
}
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