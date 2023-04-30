import config from "../storage/config.js";
export default{
    show(){
        config.dataMyHeader();
        Object.assign(this, JSON.parse(localStorage.getItem(`myHeader`)))
        const ws = new Worker(`../storage/wsMyHeader.js`, {type:"module"})
        let id = [];
        let count = 0;
        ws.postMessage({module:"listTitle", data : this.title});
        ws.postMessage({module: "listCont", data: this.cont})
        id = [`#title`, `#cont`];
        ws.addEventListener("message", (e)=>{
            let doc = new   DOMParser().parseFromString(e.data, `text/html`);
            document.querySelector(id[count]).append(...doc.body.children);
            (id.length-1==count) ? ws.terminate():count++;
        })
    }
}