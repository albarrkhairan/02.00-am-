// supabase.js
// Creates window.sb.
// Must load AFTER the Supabase CDN script and BEFORE cloud.js.

(() => {
  const SUPABASE_URL =
    "https://qgtojilkjgyxdhxmofro.supabase.co";

  const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_kbCCtlt9KvbcNhEbhuvYUQ_GShnFtZ3";

  if (!window.supabase) {
    console.error("[supabase] CDN is missing.");
    return;
  }

  if (!SUPABASE_PUBLISHABLE_KEY) {
    console.error("[supabase] Publishable key is missing.");
    return;
  }

  window.sb = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );

  console.log("[supabase] connected:", window.sb);
})();