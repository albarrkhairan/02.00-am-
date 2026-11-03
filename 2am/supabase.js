// supabase.js — creates window.sb (the Supabase client). Must load AFTER the supabase CDN script and BEFORE cloud.js.
// The publishable key is SAFE to keep here (it is meant for browsers). NEVER put the service_role / secret key here.
(()=>{
  const SUPABASE_URL = "https://qgtojilkjgyxdhxmofro.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "PASTE_YOUR_PUBLISHABLE_KEY_HERE"; // Supabase → Project Settings → API Keys → "Publishable key" (sb_publishable_...)

  if (!window.supabase || SUPABASE_PUBLISHABLE_KEY.startsWith("PASTE")) {
    console.warn("[supabase] not connected (missing CDN or key). The site keeps working locally, without shared entries.");
    return;
  }
  window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
})();
