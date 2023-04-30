import config from "../storage/config.js";
export default{
    show(){
        config.dataMyInfo();
        Object.assign(this, JSON.parse(localStorage.getItem(`myInfo`)))
        const ws = new Worker(`../storage/wsMyInfo.js`, {type:"module"})
        let id = []
        let count = 0;
        ws.postMessage({module:"listInfo", data:this.cont})
        id=[`#infoc`];
        ws.addEventListener("message", (e)=>{
            let doc = new DOMParser().parseFromString(e.data, `text/html`);
            document.querySelector(id[count]).append(...doc.body.children);
            (id.length-1==count)?ws.terminate():count++;
        })
    }}