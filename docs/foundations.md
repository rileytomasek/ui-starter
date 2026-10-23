# UI foundations

## Design direction

The [interface-design skill](../.agents/skills/interface-design/SKILL.md) owns
the detailed visual priorities and reference-product analysis. Apply them to
the whole screen before polishing isolated components.

Build hierarchy with alignment, typography, proximity, and selective separation.
Keep repeated controls and metadata compact; allocate larger gaps between
meaningful groups. Use realistic content while composing. Avoid unnecessary
containers, decorative gradients, glow, excessive rounding, and ornamental
illustration. Cards and borders remain available when their informational role
justifies them.

Readable contrast, keyboard access, visible focus, coherent alignment, and
functional states are requirements across visual styles. Density must adapt to
input method and viewport without shrinking touch targets indiscriminately.

## Tailwind and shadcn tokens

Use one coherent token system. Initialize through shadcn/create and retain its
semantic CSS-variable conventions. Map the relevant variables through Tailwind
so components use shared meanings such as background, foreground, muted,
popover, primary, destructive, border, input, and focus ring.

Establish coordinated typography, spacing, control sizes, radii, surfaces,
shadows, and layering. The initial preset and exact values are open decisions.
Keep surfaces subtle while preserving distinguishable states. Shared controls
should use their documented sizes and variants rather than accumulating local
padding, height, color, and shape overrides.

Define a predictable layering convention for menus, tooltips, popovers, sheets,
dialogs, and fixed headers. Check their interaction rather than relying on large
arbitrary z-index values. Keep motion brief and purposeful and respect reduced
motion. Layout utilities remain available for ordinary screen composition.

## Light, dark, and system appearance

The theme selector offers Light, Dark, and System. System is the first-use
default. Resolve that mode from the OS preference, and listen for OS changes
while the app is open. Explicit Light or Dark overrides must ignore OS changes
until the user returns to System.

Persist the selected mode, including System, rather than persisting only the
currently resolved appearance. Apply the resolved theme before first paint to
avoid a flash of the wrong theme. Initialize the application provider consistently
with that first-paint decision. Set CSS color-scheme so native controls and
scrollbars follow the selected appearance where supported.

All owned UI surfaces, content states, Typeset content, and Shiki code display
must remain coherent in both themes. Use semantic foreground/background pairs;
do not assume inverting a background is enough. Theme controls are shared by
both shells and may be invoked through the command palette.

The basic shadcn Vite theme-provider example is a starting point. The live OS
listener and before-paint behavior must be implemented and verified explicitly.

## Typeset

Check in the generated Typeset CSS as owned source. Import it after Tailwind.
Provide two named presets:

- **Compact:** descriptions and prose inside information-rich app screens.
- **Reading:** longer documents with deliberate reading rhythm.

Both inherit the application's fonts and semantic colors. Customize body size,
line height, and spacing between blocks through preset variables. Keep page
width in the layout rather than hiding it in typography styles. The values must
be chosen through rendered review, not copied uncritically from documentation.

Support headings, paragraphs, lists, links, quotations, tables, inline code, and
code blocks. Route fences to the shared Code Block. Use its built-in Typeset
integration so code controls retain their styling and prose spacing stays
consistent. Review long tables and code on narrow screens. Do not also install
Tailwind Typography by default.

## Iconify and unplugin-icons

Compile explicitly imported icons from Iconify collections into React SVG
components using unplugin-icons and the Vite integration. Standard controls
must render with the application bundle, without runtime requests to Iconify.
Include only the icons used; avoid an all-icons runtime lookup registry.

Choose one coherent default UI icon family and align it with the shadcn/create
preset. Generated shadcn components must be inspected so their icon imports and
visual style stay consistent with this decision. Brand marks or specialized
icons can use another collection when justified and documented.

Provide a small Icon helper with shared size presets, stable dimensions,
currentColor inheritance for monochrome icons, and no unintended flex shrinking.
Decorative icons should be hidden from assistive technology. Informative icons
need an accessible text equivalent. An IconButton helper must require an
accessible label and use the shared button styling. A tooltip alone is not the
accessible-name contract.

Support repository-owned SVGs through the same import workflow. Preserve their
viewBox and proportions; apply fill/stroke conventions appropriately rather
than forcing monochrome treatment onto multicolor assets. Document how to find
an icon, install a collection, add a custom SVG, change size/color, and replace
the default family.

The following is an API sketch, not an implemented export or chosen icon family:

```tsx
import SearchIcon from "~icons/lucide/search"

<Icon as={SearchIcon} size="sm" />
<IconButton label="Search" icon={SearchIcon} />
```

Keep the helper small. Efficient imports and simple SVG output are the initial
performance strategy; blanket memoization or an additional rendering framework
is not required.

## Playground

Demonstrate the actual shared components, token choices, and page compositions
inside the app. Include long labels, missing values, loading/empty/error states,
keyboard focus, wide content, narrow viewports, and both themes. Examples should
show how to compose a useful screen, not just isolated controls.

Make examples easy to remove when starting an app while retaining the foundation.
Source links and customization notes should help developers and agents locate
the relevant component, preset, or layout. Do not place starter implementation
details in ordinary end-user product flows.
