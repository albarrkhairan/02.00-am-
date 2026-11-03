// the niche switcher. you don't need to edit this file — add niches in content/niches.js.
(()=>{const N=C.niches||[],$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];if(N.length<2)return;
let cur=0;try{cur=+localStorage.getItem("tiu217niche")||0}catch(e){}if(!N[cur])cur=0;const n=N[cur];
const st=document.createElement("style");st.textContent=`#nc{position:fixed;left:170px;bottom:70px;z-index:56;background:var(--bg);color:var(--ink);border:2px solid var(--ink);padding:8px;display:flex;flex-direction:column;font:12px var(--mono)}#nc button{background:none;border:0;color:inherit;text-align:left;padding:6px 8px;cursor:pointer;font:inherit}#nc button:hover,#nc .on{background:var(--ink);color:var(--bg)}@media(max-width:800px){#nc{left:10px;right:10px;bottom:60px}}`;document.head.append(st);
const pop=document.createElement("div");pop.id="nc";pop.hidden=true;pop.innerHTML=N.map((x,i)=>`<button data-n="${i}" class="${i==cur?"on":""}">${x.name}</button>`).join("");document.body.append(pop);
const fix=()=>{if(!cur)return;
 const R=n.rooms||{};$$("#os a[data-r]").forEach((a,i)=>{const r=R[a.dataset.r];if(r)a.textContent="0"+(i+1)+" "+r[0]});
 const h=$("#room > h2.h"),r=R[document.body.dataset.room];if(h&&r){h.textContent=r[1];const p=h.nextElementSibling;if(p&&p.tagName=="P"&&r[2])p.textContent=r[2]}
 if(n.bar)$$("#room .bar").forEach(b=>{if(b.firstChild)b.firstChild.textContent=n.bar+" "});
 if(n.kinds)$$("#room .st,#pull .pk").forEach(s=>{const k=n.kinds[s.textContent.trim()];if(k)s.textContent=k})};
if(cur){const b=$(".br");if(b)b.textContent=n.brand||n.name;document.title=n.title||n.name;
 const d=$("#door");$("h1",d).textContent=n.title||n.name;$(".d1",d).textContent=n.d1;$(".d2",d).firstChild.textContent=n.d2;if(n.tag)$(".dtag",d).textContent=n.tag;
 new MutationObserver(fix).observe($("#room"),{childList:true});new MutationObserver(fix).observe($("#pull"),{childList:true});fix()}
addEventListener("load",()=>{const b=document.createElement("button");b.id="no";b.textContent="✦ niche: "+n.name;$("#os").insertBefore(b,$("#pl"))});
document.addEventListener("click",ev=>{const t=ev.target,b=t.closest("#nc button");
 if(b){const i=+b.dataset.n;if(i===cur){pop.hidden=true;return}
  try{localStorage.setItem("tiu217niche",i);if(N[i].skin!=null)localStorage.setItem("tiu217skin",N[i].skin)}catch(e){}
  try{sessionStorage.setItem("tiu217load",Date.now())}catch(e){}   // door.js shows the loading opening once
  if(location.hash)history.replaceState(null,"",location.pathname+location.search);   // start again from the opening, not inside a room
  location.reload();return}
 if(t.closest("#no"))pop.hidden=!pop.hidden;else if(!t.closest("#nc"))pop.hidden=true});
})();
