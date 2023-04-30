let wsMyInfo={
    listInfo(p1){
        return`
        <div class="infocard">
        <div class=imgg><img src="${p1.img}" alt=""></div>
        <fieldset>
        <legend class="tt"><h2>${p1.title}</h2></legend>
        <p>${p1.info}</p>
        <button><a href="${p1.btn.href}" style="text-decoration: none;">${p1.btn.show}</a></button>
        </fieldset>
        </div>
        
        `
    }
}
self.addEventListener("message",(e)=>{
    postMessage(wsMyInfo[`${e.data.module}`](e.data.data));
})