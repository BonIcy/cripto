document.addEventListener("DOMContentLoaded", getCompras);
async function getCompras() {
  let url = "../storage/api.json";
  try {
    let result = await fetch(url);
    let data = await result.json();
    console.log(data.Data);
    showCompras(data.Data);
    grafica(data.Data)
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

  cont.addEventListener(`input`, showPrice);
  let almac = document.querySelector(".btnSub");
  almac.addEventListener("click", almacenar);

  function showPrice() {
    let pagos = document.querySelector("#pagos");
    valorTotal = parseFloat(cont.value);
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
        // Actualizar la lista de datos
        listaDatos.innerHTML += "<li>"  + valorTotal +   "</li>";   
        // Actualizar el resultado total
        let total = 0;
        let items = listaDatos.querySelectorAll("li");
        for (let i = 0; i < items.length; i++) {
          let itemText = items[i].innerText;
          let itemPrice = parseFloat(itemText.substring(itemText.indexOf(":") ));
          total += itemPrice;
        }
        datos.push(valorTotal)
        resultado.innerHTML = "Total pagado: " + total;
        let totalCompras = datos.reduce((acc, curr) => acc + curr, 0);
        let totalComprasSpan = listaDatos.querySelector("span");
        // Calcular el porcentaje de cada valor en relación con la suma total
          let porcentajes = datos.map((dato) => (dato / totalCompras) * 100);
          // Actualizar la lista de datos con los porcentajes
          let listaItems = "";
          for (let i = 0; i < datos.length; i++) {
            listaItems += `<li>${datos[i]} (${porcentajes[i].toFixed(2)}%)</li>`;
          }
          listaDatos.innerHTML = listaItems; 
        if (totalComprasSpan) {
          totalComprasSpan = document.createElement("span");
          listaDatos.appendChild(totalComprasSpan);
        }
        totalComprasSpan.innerHTML = "Total($) invertido: " + totalCompras + " (100%)";
      }
      
      function restarValor() {
        let cantidad = parseFloat(document.getElementById("resta").value);
        let listaDatos2 = document.getElementById("listaDatos2");
        let resultado = document.getElementById("resultado");
      
        // Validar que la cantidad ingresada sea mayor a cero
        if (cantidad <= 0) {
          alert("Ingresa un valor mayor a 0 para vender");
          return;
        }
      
        // Verificar que la cantidad a restar no exceda el total pagado
        let totalPagado = parseFloat(resultado.innerText.substring(resultado.innerText.indexOf(":") + 1));
        if (cantidad > totalPagado) {
          alert("Ups, parece que no te alcanza, asegurate de comprar mas cripto.");
          return;
        }
      
        // Actualizar la lista de datos
        listaVentas.push(cantidad);
        listaDatos2.innerHTML += "<li>" + cantidad + "</li>";
      
        // Calcular la suma de los valores de listaVentas
        let totalVentas = listaVentas.reduce((acc, curr) => acc + curr, 0);
      
        // Calcular los porcentajes de cada valor en relación con la suma total
        let porcentajes = listaVentas.map((venta) => (venta / totalVentas) * 100);
      
        // Actualizar la lista de datos con los porcentajes
        let listaItems = "";
        for (let i = 0; i < listaVentas.length; i++) {
          listaItems += `<li>${listaVentas[i]} (${porcentajes[i].toFixed(2)}%)</li>`;
        }
        listaDatos2.innerHTML = listaItems;
      
        // Actualizar el resultado total
        totalPagado -= cantidad;
        resultado.innerHTML = "Total pagado: " + totalPagado;
      
        // Actualizar el contenido del span con la suma de los valores
        let totalVentasSpan = listaDatos2.querySelector("span");
        if (!totalVentasSpan) {
          totalVentasSpan = document.createElement("span");
          listaDatos2.appendChild(totalVentasSpan);
        }
        totalVentasSpan.innerHTML = " Total($) ganado: " + totalVentas + " (100%)";
      }
      
      let restaBtn = document.querySelector("#btn-resta");
      restaBtn.addEventListener("click", restarValor);
    }
}
export function grafica(){
  const canvas = document.getElementById('myChart');
  const ctx = canvas.getContext('2d');
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [{
      label: 'Ventas',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ]
    }]
  };
  const options = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  
  const myChart = new Chart(ctx, options);
  data.datasets[0].data = [10, 8, 15, 3, 7];
  myChart.update();
      
}