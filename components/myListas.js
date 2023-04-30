document.addEventListener("DOMContentLoaded", getList);

async function getList(){
    let url = `../storage/api.json`
    try{
        let result = await fetch(url);
        let data = await result.json();
        console.log(data.Data);
        showList(data.Data)
    }catch(error){
        console.log(error)
    }
}
export function showList(lists){
    
    let cont = document.querySelector(`#listas`)
    let plantilla = ""
    lists.forEach(list=>{
        let {CoinInfo} = list
        plantilla+=`
        <div class="card">
            <div class="card-front">
                <img src="${CoinInfo.ImageUrl}" alt="">
           </div> 
            <div class="card-back">
                <h2>${CoinInfo.FullName}</h2>
                <p>Name: ${CoinInfo.Name}</p>
                <p>Proof Type: ${CoinInfo.ProofType}</p>
                <p>ID: ${CoinInfo.Id}</p>
            </div>
        </div>
        `
        cont.innerHTML = plantilla
    })
}
