const URL_CART = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const tbodyProductsCart = document.getElementById("tbody-products-cart");
const subTotalCarrito = document.getElementById("sub-total-carrito");
const costoDeEnvio = document.getElementById("costo-de-envio");
const totalCarrito = document.getElementById("total-carrito");
const inputEnvioPrioritario = document.getElementById("envio-prioritario");
const inputEnvioExpress = document.getElementById("envio-express");
const inputEnvioEstandar = document.getElementById("envio-estandar");
const inputRadioTarjetaCredito = document.getElementById("tarjeta-credito")
const inputRadioTransferenciaBancaria = document.getElementById("transferencia-bancaria")
const metodoDePago = document.getElementById("metodo-de-pago")
const inputTextNumeroTarjeta = document.getElementById("numero-tarjeta")
const inputTextCodigoSeguridad = document.getElementById("codigo-seguridad")
const inputTextVencimiento = document.getElementById("vencimiento")
const inputTextNumeroCuenta = document.getElementById("numero-de-cuenta")
const btnFinalizarCompra = document.getElementById("finalizar-compra")
const divInfoEnvio = document.getElementById("info-de-envio")
const divTipoEnvio = document.getElementById("div-tipo-de-envio");
const divMetodoDePago = document.getElementById("div-metodo-de-pago");
const inputDireccionCalle = document.getElementById("calle")
const inputDireccionNumero = document.getElementById("numero")
const inputDireccionEsquina = document.getElementById("esquina")
let productsCartList = JSON.parse(localStorage.getItem("cartList"));
let cartData;

btnFinalizarCompra.addEventListener("click", (e) => {
  e.preventDefault();
  let sePuedeRealizarLaCompra = true
  if(!inputEnvioPrioritario.checked && !inputEnvioExpress.checked && !inputEnvioEstandar.checked){
    showWarningMessage(divTipoEnvio, "seleccioname este (o envio)")
    sePuedeRealizarLaCompra = false
  }if(!inputDireccionCalle.value || !inputDireccionNumero.value || !inputDireccionEsquina.value){
    let advertenciaDrieccionEnvio = document.createElement("p")
    advertenciaDrieccionEnvio.innerText = "Debes ingresar la direccion de envio completa"
    divInfoEnvio.appendChild(advertenciaDrieccionEnvio)
    sePuedeRealizarLaCompra = false
    console.log("2")
  }if(!inputRadioTarjetaCredito.checked && !inputRadioTransferenciaBancaria.checked){
    let advertenciaFormaDePago = document.createElement("p")
    advertenciaFormaDePago.innerText = "Debes elegir un metodo de pago cabeza"
    divMetodoDePago.appendChild(advertenciaFormaDePago)
    sePuedeRealizarLaCompra = false
    console.log("3")
  }if(inputRadioTarjetaCredito.checked && (!inputTextNumeroTarjeta.value ||
    !inputTextCodigoSeguridad.value || !inputTextVencimiento.value)){
      let advertenciaTarjetaCreditoPago = document.createElement("p")
      advertenciaTarjetaCreditoPago.innerText = "Rellena la info de la tarjeta papa"
    divMetodoDePago.appendChild(advertenciaTarjetaCreditoPago)
    sePuedeRealizarLaCompra = false
    console.log("4")
  }if(inputRadioTransferenciaBancaria.checked && (!inputTextNumeroCuenta.value)){
      let advertenciaTransferenciaBancaria = document.createElement("p")
      advertenciaTransferenciaBancaria.innerText = "Tas bien de vivo, pone el numero de cuenta"
    divMetodoDePago.appendChild(advertenciaTransferenciaBancaria)
    sePuedeRealizarLaCompra = false
    console.log("5")
  }if(sePuedeRealizarLaCompra === true){
    alert("Sabpeeee, comprame esta")
  }
})
inputRadioTarjetaCredito.addEventListener("click", () => {
  metodoDePago.innerText = inputRadioTarjetaCredito.value
  inputTextNumeroCuenta.disabled = true
  inputTextNumeroTarjeta.disabled = false
  inputTextCodigoSeguridad.disabled = false
  inputTextVencimiento.disabled = false
})
inputRadioTransferenciaBancaria.addEventListener("click", () => {
  metodoDePago.innerText = inputRadioTransferenciaBancaria.value
  inputTextNumeroTarjeta.disabled = true
  inputTextCodigoSeguridad.disabled = true
  inputTextVencimiento.disabled = true
  inputTextNumeroCuenta.disabled = false
})
inputEnvioPrioritario.addEventListener("click", () => {
  let subTotalnumber = parseInt(subTotalCarrito.innerText)
  let costoEnvio = subTotalnumber * 0.15
  costoDeEnvio.innerText = Math.round(costoEnvio)
  totalCarrito.innerText = costoEnvio + subTotalnumber
})
inputEnvioExpress.addEventListener("click", () => {
  let subTotalnumber = parseInt(subTotalCarrito.innerText)
  let costoEnvio = subTotalnumber * 0.07
  costoDeEnvio.innerText = Math.round(costoEnvio)
  totalCarrito.innerText = costoEnvio + subTotalnumber
})
inputEnvioEstandar.addEventListener("click", () => {
  let subTotalnumber = parseInt(subTotalCarrito.innerText)
  let costoEnvio = subTotalnumber * 0.05
  costoDeEnvio.innerText = Math.round(costoEnvio)
  totalCarrito.innerText = costoEnvio + subTotalnumber
})

isLoggedOrNot()
fetchingData(URL_CART)

async function fetchingData (url){
  const response = await fetch(url);
  cartData = await response.json()
  renderCart(cartData.articles)
  renderCartList(productsCartList)
  findInputs()
  addEventDelete()
  calcularSubtotalCarrito()
}

function showWarningMessage(contenedor, message){
  let warningParagraph = document.createElement("p");
  warningParagraph.innerText = message;
  contenedor.appendChild(warningParagraph)
}

function verificarSeleccion() {
  if (inputEnvioPrioritario.checked) {
    inputEnvioPrioritario.click()
  } else if (inputEnvioExpress.checked) {
    inputEnvioExpress.click()
  } else if (inputEnvioEstandar.checked) {
    inputEnvioEstandar.click()
  }
}

function calcularSubtotalCarrito(){
  const rows = tbodyProductsCart.querySelectorAll("tbody tr");
  let subTotal = 0
  rows.forEach(row => {
    const tds = row.querySelectorAll("td");
    if (tds.length > 3) { // Asegurarse de que haya al menos 4 td en la fila
      const tdValue = tds[4].innerText; // Capturar el valor del cuarto td (posición 3 en base a índices)
      const parts = tdValue.split(" ");
      //const currency = parts[0]
      const numberString = parts[1];
      const number = parseFloat(numberString);
      subTotal += number
    }
  });
  subTotalCarrito.innerText = subTotal
  verificarSeleccion()
}

function findInputs(){
  const inputs = tbodyProductsCart.querySelectorAll("tbody input[type='number']");
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      const tdSubtotal = document.getElementById(`td-subtotal${input.id}`)
      const tdCost = document.getElementById(`td-cost${input.id}`)
      const text = tdCost.innerText;
      const parts = text.split(" ");
      const currency = parts[0]
      const numberString = parts[1];
      const number = parseFloat(numberString);
      tdSubtotal.innerText = `${currency} ${calculateSubtotal(input.value,number)}`
      calcularSubtotalCarrito()
    });
  });
}

function addEventDelete(){
const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(button => {
  button.addEventListener('click', function() {
    const trProductCard = this.parentElement.parentElement;
    const trProductCardId = trProductCard.id;
    trProductCard.remove()
    calcularSubtotalCarrito()
    productsCartList = productsCartList.filter(elemento => `card${elemento.id}` !== trProductCardId);
      localStorage.setItem('cartList', JSON.stringify(productsCartList));
  });
});
}

function calculateSubtotal(amount, unitCost){
  const subTotal = amount * unitCost
  return subTotal
}

function renderCartList(list){
  let amount = 1;
  for( let i = 0; i < list.length; i++){
    let productCart = `
    <tr id="card${list[i].id}">
      <td><img src="${list[i].images["0"]}" width="125px" alt="Imagen"></td>
      <td>${list[i].name}</td>
      <td id="td-cost${list[i].id}">${list[i].currency} ${list[i].cost}</td>
      <td><input id="${list[i].id}" min="1" max="20" type="number" value="${amount}" maxlength="2"></td>
      <td id="td-subtotal${list[i].id}"> ${list[i].currency}  ${calculateSubtotal(amount,list[i].cost)} </td>
      <td><span class="delete-button">Eliminar</span></td>
    </tr>
    `;
    tbodyProductsCart.innerHTML += productCart;
  }
}

function renderCart(list){
  for( let item of list){
    let productCart = `
    <tr id = "card${item.id}">
      <td><img src="${item.image}" width="125px" alt="Imagen"></td>
      <td>${item.name}</td>
      <td id="td-cost${item.id}">${item.currency} ${item.unitCost}</td>
      <td><input id="${item.id}" min="1" max="20" type="number" value="${item.count}" maxlength="2"></td>
      <td id="td-subtotal${item.id}"> ${item.currency}  ${calculateSubtotal(item.count,item.unitCost)} </td>
      <td><span class="delete-button">Eliminar</span></td>
    </tr>
    `
    tbodyProductsCart.innerHTML += productCart
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