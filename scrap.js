// scrapbook world: adds hand-written rating notes + doodle stickers to cards (hidden in every other world, see scrap.css)
(()=>{const $$=(s,r=document)=>[...r.querySelectorAll(s)],D=["✿","★","♥","☘","✶","✦"],K=["#e0507a","#f0b400","#2f9e6a","#3b6fe0","#e0507a","#8a5cd0"];
const run=()=>$$("#room :is(.bx,.pol,.cd):not([data-sc])").forEach((c,i)=>{c.dataset.sc=1;
 if(c.matches(".bx")){const b=c.querySelector(".bar b"),m=b&&/(\d+)%/.exec(b.textContent);if(m){const s=document.createElement("span");s.className="sc-x sc-rate";s.textContent="rating: "+(+m[1]/10).toFixed(1).replace(".0","")+"/10";c.querySelector(".bar").after(s)}}
 const d=document.createElement("i");d.className="sc-x sc-d";d.setAttribute("aria-hidden","true");d.textContent=D[i%6];d.style.color=K[(i+2)%6];d.style.rotate=(i*23%40-10)+"deg";c.append(d)});
new MutationObserver(run).observe(document.querySelector("#room"),{childList:true,subtree:true});run()})();
