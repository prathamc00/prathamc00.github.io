# Portfolio design directions

## Approach 1 — Terminal Editorial
**Very Brief Intro:** A dark research-notebook interface that treats AI work as a field log: crisp typography, thin rules, lime signal accents, and a deliberate imbalance between text and evidence. It should feel precise, curious, and quietly confident.

**Probability:** 0.07

## Approach 2 — Signal / Soft Brutalism
**Very Brief Intro:** A high-contrast portfolio built from oversized type, flat blocks, hard edges, and visible metadata. The system would turn technical projects into bold visual artifacts with a more confrontational, poster-like energy.

**Probability:** 0.04

## Approach 3 — Quiet Observatory
**Very Brief Intro:** A spacious, slate-toned portfolio with pale type, orbital diagrams, and slower moments of reveal. The mood is reflective and cinematic, presenting machine learning as a discipline of observation.

**Probability:** 0.02

## Chosen Approach — Terminal Editorial

### Design Movement
Contemporary digital editorial with terminal-interface cues and Swiss-influenced information design.

### Core Principles
1. **Signal over spectacle:** Use acid green only where it communicates state, action, or emphasis; keep the rest in ink black, graphite, and slate.
2. **Evidence-led composition:** Every major section pairs a statement with a proof point, metric, tag, or artifact.
3. **Asymmetric rhythm:** Prefer split compositions, offset metadata rails, and varied card proportions over a centered marketing grid.
4. **Calm technicality:** Make the interface feel authored by an engineer who cares about craft—precise, quiet, and legible.

### Color Philosophy
Near-black is the working surface, not a dramatic backdrop. Slate gray separates layers with low visual noise, while acid lime functions as a live signal: it marks links, status, active states, and the few phrases worth remembering. A muted warm white keeps long-form reading human rather than overly clinical.

### Layout Paradigm
Use a wide editorial canvas with a persistent left-side section index on desktop and stacked anchor labels on mobile. Sections should alternate between full-width statements and offset evidence panels. Projects are a two-column archive with one lead piece spanning wider than the supporting work.

### Signature Elements
- A mono “field note” eyebrow system: `01 / SELECTED WORK`, `02 / TOOLKIT`, etc.
- Thin lime cursor bars and little status pips that imply an active system without becoming decorative noise.
- A recurring technical annotation style: short uppercase labels, ruled separators, and compact metric blocks.

### Interaction Philosophy
Interactions should answer the user’s question quickly. Hover states reveal a little more metadata, links feel like direct exits to a repo or demo, and buttons use small translations rather than large scale effects. Focus states are always visible in lime.

### Animation
Animate only opacity and transform, with a 180–260ms ease-out. Use an initial staggered reveal for hero copy and project rows; use small horizontal slides for arrows and status pips on hover. Respect reduced motion and keep high-frequency interactions nearly instant.

### Typography System
- **Display:** Space Grotesk, 600–700, for the main headline and section titles. It gives the portfolio a technical silhouette without feeling generic.
- **Editorial:** DM Serif Display, regular, for the occasional italic/serif phrase that adds human character to the AI narrative.
- **Utility:** IBM Plex Mono, 400–600, for labels, tags, metrics, code-like values, and navigation metadata.

Hierarchy: mono eyebrows at 11px with tracking, body copy at 16–18px with generous leading, section headlines at clamp(2.5rem, 6vw, 5.8rem), and the hero name at clamp(4.5rem, 12vw, 11rem).

### Brand Essence
An AI developer building trustworthy systems at the edge of intelligence, for teams who value useful rigor over hype. **Precise. Inventive. Grounded.**

### Brand Voice
Headlines are plain-spoken, specific, and slightly observant. CTAs sound like the next logical action, never a sales pitch. Microcopy behaves like useful system output.

- Example headline: “I build AI systems that earn their place in the loop.”
- Example CTA: “Open the signal →”

### Wordmark & Logo
A custom lowercase wordmark for `prathmesh.` with a terminal-style cursor dot after the name. The standalone mark is a compact geometric `p` assembled from a vertical stem and offset lime square, suggesting both a prompt cursor and a plotted data point. Never render the wordmark as a default logo font.

### Signature Brand Color
**Signal Lime — #B7FF3C.** It is bright enough to read as an active indicator against ink black, but more vegetal and less synthetic than a standard neon green.

## Style Decisions

- The desktop experience uses a persistent field-log index as a navigational rail, not only as decorative metadata.
- Project imagery is treated as evidence from the workbench: traces, validation outputs, and inspected artifacts rather than generic AI spectacle.
- Signal Lime `#B7FF3C` is reserved for active state, primary actions, section markers, and key proof values; secondary skill measurement uses slate until interaction.
- The brand mark combines the geometric `p` asset with a live cursor bar after the wordmark so the identity reads as a prompt and a plotted signal.
- The fixed desktop field-log rail is the primary structural motif; top navigation is an abbreviated access layer rather than the principal navigation system.
- Every major section carries a compact, verified artifact—date, role range, skills tag cluster, repository count, location, or system status—so content reads as documented work rather than generic portfolio copy.
- Long-form writing inherits the same field-log system: a persistent desktop note rail, explicit note ID, document format and status metadata, plus a numbered annotation marker preceding each major section.
- On desktop, the field-log rail is treated as the page’s operating system: it carries route context and live document/system status, shares a wider dark panel with a strong boundary rule, and controls the left visual edge of every principal route.
