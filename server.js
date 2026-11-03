// "together" server — zero dependencies.  Run:  node server.js   → http://localhost:3000
// It serves the website AND relays live events (cursors, fireflies, dragged windows) between everyone connected.
const http=require("http"),fs=require("fs"),path=require("path");
const PORT=process.env.PORT||3000,ROOT=__dirname,clients=new Set(),pos={};
const MIME={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".svg":"image/svg+xml",".txt":"text/plain"};
const CORS={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"content-type","Access-Control-Allow-Methods":"GET,POST,OPTIONS"};
http.createServer((req,res)=>{const u=new URL(req.url,"http://x");
if(req.method=="OPTIONS"){res.writeHead(204,CORS);return res.end()}
if(u.pathname=="/ping"){res.writeHead(200,{...CORS,"content-type":"text/plain"});return res.end("2am")}
if(u.pathname=="/events"){res.writeHead(200,{...CORS,"content-type":"text/event-stream","cache-control":"no-cache",connection:"keep-alive"});
const c={id:u.searchParams.get("id"),res};clients.add(c);res.write("retry: 2000\n\ndata: "+JSON.stringify({t:"snap",pos})+"\n\n");
const k=setInterval(()=>res.write(": ka\n\n"),20000);req.on("close",()=>{clearInterval(k);clients.delete(c)});return}
if(u.pathname=="/send"&&req.method=="POST"){let b="";req.on("data",d=>{b+=d;if(b.length>4096)req.destroy()});
req.on("end",()=>{let m;try{m=JSON.parse(b)}catch(e){res.writeHead(400,CORS);return res.end()}
if(m.t=="w"&&m.k)pos[m.k]={x:m.x,y:m.y};
const s="data: "+JSON.stringify(m)+"\n\n";clients.forEach(c=>c.id!=m.id&&c.res.write(s));res.writeHead(204,CORS);res.end()});return}
let p=decodeURIComponent(u.pathname);if(p=="/")p="/index.html";const f=path.join(ROOT,path.normalize(p));
if(!f.startsWith(ROOT)||path.basename(f)=="server.js"){res.writeHead(403);return res.end()}
fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);return res.end("not found")}res.writeHead(200,{"content-type":MIME[path.extname(f)]||"application/octet-stream"});res.end(d)})
}).listen(PORT,()=>console.log("2:17 AM is open at http://localhost:"+PORT));
