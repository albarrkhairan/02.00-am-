// the in-page editor (the ✎ button). you don't need to edit this file.
// To hide the editor from visitors, change true to false on the next line:
(()=>{const SHOW_EDIT=true;
let nk="";try{nk=localStorage.getItem("tiu217niche")||""}catch(e){}const K="tiu217"+(+nk?"n"+nk:""),$=(s,r=document)=>r.querySelector(s),esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ek=x=>x.text||x.title||x.name||x.label||x.place||x.time||x.id||"",norm=s=>({a:s&&s.a||{},h:s&&s.h||{},x:s&&s.x||[],o:s&&s.o||null}),
mix=(x,y)=>{const r=norm(x),b=norm(y),a={};new Set([...Object.keys(r.a),...Object.keys(b.a)]).forEach(k=>{const s=new Set();a[k]=[...(r.a[k]||[]),...(b.a[k]||[])].filter(i=>!s.has(i._id)&&s.add(i._id))});return{a,h:{...r.h,...b.h},x:[...new Set([...r.x,...b.x])],o:b.o||r.o}};
let S;try{S=norm(JSON.parse(localStorage.getItem(K)))}catch(e){S=norm()}
if(!SHOW_EDIT)S=norm();
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}},B={};
Object.keys(C).forEach(k=>{if(Array.isArray(C[k]))B[k]=C[k].slice()});
const apply=()=>{const m=mix(C.mine,S);Object.keys(B).forEach(k=>C[k]=(m.a[k]||[]).concat(window.Cloud?Cloud.items(k):[]).concat(m.h[k]?[]:B[k].filter(x=>k=="current"||!m.x.includes(k+":"+ek(x))).map(x=>k=="current"?x:{...x,_ex:1}))/*CLOUD: + shared entries*/);{/*CLOUD*/const co=window.Cloud&&Cloud.current(),o=co?co.v:m.o;if(o)C.current=B.current.map((x,i)=>({...x,value:o[i]||x.value,addedBy:co?co.addedBy:undefined}))}};
apply();addEventListener("cloudsync",()=>{apply();dispatchEvent(new Event("hashchange"))});/*CLOUD*/if(!SHOW_EDIT)return;window.CAN_EDIT=1;window.TWO=(b,t)=>{if(b.dataset.s2)return true;b.dataset.s2=1;b.dataset.o=b.textContent;b.textContent=t;b.classList.add("sure");setTimeout(()=>{delete b.dataset.s2;b.textContent=b.dataset.o;b.classList.remove("sure")},3200);return false};
const HR=()=>(C.hours||[]).map(h=>h.time).join("|"),CAT="people i’d have coffee with|people i’d probably fall in love with|people who would ruin my life|people i would avoid for my own safety",
SC=[["title","title"],["note","why did it change your brain?","area"],["score","brain chemistry % (0–100)","num"],["micro","funny one-liner (optional)"]],
FM={thoughts:[{n:"thought",k:"thoughts",f:[["text","what’s on your mind?","area"],["time","time"],["size","size","sel","m|s|l|xl"]]}],
people:[{n:"person",k:"characters",f:[["name","name"],["from","from (film / book)"],["cat","group","sel",CAT],["note","what would happen if you met?","area"],["tags","tags (comma separated)","tags"]]}],
brain:[{n:"book",k:"books",f:SC},{n:"film",k:"films",f:SC},{n:"song",k:"songs",f:[...SC,["audio","mp3 (optional)","audio"]]}],
lives:[{n:"life",k:"fictionalLives",f:[["place","where / when"],["lines","the life — one line each","lines"],["basedOn","based on"],["g1","color 1","color","#3b2a6b"],["g2","color 2","color","#e0688a"]]}],
hours:[{n:"a quote for an hour",k:"quotes",f:[["text","the quote / sentence","area"],["by","from (optional)"],["hour","which hour","sel",HR]]},{n:"a new hour",k:"hours",f:[["time","time (e.g. 05:30)"],["label","name of that hour"]]}],
feelings:[{n:"feeling",k:"feelings",f:[["label","feeling (e.g. i can’t sleep)"],["read","read"],["watch","watch"],["listen","listen"],["meet","meet"],["think","think about","area"]]}],
questions:[{n:"question",k:"questions",f:[["text","the question","area"],["status","status","sel","still thinking about this|probably never finding out|update: i think i understand now"],["update","your answer (only for ‘update’)"]]}],
now:()=>[{n:"update",k:"current",f:C.current.map((x,i)=>["v"+i,x.icon+" "+x.label,"text",null,x.value])}]},
HK={thoughts:["thoughts"],people:["characters"],brain:["books","films","songs"],lives:["fictionalLives"],feelings:["feelings"],questions:["questions"]},
nm=i=>i.text||i.title||i.name||i.label||i.place||i.time||"entry",
PF=new Set(["characters","books","films","songs","fictionalLives"]),
PHR={people:()=>(C.characters||[]).map(x=>x.name).join("|"),brain:()=>["books","films","songs"].flatMap(k=>(C[k]||[]).map(x=>x.title)).join("|"),lives:()=>(C.fictionalLives||[]).map(x=>x.place).join("|")},
forms=r=>{const x=typeof FM[r]=="function"?FM[r]():FM[r];if(!x)return x;const y=x.map(f=>PF.has(f.k)?{...f,f:[...f.f,["photo","photo (optional)","photo"]]}:f);if(PHR[r])y.push({n:"a photo for something already here",k:"_photo",f:[["item","which one","sel",PHR[r]],["photo","the photo","photo"]]});if(r=="brain")y.push({n:"an mp3 for a song already here",k:"_audio",f:[["item","which song","sel",()=>(C.songs||[]).map(x=>x.title).join("|")],["audio","the mp3","audio"]]});return y};
const st=document.createElement("style");st.textContent=`#ed{position:fixed;top:0;right:0;bottom:0;width:min(390px,100%);z-index:55;background:var(--bg);color:var(--ink);border-left:2px solid var(--ink);padding:22px 20px 40px;overflow:auto;font:14px/1.4 var(--mono);transition:background .8s}#ed h3{font:400 30px/1 var(--serif);margin:14px 0 4px}#ed label{display:block;margin-top:12px;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--mu)}#ed input,#ed textarea,#ed select{display:block;width:100%;margin-top:4px;font:15px var(--mono);background:transparent;color:var(--ink);border:1px solid var(--ink);padding:8px}#ed input[type=color]{height:38px;padding:2px}#ed select option{color:#111;background:#fff}#ed .chip{margin:14px 6px 0 0}#ed .li{display:flex;justify-content:space-between;align-items:center;gap:8px;border-top:1px dashed;padding:8px 0}#ed .li .chip{margin:0}#ed hr{margin:22px 0 4px;border:0;border-top:2px solid}@media(max-width:800px){#ed{top:auto;height:78vh;width:100%;border-left:0;border-top:2px solid var(--ink)}}`;document.head.append(st);
const ed=document.createElement("aside");ed.id="ed";ed.hidden=true;document.body.append(ed);
let fi=0,lr;
const ctl=([n,l,t,o,d])=>`<label>${l}${t=="area"||t=="lines"?`<textarea name="${n}" rows="${t=="lines"?5:3}"></textarea>`:t=="sel"?`<select name="${n}">${(typeof o=="function"?o():o).split("|").map(x=>`<option>${esc(x)}</option>`).join("")}</select>`:`<input name="${n}" type="${t=="num"?"number":t=="color"?"color":t=="photo"||t=="audio"?"file":"text"}"${t=="num"?' min="0" max="100" value="70"':t=="color"?` value="${o}"`:t=="photo"?' accept="image/*"':t=="audio"?' accept="audio/*,.mp3,.m4a,.ogg,.wav"':` value="${esc(d||"")}"`}>`}</label>`;
const msg=t=>{const m=$("#em");if(m)m.textContent=t};
const build=()=>{const r=lr=document.body.dataset.room,ff=forms(r);
if(!ff){ed.innerHTML=`<button class="chip" data-e="x">× close</button><p style="margin-top:16px">step into a room first, then press ✎ again.</p>`;return}
const f=ff[Math.min(fi,ff.length-1)],keys=[...new Set(ff.map(x=>x.k))],mine=keys.flatMap(k=>(S.a[k]||[]).map(i=>[k,i])).concat(window.Cloud?keys.flatMap(k=>Cloud.mine(k).map(i=>[k,i])):[])/*CLOUD*/,hk=HK[r];
ed.innerHTML=`<button class="chip" data-e="x">× close</button><h3>add to this room</h3>${window.Cloud?Cloud.badge():""}${ff.length>1?`<label>what are you adding?<select id="ef">${ff.map((x,i)=>`<option value="${i}"${i==fi?" selected":""}>${x.n}</option>`).join("")}</select></label>`:""}<div id="efm">${f.f.map(ctl).join("")}</div><button class="chip" data-e="save">[ save${window.Cloud&&Cloud.ready()?" as "+Cloud.who():""} ]</button><p class="m" id="em"></p>${mine.length?`<hr><p class="m">${window.Cloud&&Cloud.ready()?"your entries (shared)":"your entries (saved in this browser)"}</p>${mine.map(([k,i])=>`<div class="li"><span>${esc(nm(i).slice(0,38))}</span><button class="chip" data-e="del" data-k="${k}" data-id="${i._id}" aria-label="delete">×</button></div>`).join("")}`:""}<hr>${hk?`<button class="chip" data-e="hide">${hk.some(k=>S.h[k])?"[ bring back examples ]":"[ remove examples ]"}</button>`:""}<button class="chip" data-e="exp">[ download my-content.js ]</button><button class="chip" data-e="imp">[ import ]</button><button class="chip" data-e="rst">[ reset my entries ]</button><input type="file" id="ei" accept=".js,.json" hidden>`;
const t=$("#efm [name=time]");if(t&&r=="thoughts")t.value=new Date().toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"})};
const commit=m=>{save();apply();dispatchEvent(new Event("hashchange"));build();msg(m||"saved ✓")};
const addP=async(name,inp)=>{const f=inp&&inp.files&&inp.files[0];if(!f||!name)return;const d=await shrink(f);PHL[slug(name)]=d;try{localStorage.setItem("tiu217p",JSON.stringify(PHL))}catch(e){msg("browser storage is full — put pictures in the images folder instead");throw e}};
const add=async()=>{const r=document.body.dataset.room,ff=forms(r),f=ff[Math.min(fi,ff.length-1)],v={};
f.f.forEach(([n,,t])=>{if(t=="photo"||t=="audio")return;const x=$("#efm [name="+n+"]").value.trim();v[n]=t=="num"?Math.max(0,Math.min(100,+x||0)):t=="tags"?x.split(",").map(s=>s.trim()).filter(Boolean):t=="lines"?x.split("\n").map(s=>s.trim()).filter(Boolean):x});
const ph=$("#efm [name=photo]"),au=$("#efm [name=audio]"),addA=async(n,i)=>{const z=i&&i.files&&i.files[0];if(!z||!n)return 1;try{await MU.put(n,z);return 1}catch(er){msg(er.message);return 0}};
try{if(f.k=="_audio"){if(!v.item)return msg("add a song first");if(!au||!au.files[0])return msg("pick an mp3 first 🎧");if(!await addA(v.item,au))return;return commit(window.Cloud&&Cloud.ready()?"mp3 added ✓ everyone can hear it":"mp3 added ✓")}if(f.k=="_photo"){if(!v.item)return msg("nothing to attach it to yet");if(!ph||!ph.files[0])return msg("pick a photo first ✨");await addP(v.item,ph);return commit("photo added ✓")}
if(f.k=="current"){const vals=f.f.map(([n])=>v[n]);/*CLOUD*/if(window.Cloud&&Cloud.ready()){try{await Cloud.setCurrent(vals);return commit("updated ✓ everyone sees it")}catch(er){}}S.o=vals;return commit()}
if(!v[f.f[0][0]]||!v[f.f[0][0]].length)return msg("fill in the first box ✨");
v._id=Date.now().toString(36)+Math.random().toString(36).slice(2,6);if(f.k=="fictionalLives")v.id=String(C.fictionalLives.length+1).padStart(3,"0");
if(ph&&ph.files[0])await addP(v.title||v.name||v.place,ph);if(f.k=="songs"&&!await addA(v.title,au))return;
/*CLOUD: shared save*/let note;if(window.Cloud&&Cloud.ready()){try{await Cloud.add(f.k,v);return commit("saved ✓ shared with everyone"+(ph&&ph.files[0]?" (photo stays on this device for now)":""))}catch(er){note="couldn’t save online ("+(er.message||er)+") — kept on this device"}}
(S.a[f.k]=S.a[f.k]||[]).push(v);commit(note)}catch(e){}};
document.addEventListener("click",ev=>{const t=ev.target,b=t.closest("[data-e]");
if(t.closest("#eo")){ed.hidden=!ed.hidden;if(!ed.hidden){fi=0;build()}return}
if(!b)return;const a=b.dataset.e,r=document.body.dataset.room;
if(a=="x")ed.hidden=true;else if(a=="save"){if(window.Cloud&&Cloud.needName())return Cloud.askName("add");/*CLOUD*/if(!window._saving){window._saving=1;add().finally(()=>window._saving=0)}}else if(a=="name")Cloud.askName();/*CLOUD*/
else if(a=="del"){/*CLOUD*/if(String(b.dataset.id).startsWith("cloud:")){Cloud.remove(b.dataset.id.slice(6)).then(()=>commit("deleted"),er=>msg("couldn’t delete: "+(er.message||er)))}else{S.a[b.dataset.k]=S.a[b.dataset.k].filter(i=>i._id!=b.dataset.id);commit("deleted")}}
else if(a=="xdel"){if(!TWO(b,"sure?"))return;const ck=b.dataset.ck,id=b.dataset.id;if(ck=="songs"&&window.MU)MU.del(b.dataset.nm).catch(()=>{});
if(!id){S.x=[...new Set([...S.x,ck+":"+b.dataset.nm])];commit("removed")}
else if(id.startsWith("cloud:"))Cloud.remove(id.slice(6)).then(()=>commit("deleted"),er=>msg("couldn’t delete: "+(er.message||er)));
else{S.a[ck]=(S.a[ck]||[]).filter(i=>i._id!=id);commit("deleted")}}
else if(a=="hide"){const v=!HK[r].some(k=>S.h[k]);HK[r].forEach(k=>S.h[k]=v?1:0);if(!v)S.x=S.x.filter(i=>!HK[r].some(k=>i.startsWith(k+":")));commit()}
else if(a=="imp")$("#ei").click();
else if(a=="rst"){if(confirm("delete everything you added in this browser?")){S=norm();commit("reset")}}
else if(a=="exp"){const x=new Blob(["// made by the in-page editor. put this file in the content folder.\nC.mine = "+JSON.stringify({...mix(C.mine,S),p:{...(C.mine&&C.mine.p||{}),...PHL}},null,1)+";\n"],{type:"text/javascript"}),l=document.createElement("a");l.href=URL.createObjectURL(x);l.download="my-content.js";l.click();msg("downloaded ✓")}});
document.addEventListener("change",ev=>{const t=ev.target;if(t.id=="ef"){fi=+t.value;build()}
if(t.id=="ei"&&t.files[0])t.files[0].text().then(x=>{try{const j=JSON.parse(x.slice(x.indexOf("{"),x.lastIndexOf("}")+1));S=mix(S,j);Object.assign(PHL,j.p||{});try{localStorage.setItem("tiu217p",JSON.stringify(PHL))}catch(e){}commit("imported ✓")}catch(e){msg("couldn’t read that file")}})});
addEventListener("keydown",ev=>{if(ev.key=="Escape")ed.hidden=true});
new MutationObserver(()=>{if(!ed.hidden&&document.body.dataset.room!=lr){fi=0;build()}}).observe(document.body,{attributes:true,attributeFilter:["data-room"]});
addEventListener("cloudsync",()=>{if(!ed.hidden)build()});/*CLOUD*/
addEventListener("load",()=>{const b=document.createElement("button");b.id="eo";b.textContent="[ ✎ add to this room ]";$("#os").insertBefore(b,$("#pl"))});
})();
