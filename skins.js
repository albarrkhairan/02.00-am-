// the skin switcher. you don't need to edit this file — add skins in content/skins.js.
(()=>{const SK=C.skins||[],$=(s,r=document)=>r.querySelector(s);if(SK.length<2)return;
const FX={scan:i=>`html[data-skin="${i}"] body::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:39;background:repeating-linear-gradient(transparent 0 2px,rgba(0,0,0,.2) 2px 3px)}`,
bevel:i=>`html[data-skin="${i}"] :is(.bx,.cd,.win,.pol){border:2px solid;border-color:#fff #404040 #404040 #fff;box-shadow:2px 2px 0 #000}`};
const css=`html[data-skin] :is(.bx,.cd,.win,.pol){background-color:var(--card);color:var(--ct)}html[data-skin] :is(.pol .nn,.pol small,.bx .mc,.bx .bar b,.cd .m){color:var(--act)}html[data-skin] .pol .m{color:var(--mu)}html[data-skin] :is(.st,.tb){color:var(--onac)}html[data-skin] .ph{background:linear-gradient(150deg,var(--ac),var(--ac2));filter:none}html[data-skin] :is(.bx,.win){border-color:var(--ink)}html[data-skin] .win{box-shadow:6px 6px 0 var(--ac2)}`
+SK.map((s,i)=>i?`html[data-skin="${i}"] body{--bg:${s.bg};--ink:${s.ink};--ac:${s.ac};--ac2:${s.ac2};--mu:${s.mu};--card:${s.card};--ct:${s.ct};--act:${s.act||s.ac};--onac:${s.onac||"#fff"};--gr:.06${s.mono?";--hf:var(--mono);--hw:400":""}}`+(s.mono?`html[data-skin="${i}"]{--serif:var(--mono);--sans:var(--mono);--hand:var(--mono)}html[data-skin="${i}"] .h{font-size:clamp(30px,6vw,86px);letter-spacing:-.05em}`:"")+(FX[s.fx]?FX[s.fx](i):""):"").join("")
+`#sk{position:fixed;left:170px;bottom:20px;z-index:56;background:var(--bg);color:var(--ink);border:2px solid var(--ink);padding:8px;display:flex;flex-direction:column;font:12px var(--mono);max-height:80vh;overflow:auto}#sk button{display:flex;gap:10px;align-items:center;background:none;border:0;color:inherit;text-align:left;padding:6px 8px;cursor:pointer;font:inherit}#sk button:hover,#sk .on{background:var(--ink);color:var(--bg)}#sk i{width:16px;height:16px;border:1.5px solid currentColor;border-radius:50%;flex:none}@media(max-width:800px){#sk{left:10px;right:10px;bottom:10px}}`;
const st=document.createElement("style");st.textContent=css;document.head.append(st);
const pop=document.createElement("div");pop.id="sk";pop.hidden=true;
pop.innerHTML=SK.map((s,i)=>`<button data-s="${i}"><i style="background:${s.bg||"linear-gradient(135deg,#070b1f,#fff04a)"}"></i>${s.name}</button>`).join("");document.body.append(pop);
let cur=0;try{cur=+localStorage.getItem("tiu217skin")||0}catch(e){}if(!SK[cur])cur=0;
const set=i=>{cur=i;const r=document.documentElement;i?r.dataset.skin=i:r.removeAttribute("data-skin");[...pop.children].forEach((b,j)=>b.classList.toggle("on",j==i));const b=$("#so");if(b)b.textContent="◐ theme: "+SK[i].name;try{localStorage.setItem("tiu217skin",i)}catch(e){}};
set(cur);
})();
