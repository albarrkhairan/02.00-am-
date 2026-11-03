// the opening (door): per-niche decorations — marquee strips, stickers, glitch/eq bits.
// You don't need to edit this file. Words live in content/niches.js → door:{ ticker, stickers, enter, fx }.
(()=>{const N=(window.C&&C.niches)||[];let i=0;try{i=+localStorage.getItem("tiu217niche")||0}catch(e){}if(!N[i])i=0;
const H=document.documentElement,n=N[i]||{},D=n.door||{},door=document.getElementById("door");H.dataset.niche=i;
if(!door||!D.ticker)return;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const strip=(txt,cls)=>{const g=txt.split("|").map(t=>`<span>${esc(t.trim())}</span>`).join("").repeat(3);return`<div class="mq ${cls}"><div class="dzt">${g}${g}</div></div>`};
let h=strip(D.ticker,"t")+strip(D.ticker2||D.ticker,"b");
h+=(D.stickers||[]).slice(0,5).map(s=>{const o=/^osd:/.test(s);return`<b class="sk${o?" osd":""}">${esc(o?s.slice(4):s)}</b>`}).join("");
if(D.fx==="stars")h+=Array.from({length:7},(_,k)=>`<i class="st${k}">✦</i>`).join("");
if(D.fx==="vhs")h+='<i class="tr"></i>';
if(D.fx==="eq")h+='<i class="ht a"></i><i class="ht b"></i><span class="dzeq"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>';
const dz=document.createElement("aside");dz.className="dz";dz.setAttribute("aria-hidden","true");dz.innerHTML=h;door.prepend(dz);
if(D.enter){const e=document.getElementById("enter");if(e)e.textContent=D.enter}
// loading: only right after a niche switch (niches.js sets the flag). The opening stays a few seconds, [ enter ] appears when the bar is done.
// Change the time with door:{ loadMs:4500 } in content/niches.js, the words with door:{ load:["…","…"] }.
let fresh=false;try{const v=+sessionStorage.getItem("tiu217load");sessionStorage.removeItem("tiu217load");fresh=v>0&&Date.now()-v<15000}catch(e){}
const room=location.hash.length>1;
if(fresh&&!room&&!H.hasAttribute("data-theme")){const en=document.getElementById("enter");if(en){
 const calm=matchMedia("(prefers-reduced-motion:reduce)").matches,MS=calm?1500:(D.loadMs||4500),W=D.load||["loading…","almost there…","settling in…"];
 const ld=document.createElement("div");ld.className="dload";ld.setAttribute("role","status");ld.setAttribute("aria-live","polite");
 ld.innerHTML='<span class="dlt"></span><span class="dlb"><i></i></span><span class="dlp">0%</span>';en.after(ld);door.classList.add("dl");
 const tx=ld.querySelector(".dlt"),bar=ld.querySelector(".dlb i"),pc=ld.querySelector(".dlp");let w=0;const t0=performance.now();
 const tick=now=>{const k=Math.min(1,(now-t0)/MS),p=.5-.5*Math.cos(Math.PI*k),j=Math.min(W.length-1,Math.floor(k*W.length));
  bar.style.width=(p*100).toFixed(1)+"%";pc.textContent=Math.round(p*100)+"%";
  if(j!==w){w=j;tx.style.opacity=0;setTimeout(()=>{tx.textContent=W[j];tx.style.opacity=.9},250)}
  if(k<1)requestAnimationFrame(tick);else{pc.textContent="100%";setTimeout(()=>{door.classList.remove("dl");door.classList.add("dr");ld.remove()},600)}};
 tx.textContent=W[0];requestAnimationFrame(tick)}}
const t=door.querySelector("h1");if(t&&D.ransom){const s=t.textContent;t.setAttribute("aria-label",s);t.innerHTML=[...s].map((c,k)=>c===" "?'<i class="dzs"></i>':`<i class="dzl r${k%5}" aria-hidden="true">${esc(c)}</i>`).join("")}
})();
