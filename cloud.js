// cloud.js — shared entries on Supabase. Exposes window.Cloud, which editor.js and app.js call.
// Rule: if Supabase is missing or fails, NOTHING breaks — the site just works locally like before.
// Security is Supabase RLS (users can only insert/update/delete rows where user_id = their own id). This file only asks nicely.
(()=>{
const $ = (s,r=document)=>r.querySelector(s);
const esc = s => String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const st = { user:null, name:"anonymous", rows:[], names:{}, ok:false };   // everything we know lives here
const clean = s => String(s||"").trim().replace(/\s+/g," ");

// niches keep their own content: remember which niche an entry belongs to (same key editor.js uses)
const niche = () => { try { return +localStorage.getItem("tiu217niche")||0 } catch(e){ return 0 } };
const ready = () => st.ok && !!st.user;
const needName = () => ready() && st.name==="anonymous";            // logged in, but nobody knows who you are yet
const changed = () => dispatchEvent(new Event("cloudsync"));        // editor.js listens → re-renders rooms

// ---- reading -------------------------------------------------------------
// entries of one kind (books, films, thoughts…) for the current niche, shaped like the sample content + "addedBy"
const items = k => k==="current" ? [] : st.rows
  .filter(r => r.type===k && (+(r.data&&r.data._niche)||0)===niche())
  .map(r => {
    const d = { ...r.data, _id:"cloud:"+r.id, _cloud:1, _own: r.user_id===(st.user&&st.user.id),
                addedBy: st.names[r.user_id] || "anonymous" };
    if (k==="fictionalLives") ["g1","g2"].forEach(g => { if(!/^#[0-9a-f]{6}$/i.test(d[g]||"")) delete d[g] }); // colours must look like #aabbcc
    return d;
  });
const mine = k => items(k).filter(x => x._own);
// "currently" room: the newest update wins (it is one shared board). null = nobody updated yet
const current = () => {
  const r = st.rows.filter(r => r.type==="current" && (+(r.data&&r.data._niche)||0)===niche()).pop();
  return r && Array.isArray(r.data.v) ? { v:r.data.v.map(x=>String(x).slice(0,200)), addedBy:st.names[r.user_id]||"anonymous" } : null;
};

async function load(){
  const a = await sb.from("entries").select("id,user_id,type,data,image_url,created_at").order("created_at",{ascending:true});
  if (a.error) throw a.error;
  const b = await sb.from("profiles").select("id,display_name");     // names of everyone, to print "added by …"
  st.names = {}; (b.data||[]).forEach(p => st.names[p.id] = p.display_name||"anonymous");
  st.rows = a.data||[];
}

// ---- writing -------------------------------------------------------------
async function add(k,v){
  if (!ready()) throw new Error("not signed in");
  const data = { ...v, _niche:niche() }; delete data._id;
  if (JSON.stringify(data).length > 4000) throw new Error("that entry is too long");
  const r = await sb.from("entries").insert({ user_id:st.user.id, type:k, data }).select().single();
  if (r.error) throw r.error;
  st.rows.push(r.data); return r.data;
}
async function remove(id){
  if (!ready()) throw new Error("not signed in");
  // no "user_id = me" filter on purpose: Supabase RLS decides. If it isn't yours, 0 rows come back.
  const r = await sb.from("entries").delete().eq("id",id).select();
  if (r.error) throw r.error;
  if (!r.data.length) throw new Error("not allowed — that entry isn’t yours");
  st.rows = st.rows.filter(x => String(x.id)!==String(id));
}
async function setCurrent(v){                                       // "currently" update: add the new one, tidy my older ones
  const old = st.rows.filter(r => r.type==="current" && r.user_id===st.user.id);
  await add("current",{ v });
  for (const o of old) { const r = await sb.from("entries").delete().eq("id",o.id).select(); if(!r.error) st.rows = st.rows.filter(x => x.id!==o.id); }
}

// ---- display name --------------------------------------------------------
async function saveName(n){
  const r = await sb.from("profiles").upsert({ id:st.user.id, display_name:n });   // insert-or-update OWN profile (RLS allows it)
  if (r.error) throw r.error;
  st.name = n; st.names[st.user.id] = n; console.log("Display name saved:", n);
}
// popup version: used when someone lands inside a room, wants to change name, or tries to add while still "anonymous"
function askName(mode){
  if ($("#nm")) return;
  const why = mode==="add" ? "so everyone knows who added it" : mode==="room" ? "before you look around" : "your name";
  const d = document.createElement("div"); d.id = "nm"; d.setAttribute("role","dialog"); d.setAttribute("aria-label","your name");
  d.innerHTML = `<form><p class="m">${why}</p><h3>what should we call you?</h3>
    <input name="n" maxlength="24" autocomplete="nickname" placeholder="a name or nickname" value="${st.name==="anonymous"?"":esc(st.name)}" aria-label="display name">
    <p class="m" id="nme"></p><button class="chip" type="submit">[ ok ]</button><button class="chip" type="button" id="nms">${mode==="room"?"skip for now":"cancel"}</button></form>`;
  document.body.append(d);
  const close = () => d.remove(), inp = $("input",d); inp.focus();
  $("#nms",d).onclick = () => { if(mode==="room") try{sessionStorage.setItem("tiu217skipname",1)}catch(e){}; close() };
  $("form",d).onsubmit = async ev => {
    ev.preventDefault();
    const n = clean(inp.value);
    if (!n || n.toLowerCase()==="anonymous") return $("#nme",d).textContent = "pick a name (not “anonymous”)";
    $("#nme",d).textContent = "saving…";
    try { await saveName(n) } catch(er) { return $("#nme",d).textContent = "couldn’t save: "+er.message }
    close(); changed();
  };
}
// the line at the top of the "add to this room" panel — so you always see WHO you are adding as
const badge = () => ready()
  ? `<p class="m" id="cb">adding as <b>${esc(st.name)}</b> <button class="chip" data-e="name">[ change name ]</button></p>`
  : `<p class="m" id="cb">offline · entries stay in this browser</p>`;

// ---- the name field on the door (right before [ enter ]) ------------------
function buildDoor(){
  const inner = $("#door>div"), en = $("#enter"); if (!inner || !en) return;
  const d = document.createElement("div"); d.id = "dn"; d.hidden = true;   // stays hidden until login worked
  d.innerHTML = `<label for="dni" id="dnl">who’s awake?</label><input id="dni" maxlength="24" autocomplete="nickname" placeholder="your name" aria-label="your name"><p id="dne" role="status"></p>`;
  inner.insertBefore(d,en);
  $("#dni").addEventListener("keydown", ev => { if (ev.key==="Enter") { ev.preventDefault(); en.click() } });
}
function showDoor(){
  const d = $("#dn"); if (!d) return;
  if (st.name!=="anonymous") { $("#dni").value = st.name; $("#dnl").textContent = "welcome back." }
  d.style.animationDelay = Math.max(0, 3.2 - performance.now()/1000) + "s";   // fades in just before [ enter ]
  d.hidden = false;
}
const nudge = msg => { $("#dne").textContent = msg; const i = $("#dni"); i.classList.remove("shake"); void i.offsetWidth; i.classList.add("shake"); i.focus(); };

// ---- start ---------------------------------------------------------------
async function init(){
  if (!window.sb) return console.warn("[cloud] window.sb missing — running locally.");
  try {
    let { data:{ session } } = await sb.auth.getSession();            // same visitor keeps the same UUID after a refresh
    if (!session) { const r = await sb.auth.signInAnonymously(); if (r.error) throw r.error; session = r.data.session; }
    st.user = session.user; console.log("Anonymous login success:", st.user.id);
    const p = await sb.from("profiles").select("display_name").eq("id",st.user.id).maybeSingle();
    st.name = (p.data && p.data.display_name) || "anonymous";
    await load(); st.ok = true; changed(); showDoor();
    let skipped = false; try { skipped = !!sessionStorage.getItem("tiu217skipname") } catch(e){}
    if (st.name==="anonymous" && !skipped && document.body.dataset.room!=="door") askName("room");  // landed inside a room, not at the door
  } catch(err) { console.warn("[cloud] offline mode:", err.message||err); }
}
buildDoor();
const pending = init();

// [ enter ] on the door: needs a name first. Capture phase = runs BEFORE app.js's own click handler, which we only allow once the name is OK.
document.addEventListener("click", async ev => {
  if (!ev.target.closest("#enter") || !window.sb || !$("#dn")) return;      // no supabase → the door works exactly as before
  ev.stopImmediatePropagation(); ev.preventDefault();
  await pending;                                                            // login only takes a moment
  const enter = () => { location.hash = "thoughts" };
  if (!ready()) return enter();                                             // supabase failed → just let them in
  const n = clean($("#dni").value);
  if (!n || n.toLowerCase()==="anonymous") return nudge("type your name to come in");
  if (n!==st.name) { try { await saveName(n); changed() } catch(er) { return nudge("couldn’t save your name: "+er.message) } }
  enter();
}, true);

const who = () => esc(st.name);                                      // safe-to-print name
window.Cloud = { who, ready, items, mine, current, add, remove, setCurrent, askName, badge, needName };
})();
