// SAVE AS IMAGE: every room (and every fictional life) can become a 1080×1920 card, styled by the active world.
// On a phone it opens the share sheet; on a computer it downloads a PNG. No libraries.
(()=>{const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const T=(n,drop=".by,b.m,.pi")=>{if(!n)return"";const c=n.cloneNode(true);if(drop)c.querySelectorAll(drop).forEach(x=>x.remove());c.querySelectorAll("br").forEach(b=>b.replaceWith("\n"));return c.textContent.replace(/[ \t]+/g," ").replace(/\n /g,"\n").trim()};
// what each room puts on its card: a = small label, b = title, c = body
const SCR={
thoughts:()=>$$(".nt").map(n=>({a:T($("b",n),""),c:T(n)})),
people:()=>$$(".pol:not([hidden])").map(n=>({a:T($(".m",n),""),b:T($("h3",n),""),c:T($(".nn",n),"")})),
brain:()=>$$(".bx").map(n=>({a:T($(".st",n),"")+" · "+((T($(".bar b",n),"").match(/\d+%/)||[""])[0]),b:T($("h3",n),""),c:T($(".nn",n),"")})),
queue:()=>$$("#qb .qi").map(n=>({a:T($(".qk",n),"")+(n.classList.contains("done")?" · done":""),b:T($(".qt",n),"")})),
feelings:()=>$(".res")?$$(".res h4").map(h=>({a:T(h,""),c:T(h.nextElementSibling,"")})):$$(".chips .chip").map(x=>({b:T(x)})),
questions:()=>$$(".cd").map(n=>({a:T($(".m",n),""),b:T($("p",n),""),c:T($(".up",n),"")})),
now:()=>$$(".win").map(n=>({a:T($(".tb",n),"span"),b:T($("p",n),"")}))};
const wrap=(c,t,w)=>{const o=[];for(const p of String(t).split("\n")){let l="";for(const s of p.split(/\s+/)){const x=l?l+" "+s:s;if(c.measureText(x).width>w&&l){o.push(l);l=s}else l=x}o.push(l)}return o};
const card=async sec=>{await document.fonts.ready;
const room=document.body.dataset.room,th=document.documentElement.dataset.theme||"",rs=getComputedStyle($("#room")),v=n=>rs.getPropertyValue(n).trim();
const W=1080,H=1920,cv=document.createElement("canvas");cv.width=W;cv.height=H;const c=cv.getContext("2d");c.textBaseline="top";
let bg=v("--bg")||"#111",ink=v("--ink")||"#eee",ac=v("--ac")||"#aaf",mu=v("--mu")||"#999";
const sr=v("--serif")||"Georgia,serif",mo=v("--mono")||"monospace",hd=v("--hand")||"cursive",hf=v("--hf")||sr,hw=th=="film"?700:(v("--hw")||400),
 it=(!th||th=="writer"||th=="film")?"italic ":"",brand=($("#os .br")||{}).textContent||"2:17 AM";
let x0=100,top=120,bot=H-120;
let items,title,sub="";
if(sec){const g=getComputedStyle(sec);items=[{c:T($(".ls",sec))}];title=T($("h2",sec),"");sub=T($(".m",sec),"");
 if(th=="writer"){}else{const gr=c.createLinearGradient(0,0,W,H);gr.addColorStop(0,g.getPropertyValue("--g1").trim()||"#3b2a6b");gr.addColorStop(1,g.getPropertyValue("--g2").trim()||"#e0688a");bg=gr;ink="#fff";mu="#ffffffcc";ac="#fff"}}
else{items=(SCR[room]||(()=>[]))();title=T($("#room h2.h")||$("#room .res .h")||$("#room .h"),"");const p=$("#room h2.h + p");sub=p?T(p,""):"";
if(room=="feelings"&&$(".res"))title=T($(".res h3"),"")}
c.fillStyle=th=="net"?"#0a0a4a":bg;c.fillRect(0,0,W,H);
if(th=="net"){c.fillStyle=bg;c.fillRect(40,60,W-80,H-120);const g=c.createLinearGradient(40,0,W-40,0);g.addColorStop(0,"#000080");g.addColorStop(1,"#1084d0");c.fillStyle=g;c.fillRect(40,60,W-80,64);c.fillStyle="#fff";c.font="700 28px "+sr;c.fillText(brand+" — "+title,64,80);top=180;bot=H-140;x0=96}
if(th=="film"){c.fillStyle="#000";c.fillRect(0,0,W,170);c.fillRect(0,H-170,W,170);top=250;bot=H-250}
if(th=="bed"){const g=c.createRadialGradient(W*.8,200,0,W*.8,200,720);g.addColorStop(0,"rgba(240,180,108,.22)");g.addColorStop(1,"rgba(240,180,108,0)");c.fillStyle=g;c.fillRect(0,0,W,H)}
if(th=="writer"){c.strokeStyle=ink;c.globalAlpha=.55;c.lineWidth=2;c.strokeRect(40,40,W-80,H-80);c.strokeRect(50,50,W-100,H-100);c.globalAlpha=1;top=130}
const w=W-2*x0;let y=top;
c.fillStyle=mu;c.font="26px "+mo;c.fillText(th=="net"?"":brand,x0,y);y+=64;
// title: shrink until it fits in 3 lines
let sz=112,L;do{c.font=it+hw+" "+sz+"px "+hf;L=wrap(c,title,w);sz-=6}while(L.length>3&&sz>54);
c.fillStyle=ink;L.forEach(l=>{c.fillText(l,x0,y);y+=sz*1.08});y+=14;
if(sub){c.fillStyle=mu;c.font="26px "+mo;wrap(c,sub,w).slice(0,2).forEach(l=>{c.fillText(l,x0,y);y+=36});}y+=34;
const lim=bot-90;let n=0;
for(const o of items){const big=!!sec,bh=[];
 const mk=()=>{let h=0,aL=o.a?1:0,bL=0,cL=[];if(o.b){c.font=it+hw+" 52px "+hf;bL=wrap(c,o.b,w).slice(0,2)}
  if(o.c){c.font=(big?"italic 50px ":"italic 38px ")+sr;cL=wrap(c,o.c,w).slice(0,big?12:4)}return{aL,bL,cL}};
 const m=mk(),hgt=(m.aL?44:0)+(m.bL?m.bL.length*60:0)+(m.cL.length*(big?66:50))+40;
 if(y+hgt>lim&&n>0){c.fillStyle=mu;c.font="26px "+mo;c.fillText("+ "+(items.length-n)+" more at "+(location.host||"2:17 AM"),x0,y);break}
 if(o.a){c.fillStyle=ac;c.font="26px "+mo;c.fillText(o.a,x0,y);y+=44}
 if(m.bL){c.fillStyle=ink;c.font=it+hw+" 52px "+hf;m.bL.forEach(l=>{c.fillText(l,x0,y);y+=60})}
 if(m.cL.length){c.fillStyle=big?ink:mu;if(!big&&th!="bed")c.fillStyle=ink;c.globalAlpha=big?1:.85;c.font=(big?"italic 50px ":"italic 38px ")+sr;m.cL.forEach(l=>{c.fillText(l,x0,y);y+=big?66:50});c.globalAlpha=1}
 y+=40;n++;if(!big&&n<items.length&&y<lim){c.strokeStyle=mu;c.globalAlpha=.35;c.lineWidth=1;c.beginPath();c.moveTo(x0,y-22);c.lineTo(x0+w,y-22);c.stroke();c.globalAlpha=1}}
c.fillStyle=mu;c.font="24px "+mo;c.fillText(document.title||brand,x0,bot);return cv};
const save=async(btn,sec)=>{const t=btn.textContent;btn.textContent="making it…";
try{const cv=await card(sec),b=await new Promise((ok,no)=>cv.toBlob(x=>x?ok(x):no(),"image/png")),f=new File([b],"2am-"+document.body.dataset.room+".png",{type:"image/png"});
if(navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],title:document.title});btn.textContent=t;return}catch(e){if(e.name=="AbortError"){btn.textContent=t;return}}}
const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=f.name;a.click()}catch(e){btn.textContent="couldn’t make it";setTimeout(()=>btn.textContent=t,2200);return}
btn.textContent=t};
const mkBtn=(id)=>{const b=document.createElement("button");b.type="button";b.className="shr";b.textContent="↓ save as image";b.setAttribute("aria-label","save this room as an image");return b};
const dress=()=>{const r=document.body.dataset.room,room=$("#room");if(!room||r=="door"||!SCR[r]&&r!="lives")return;
if(r=="lives"){$$(".lv section",room).forEach(s=>{if(!$(".shr",s))s.append(mkBtn())});return}
if($(".shr",room))return;let bar=$(".rbar",room);
if(!bar){const h=$("h2.h",room);if(!h)return;let at=h;while(at.nextElementSibling&&at.nextElementSibling.tagName=="P")at=at.nextElementSibling;bar=document.createElement("div");bar.className="rbar";at.after(bar)}
bar.append(mkBtn())};
addEventListener("load",()=>setTimeout(()=>{const pl=$("#pl");if(pl){const b=document.createElement("button");b.id="sr";b.textContent="↓ save as image";pl.after(b)}
new MutationObserver(()=>setTimeout(dress,0)).observe($("#room"),{childList:true});dress()},0));
document.addEventListener("click",ev=>{const t=ev.target;let b=t.closest(".shr");if(b){save(b,b.closest(".lv section"));return}
if(b=t.closest("#sr")){let s=null;const lv=$(".lv");if(lv)s=$$("section",lv)[Math.round(lv.scrollLeft/lv.clientWidth)]||null;if(!SCR[document.body.dataset.room]&&!lv)return;save(b,s)}});
})();
