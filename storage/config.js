export default {
    dataMyHeader(){
        localStorage.setItem(`myHeader`, JSON.stringify({
                title:{name:"CriptosDMID"},
                img : "../img/fondoheader.jpg",
                cont:[
                    {
                        name:"Inicio",
                        href:"../pag_inicio/index.html"
                    },
                    {
                        name:"Listas",
                        href:"../pag_listas/listas.html"
                    },
                    {
                        name:"Compras",
                        href:"../pag_compras/compra.html"
                    }
                ]
        
        }))
    },
    dataMyInfo(){
        localStorage.setItem(`myInfo`,JSON.stringify({
            cont:{
                img:"../img/queson.jpg",
                title:"¿Que son las cripto monedas?",
                info:"Las criptomonedas son monedas digitales descentralizadas y seguras que utilizan criptografía para procesar transacciones. Son conocidas por su volatilidad y han sido objeto de controversia debido a la falta de regulación y su uso en actividades ilegales. Sin embargo, algunas criptomonedas, como Bitcoin y Ethereum (que podras ver en la sección de listas junto a otras), han ganado popularidad y se han convertido en una forma alternativa de inversión.",
                btn:{
                    href:"../pag_listas/listas.html",
                    show:"Ver criptos"
                }
            }
        }))
    }
}