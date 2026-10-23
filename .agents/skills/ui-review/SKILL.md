---
name: ui-review
description: >-
  Review changed UI for concrete accessibility, visual consistency, and interaction
  defects before completion, or perform a requested UI review. Use alongside
  interface-design and inspect rendered behavior as well as source.
---

# UI review

A local adaptation of Rams' accessibility and visual review checklist. See
[provenance and adaptations](../../../docs/sources.md#adapted-ui-review-skill) and
[MIT license](LICENSE). This skill uses local code and browser inspection; no
hosted reviewer, account, or external source upload is required.

## Relationship to interface-design

Read [interface-design](../interface-design/SKILL.md) before assessing the UI.
It owns composition, hierarchy, density, and visual direction. This skill adds
an evidence-based defect review; it does not introduce a competing aesthetic.
Repository guidance owns tokens, variants, Carbon icons, and CLI-installed shadcn
components. Accessibility requirements remain requirements; do not dismiss a
confirmed access barrier as a density preference.

## Scope and evidence

Use the requested files or the current UI diff as the starting scope. Read the
relevant callers, underlying primitives, tokens, and state handling before making
claims. Follow related code far enough to establish behavior without expanding
into an unrelated redesign. A small change needs a proportionate review.

Render affected screens with realistic content in relevant themes and viewport
sizes. Exercise applicable keyboard, focus, loading, empty, error, and disabled
states. Use the repository's browser tests and Axe checks as supporting evidence.
Source inspection alone cannot establish computed contrast, target dimensions,
clipping, or visual quality. If rendering is unavailable, distinguish source
findings from unverified behavior and say what remains to check.

## Accessibility checks

- Check accessible names for icon actions and controls, label associations,
  descriptions, error associations, and required/invalid states. Inspect the
  computed accessible name: visible text or aria-labelledby can supply it;
  aria-label is not universally required. Decorative images may use empty alt;
  informative images need equivalent text.
- Check native button/link semantics, destinations, keyboard activation, and
  compound-widget behavior. Native elements and Base UI already provide keyboard
  handling; do not add duplicate key handlers merely because onClick is present.
  Trace render/asChild composition to the actual element.
- Check visible focus, logical tab order, focus restoration, and overlay focus
  management. outline-none is a defect only when no visible replacement exists.
  Roving focus may legitimately use tabIndex=-1. Report actual keyboard barriers.
- Check status and errors remain understandable without color alone. Measure
  contrast in the relevant theme and state: WCAG AA uses 4.5:1 for ordinary text,
  3:1 for qualifying large text, and applicable 3:1 non-text contrast requirements.
  Apply the criterion's exceptions; do not infer ratios from token names.
- Measure pointer targets and spacing. WCAG 2.2 AA target-size minimum is 24 by 24
  CSS pixels with specified exceptions, including spacing and inline targets.
  44 by 44 is an enhanced target, not a blanket AA requirement. Preserve compact
  controls while meeting the applicable requirement and practical touch needs.
- Check headings, landmarks, reading order, zoom/reflow, reduced motion, and
  required ARIA relationships. A source pattern or skipped heading alone is not
  sufficient to claim a specific WCAG failure; explain the user impact and context.

For uncertain criteria, consult the relevant W3C understanding document:
[text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html),
[non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html),
[target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
This focused review does not certify full WCAG conformance.

## Visual and interaction checks

Use interface-design's priorities to judge the assembled screen. Look for concrete
alignment, grouping, spacing, typography, wrapping, overflow, or layering defects;
missing hover/focus/active/disabled/pending/error states; inconsistent icon sizes,
borders, or surfaces; and light/dark inconsistencies. Distinguish intentional
hierarchy from accidental inconsistency. Keep important content prominent and
related controls compact; do not prescribe more padding, containers, or decoration
without a task-specific reason.

Fix through existing tokens, components, and supported variants. Recurring issues
belong in the owning shared component or variant, with dependent screens reviewed.
Preserve CLI provenance and primitive APIs; do not handwrite replacements or add
caller-specific styling that bypasses the shared system and lint contract.

## Findings and follow-through

For each actionable finding, give its location (file/line or route/component),
observed evidence and reproduction state, user impact, severity, and proposed fix.
Prioritize blockers and substantial accessibility/interaction failures over polish.
Distinguish confirmed defects from recommendations or questions needing evidence;
severity follows impact rather than a fixed severity assigned to a code pattern.
Do not manufacture findings or assign an uncalibrated numeric quality score.

During implementation, fix confirmed issues within the authorized scope, rerun
relevant checks, and inspect the changed result before completion. For a review-only
request, report findings without silently changing files. Summarize remaining
findings and unverified states concisely; no mandatory banner or promotional footer.
