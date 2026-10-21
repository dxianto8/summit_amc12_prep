# Summit — AMC 12 & AIME preparation

A responsive study website with 632 built-in problems: 32 original starter problems plus **300 sourced problems for each preparation track**.

Link: summitamc12prep.vercel.app

## Add, edit, or remove problems

1. Open **Manage problems** or click **Add problem** in the problem bank.
2. Choose AMC 12 or AIME, a topic, and difficulty. Enter a title and full question.
3. For AMC 12, enter five different answer choices and select the correct letter. For AIME, enter an integer answer from 000–999.
4. Add a worked solution. Hints and the key takeaway are optional.
5. Save. The problem joins practice sessions and the daily rotation.

Use **Edit** on your own problems to make changes. **Remove** hides any problem from the active bank. Open **Removed** and choose **Restore** to bring it back. Removal preserves its study history and notes. There is no permanent-delete control.

Your additions and removal choices save in this browser on this device. They are included in **Export my progress** JSON files, along with your attempts and notes. Exports are readable backups; this version does not import them. Browser data does not sync across devices, browsers, or site addresses. Clearing site data removes this browser's saved information.

## Use the study features

- **Today:** a daily question for each track, rotating through its active bank. Daily answers and scratchpad notes persist for that day. Dates follow your device's local time.
- **Problem bank:** search and filter by topic, difficulty, status, contest source, and answer format. Results are paginated, 25 per page. Build timed sets of up to five matching problems.
- **Learn & review:** four concept guides and 16 recall cards.
- **My notebook:** missed problems and problems whose solutions you open appear here. Classify the error, write a takeaway, and re-solve later.
- **Study plan:** a weekly checklist, practice-day goal, and 25-minute focus timer.
- **My progress:** independent solves, practice streak, focus time, and accuracy. Written responses are self-assessed and excluded from automatic answer accuracy.

## Sourced collection

No AoPS Wiki material was used. All 600 imported questions come directly from official CEMC / University of Waterloo contest and solution PDFs:

| Preparation track | Selection | Added |
|---|---|---:|
| AMC 12 | Fermat 2001–2025, questions 11–22 | 300 |
| AIME | Selected final Fermat questions; Euclid 1998–2025 questions 6–10; CSMC 2011–2025 (excluding 2020), Part A 4–6 and Part B 1–3 | 300 |

The AIME grouping contains **76 automatically checked Fermat questions and 224 written-response Euclid/CSMC problems**. Written questions include multipart work and proofs. These are preparation groupings, not official AMC/AIME exams or claims of exact difficulty equivalence. Difficulty and topic tags are approximate study labels. Use the format filter to focus on auto-checked questions.

For written-response practice, attempt the problem, read the included official solution, then mark **Solved before checking** or **Needs more practice**. That record is a self-assessment. Multiple-choice and integer problems use official Fermat answer keys. Some sourced contests permit calculators; follow each source contest's instructions.

Question statements, diagrams, and worked solutions are preserved as cropped, lossless images. In this repository, SVG containers embed the original lossless WebP bytes so the connected GitHub uploader can transfer them in batches. Each entry includes direct links to the original question and solution PDFs. The 2005 Fermat question 25 is excluded because its official solution includes a correction to the question; a replacement was selected.

## License and credits

CEMC materials are © University of Waterloo and licensed **CC BY-NC 4.0** for noncommercial reuse. Keep their attribution and source links, and do not charge for access. Read `CREDITS.md` and the site's **Sources & license** page.

- CEMC archive: https://cemc.uwaterloo.ca/resources/past-contests
- Copyright policy: https://cemc.uwaterloo.ca/copyright
- License: https://creativecommons.org/licenses/by-nc/4.0/

Summit is independent of CEMC, the University of Waterloo, and MAA.

## Files

`dist/index.html`, `styles.css`, and `app.js` provide the core interface. `problem-manager.js` handles your additions and reversible removal. `source-support.js` handles sourced questions and written-response review. `problems.js` contains the original starter bank; `sourced-problems.js` contains the 600 imported entries. `dist/assets/cemc/` contains their question and solution images.

The CSV source index, PDF URLs and SHA-256 hashes, and extraction-page audit are in `dist/data/`.

The repository includes the complete static website and Vercel deployment configuration.
