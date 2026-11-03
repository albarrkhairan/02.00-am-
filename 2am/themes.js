// WORLDS: the central theme switcher. Visuals live in themes.css (one block per world).
// Add a world: add a line to T below + a block in themes.css. Fonts load only for the active world.
(()=>{const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],H=document.documentElement;
const T=[
{id:"",name:"the usual",d:"the original look",sw:"linear-gradient(135deg,#070b1f,#efe2cc)"},
{id:"writer",name:"the writer",d:"typed pages, 1940s",sw:"linear-gradient(135deg,#e6dcc3,#8c2a1e)",f:"IM+Fell+English:ital@0;1&family=Special+Elite&family=La+Belle+Aurore"},
{id:"net",name:"the lost internet",d:"a homepage, 2002",sw:"linear-gradient(135deg,#0a0a4a,#0000ee)",f:"VT323"},
{id:"film",name:"the film",d:"title cards and posters",sw:"linear-gradient(135deg,#0e0d0c,#c43a24)",f:"Bodoni+Moda:ital,wght@0,400;0,700;1,400;1,700&family=Archivo+Narrow:wght@400;700"},
{id:"bed",name:"the bedroom",d:"lamp, rain, 2am",sw:"linear-gradient(135deg,#13100f,#f0b46c)",f:"Hanken+Grotesk:wght@400;600&family=Newsreader:ital,wght@0,400;1,300;1,400&family=Reenie+Beanie"}];
let id="";try{id=localStorage.getItem("tiu217theme")||""}catch(e){}if(!T.some(t=>t.id==id))id="";
const set=i=>{id=i;const t=T.find(x=>x.id==i);
if(t.f&&!$("#f-"+i)){const l=document.createElement("link");l.id="f-"+i;l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family="+t.f+"&display=swap";document.head.append(l)}
if(i){H.dataset.theme=i;H.removeAttribute("data-skin")}else{H.removeAttribute("data-theme");let s=0;try{s=+localStorage.getItem("tiu217skin")||0}catch(e){}if(s)H.dataset.skin=s}
const b=$("#wo");if(b)b.textContent="◈ world: "+t.name;const so=$("#so");if(so)so.hidden=!!i;
$$("#wp button").forEach(x=>x.classList.toggle("on",x.dataset.w==i));try{localStorage.setItem("tiu217theme",i)}catch(e){}};
// colour skins would fight a world, so a world switches them off (they come back in "the usual")
new MutationObserver(()=>{if(id&&H.dataset.skin)H.removeAttribute("data-skin")}).observe(H,{attributes:true,attributeFilter:["data-skin"]});
// the popup
const pop=document.createElement("div");pop.id="wp";pop.hidden=true;pop.setAttribute("role","menu");
pop.innerHTML=T.map(t=>`<button data-w="${t.id}" role="menuitem"><i style="background:${t.sw}"></i><span>${t.name}<small>${t.d}</small></span></button>`).join("");document.body.append(pop);
// ambient layer (rain in the bedroom) + visitor counter (lost internet)
const fx=document.createElement("div");fx.id="fx";fx.setAttribute("aria-hidden","true");document.body.append(fx);
set(id);
addEventListener("load",()=>setTimeout(()=>{const tl=$("#tools");if(tl){const b=document.createElement("button");b.id="wo";tl.prepend(b)}
const os=$("#os");if(os){let n=417;try{n=+localStorage.getItem("tiu217vc")||417;if(!sessionStorage.getItem("tiu217vs")){n++;localStorage.setItem("tiu217vc",n);sessionStorage.setItem("tiu217vs",1)}}catch(e){}
const v=document.createElement("div");v.className="fxv";v.innerHTML=`visitor no.<b>${String(n).padStart(6,"0")}</b><small>best viewed at 800×600</small>`;os.insertBefore(v,$("#pg"))}
set(id)},0));
document.addEventListener("click",ev=>{const t=ev.target,b=t.closest("#wp button");
if(b){set(b.dataset.w);pop.hidden=true;return}
if(t.closest("#wo"))pop.hidden=!pop.hidden;else if(!t.closest("#wp"))pop.hidden=true});
addEventListener("keydown",ev=>{if(ev.key=="Escape")pop.hidden=true;
if(ev.key=="w"&&!ev.metaKey&&!ev.ctrlKey&&!ev.altKey&&!/INPUT|TEXTAREA|SELECT/.test(ev.target.tagName))set(T[(T.findIndex(x=>x.id==id)+1)%T.length].id)});
// bedroom: the lamp follows you
addEventListener("pointermove",ev=>{if(id=="bed"){H.style.setProperty("--mx",ev.clientX+"px");H.style.setProperty("--my",ev.clientY+"px")}},{passive:true});
})();
