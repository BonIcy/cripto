
document.addEventListener("DOMContentLoaded", getCompras);
async function getCompras() {
  let url = "../storage/api.json";
  try {
    let result = await fetch(url);
    let data = await result.json();
    console.log(data.Data);
    showCompras(data.Data);
  } catch (error) {
    console.log(error);
  }
}

export function showCompras(buys) {
  let cont = document.querySelector("#compras");
  let plantilla = "";
  buys.forEach((buy) => {
    let { CoinInfo, RAW } = buy;
    plantilla += `
      <option class="moneda" value="${RAW.USD.PRICE}">${CoinInfo.FullName}</option>
    `;
    cont.innerHTML = plantilla;
  });
  let valorTotal = 0;
  let datos = [];
  let listaVentas = [];
  cont.addEventListener(`change`, showPrice);
  let cantttt= document.querySelector("#cantidad")
  cantttt.addEventListener(`input`, showPrice)
  let almac = document.querySelector(".btnSub");
  almac.addEventListener("click", almacenar);

  function showPrice() {
    let pagos = document.querySelector("#pagos");
    let cantidad = parseFloat(document.querySelector("#cantidad").value);
    valorTotal = cantidad * parseFloat(cont.value);
    let valor = "";
    valor += `<p>Precio: $${valorTotal}<p>`;
    pagos.innerHTML = valor;
  }
  function almacenar() {
    let pregunta = confirm("¿Estás seguro/a de querer comprar?");
    if (pregunta == true) {
      alert("Comprado uwuwuwuw");
      si();
    } else {
      alert("Compra cancelada");
    }
    function si() {
        let cripto = document.getElementById("compras").value;
        let listaDatos = document.getElementById("listaDatos");
        let resultado = document.getElementById("resultado");
      
        if (cripto == "") {
          resultado.innerHTML = "Debes seleccionar una criptomoneda.";
          return;
        } 
        //Renovar la lista de datos en el DOM
        listaDatos.innerHTML += "<li>"  + valorTotal +   "</li>";   
        //Actualizar el resultado total sin sobreescribir
        let total = 0;
        let items = listaDatos.querySelectorAll("li");
        for (let i = 0; i < items.length; i++) {
          let itemText = items[i].innerText;
          let itemPrice = parseFloat(itemText.substring(itemText.indexOf(":") ));
          
          total += itemPrice;
        }
        datos.push(valorTotal)
        resultado.innerHTML = "Total pagado: " + total.toFixed(2);
        let totalCompras = datos.reduce((acc, curr) => acc + curr, 0);
        let totalComprasSpan = listaDatos.querySelector("span");
        //Calcular el porcentaje de cada valor, siendo la suma total en 100%
          let porcentajes = datos.map((dato) => (dato / totalCompras) * 100);
          //Actualizar la lista de datos con los porcentajes
          let listaItems = "";
          for (let i = 0; i < datos.length; i++) {
            listaItems += `<li>${datos[i]} (${porcentajes[i].toFixed(2)}%)</li>`;
          }
          listaDatos.innerHTML = listaItems; 
        if (totalComprasSpan) {
          totalComprasSpan = document.createElement("span");
          listaDatos.appendChild(totalComprasSpan);
        }
        totalComprasSpan.innerHTML = "Total($) invertido: " + totalCompras.toFixed(2) + " (100%)";
       document.querySelector("#btnGrafica").addEventListener("click", mostrarGrafica) 
       function mostrarGrafica() {
        let canvas = document.querySelector('#myChart');
    let context = canvas.getContext('2d');
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let radius = Math.min(centerX, centerY) - 10;
    let labels =[];
    let data = datos.map((dato) => (dato / totalCompras) * 100);
    let backgroundColor = ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)'];
    let myChart = new Chart(context, {
      
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [{
          data: data,
          backgroundColor: backgroundColor
        }]
      },
      options: {
        responsive: true,
        legend: {
          position: 'right'
        }
      }
    });
      }
       
      }
      
      function restarValor() {
        let cantidad = parseFloat(document.getElementById("resta").value);
        let listaDatos2 = document.getElementById("listaDatos2");
        let resultado = document.getElementById("resultado");
      
        //Verificar que la cantidad ingresada sea mayor a 0
        if (cantidad <= 0) {
          alert("Ingresa un valor mayor a 0 para vender");
          return;
        }
      
        //Verificar que la cantidad a restar no exceda el total pagado, no se puede vender mas de lo que posee
        let totalPagado = parseFloat(resultado.innerText.substring(resultado.innerText.indexOf(":") + 1));
        if (cantidad > totalPagado) {
          alert("Ups, parece que no te alcanza, asegurate de comprar mas cripto.");
          return;
        }
      
        //Renovar la lista de datos
        listaVentas.push(cantidad);
        listaDatos2.innerHTML += "<li>" + cantidad + "</li>";
      
        //Calcular la suma de los valores de listaVentas
        let totalVentas = listaVentas.reduce((acc, curr) => acc + curr, 0);
      
        //Otra vez los porcentajes segun la suma total
        let porcentajes = listaVentas.map((venta) => (venta / totalVentas) * 100);
      
        //Actualizar la lista de datos con los porcentajes
        let listaItems = "";
        for (let i = 0; i < listaVentas.length; i++) {
          listaItems += `<li>${listaVentas[i]} (${porcentajes[i].toFixed(2)}%)</li>`;
        }
        listaDatos2.innerHTML = listaItems;

        //Actualizar el resultado total
        totalPagado -= cantidad;
        resultado.innerHTML = "Total pagado: " + totalPagado;
      
        //Meter la suma de los valores en el span
        let totalVentasSpan = listaDatos2.querySelector("span");
        if (!totalVentasSpan) {
          totalVentasSpan = document.createElement("span");
          listaDatos2.appendChild(totalVentasSpan);
        }
        totalVentasSpan.innerHTML = " Total($) ganado: " + totalVentas.toFixed(2) + " (100%)";
      }
      let restaBtn = document.querySelector("#btn-resta");
      restaBtn.addEventListener("click", restarValor);
    }
  }