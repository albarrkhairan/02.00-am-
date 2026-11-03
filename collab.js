// together mode: live cursors, shared fireflies, windows you can drag together. needs server.js to reach other people;
// without it, it still works between tabs of the same browser. you don't need to edit this file.
(()=>{const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const base=((window.C&&C.collab&&C.collab.server)||"").replace(/\/$/,""),ME=Math.random().toString(36).slice(2,8),HUE=Math.random()*360|0,
NAME=["moth","owl","night shift","firefly","stray cat","insomniac","sleepwalker"][Math.random()*7|0],
room=()=>document.body.dataset.room,col=h=>`hsl(${h} 85% 62%)`;
let on=true;try{on=localStorage.getItem("tiu217tg")!="0"}catch(e){}
let mode="",es=null,bc=null,peers={},snap={},count=1;
const layer=document.createElement("div");layer.id="peers";document.body.append(layer);
const post=m=>{if(!on)return;m.id=ME;m.room=room();m.h=HUE;m.n=NAME;if(bc)bc.postMessage(m);else if(mode=="live")fetch(base+"/send",{method:"POST",body:JSON.stringify(m),keepalive:true}).catch(()=>{})};
const ui=()=>{const b=$("#tg");if(!b)return;b.textContent=on?`● ${count} awake here`:"○ together: off";b.title=on?(mode=="live"?"live with everyone on this server":mode=="tabs"?"only tabs of this browser — run server.js to meet other people":"offline")+" · click to turn off":"click to turn on"};
const draw=()=>{const now=Date.now();let n=0;for(const id in peers){const p=peers[id];if(now-p.seen>12000){delete peers[id];const o=$("#pe-"+id,layer);o&&o.remove();continue}
const same=p.room==room();if(same)n++;let el=$("#pe-"+id,layer);
if(!on||!same||p.x==null||now-p.seen>5000){el&&(el.hidden=true);continue}
if(!el){el=document.createElement("div");el.id="pe-"+id;el.className="pe";el.innerHTML="<i></i><span></span>";layer.append(el)}
el.hidden=false;el.style.setProperty("--c",col(p.hue));el.lastChild.textContent=p.name;el.style.transform=`translate(${p.x*innerWidth}px,${p.y*innerHeight}px)`}
count=on?n+1:1;ui()};
const spawn=(x,y,h)=>{const f=document.createElement("i");f.className="ff";f.style.cssText=`left:${x*innerWidth}px;top:${y*innerHeight}px;--c:${col(h)};--dx:${Math.random()*120-60|0}px;--dy:${-(120+Math.random()*160)|0}px`;layer.append(f);setTimeout(()=>f.remove(),4200)};
const wins=()=>$$("#room .win"),key=i=>room()+":"+i;
const setWin=(w,x,y,h)=>{w._v=x+","+y;w.dataset.x=x;w.dataset.y=y;w.classList.add("rm");w.style.setProperty("--c",col(h==null?HUE:h));w.style.translate=x+"px "+y+"px";clearTimeout(w._t);w._t=setTimeout(()=>w.classList.remove("rm"),700)};
const applySnap=()=>wins().forEach((w,i)=>{const s=snap[key(i)];if(s)setWin(w,s.x,s.y)});
const got=m=>{if(!m||m.id==ME||!on)return;
if(m.t=="snap"){snap=Object.assign(snap,m.pos||{});applySnap();return}
const p=peers[m.id]=peers[m.id]||{};p.room=m.room;p.hue=m.h;p.name=m.n;p.seen=Date.now();
if(m.t=="m"){p.x=m.x;p.y=m.y}
else if(m.t=="f"&&m.room==room())spawn(m.x,m.y,m.h);
else if(m.t=="w"){snap[m.k]={x:m.x,y:m.y};if(m.room==room()){const w=wins()[m.i];w&&setWin(w,m.x,m.y,m.h)}}
draw()};
const connect=async()=>{if(!on||mode)return;
try{if(!base&&!/^(localhost|127\.|192\.168\.|10\.)/.test(location.hostname))throw 0;/*static host: skip probe*/const r=await fetch(base+"/ping",{cache:"no-store"});if(!r.ok||(await r.text())!="2am")throw 0;mode="live";es=new EventSource(base+"/events?id="+ME);es.onmessage=e=>{try{got(JSON.parse(e.data))}catch(x){}}}
catch(e){if("BroadcastChannel" in window){mode="tabs";bc=new BroadcastChannel("2am-together");bc.onmessage=e=>got(e.data)}else mode="solo"}
post({t:"p"});ui()};
const stop=()=>{es&&es.close();bc&&bc.close();es=bc=null;mode="";peers={};layer.querySelectorAll(".pe").forEach(x=>x.remove())};
const hint=()=>{let s;try{s=localStorage.getItem("tiu217th")}catch(e){}if(s||!on)return;try{localStorage.setItem("tiu217th",1)}catch(e){}
const h=document.createElement("div");h.id="cth";h.textContent="you’re not alone in here — tap empty space to release a firefly, drag the windows together.";document.body.append(h);setTimeout(()=>h.remove(),7000)};
addEventListener("load",()=>{const t=$("#tools");if(!t)return;const b=document.createElement("button");b.id="tg";t.append(b);ui();connect();
new MutationObserver(()=>{post({t:"p"});draw();if(room()!="door")hint()}).observe(document.body,{attributes:true,attributeFilter:["data-room"]});
new MutationObserver(applySnap).observe($("#room"),{childList:true});
const sendWin=w=>{const i=wins().indexOf(w);if(i<0)return;const x=+w.dataset.x||0,y=+w.dataset.y||0;snap[key(i)]={x,y};post({t:"w",i,k:key(i),x,y})};
new MutationObserver(ms=>ms.forEach(mu=>{const w=mu.target;if(!w.classList||!w.classList.contains("win"))return;const v=(w.dataset.x||0)+","+(w.dataset.y||0);if(w._v==v)return;w._v=v;
const n=performance.now();clearTimeout(w._s2);if(n-(w._s||0)>60){w._s=n;sendWin(w)}else w._s2=setTimeout(()=>sendWin(w),80)})).observe($("#room"),{subtree:true,attributes:true,attributeFilter:["style"]});
setInterval(()=>{post({t:"p"});draw()},4000)});
document.addEventListener("click",ev=>{if(ev.target.closest("#tg")){on=!on;try{localStorage.setItem("tiu217tg",on?1:0)}catch(e){}on?connect():stop();draw();if(on)post({t:"p"});return}
if(!on||room()=="door"||ev.target.closest("a,button,input,textarea,select,label,.tb,.pol,.bx,.cd,.win,.nt,#ed,#pull,#mp,#tools,#os,#sk,#nc,#acts,#door"))return;
const n=performance.now();if(n-(document._lf||0)<220)return;document._lf=n;const x=+(ev.clientX/innerWidth).toFixed(4),y=+(ev.clientY/innerHeight).toFixed(4);spawn(x,y,HUE);post({t:"f",x,y})});
let lm=0;addEventListener("pointermove",ev=>{if(!on||!mode||room()=="door")return;const n=performance.now();if(n-lm<70)return;lm=n;post({t:"m",x:+(ev.clientX/innerWidth).toFixed(4),y:+(ev.clientY/innerHeight).toFixed(4)})},{passive:true});
})();
