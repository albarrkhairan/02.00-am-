// music: a cassette player on every song card + a little "now playing" pill. you don't need to edit this file.
// mp3 sources, in this order: audio:"music/x.mp3" in content/songs.js → a shared mp3 on Supabase (added with ✎, everyone hears it) → an mp3 kept in this browser only (when not online/signed in) → music/<song-title>.mp3
(()=>{const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],EXT=["mp3","m4a","ogg","wav"],SRC={},URLS={},A=new Audio();let cur=null,db;
A.preload="metadata";
/* mp3s added in the editor live in IndexedDB (localStorage is far too small for music) */
const idb=()=>db||(db=new Promise((ok,no)=>{const r=indexedDB.open("tiu217m",1);r.onupgradeneeded=()=>r.result.createObjectStore("a");r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)}));
const tx=(m,f)=>idb().then(d=>new Promise((ok,no)=>{const q=f(d.transaction("a",m).objectStore("a"));q.onsuccess=()=>ok(q.result);q.onerror=()=>no(q.error)}));
const KIND={};window.MU={delShared:async name=>{const s=slug(name);await Cloud.audioDel(name);delete SRC[s];delete KIND[s];if(cur&&cur.s==s){A.pause();A.removeAttribute("src");cur=null;ui()}},del:async name=>{const s=slug(name);try{await tx("readwrite",o=>o.delete(s))}catch(e){}if(URLS[s]){URL.revokeObjectURL(URLS[s]);delete URLS[s]}delete SRC[s];delete KIND[s];if(cur&&cur.s==s){A.pause();A.removeAttribute("src");cur=null;ui()}},put:async(name,file)=>{if(window.Cloud&&Cloud.ready()){try{await Cloud.audioPut(name,file)}catch(er){throw Error("couldn’t share the mp3: "+(er.message||er))}delete SRC[slug(name)];return}if(file.size>30e6)throw Error("that mp3 is over 30 MB — put it in the music folder instead");
 try{await tx("readwrite",s=>s.put(file,slug(name)))}catch(e){throw Error("this browser wouldn’t store that file — put it in the music folder instead")}delete URLS[slug(name)];delete SRC[slug(name)]}};
const blobUrl=async s=>{if(URLS[s])return URLS[s];try{const b=await tx("readonly",o=>o.get(s));if(b)return URLS[s]=URL.createObjectURL(b)}catch(e){}return null};
const probe=u=>new Promise(ok=>{const a=new Audio();a.preload="metadata";a.onloadedmetadata=()=>ok(u);a.onerror=()=>ok(null);setTimeout(()=>ok(null),4000);a.src=u});
const find=async(t,x)=>{const s=slug(t);if(x.audio){KIND[s]="file";return x.audio}const cu=window.Cloud&&Cloud.audioUrl&&Cloud.audioUrl(s);if(cu){KIND[s]="cloud";return cu}const b=await blobUrl(s);if(b){KIND[s]="idb";return b}for(const e of EXT){const u="music/"+s+"."+e;if(await probe(u)){KIND[s]="file";return u}}return null};
const tm=s=>isFinite(s)?Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0"):"0:00";
/* the cassette */
const CAS=`<svg class="cs" viewBox="0 0 200 128" aria-hidden="true"><rect class="cb" x="2" y="2" width="196" height="124" rx="9"/><rect class="cl" x="16" y="12" width="168" height="54" rx="4"/><rect class="cst" x="16" y="12" width="168" height="9" rx="4"/><rect class="cw" x="50" y="76" width="100" height="32" rx="16"/><g class="rl"><circle class="rc" cx="74" cy="92" r="11"/><path class="rs" d="M74 80v24M62 92h24M65.5 83.5l17 17M82.5 83.5l-17 17"/></g><g class="rl r2"><circle class="rc" cx="126" cy="92" r="11"/><path class="rs" d="M126 80v24M114 92h24M117.5 83.5l17 17M134.5 83.5l-17 17"/></g><path class="cb2" d="M34 124l10-11h112l10 11z"/><circle class="sc" cx="10" cy="10" r="2.5"/><circle class="sc" cx="190" cy="10" r="2.5"/><circle class="sc" cx="10" cy="118" r="2.5"/><circle class="sc" cx="190" cy="118" r="2.5"/></svg><span class="cap"></span><span class="side">A</span>`;
const ui=()=>{$$(".mu").forEach(m=>{const on=cur&&m.dataset.s==cur.s,pl=!!on&&!A.paused,k=$(".mseek",m),t=$(".mt",m),bx=m.closest(".bx");m.classList.toggle("playing",pl);if(bx)bx.classList.toggle("sp",pl);
 if(on){k.value=A.duration?A.currentTime/A.duration*1000:0;t.textContent=tm(A.currentTime)+" / "+tm(A.duration)}else{k.value=0;t.textContent="0:00"}
 if(!m.classList.contains("no"))$(".mb",m).textContent=pl?"❚❚":"▶"});
 const p=$("#npl");p.hidden=!cur;p.classList.toggle("playing",!A.paused);$(".npt",p).textContent=cur?cur.n:"";$(".npb",p).textContent=A.paused?"▶":"❚❚"};
["play","pause","ended","timeupdate","loadedmetadata"].forEach(v=>A.addEventListener(v,ui));A.addEventListener("ended",()=>{A.currentTime=0;ui()});
const p=document.createElement("div");p.id="npl";p.hidden=true;p.innerHTML=`<span class="npd"></span><span class="npt"></span><button class="npb" type="button" aria-label="play / pause">▶</button><button class="npx" type="button" aria-label="close player">×</button>`;document.body.append(p);
const play=async m=>{const s=m.dataset.s;if(!SRC[s])return;if(cur&&cur.s==s){A.paused?A.play():A.pause();return}
 cur={s,n:m.dataset.n};A.src=SRC[s];const am=$("#mp");if(am&&am.classList.contains("on")){const o=$('#mm button[data-k="0"]');o&&o.click()}/* ambient sound steps aside */
 try{await A.play()}catch(e){}ui()};
const addMp3=t=>{const eo=$("#eo");if(!eo)return;if($("#ed").hidden)eo.click();setTimeout(()=>{const s=$("#ef");if(!s)return;const i=[...s.options].findIndex(o=>/mp3/.test(o.text));if(i<0)return;s.value=i;s.dispatchEvent(new Event("change",{bubbles:true}));const it=$("#efm [name=item]");if(it)it.value=t},40)};
const dress=()=>$$("#room .bx[data-k=SONG]").forEach(b=>{if($(".mu",b))return;const t=b.dataset.t,s=slug(t),x=(C.songs||[]).find(z=>z.title==t)||{},m=document.createElement("div");
 m.className="mu ld";m.dataset.s=s;m.dataset.n=x.artist?t+" — "+x.artist:t;m.innerHTML=`<div class="cas">${CAS}</div><div class="mc"><button class="mb" type="button">▶</button><span class="eq"><i></i><i></i><i></i><i></i><i></i></span><input class="mseek" type="range" min="0" max="1000" value="0" aria-label="seek"><span class="mt">0:00</span><button class="mx" type="button" aria-label="remove mp3">× mp3</button></div>`;
 $(".cap",m).textContent=t;$("h3",b).after(m);
 (s in SRC?Promise.resolve(SRC[s]):find(t,x).then(u=>SRC[s]=u||SRC[s]||(window.Cloud&&Cloud.audioUrl&&Cloud.audioUrl(s))||null)).then(u=>{if(u){m.className="mu has";if(!window.CAN_EDIT)$(".mx",m).remove()}else if(window.CAN_EDIT){m.className="mu no";$(".mb",m).textContent="＋ mp3"}else m.remove();ui()})});
new MutationObserver(dress).observe($("#room"),{childList:true});dress();
addEventListener("cloudsync",()=>{for(const k in SRC)if(!SRC[k]||KIND[k]=="cloud")delete SRC[k];$$(".mu.no").forEach(m=>m.remove());dress()});/* shared mp3s load a moment after the page */
document.addEventListener("click",ev=>{const t=ev.target,b=t.closest(".mb"),mx=t.closest(".mx");
 if(mx){const m=mx.closest(".mu"),s=m.dataset.s;if(KIND[s]=="file"){mx.textContent="it’s a file in /music — delete it there";setTimeout(()=>mx.textContent="× mp3",4000);return}
  if(!TWO(mx,"sure?"))return;const nm=m.closest(".bx").dataset.t;(KIND[s]=="cloud"?MU.delShared(nm):MU.del(nm)).then(()=>{m.remove();dress()},er=>{mx.textContent=er.message||"couldn’t remove it";setTimeout(()=>mx.textContent="× mp3",4000)});return}
 if(b){const m=b.closest(".mu");m.classList.contains("no")?addMp3(m.closest(".bx").dataset.t):play(m);return}
 if(t.closest(".npb"))A.paused?A.play():A.pause();else if(t.closest(".npx")){A.pause();cur=null;ui()}});
document.addEventListener("input",ev=>{const k=ev.target.closest&&ev.target.closest(".mseek");if(!k)return;const m=k.closest(".mu");if(cur&&cur.s==m.dataset.s&&A.duration)A.currentTime=k.value/1000*A.duration});
})();
