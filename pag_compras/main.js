import myHeader from "../components/myHeader.js";
import animation from "../storage/animation.js";
animation.show()
myHeader.show();
document.addEventListener("DOMContentLoaded", getCompras)
async function getCompras(){
    let url = "../storage/api.json"
    try{
        let result = await fetch(url)
        let data = await result.json()
        console.log(data.Data);
        showCompras(data.Data);
    }catch(error){
        console.log(error);
    }
}
function showCompras(buys){
    let cont = document.querySelector("#compras");
    let plantilla = ""
    buys.forEach(buy=>{
        let  {CoinInfo, RAW} = buy
        plantilla +=`
    <option class="moneda" value="${RAW.USD.PRICE}">${CoinInfo.FullName}</option>
    `
    cont.innerHTML = plantilla
    })

    //la parte de comprar y almacenar las compras 
    cont.addEventListener(`input`, showPrice);
    //volver a delcarar cont let cont = document.querySelector("#compras");
    let almac = document.querySelector(".btnSub")
    almac.addEventListener("click", almacenar);
    let datos = [];
    
    function showPrice() {
      let pagos = document.querySelector("#pagos");
      let valor = "";
      valor += `<p>Precio: $${cont.value}<p>`;
      pagos.innerHTML = valor;
    }
    
    function almacenar(event) {
       let pregunta =  confirm("¿Estas seguro/a de querer comprar?")
        if (pregunta == true){
            alert("Comprado uwuwuwuw")
            si();

        }
        else{
            alert("Compra cancelada");
        }
      function si(){datos.unshift(cont.value);
      event.preventDefault();
      let lista = document.querySelector("#listaDatos");
    // Limpiar la lista antes de imprimir los nuevos valores
         lista.innerHTML = "";
    // Iterar sobre el array "datos" y crear un <li> para cada valor
        for (let i = 0; i < datos.length; i++) {
            let item = document.createElement("li");
            item.textContent = `$${datos[i]} USD`;
            lista.appendChild(item);
        }
          // Calcular la suma de los valores en el array "datos"
            let suma = 0;
            for (let i = 0; i < datos.length; i++) {
                suma += parseFloat(datos[i]);
            }
  
  // Imprimir la suma en un elemento HTML
        let resultado = document.querySelector("#resultado");
        resultado.textContent = "El valor total pagado es de: " + suma;
        
      console.log(datos);}
    }
    
}



    