# Voiceover Fix Report

## User-reported issues addressed

### Trumpet 5
- First angel line has no supplied recording in the complete transfer archive, so it remains a deliberate browser TTS/AI-fallback line.
- Hardened browser TTS startup so the fallback waits for voices to become available, resumes the speech engine, and chunks long passages for Chromium reliability.
- `door5-angel-part2.m4a` remains on the short "لازم نقرأ كويس الاول" line.
- `door5-angel-part3.m4a` is 9.668s and is now assigned to the short final farewell line, NOT the entire long closing monologue. This prevents the previous timing/content mismatch.
- Door 5 closing wording is split into natural script beats so the recorded final sentence matches the displayed text exactly.

### Trumpet 6
- `girl-part09.m4a` -> main-character question.
- `door6-angel-part1.m4a` -> sixth angel's first speech.
- `girl-part10.m4a` -> main-character response.
- `door6-angel-part2.m4a` + `door6-angel-part3.m4a` -> one continuous sixth-angel speech before the Scripture panel.
- The opening narrator stage-direction line has no supplied narrator recording in the transfer; it intentionally uses the TTS/AI fallback.
- The long post-Scripture angel closing also has no supplied recording and intentionally uses TTS/AI fallback instead of incorrectly attaching another recording.
- The old dark fallback marker is now an explicit small `AI` badge so it is not visually mistaken for a broken voiceover indicator.

### Trumpet 7
- `door7-angel-part1.m4a` -> opening speech.
- `door7-angel-part2.m4a` -> "ده اعلان النصرة..." speech.
- `door7-angel-part3.m4a` -> exact third angel dialogue from the approved script paragraph beginning "قدموا التسبحة الجميلة دي لله...".
- `door7-angel-part4.m4a` -> final short explanation.
- The alternate 10.68s part-2 take is preserved as an alternate file but is not played automatically, preventing two takes from being treated as consecutive dialogue.

## Validation performed
- 33 unique audio references in `src/data/script.ts`; 0 missing referenced files.
- All 36 `.m4a` assets in `public/audio/doors/` decode successfully.
- All 8 `.mp4` assets in `public/videos/` decode successfully.
- Targeted TypeScript/TSX syntax parse: 0 errors for the modified voiceover/script/button files.
- Archive integrity: `unzip -t` passed.
