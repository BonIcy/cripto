let wsMyHeader ={
    listTitle(p1){
        return`
        <p id="glitch-text">${p1.name}</p>`
    },
    listCont(p1){
        let plantilla ="";
        p1.forEach((val, id)=>{
            plantilla +=`<a href="${val.href}">${val.name}</a>`
        });
        return plantilla
    }
}
self.addEventListener("message",(e)=>{
    postMessage(wsMyHeader[`${e.data.module}`](e.data.data));
})