import myHeader from "../components/myHeader.js";
import animation from "../storage/animation.js";
import { showCompras } from "../components/funcionLogica.js";
var select = document.getElementById("compras");
select.addEventListener("click", function(){
  this.classList.toggle("open");
});
animation.show()
myHeader.show();
showCompras;




    