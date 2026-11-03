-- supabase-storage.sql — makes the mp3s you add in the website audible to EVERYONE.
-- Run once: Supabase → SQL Editor → New query → paste all of this → Run.
-- (Also needed once: Authentication → Sign In / Providers → turn ON "Allow anonymous sign-ins".)

-- 1) the bucket. public = anyone can listen. 15 MB per file, audio only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('songs', 'songs', true, 15728640,
        array['audio/mpeg','audio/mp4','audio/x-m4a','audio/ogg','audio/wav','audio/x-wav','audio/wave'])
on conflict (id) do update
  set public = true,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- 2) everyone can see which songs have an mp3 (the site reads this list when it opens)
drop policy if exists "songs: list" on storage.objects;
create policy "songs: list" on storage.objects
  for select to public
  using (bucket_id = 'songs');

-- 3) upload: only signed-in visitors who already picked a display name,
--    and only files named like holocene.mp3 (letters, numbers, dashes)
drop policy if exists "songs: upload" on storage.objects;
create policy "songs: upload" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'songs'
    and name ~ '^[a-z0-9-]{1,80}\.(mp3|m4a|ogg|wav)$'
    and exists (select 1 from public.profiles p where p.id = (select auth.uid()))
  );

-- 4) delete: only the person who uploaded the file. (No update policy = nobody can overwrite someone else's mp3.)
drop policy if exists "songs: delete own" on storage.objects;
create policy "songs: delete own" on storage.objects
  for delete to authenticated
  using (bucket_id = 'songs' and owner_id = (select auth.uid())::text);
