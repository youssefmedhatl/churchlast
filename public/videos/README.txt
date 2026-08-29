Put your video files here, e.g.:
  trumpet1.mp4
  trumpet2.mp4
  ...

Then in src/data/trumpets/trumpetN.ts add:
  videoSrc: "/videos/trumpetN.mp4"

Tips:
- Keep clips short (10-20s looping) and compressed (H.264 mp4, under ~5-10MB each)
  so the offline app stays small and loads fast on the presentation phone.
- Videos autoplay muted and loop, so no audio track is needed on the video
  itself — use the separate narration/sound system for audio.

Opening screen intro video: add opening.mp4 here too.
It autoplays muted/looping behind the app title on first launch.
If it's missing, the opening falls back to the original particle animation.
