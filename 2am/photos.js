// pictures. Put images in the /images folder named after the item (before-sunrise.jpg) or add them with the ✎ editor.
(()=>{const slug=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
let L={};try{L=JSON.parse(localStorage.getItem("tiu217p"))||{}}catch(e){}
window.slug=slug;window.PHL=L;
window.PI=n=>{const s=slug(n);if(!s)return"";const d=({...(window.C&&C.mine&&C.mine.p||{}),...L})[s];return d?`<img class="pi" alt="" src="${d}">`:`<img class="pi" alt="" loading="lazy" data-s="${s}" data-t="0" src="images/${s}.jpg">`};
window.phx=i=>{const x=["png","webp","jpeg"],t=+i.dataset.t;if(t<x.length){i.dataset.t=t+1;i.src="images/"+i.dataset.s+"."+x[t]}else i.remove()};
document.addEventListener("error",ev=>{const i=ev.target;if(i.tagName=="IMG"&&i.dataset.s)phx(i)},true);
window.shrink=f=>new Promise((ok,no)=>{const r=new FileReader();r.onload=()=>{const i=new Image();i.onload=()=>{const k=Math.min(1,640/Math.max(i.width,i.height)),c=document.createElement("canvas");c.width=i.width*k;c.height=i.height*k;c.getContext("2d").drawImage(i,0,0,c.width,c.height);ok(c.toDataURL("image/jpeg",.72))};i.onerror=no;i.src=r.result};r.onerror=no;r.readAsDataURL(f)});
})();
