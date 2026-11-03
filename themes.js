// WORLDS: the central theme switcher. Visuals live in themes.css (one block per world).
// Add a world: add a line to T below + a block in themes.css. Fonts load only for the active world.
(()=>{const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],H=document.documentElement;
const T=[
{id:"",name:"the usual",d:"the original look",sw:"linear-gradient(135deg,#070b1f,#efe2cc)"},
{id:"writer",name:"the writer",d:"typed pages, 1940s",sw:"linear-gradient(135deg,#e6dcc3,#8c2a1e)",f:"IM+Fell+English:ital@0;1&family=Special+Elite&family=La+Belle+Aurore"},
{id:"net",name:"the lost computer",d:"a desktop, 2001",sw:"linear-gradient(135deg,#3a8ee8,#5aa02c)",f:"Pixelify+Sans:wght@400;700"},
{id:"film",name:"the film",d:"title cards and posters",sw:"linear-gradient(135deg,#0e0d0c,#c43a24)",f:"Bodoni+Moda:ital,wght@0,400;0,700;1,400;1,700&family=Archivo+Narrow:wght@400;700"},
{id:"bed",name:"the bedroom",d:"lamp, rain, 2am",sw:"linear-gradient(135deg,#13100f,#f0b46c)",f:"Hanken+Grotesk:wght@400;600&family=Newsreader:ital,wght@0,400;1,300;1,400&family=Reenie+Beanie"},
{id:"arcade",name:"the arcade",d:"game boy green, crt",sw:"linear-gradient(135deg,#0f380f,#9bbc0f)",f:"Press+Start+2P&family=VT323"},
{id:"train",name:"the night train",d:"split-flap board, 02:17 departure",sw:"linear-gradient(135deg,#090d16,#ffb300)",f:"Oswald:wght@500;600;700&family=Share+Tech+Mono"},
{id:"store",name:"the convenience store",d:"konbini, 24時間, white light",sw:"linear-gradient(135deg,#00984a 33%,#f47a20 33% 66%,#e60012 66%)",f:"Zen+Maru+Gothic:wght@500;700;900&family=DotGothic16&family=Noto+Sans+JP:wght@500;900"},
{id:"scrap",name:"the scrapbook",d:"journal pages, tape, stickers",sw:"linear-gradient(135deg,#d9c6a3,#f4a6b8)",f:"Gaegu:wght@400;700&family=Patrick+Hand&family=Special+Elite&family=Permanent+Marker"}];
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
// ambient layer (rain in the bedroom) + the lost computer's taskbar
const fx=document.createElement("div");fx.id="fx";fx.setAttribute("aria-hidden","true");document.body.append(fx);
set(id);
addEventListener("load",()=>setTimeout(()=>{const tl=$("#tools");if(tl){const b=document.createElement("button");b.id="wo";tl.prepend(b)}
const WT={thoughts:["📝","Notepad"],people:["👥","Address Book"],brain:["💿","Media Library"],lives:["🖼️","Slideshow"],queue:["🎧","Playlist"],feelings:["💌","Mail"],questions:["📌","Sticky Notes"],now:["🗂️","My Desktop"]};
// the lost computer: taskbar (start menu, open window, clock). Only visible in that world (themes.css).
const tb=document.createElement("div");tb.id="tbar";tb.innerHTML='<button class="s" id="tbs" aria-expanded="false">start</button><span class="w" id="tbw"></span><span class="c" id="tbc"></span>';document.body.append(tb);
const sm=document.createElement("div");sm.id="sm";document.body.append(sm);
const clock=()=>{$("#tbc").textContent=new Date().toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})};clock();setInterval(clock,20000);
const sync=()=>{const r=document.body.dataset.room,w=WT[r]||(r=="door"?["🖥️","Welcome"]:null);if(w){H.style.setProperty("--wt",JSON.stringify(w[0]+" "+w[1]));$("#tbw").textContent=w[0]+" "+w[1]}$("#tbw").hidden=!w};
new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:["data-room"]});sync();
const shut=()=>{sm.classList.remove("o");$("#tbs").setAttribute("aria-expanded","false")};
$("#tbs").onclick=()=>{if(sm.classList.contains("o"))return shut();const br=$("#os .br");sm.innerHTML="<b>"+(br?br.textContent:"2:17 AM")+"</b>"+$$("#os a[data-r]").map(a=>`<a href="${a.getAttribute("href")}">${(WT[a.dataset.r]||[""])[0]} ${a.textContent}</a>`).join("")+'<a href="#">↩ log off</a>';sm.classList.add("o");$("#tbs").setAttribute("aria-expanded","true")};
sm.addEventListener("click",shut);document.addEventListener("click",ev=>{if(!ev.target.closest("#sm,#tbs"))shut()});
set(id)},0));
document.addEventListener("click",ev=>{const t=ev.target,b=t.closest("#wp button");
if(b){set(b.dataset.w);pop.hidden=true;return}
if(t.closest("#wo"))pop.hidden=!pop.hidden;else if(!t.closest("#wp"))pop.hidden=true});
addEventListener("keydown",ev=>{if(ev.key=="Escape")pop.hidden=true;
if(ev.key=="w"&&!ev.metaKey&&!ev.ctrlKey&&!ev.altKey&&!/INPUT|TEXTAREA|SELECT/.test(ev.target.tagName))set(T[(T.findIndex(x=>x.id==id)+1)%T.length].id)});
// konbini: the door chime (ピンポーン) when you walk in
document.addEventListener("click",ev=>{if(id=="store"&&ev.target.closest("#enter")){try{const a=new(window.AudioContext||window.webkitAudioContext)(),n=(f,t)=>{const o=a.createOscillator(),g=a.createGain(),T=a.currentTime+t;o.frequency.value=f;g.gain.setValueAtTime(.0001,T);g.gain.exponentialRampToValueAtTime(.16,T+.02);g.gain.exponentialRampToValueAtTime(.0001,T+.7);o.connect(g).connect(a.destination);o.start(T);o.stop(T+.75)};n(1175,0);n(880,.3);n(1175,.6)}catch(e){}}});
// bedroom: the lamp follows you
addEventListener("pointermove",ev=>{if(id=="bed"){H.style.setProperty("--mx",ev.clientX+"px");H.style.setProperty("--my",ev.clientY+"px")}},{passive:true});
})();
// the night train: headings become split-flap letters (only while that world is on; "the usual" gets its text back)
(()=>{const H=document.documentElement,$=(s,r=document)=>r.querySelector(s),CH="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",calm=matchMedia("(prefers-reduced-motion:reduce)").matches;
const flap=el=>{if(!el||H.dataset.theme!="train"||el.querySelector(".fp"))return;const t=el.textContent.trim();if(!t)return;el.dataset.o=t;const w=document.createElement("span");w.className="fp";w.setAttribute("aria-label",t);
[...t.toUpperCase()].forEach((c,i)=>{const f=document.createElement("i");f.className="fl"+(c==" "?" sp":"");f.setAttribute("aria-hidden","true");f.textContent=c==" "?"":c;if(c!=" "&&!calm){let n=0;const k=6+i%5,go=()=>{f.textContent=++n>k?c:CH[Math.random()*36|0];if(n<=k)setTimeout(go,45+n*9)};setTimeout(go,i*30)}w.append(f)});el.textContent="";el.append(w)};
const back=()=>document.querySelectorAll("[data-o]").forEach(el=>{if(el.querySelector(".fp")){el.textContent=el.dataset.o}});
const run=()=>setTimeout(()=>{if(H.dataset.theme!="train")return back();flap($("#room h2.h"));flap($("#door h1"));flap($("#os .br"))},90);
new MutationObserver(run).observe($("#room"),{childList:true});new MutationObserver(run).observe(H,{attributes:true,attributeFilter:["data-theme"]});addEventListener("load",run);run()})();
