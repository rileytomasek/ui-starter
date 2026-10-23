---
name: interface-design
description: >-
  Design, implement, refine, and review modern, information-rich interfaces with
  clear hierarchy, deliberate density, restrained styling, and precise execution.
  Use when creating or modifying websites, apps, screens, layouts, or UI components
  including small visual changes, redesigns, and interface reviews.
  Covers composition, interface writing, design tokens, shadcn styles, interaction
  states, responsiveness, and rendered visual refinement.
---

# Interface design

## Purpose and approach

Design interfaces with sound design judgment, deliberate composition, and a restrained visual style.

Understand the task and existing interface, compose with realistic content, implement through the shared system, then render and refine. Scale the effort to the task; small changes need contextual review without expanding into an unnecessary redesign.

## Design priorities

Create modern, composed, information-rich interfaces with clear hierarchy and precise execution. Let useful content dominate and keep supporting controls quiet. Vary density deliberately: use compact arrangements within groups and purposeful whitespace between them. Build structure through alignment, typography, and spacing, with restrained surfaces and coherent iconography. Achieve polish through proportions, consistency, and thoughtful details. Adapt these principles to the product, task, and device.

| Focus on | Avoid |
| --- | --- |
| Grouping through proximity, alignment, typography, and selective separation | A card, border, or background block around every section |
| Compact spacing within groups and larger gaps between meaningful groups | Generous padding applied uniformly |
| Allocating space according to content importance and task frequency | Oversized headers, navigation, and secondary controls |
| Clear differences between primary content, supporting information, and incidental metadata | Giving every element similar visual weight |
| High useful information density with quiet, compact interface controls | Crowded controls surrounding sparse content |
| Subtle surface layering with readable content and recognizable interactive states | Strong contrast between every background region |
| Restrained surfaces, purposeful accents, and carefully judged proportions | Decorative gradients, glow, excessive rounding, and gratuitous color |
| A coherent, high-quality icon family and relevant product imagery | Goofy icons, mixed icon styles, and decorative hand drawings |
| Shared alignment, consistent scales, and carefully coordinated details | One-off spacing, sizing, and alignment decisions |
| Whole-screen composition, realistic content, and rendered visual review | Polishing components before resolving the layout |

### How to apply these priorities

1. **Strong aesthetic defaults:** Avoid decorative gradients, glow, and corny illustrations unless explicitly requested by the user.
2. **Contextual heuristics:** Cards, borders, whitespace, rounding, and density require judgment. “Avoid unnecessary containers” is useful; “never use cards” would cause problems.
3. **Quality requirements:** Clear hierarchy, readable content, accessible interactions, coherent alignment, and functional states should hold across styles.

See Product references below for concrete examples of composition, density, visual treatment, and execution.

## Composition and hierarchy

Ground design decisions in the product’s purpose, audience, content, and existing conventions. Check the proposed direction against the brief before implementation.

Identify the primary task, rank content and actions by importance, and choose a layout that supports scanning, comparison, and interaction. Allocate space deliberately: keep repeated elements compact and separate meaningful groups. Evaluate layouts with realistic content. When making local changes, consider their effects on surrounding elements, shared patterns, responsive behavior, and consistency across the product.

Give structural elements a clear informational role. Use numbering for sequences, headings for meaningful groups, and dividers for useful boundaries. Avoid decorative labels and repeated framing that adds no meaning.

## Content and interface writing

Use plain, specific language grounded in the user’s task. Label actions by what they do and keep terminology consistent across controls, screens, and feedback. Remove filler, promotional language, and labels that add no information. Explain errors and recovery steps clearly; make empty states explain what belongs there and how to proceed.

## Visual system and implementation

Use the project’s design tokens and shadcn component styles for typography, spacing, color, radii, and controls. Avoid custom values, arbitrary Tailwind values, and one-off utility combinations that override the shared system. Extend reusable tokens or component variants when existing options are insufficient. Use one coherent, high-quality icon family. Preserve readable contrast and usable interaction targets while keeping surfaces subtle and layouts compact.

Establish consistent layering so menus, popovers, tooltips, and dialogs appear above the appropriate content without clipping or unintended overlap. Use semantic tokens to preserve hierarchy, readable contrast, and distinct interaction states across supported themes.

## Interaction, states, and responsiveness

Make navigation, available actions, and feedback clear. Support keyboard access and visible focus. Design relevant loading, empty, error, and success states. Adapt layouts and interaction targets to viewport size and input method. Verify behavior with long content, missing values, and large datasets.

Define clear hover, focus, active, disabled, and loading states for interactive controls, plus relevant validation states for form fields. Keep state changes consistent and prevent unintended repeated actions while work is pending.

Use motion to explain changes, preserve context, and acknowledge actions. Keep transitions brief and purposeful, avoid gratuitous entrance and hover effects, and respect reduced-motion preferences.

## Visual review and refinement

Inspect the rendered interface at relevant viewport sizes. Review overall hierarchy, useful content density, grouping, and space allocation before polishing details. Verify horizontal and vertical alignment across rows, columns, labels, icons, controls, and section boundaries. Fix the most consequential issues first, then inspect the revised result.

Complete the work when the requested behavior functions, relevant states and viewport sizes are addressed, and the rendered result has been reviewed and refined. If rendering or interaction testing is unavailable, state what remains unverified.

## Product references

Use these references to evaluate specific design decisions. Assess composition, hierarchy, density, and execution independently; a product's overall quality does not make every choice worth copying.

| Product and scope | Overall assessment | Strengths to carry forward | Weaknesses and lessons |
| --- | --- | --- | --- |
| **Linear — product interface** | Strong, disciplined composition. High information density and a calm appearance coexist because spacing and hierarchy are carefully controlled. | Compact rows and metadata, purposeful gaps between groups, precise alignment, subtle surfaces, and restrained controls. | Its quality depends on the composition. Copying its colors, typography, or components alone will not reproduce it; preserve the task-appropriate hierarchy and space allocation. |
| **GitHub — product interface** | Useful and information-rich, but visually heavy and unevenly composed. | Scannable file and issue lists, aligned attributes, recognizable icons, and direct access to substantive content. | Boxed conversations, nested borders, crowded controls, and inconsistent padding fragment the page. Secondary actions compete with the work. Keep the density while simplifying enclosure and establishing clearer emphasis. |
| **Stripe — Dashboard and marketing website** | Strong execution and information design; the marketing site's decorative gradients weaken its visual restraint. | Clear financial hierarchy, comparable numbers, carefully composed forms, coordinated details, and substantive product diagrams and visuals. | Marketing gradients consume attention without clarifying the product. Carry forward the composition and craft; omit the ornamental color effects. |
| **Notion — product interface and illustrative style** | A quiet foundation undermined by wasteful page framing, loose composition, and corny styling. | Neutral surfaces, restrained text, and content that can sit directly on the page. | Oversized titles, covers, icons, and top margins delay useful content. Narrow columns and sparse defaults waste desktop space. Mixed emoji and icon styles, hand-drawn illustrations, and an incohesive palette cheapen the presentation. Abundant empty space does not substitute for deliberate grouping. |
| **Slack — desktop product interface and visual style** | Excessive interface overhead and a loud, goofy visual language undermine the conversation workspace. | Continuous conversation, compact grouping of consecutive messages from one sender, and contextual thread views. | Navigation layers, headers, toolbars, and the composer consume too much space. Strong background contrasts give the surrounding interface excessive prominence. Playful colors, icons, illustrations, badges, and prompts create a cheap-looking, distracting presentation. Reduce the surrounding interface's footprint and visual weight; keep conversation central. |
