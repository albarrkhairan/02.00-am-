// extras: ambient sound, shareable archive card, mobile menu + swipe. you don't need to edit this file.
(()=>{const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
/* ---- ambient sound (made in the browser, no audio files) ---- */
const SND=["off","rain","night hum","static","ocean","wind","crackling fire","crickets","store hum"],T=[0,.1,.08,.05,.12,.1,.1,.03,.07];let AC,cur=0,node=null,vol=1;
const noise=()=>{const b=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;const s=AC.createBufferSource();s.buffer=b;s.loop=true;s.start();return s};
const flt=(t,f,q)=>{const x=AC.createBiquadFilter();x.type=t;x.frequency.value=f;if(q)x.Q.value=q;return x};
const mk=k=>{const g=AC.createGain(),src=[];g.gain.setValueAtTime(0,AC.currentTime);g.connect(AC.destination);
if(k==1){const n=noise(),h=flt("highpass",700),l=flt("lowpass",7000);n.connect(h);h.connect(l);l.connect(g);src.push(n)}
if(k==2){[[55,.5],[82.5,.3],[110,.15]].forEach(([f,a])=>{const o=AC.createOscillator(),v=AC.createGain();o.frequency.value=f;v.gain.value=a;o.connect(v);v.connect(g);o.start();src.push(o)});const l=AC.createOscillator(),lg=AC.createGain();l.frequency.value=.1;lg.gain.value=.02;l.connect(lg);lg.connect(g.gain);l.start();src.push(l)}
if(k==3){const n=noise(),b=flt("bandpass",2500,.4);n.connect(b);b.connect(g);src.push(n)}
const md=(n,f,d)=>{const l=AC.createOscillator(),lg=AC.createGain();l.frequency.value=f;lg.gain.value=d;l.connect(lg);lg.connect(n.gain);l.start();src.push(l)};
if(k==4){const n=noise(),f=flt("lowpass",650),w=AC.createGain();w.gain.value=.55;n.connect(f);f.connect(w);w.connect(g);md(w,.11,.4);src.push(n)}
if(k==5){const n=noise(),b=flt("bandpass",420,.9),w=AC.createGain();w.gain.value=.5;n.connect(b);b.connect(w);w.connect(g);md(w,.07,.35);const l=AC.createOscillator(),lg=AC.createGain();l.frequency.value=.05;lg.gain.value=220;l.connect(lg);lg.connect(b.frequency);l.start();src.push(n,l)}
if(k==6){const n=noise(),f=flt("lowpass",260);n.connect(f);f.connect(g);src.push(n);const t=setInterval(()=>{if(Math.random()<.4)return;const c=AC.createBufferSource(),b=AC.createBuffer(1,900,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,3);c.buffer=b;const h=flt("highpass",1500),v=AC.createGain();v.gain.value=.4+Math.random()*.6;c.connect(h);h.connect(v);v.connect(g);c.start()},180);src.push({stop:()=>clearInterval(t)})}
if(k==7)[[4300,7],[4650,5.5]].forEach(([fq,r])=>{const o=AC.createOscillator(),w=AC.createGain();o.frequency.value=fq;w.gain.value=.3;o.connect(w);w.connect(g);o.start();md(w,r,.3);src.push(o)});
if(k==8){[[60,.5],[120,.25],[180,.1]].forEach(([f,a])=>{const o=AC.createOscillator(),v=AC.createGain(),lp=flt("lowpass",300);o.type="sawtooth";o.frequency.value=f;v.gain.value=a;o.connect(lp);lp.connect(v);v.connect(g);o.start();src.push(o)});const n=noise(),h=flt("bandpass",3000,.5),nv=AC.createGain();nv.gain.value=.04;n.connect(h);h.connect(nv);nv.connect(g);src.push(n)}
g.gain.linearRampToValueAtTime(T[k]*vol,AC.currentTime+1.5);return{g,src}};
const setSound=k=>{cur=k;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume()}catch(e){return}
if(node){const o=node;o.g.gain.cancelScheduledValues(AC.currentTime);o.g.gain.setValueAtTime(o.g.gain.value,AC.currentTime);o.g.gain.linearRampToValueAtTime(0,AC.currentTime+.8);setTimeout(()=>o.src.forEach(s=>{try{s.stop()}catch(e){}}),900);node=null}
if(k)node=mk(k);const b=$("#mp");if(b){b.classList.toggle("on",!!k);$("#mt").textContent=k?SND[k]:"sound off";$$("#mm button",b).forEach(x=>x.classList.toggle("sel",+x.dataset.k==k))}};
document.addEventListener("visibilitychange",()=>{if(AC&&cur)document.hidden?AC.suspend():AC.resume()});
/* ---- shareable archive card ---- */
const wrap=(c,t,x,y,w,lh,max)=>{let l="",n=0;for(const s of String(t).split(/\s+/)){const tt=l?l+" "+s:s;if(c.measureText(tt).width>w&&l){c.fillText(l,x,y);y+=lh;l=s;if(++n>=max)return y}else l=tt}c.fillText(l,x,y);return y+lh};
const card=async(pc,noImg)=>{const g=s=>($(s,pc)||{}).textContent||"",cs=getComputedStyle(document.body),v=n=>cs.getPropertyValue(n).trim()||"#111";
await document.fonts.ready;const W=1080,H=1920,cv=document.createElement("canvas");cv.width=W;cv.height=H;const c=cv.getContext("2d");
const ink=v("--ink"),ac=v("--ac"),mu=v("--mu"),im=noImg?null:$("img.pi",pc),hi=im&&im.complete&&im.naturalWidth;
c.fillStyle=v("--bg");c.fillRect(0,0,W,H);c.textBaseline="top";
c.fillStyle=mu;c.font='30px "DM Mono",monospace';c.fillText(($(".br")?$(".br").textContent:"2:17 AM").toUpperCase(),80,90);const t="2:17 AM";c.fillText(t,W-80-c.measureText(t).width,90);
let y=190;c.fillStyle=ink;c.font='44px "DM Mono",monospace';c.fillText(g(".m").toUpperCase(),80,y);y+=70;c.fillStyle=ac;c.font='700 32px "DM Mono",monospace';c.fillText(g(".pk"),80,y);y+=70;
if(hi){const s=Math.min(im.naturalWidth,im.naturalHeight),S=600;c.save();c.translate(80+S/2+20,y+S/2);c.rotate(-.03);c.fillStyle="#fbf7ec";c.fillRect(-S/2-20,-S/2-20,S+40,S+90);try{c.drawImage(im,(im.naturalWidth-s)/2,(im.naturalHeight-s)/2,s,s,-S/2,-S/2,S,S)}catch(e){}c.restore();y+=S+130}
c.fillStyle=ink;c.font='italic 124px "Instrument Serif",Georgia,serif';y=wrap(c,g("h3"),80,y,W-160,116,hi?2:3)+10;
const q=g(".pq");if(q){c.font='italic 62px "Instrument Serif",Georgia,serif';y=wrap(c,q,80,y+10,W-160,70,hi?3:6)+10}
c.fillStyle=mu;c.font='28px "DM Mono",monospace';c.fillText("SAVED BECAUSE:",80,y+20);c.fillStyle=ac;c.font='700 74px Caveat,cursive';wrap(c,g(".hand"),80,y+66,W-160,76,2);
c.fillStyle=mu;c.font='26px "DM Mono",monospace';c.fillText("you probably shouldn’t be here this late.",80,H-120);return cv};
const saveCard=async pc=>{let b;const blob=cv=>new Promise((ok,no)=>cv.toBlob(x=>x?ok(x):no(),"image/png"));
try{b=await blob(await card(pc))}catch(e){b=await blob(await card(pc,1))}
const f=new File([b],"archive-card.png",{type:"image/png"});
if(navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],title:"2:17 AM"});return}catch(e){if(e.name=="AbortError")return}}
const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="archive-card.png";a.click()};
new MutationObserver(()=>{const pc=$("#pull .pc:not(.gl)");if(pc&&!$("#sv",pc)){const b=document.createElement("button");b.className="chip";b.id="sv";b.textContent="[ save as image ]";pc.append(b)}}).observe($("#pull"),{childList:true,subtree:true});
/* ---- mobile: menu, thumb button, swipe, hint ---- */
const menu=o=>{const os=$("#os"),mb=$("#mb");os.classList.toggle("open",o);mb.textContent=o?"× close":"☰ menu";mb.setAttribute("aria-expanded",String(o))};
const toast=t=>{let e=$("#ts");if(!e){e=document.createElement("div");e.id="ts";document.body.append(e)}e.textContent=t;e.classList.add("on");setTimeout(()=>e.classList.remove("on"),3800)};
addEventListener("load",()=>{const os=$("#os");
const tl=document.createElement("div");tl.id="tools";document.body.append(tl);["#no","#so"].forEach(s=>{const b=$(s);if(b)tl.append(b)});
const mp=document.createElement("div");mp.id="mp";mp.innerHTML=`<div id="mm" hidden><span class="m">ambient sound</span>${SND.map((s,i)=>i?`<button data-k="${i}">♪ ${s}</button>`:"").join("")}<button data-k="0">■ off</button><label class="m">volume<input id="vol" type="range" min="0" max="100" value="60" aria-label="volume"></label></div><button id="mb2" aria-label="ambient sound"><span class="disc">♪</span><span id="mt">sound off</span></button>`;document.body.append(mp);
$("#vol").addEventListener("input",e=>{vol=e.target.value/60;if(node&&AC){node.g.gain.cancelScheduledValues(AC.currentTime);node.g.gain.setTargetAtTime(T[cur]*vol,AC.currentTime,.1)}});
const cr=document.createElement("span");cr.className="cr";os.insertBefore(cr,$(".br").nextSibling);
const mb=document.createElement("button");mb.id="mb";mb.textContent="☰ menu";mb.setAttribute("aria-expanded","false");os.append(mb);
const fab=document.createElement("button");fab.id="fab";fab.textContent="✦ pull";fab.setAttribute("aria-label","pull something from the archive");document.body.append(fab);
new MutationObserver(()=>{const r=document.body.dataset.room;cr.textContent=($("#os a.on")||{}).textContent||"";
if(r!="door"&&matchMedia("(pointer:coarse)").matches){let s;try{s=localStorage.getItem("tiu217sw")}catch(e){}if(!s){try{localStorage.setItem("tiu217sw",1)}catch(e){}toast("tip: swipe ← → to change rooms")}}}).observe(document.body,{attributes:true,attributeFilter:["data-room"]})});
document.addEventListener("click",ev=>{const t=ev.target;
if(t.closest("#mb2"))$("#mm").hidden=!$("#mm").hidden;else if(t.closest("#mm button"))setSound(+t.closest("#mm button").dataset.k);else if(!t.closest("#mp")&&$("#mm"))$("#mm").hidden=true;
if(t.closest("#sv")){const b=t.closest("#sv");b.textContent="making it…";saveCard($("#pull .pc")).then(()=>b.textContent="[ save as image ]")}
if(t.closest("#fab"))$("#pl").click();
if(t.closest("#mb"))menu(!$("#os").classList.contains("open"));else if(t.closest("#os a,#os button"))menu(false)});
addEventListener("keydown",ev=>{if(ev.key=="Escape"&&$("#mb"))menu(false)});
let sx,sy,ok=false;
document.addEventListener("touchstart",ev=>{const p=ev.touches[0];sx=p.clientX;sy=p.clientY;ok=!ev.target.closest(".lv,#ed,#pull,#sk,#nc,input,textarea,select,.tb,#os.open")&&document.body.dataset.room!="door"&&sx>28&&sx<innerWidth-28},{passive:true});
document.addEventListener("touchend",ev=>{if(!ok)return;const p=ev.changedTouches[0],dx=p.clientX-sx,dy=p.clientY-sy;if(Math.abs(dx)>80&&Math.abs(dx)>Math.abs(dy)*2){const L=$$("#os a[data-r]").map(a=>a.dataset.r),n=L[L.indexOf(document.body.dataset.room)+(dx<0?1:-1)];if(n)location.hash=n}},{passive:true});
})();
