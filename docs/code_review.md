# Code Review — Dania College Website (`daniaCollage`)

**Project:** React 19 + Vite 6 + react-router v7 + Tailwind CSS v4 + daisyUI v5
**Review date:** 2026-08-26
**Scope:** Full project (`src/`, config, build) — ~150 source files across `Components`, `Pages`, `Config`, `scroll`.

This report consolidates findings from a section-by-section review. Issues are grouped by severity and area. Each item lists the file(s), the problem, and the recommended fix. Line numbers are approximate (based on the reviewed snapshots).

---

## 1. Executive Summary

The project is a large, content-driven school website. It works for the happy path but has a number of **build-breaking latent bugs**, **live runtime crashes on incomplete data**, **a broken contact form**, **widespread broken image/video assets**, and **duplicated data-fetching logic in ~16 components**. There is also a recurring **stored-XSS pattern** via unsanitized `dangerouslySetInnerHTML`.

### Top priorities (do these first)
1. **Empty routed pages** — 8+ live routes render nothing (blank white pages).
2. **`.map()` without `?.` guard** on `schoolData?.field` — crashes/white-screens if API field is missing (~15 files).
3. **Broken contact form** — submits natively, reloads the SPA, sends nothing.
4. **Broken/missing assets** — Contact icons and several videos/photos point at files that do not exist.
5. **Unsanitized `dangerouslySetInnerHTML`** — stored-XSS risk across the app.
6. **Duplicated fetch/cache boilerplate** (~16 components) → over-fetching + a "stuck on skeleton" race.

---

## 2. Critical Issues (build / runtime breaking)

### C1. Latent build-breaker: `Stat.jsx` imports non-existent assets
- **File:** `src/Components/Home/Stat.jsx:2-5`
- Imports `image1..4` from `/Images/14.jpg`, `/Images/12.jpg`, etc. There is **no `public/Images` or `src/Images` directory** (verified). Vite will throw `Failed to resolve import "/Images/14.jpg"` if this file is ever imported. It is currently **commented out** in `Pages/Home/Home.jsx:20`, so it is a latent build-breaker.
- **Fix:** Delete `Stat.jsx`, or move assets into `public/Images/` / import them correctly.

### C2. Live routes that render completely empty pages
These routes are reachable but produce a blank page (stubs):
- `src/Pages/About/Administrator.jsx` (`/administrator`)
- `src/Pages/About/Doner.jsx` → renders `Founder` (empty `<div>`) (`/founder&donor`)
- `src/Pages/Academic/Academic.jsx` (`/academic`)
- `src/Pages/Academic/AttendanceSheet.jsx` (`/attendance-sheet`)
- `src/Pages/Academic/LeaveInfo.jsx` (`/information`)
- `src/Pages/Student/MobileBanking.jsx`, `src/Pages/Student/StudentList.jsx`
- `src/Pages/Facility/Facility.jsx`
- `src/Pages/Others/Others.jsx` (`/others`)
- `src/Pages/Result/Result.jsx`, `AcademicResult.jsx`, `Evaluation.jsx` (`/result`, `/academic-result`, `/evaluation`)
- `src/Pages/Others/Download.jsx` (stub, not even routed — dead file)

- **Fix:** Implement these pages or remove the routes from `src/main.jsx` so users don't hit dead ends. At minimum render a "Coming soon" state instead of an empty `<div>`.

### C3. `.map()` crash risk on optional API data
Pattern `schoolData?.FIELD.map(...)` still throws `TypeError: Cannot read properties of undefined (reading 'map')` if the field is missing. No error boundary exists → full white-screen.
- **Missing `?? []` guard (crashes):** `src/Components/Academic/Rules.jsx:74`
- **`?.field.map` without inner `?.` (~15 files):**
  - Admission: `Apply.jsx:76`, `Policy.jsx:75`, `Registration.jsx:75`, `Study.jsx:75`, `Test.jsx:74`
  - Student: `Activity.jsx:97`, `ExamSystem.jsx:75`, `Rule.jsx:73`, `Schedule.jsx:133`
  - Facility: `Activity.jsx:97`
  - About: `CommitteeDetails.jsx`, `StaffDetails.jsx`, `TeacherDetails.jsx` (similar patterns)
- **Fix:** Always use `schoolData?.FIELD?.map(...)` or `schoolData?.FIELD ?? []`. Consider adding a global React error boundary.

### C4. Broken contact form
- **File:** `src/Components/Contact/Contact.jsx:124-218`
- The form has `type="submit"` but **no `onSubmit` handler, no `preventDefault`, no endpoint**. Clicking "Send Message" triggers a native form submit → **full page reload (loses SPA state)** and sends nothing.
- **Fix:** Add `onSubmit={handleSubmit}` with `e.preventDefault()`, client-side validation, and a real submit target (API/fetch or mailto). Add `htmlFor`/`id` label associations and `required`/`aria-invalid`.

### C5. Broken/missing assets actually rendered
- **Contact icons:** `src/Components/Contact/Contact.jsx:53-55` use `/Images/11.jpg`, `/Images/9.jpg`, `/Images/10.jpg` — none exist → 3 broken images on the live Contact page.
- **Videos:** `src/Components/Others/VideoData.js:44,50,56,62` reference `/src/Videos/tizul.mp4`, `/src/Videos/1.mp4`, `/src/Videos/kire.mp4` — do not exist → 4 broken videos in the Home `VideoGallery`. (This data file *is* used.)
- **About images:** `EGValue.js`, `GValue.js`, `SValue.js`, `TValue.js` reference `/src/Images/*.jpg` (string literals Vite does not transform; 404 at runtime). `SValue.js`/`TValue.js` use `import` of missing files → would break the build if imported.
- **Fix:** Add real assets to `public/` (or import from `src/assets`), or remove the `<img>`/video entries. Never reference `/src/...` paths at runtime.

---

## 3. Functional Bugs

- **[Bug] `src/Components/Student/Schedule.jsx:141`** — `Date: <span>{(cal.publish_date)}</span>` renders the literal text `(cal.publish_date)`. Must be `{cal.publish_date}`.
- **[Bug] `src/Components/Student/Uniform.jsx:38-41`** — `useEffect(..., )` has a missing dependency array (trailing comma), so the auto-advancing carousel effect runs after **every render** and destroys/recreates its interval each tick. Also `schoolData` is fetched but unused, yet the whole carousel is gated behind that fetch's loading/error — if the (unnecessary) API call fails, the carousel disappears. **Fix:** `useEffect(..., [])` and remove the unused fetch.
- **[Bug] `src/Components/Home/NewsList.jsx:100`** — `className` contains stray Chinese characters `items中心` (should be `items-center`). The flex centering class is silently dropped.
- **[Bug] `src/Components/Home/NewsList.jsx` / `Notice.jsx`** — `offset` state is updated by Prev/Next but never applied to the DOM (marquee is pure CSS). Buttons are non-functional.
- **[Bug] `src/Components/Home/Photo.jsx` / `VideoGallery.jsx`** — Running CSS marquee animation overrides the manual `marginLeft` Prev/Next control → broken.
- **[Bug] `src/Components/Home/Achieve.jsx:95-98`** — `leftSlides` (`slice(0,5)`) and `rightItems` (`slice(1,5)`) overlap on items 1-4 → duplicate cards rendered.
- **[Bug] Prev/Next "undefined" text** — `Header2.jsx:117,123`, `Footer.jsx:116,121`, `Teacher.jsx:97` render literal `undefined` / `+88undefined` when API fields are missing. **Fix:** guard with `?.` and fallbacks.
- **[Bug] `src/Components/About/ExCommitteeDetails.jsx:92`** — "Back" link points to `/committee` (governing body) on the *ex*-committee page; should be `/ex-committee`. Heading also mislabels it as "Our Governing Body Details".
- **[Bug] `src/Components/Home/Hero1.jsx:178`** — `Link to={`/${slug}`}` derived from a role (e.g. "Vice Principal" → `/vice-principal`) → 404; no such route.
- **[Bug] `src/Components/Home/News.jsx:197`** — Empty state wrongly says "No events available." (this is the News section).
- **[Bug] `src/Components/Home/Ab.jsx:109`** — Uses `<a href="/about">` instead of `<Link>`, causing a full reload and breaking SPA navigation.
- **[Bug] `src/Components/Others/Schedule.jsx:95` / `Events.jsx:95`** — Invalid Tailwind class `xl:px-00` (no such value) → ignored.
- **[Bug] `src/Components/Others/Photo*` / `Gallery`** — `key={index}` (and `key={g.id}` without fallback) cause key warnings/reconciliation issues; `EventGallery`/`EventsDetails` set `document.body.style.overflow="hidden"` but don't reset it on unmount → page can become unscrollable after navigating away from an open lightbox.
- **[Bug] `src/Components/Student/Schedule.jsx:72`** — `URL.revokeObjectURL(blobUrl)` called immediately after `a.click()`, which can revoke before the download starts. Revoke on a timeout or `a.onload`.
- **[Bug] Random React keys** — `key={... ?? Math.random()}` in `Facility/BiologyLab.jsx:95`, `ChemistrayLab.jsx:96`, `IctLab.jsx:94`, `Library.jsx:94`, `PhysicsLab.jsx:92`, `PlayGround.jsx:97`. Unstable keys remount nodes on re-render. Use a stable id or index.

---

## 4. Security

- **[Security] Stored-XSS via unsanitized `dangerouslySetInnerHTML`** — Used widely with API/CMS HTML, e.g. `Header2.jsx:103`, `Footer.jsx:127`, `Hero1.jsx:173`, `About.jsx:78`, `Chairman.jsx:94`, `Principal.jsx:94`, `MissionVision.jsx:92`, `History.jsx:93`, `Achievements.jsx:104`, `CommitteeDetails.jsx`, `StaffDetails.jsx`, `TeacherDetails.jsx`, `Notice.jsx:127`, `NewsList.jsx:139`, `NewsDetails.jsx:121`, `NoticeDetails.jsx:142`, `Events.jsx:123`, `EventsDetails.jsx:185`, and the Admission/Student `String(it.title/description)` injections. **Fix:** sanitize with DOMPurify (or render as text when HTML isn't required). Several components even inject **plain-text** fields via `dangerouslySetInnerHTML` — just use `{value}`.
- **[Security] `.env` is committed to git** (`git ls-files .env`). VITE_ vars are client-exposed (not secret), but committing `.env` is poor practice and there's no `.env.example`. **Fix:** add `.env.example` documenting `VITE_API_BASE_URL`, and stop tracking the real `.env` (or confirm it's meant to be public).
- **[Security] `Api.js` has no fallback** — `Api_Base_Url = import.meta.env.VITE_API_BASE_URL` is `undefined` if the var is absent (e.g. fresh deploy without `.env`), making every fetch target `undefined/` and every page error. **Fix:** provide a default or fail-fast with a clear message. (Note: `.env` *is* present now, so this isn't currently broken, but it's fragile.)

---

## 5. Performance

- **[Perf] Massive over-fetching + non-shared cache** — ~16 components each copy-paste a module-level `cachedSchoolData`/`schoolDataPromise` fetcher and call `fetch(`${Api_Base_Url}/`)` (the *entire* site config) on mount. Because the cache is module-scoped per file, navigating between components triggers a fresh full fetch; on the Home route the same payload is fetched ~9-10 times concurrently. **Fix:** extract one shared `useSchoolData()` hook (React context or a single module cache) and fetch once.
- **[Perf] Stuck-on-skeleton race** — The `useState(cachedSchoolData)` + effect-early-return pattern can leave a page permanently on the loading skeleton if the shared promise resolves before the effect runs. **Fix:** read cache inside the effect / use a subscription-based hook.
- **[Perf] YouTube iframes eagerly mounted** — `Home/VideoGallery.jsx` mounts all iframes at once (and duplicates in the loop). Use thumbnail + click-to-play, or lazy-mount visible iframes.
- **[Perf] No `loading="lazy"` on remote images** — banner/photo/teacher images cause layout shift (CLS) and waste bandwidth. Add `loading="lazy"` + explicit dimensions.
- **[Perf] `Navbar.jsx:42`** — `window.matchMedia(...)` re-evaluated on every render; create once (in an effect / memoized).
- **[Perf] `About1.jsx:111`** — `CountUp` `formatter` recreated each render → animation restarts on parent re-render. Memoize with `useCallback`.

---

## 6. Accessibility

- **[A11y] `Navbar.jsx`** — Desktop dropdowns open only on `onMouseEnter`; child links are not keyboard-reachable. Mobile drawer (`fixed inset-0`) lacks `role="dialog"`/`aria-modal`, Escape-to-close, focus trap, and body scroll-lock.
- **[A11y] `App.jsx`** — No semantic landmarks (`<header>`/`<main>`/`<footer>`) and no skip link; wrap `<Outlet>` in `<main id="content">`.
- **[A11y] Lab images** — all Facility labs use the same `alt="Students working in the ICT lab"` regardless of content (`BiologyLab.jsx:108`, `ChemistrayLab.jsx:112`, `Library.jsx:99`, `PhysicsLab.jsx:99`, `PlayGround.jsx:111`). Use descriptive, content-specific alt.
- **[A11y] `Contact.jsx` form** — labels not associated with inputs (`htmlFor`/`id`); add `required`/`aria-invalid` and validation feedback.
- **[A11y] Modals** (`VideoGallery`, `Gallery`, `EventGallery`) — no Escape-to-close, no focus trap, close buttons lack `aria-label`.
- **[A11y] `prefers-reduced-motion`** — disc/scale animations in `QuickAccess`/`Stat` and marquees have no reduced-motion guard.
- **[A11y] Image `onError` fallback** — API `<img>` (cover image / media / file) have no fallback; missing data → broken-image icons. Add `onError`.

---

## 7. Code Quality, Dead Code & Duplication

- **Dead Header variants:** `Header.jsx` renders only `Header2`; `Header0`, `Header1`, `Header3` are unused (dead). Consolidate to one.
- **Dead files / imports:** `Stat.jsx` (commented out, broken imports), `Home/Video.jsx` (empty 0-byte), `Components/Home/NewsList.jsx` (nothing imports it; the used one is `Components/Others/NewsList.jsx`), `Foot.jsx` (imported in `Footer.jsx` but never rendered), `Pages/Others/Download.jsx`, `About/GValue.js`, `Academic/SValue.js`, `Academic/TValue.js` (build hazard).
- **Dead data files:** `Components/Others/News.js`, `Notices.js`, `EventData.js`, `Photos.js` are unused (all imports resolve to `Components/Home/*`). They also contain **duplicated and malformed data** (e.g. `News.js` entries `id:3`==`id:1`, `id:4`==`id:2`; `Notices.js` `id:4`==`id:2`; `Photos.js` has no `id` and duplicate entries; `VideoData.js` duplicates "School Event 4"). Delete or wire them up.
- **Unused imports / console logs:** `Footer.jsx` (`GiBookAura`, `FaGitkraken`, `MdOutlineAddIcCall`), `Navbar.jsx:223` (`console.log`), `StudentStatistics.jsx:1` (named `useEffect/useRef/useState` unused; code uses `React.*`), `ExamSystem.jsx:24` (`console.log`).
- **`import React` is unused** in nearly every file (React 19 automatic JSX runtime) — harmless but noisy; safe to remove.
- **Duplicated fetch/date boilerplate** (`getOrdinal`, `getMonthShort`, fetch+cache) copy-pasted across ~16 components. Extract shared utilities/hook.
- **Inconsistent router imports** — some files import `Link`/`useParams` from `react-router-dom`, others from `react-router`. Both work in v7, but standardize on `react-router`.
- **Misspelled filenames (maintainability):** `Academic/Calender.jsx` → `Calendar`, `Pages/About/Achivements.jsx` → `Achievements`, `Pages/About/Principle.jsx` → `Principal`, `Facility/ChemistrayLab.jsx` → `ChemistryLab`.
- **`tailwind.config.js` is dead weight in Tailwind v4** — config is CSS-first via `index.css` (`@import "tailwindcss"; @plugin "daisyui";`). daisyUI *is* correctly configured there, but any theme customization written in `tailwind.config.js` would silently do nothing. Delete the file or move theming into `@plugin "daisyui" { themes: [...] }` in `index.css`.
- **Invalid Tailwind classes (no-op):** `xl:px-30`, `lg:px-30`, `xl:px-40`, `xl:px-00`, `hover:scale-115` are not in the default scale → silently ignored. Use `xl:px-32`/`xl:px-[7.5rem]`/`hover:scale-110`.
- **Hardcoded stats/content:** `QuickAccess`/`Stat` fake stats (1400/40/10/30), `StudentStatistics.jsx:52-59`, `Uniform.jsx` hardcoded Unsplash slides — should come from the API/CMS if intended.
- **Empty-state copy mismatches:** `Schedule.jsx:106` says "No tuition fee data available." on a "School Schedule" page; `NoticeDetails.jsx:111` says "News not found!" / links to `/news` on a Notice route.
- **Mislabeled content:** `Home/Ab.jsx:99` heading "About Dania University Collage" doesn't match the school name.

---

## 8. Recommended Action Plan

**Phase 1 — Stop the bleeding (critical):**
1. Remove/implement the empty routed pages (C2).
2. Add `?.` / `?? []` guards to every `schoolData?.field.map` (C3).
3. Fix the contact form: `onSubmit` + `preventDefault` + validation + endpoint (C4).
4. Fix/remove broken assets: Contact icons, `VideoData.js` MP4s, `Stat.jsx` imports (C1, C5).
5. Add a global error boundary so a single bad field never white-screens the app.

**Phase 2 — Security & data:**
6. Sanitize all `dangerouslySetInnerHTML` (DOMPurify) or render as text.
7. Add `.env.example`; stop committing `.env` (or document intent).
8. Give `Api.js` a safe default / fail-fast.

**Phase 3 — Architecture & quality:**
9. Extract a single `useSchoolData()` hook (kills ~16× duplicated fetch logic + over-fetching + skeleton race).
10. Clean up dead code (Headers, `Stat`, `Video.jsx`, unused data files, `Foot.jsx`, `Download.jsx`).
11. Fix non-functional Prev/Next marquee controls; fix `Schedule.jsx:141`, `Uniform.jsx` effect, `NewsList` stray chars.
12. Accessibility pass (landmarks, skip link, keyboard nav, alt text, modal a11y).
13. Remove dead `tailwind.config.js`, fix invalid Tailwind classes, standardize router imports and filenames.

---

## 9. Verified Facts (to avoid false alarms)
- `VITE_API_BASE_URL` **is** defined in `.env` (`https://test.amadershikkha.com/api/siteconfigs/2`), so `Api_Base_Url` resolves — not `undefined` currently.
- daisyUI **is** correctly configured for Tailwind v4 via `@plugin "daisyui"` in `src/index.css`.
- `react-slick@0.31.0` is React 19 compatible (no `findDOMNode` crash).
- All `Pages/*` → `Components/*` import paths resolve (no "imports a component that doesn't exist" build failure), with the misspelled-but-working `ChemistrayLab.jsx` exception.
- There is **no** `public/Images`, `src/Images`, or `src/Videos` directory — confirming the broken-asset findings.
