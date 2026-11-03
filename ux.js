// UX clean-up: tombol "add to this room" di setiap room + tombol bawah untuk HP. Lihat ux.css.
(()=>{const $=(s,r=document)=>r.querySelector(s);
const NOUN={thoughts:"a thought",people:"a person",brain:"a book, film or song",lives:"a life",feelings:"a feeling",questions:"a question",now:null};
const mk=(c,t)=>{const b=document.createElement("button");b.type="button";b.className="addhere "+c;b.textContent=t;return b};
const dress=()=>{const room=$("#room"),r=document.body.dataset.room;if(!room||!$("#eo")||!(r in NOUN)||$(".addhere",room))return;
if(r=="lives"){room.querySelectorAll(".lv section").forEach(s=>s.append(mk("live","+ add to this room")));return}
const h=$("h2.h",room);if(h){let at=h;while(at.nextElementSibling&&at.nextElementSibling.tagName=="P")at=at.nextElementSibling;
const bar=document.createElement("div");bar.className="rbar";bar.append(mk("top",r=="now"?"✎ update this room":"+ add to this room"));at.after(bar)}
room.append(mk("addend",NOUN[r]?"+ add "+NOUN[r]+" to this room":"✎ update what you’re into"))};
const titles=()=>["#no","#so"].forEach(s=>{const b=$(s);if(b)b.title=b.textContent});
addEventListener("load",()=>{const L=(s,t)=>{const b=$(s);if(b)b.textContent=t};
L("#eo","+ add to this room");L("#pl","✦ pull from the archive");L("#lv","← leave");
const a=document.createElement("div");a.id="acts";const add=document.createElement("button");add.id="addfab";add.textContent="＋ add";add.setAttribute("aria-label","add to this room");
a.append(add);if($("#fab"))a.append($("#fab"));document.body.append(a);
new MutationObserver(dress).observe($("#room"),{childList:true});dress();titles()});
document.addEventListener("click",ev=>{const t=ev.target;
if(t.closest(".addhere,#addfab")){const ed=$("#ed"),eo=$("#eo");if(!eo)return;if(ed&&ed.hidden)eo.click();
if(!matchMedia("(pointer:coarse)").matches)setTimeout(()=>{const f=$("#ed input,#ed textarea");f&&f.focus()},60);return}
if(t.closest("[data-e=save],[data-e=del],[data-e=xdel]")){const y=scrollY;setTimeout(()=>scrollTo(0,y),480)}
setTimeout(titles,60)});
})();
