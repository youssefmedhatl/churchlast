# Seven Trumpets — Recording Integration Report

## Source package
`wetransfer_untitled-transfer_2026-08-27_0825.zip`

The source archive contains 31 WAV entries: 21 unique recordings and 10 exact duplicate `Copy` entries. Exact duplicates were not copied twice into the website.

## Newly integrated recordings

| Website file | Source | Placement |
|---|---|---|
| `girl-part01.m4a` | الشخصية الرئيسية (الجزء الاول) | Door 2 — main character question |
| `girl-part02.m4a` | الشخصية الرئيسية (الجزء التاني) | Door 3 — “في حد هنا؟” |
| `girl-part03.m4a` | الشخصية الرئيسية (الجزء الثالث) | Door 3 — “انا حد عدي…” |
| `girl-part04.m4a` | الشخصية الرئيسية (الجزء الرابع) | Door 3 — “مش الافسنتين…” |
| `girl-part05.m4a` | الشخصية الرئيسية (الجزء الخامس) | Door 3 — “لا تمام كدة…” |
| `girl-part06.m4a` | الشخصية الرئيسية (الجزء السادس) | Door 4 — question about the sky |
| `girl-part07.m4a` | الشخصية الرئيسية (الجزء السابع) | Door 4 — “ده تعذيب للبشر” |
| `girl-part08.m4a` | الشخصية الرئيسية (الجزء الثامن) | Door 5 — main character answer about the first woe |
| `girl-part09.m4a` | الشخصية الرئيسية (الجزء التاسع) | Door 7 — question after the sixth trumpet judgment |
| `girl-part10.m4a` | الشخصية الرئيسية (الجزء العاشر) | Door 6 — question about the bound angels |
| `girl-part11.m4a` | الشخصية الرئيسية (الجزء الحادي عشر) | Door 6 — question about the 200-million horsemen |
| `door5-angel-part2.m4a` | الملاك الخامس (الجزء التاني) | Door 5 — “دنتي مذاكرة…” |
| `door5-angel-part3.m4a` | الملاك الخامس (الجزء الثالث) | Door 5 — closing explanation |
| `door6-angel-part1.m4a` | الملاك السادس (الجزء الاول) | Door 6 — first angel reply |
| `door6-angel-part2-complete.wav` | الملاك السادس (الجزء التاني) | Door 6 — complete replacement recording supplied 2026-09-04 |
| `door6-angel-part3.m4a` | الملاك السادس (الجزء الثالث) | Door 6 — second angel reply, continuation |
| `door7-angel-part1.m4a` | الملاك السابع (الجزء الاول) | Door 7 — introduction |
| `door7-angel-part2-short.m4a` | الملاك السابع (الحزء التاني) | Door 7 — victory/kingdom announcement |
| `door7-scripture.m4a` | الملاك السابع (الجزء التاني) | Door 7 — recorded Scripture reading |
| `door7-angel-part3.m4a` | الملاك السابع (الجزء الثالث) | Door 7 — hymn / Ark explanation |
| `door7-angel-part4.m4a` | الملاك السابع (الجزء الرابع) | Door 7 — final interpretation |

## Existing recordings retained
The pre-existing opening, ending, Door 1, Door 2, Door 3 and Door 4 recordings were retained. They were not duplicated when the new source package did not contain the same recording.

## Duplicate source files
The `- Copy.wav` files in the transfer archive are byte-for-byte duplicates of their corresponding originals, so only one copy of each was integrated.

## Validation performed
- All 35 website `.m4a` files decode successfully with FFmpeg.
- All 8 website `.mp4` files decode successfully with FFmpeg.
- Every `/audio/doors/...` reference found in `src` resolves to an existing file.
- TypeScript/TSX syntax was checked across all 103 source files using the installed TypeScript parser: 0 syntax errors.
- The final website package is built from the previously repaired site package, including the supplied working Trumpet 1 and Trumpet 6 videos.

## Build limitation
A fresh Vite production build could not be executed in this isolated environment because the project dependencies are not present locally and the environment cannot reach the npm registry. The project itself was not rewritten around this limitation; the source-level and media-level checks above were completed.

## 2026-09-04 Update
- Door 6 closing dialogue now uses `door6-angel-part2-complete.wav` (complete replacement recording).
- Door 7 closing dialogue now uses `door7-angel-part2-new-2026-09-04.m4a` (replacement recording).
