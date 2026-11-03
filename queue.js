// ROOM 05 · THE QUEUE: pick items from every room, drag them into your own lineup, tick them off,
// play the songs back-to-back on the cassette, save it as an image or send it as a link. You don't need to edit this file.
(()=>{const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],K="tiu217q",
E=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let Q=[],F="all",cur=null,drag=null,shared=null;   // Q = [{ck,t,d}]  ck = kind key, t = title, d = ticked
const find=(ck,t)=>ALL().find(a=>a.ck==ck&&a.t==t),
save=()=>{try{localStorage.setItem(K,JSON.stringify(Q.map(x=>[x.ck,x.t,+x.d])))}catch(_){}},
load=()=>{try{Q=(JSON.parse(localStorage.getItem(K))||[]).map(([ck,t,d])=>({ck,t,d:!!d})).filter(x=>find(x.ck,x.t))}catch(_){Q=[]}},
code=()=>btoa(unescape(encodeURIComponent(JSON.stringify(Q.map(x=>[x.ck,x.t]))))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""),
decode=c=>{try{return JSON.parse(decodeURIComponent(escape(atob(c.replace(/-/g,"+").replace(/_/g,"/"))))).map(([ck,t])=>({ck,t,d:false})).filter(x=>find(x.ck,x.t))}catch(_){return[]}},
hhmm=i=>{const m=(137+17*i)%1440;return String(m/60|0).padStart(2,"0")+":"+String(m%60).padStart(2,"0")},
has=q=>Q.some(x=>x.ck==q.ck&&x.t==q.t),flash=t=>{const f=$("#qf");if(f){f.textContent=t;clearTimeout(f._t);f._t=setTimeout(()=>f.textContent="",2600)}};

const drawS=()=>{const A=ALL(),ks=[...new Map(A.map(a=>[a.ck,a.k])).entries()],s=$("#qs");if(!s)return;
 s.innerHTML=`<p class="m qh2">the shelf · everything in the site</p><div class="chips">${[["all","all"],...ks].map(([k,l])=>`<button class="chip${k==F?" on":""}" data-qf="${E(k)}">${E(String(l).toLowerCase())}</button>`).join("")}</div><div class="qa-l">${A.filter(a=>F=="all"||a.ck==F).map(a=>`<button class="qa${has({ck:a.ck,t:a.t})?" in":""}" data-qa="${E(a.ck)}|${E(a.t)}"><b class="qk">${E(a.k)}</b><span class="qt">${E(a.t||"untitled")}</span><i>${has({ck:a.ck,t:a.t})?"✓":"＋"}</i></button>`).join("")||'<p class="m">nothing here yet.</p>'}</div>`};

const drawQ=()=>{const q=$("#qq");if(!q)return;const sum=Q.reduce((n,_,i)=>n+117+i*100,0),dn=Q.filter(x=>x.d).length,sg=Q.some(x=>x.ck=="songs");
 q.dataset.n=Q.length;
 q.innerHTML=`<p class="m qh2">your queue · ${Q.length} item${Q.length==1?"":"s"}${Q.length?" · "+dn+" ticked":""}</p>${Q.length?`<ol class="ql" data-sum="${sum.toLocaleString("en-US")}">${Q.map((x,i)=>{const a=find(x.ck,x.t)||{},so=x.ck=="songs"&&x.x;return`<li class="qi${x.d?" done":""}${x===cur?" now":""}" data-i="${i}" data-t="${hhmm(i)}" data-p="¥${117+i*100}"><button class="qh" type="button" aria-label="drag to reorder">⠿</button><input class="qc" type="checkbox" aria-label="tick off"${x.d?" checked":""}><b class="qk">${E(a.k||"")}</b><span class="qt">${E(x.t)}</span><span class="qb"><button class="qu" type="button" aria-label="move up">▲</button><button class="qdn" type="button" aria-label="move down">▼</button><button class="qx" type="button" aria-label="remove">×</button></span></li>`}).join("")}</ol>
 <div class="qac">${sg?'<button class="chip" data-q="play">[ ▶ play queue ]</button>':""}<button class="chip" data-q="img">[ ↓ save as image ]</button><button class="chip" data-q="link">[ share link ]</button><button class="chip" data-q="clear">[ clear ]</button></div>`:'<p class="qe">empty. tap ＋ on anything in the shelf — songs, films, people, quotes — and build tonight’s lineup.</p>'}<p class="m" id="qf" role="status"></p>`;
 const p=$("#qp");if(p)p.hidden=!sg};

const init=()=>{load();if(cur)cur=Q.find(x=>x.ck==cur.ck&&x.t==cur.t)||null;const b=$("#qb");if(!b)return;
 b.innerHTML=`<div id="qn"></div><div id="qp" class="mu has qmu" hidden><div class="cas">${MU.CAS}</div><div class="mc"><button class="mb" type="button">▶</button><span class="eq"><i></i><i></i><i></i><i></i><i></i></span><input class="mseek" type="range" min="0" max="1000" value="0" aria-label="seek"><span class="mt">0:00</span></div><p class="m qnp"></p></div><div class="qw"><div id="qs"></div><div id="qq"></div></div>`;
 if(window.QCODE){shared=decode(window.QCODE);window.QCODE=null;if(shared.length)$("#qn").innerHTML=`<p class="qbn">someone sent you a queue · ${shared.length} item${shared.length>1?"s":""} <button class="chip" data-q="use">[ use it ]</button><button class="chip" data-q="skip">[ no thanks ]</button></p>`}
 drawS();drawQ()};
window.QB={init};if(document.body.dataset.room=="queue")init();   // opened straight on #queue (refresh / shared link)

// play the songs in order, on the cassette. each finished song gets ticked.
const play=async from=>{for(let i=from;i<Q.length;i++){const q=Q[i];if(q.ck!="songs"||q.d)continue;const p=$("#qp");if(p)p.dataset.s=slug(q.t);
 const s=await MU.q(q.t,(find(q.ck,q.t)||{}).x);if(s){cur=q;const n=$(".qnp");if(n)n.textContent="now playing · "+q.t;drawQ();return}q.bad=1;flash("no mp3 for “"+q.t+"” — skipped")}
 cur=null;const n=$(".qnp");if(n)n.textContent="";drawQ()};
MU.end=()=>{if(!cur)return;cur.d=true;const i=Q.indexOf(cur);cur=null;save();play(i+1)};

document.addEventListener("click",ev=>{const t=ev.target;let b;
 if(b=t.closest("[data-qf]")){F=b.dataset.qf;drawS();return}
 if(b=t.closest(".qa")){const[ck,...r]=b.dataset.qa.split("|"),ti=r.join("|"),i=Q.findIndex(x=>x.ck==ck&&x.t==ti);i<0?Q.push({ck,t:ti,d:false}):Q.splice(i,1);save();drawS();drawQ();return}
 const li=t.closest(".qi");
 if(li&&(b=t.closest(".qx,.qu,.qdn"))){const i=+li.dataset.i;if(b.classList.contains("qx"))Q.splice(i,1);else{const j=i+(b.classList.contains("qu")?-1:1);if(j<0||j>=Q.length)return;[Q[i],Q[j]]=[Q[j],Q[i]]}save();drawS();drawQ();return}
 if(li&&t.closest(".qc")){const q=Q[+li.dataset.i];q.d=!q.d;save();drawQ();return}
 if(!(b=t.closest("[data-q]")))return;const a=b.dataset.q;
 if(a=="play"){if(cur){MU.stop();cur=null;drawQ();return}if(!Q.some(x=>x.ck=="songs"&&!x.d))Q.forEach(x=>x.d=false);play(0)}
 else if(a=="img"){const s=$("#sr");s&&s.click()}
 else if(a=="link"){const u=location.href.split("#")[0]+"#queue="+code();if(navigator.share)navigator.share({title:document.title+" — my queue",url:u}).catch(()=>{});else if(navigator.clipboard)navigator.clipboard.writeText(u).then(()=>flash("link copied"),()=>prompt("copy this link",u));else prompt("copy this link",u)}
 else if(a=="clear"){if(!b.dataset.s2){b.dataset.s2=1;b.textContent="[ sure? ]";setTimeout(()=>{b.dataset.s2="";b.textContent="[ clear ]"},3000);return}MU.stop();cur=null;Q=[];save();drawS();drawQ()}
 else if(a=="use"){Q=shared;shared=null;save();history.replaceState(null,"",location.pathname+location.search+"#queue");$("#qn").innerHTML="";drawS();drawQ()}
 else if(a=="skip"){shared=null;history.replaceState(null,"",location.pathname+location.search+"#queue");$("#qn").innerHTML=""}});

// drag to reorder (pointer events: works with a finger too). ▲ ▼ do the same without dragging.
document.addEventListener("pointerdown",ev=>{const h=ev.target.closest(".qh");if(!h)return;drag=h.closest(".qi");drag.classList.add("drag");try{h.setPointerCapture(ev.pointerId)}catch(_){}ev.preventDefault()});
addEventListener("pointermove",ev=>{if(!drag)return;const o=document.elementFromPoint(ev.clientX,ev.clientY),t=o&&o.closest(".qi");if(t&&t!=drag&&t.parentNode==drag.parentNode){const r=t.getBoundingClientRect();ev.clientY<r.top+r.height/2?t.before(drag):t.after(drag)}});
addEventListener("pointerup",()=>{if(!drag)return;const o=$$(".qi",$("#qq")).map(n=>Q[+n.dataset.i]);drag=null;Q=o;save();drawQ()});
})();
