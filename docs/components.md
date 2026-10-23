# Components and reference examples

The eight entries below are included in v1. Use the actual shadcn components
and familiar APIs as the foundation. Add a convenience component only when it
encodes a useful repeated composition. Shared visual rules live in
[Foundations](foundations.md); verification lives in [Testing](testing.md).

## 1. Code block

Use shadcn Code Block and its supplied Shiki highlighting integration. Shiki
provides syntax tokenization and themes; Code Block provides the React interface
and controls. Preserve their separation so plain logs can render without
requiring syntax highlighting.

Provide a common composition accepting code, language, and optional filename.
Retain access to the underlying composable header, actions, content, lines, and
footer when applications need more control.

- Display optional title/filename and a copy action with success/failure feedback.
- Copy the original code, preserving blank lines and excluding decorative line
  numbers or diff markers.
- Support horizontal scrolling by default and wrapping where appropriate.
- Support optional line numbers and reasonable maximum-height behavior.
- Coordinate Shiki's light/dark themes with the resolved app appearance.
- Reuse the existing highlighter integration and load languages on demand.
- Render readable plain text when a language is absent or unsupported, and
  handle highlighting failure without hiding the underlying content.
- Use the shared icon conventions for controls.
- Work standalone and inside Typeset/Markdown with keyboard-accessible controls.

Highlighted-line and diff features supplied upstream may remain available.
The starter need not create a diff editor, IDE, terminal emulator, or streaming
chat application. Verify performance with representative long snippets; avoid
unnecessary all-language imports.

## 2. Markdown renderer

Provide a shared renderer with compact and reading Typeset treatments. The
recommended parser is react-markdown with remark-gfm; this choice is still open
in [Scope and decisions](spec.md).

Support headings, paragraphs, ordered/unordered and nested lists, blockquotes,
links, images, inline code, fenced code, tables, task lists, strikethrough, and
footnotes. Keep styling consistent with the application. Handle long URLs,
wide tables, large snippets, missing image content, and narrow layouts without
unintentionally widening the entire page.

Use the same Code Block for fenced code and standalone display. Avoid duplicate
pre/code wrappers and competing prose styles. Ensure inline code remains inline.
Links need sensible accessible names and clearly defined external-link behavior.

Raw HTML is disabled by default. Preserve the selected renderer's safe URL and
content handling. If an app deliberately expands HTML/plugin support, document
and test the resulting content boundary. MDX execution is not a default feature.

Streaming support, math, and diagrams are optional future integrations. Do not
install both an ordinary and a streaming Markdown renderer without a real need.

## 3. Data table

Use shadcn Table with TanStack Table, following the composable example approach.
Provide realistic rows, typed columns, useful metadata, and working controls.

- Sorting, text filtering, and pagination.
- Row selection with a defined scope across filtering and pagination.
- Column visibility controls and row actions.
- Appropriate alignment and formatting for comparable values.
- Distinct loading, empty collection, and no-filter-results states.
- Sensible long-cell handling and narrow-screen horizontal overflow.
- Clear keyboard focus and accessible labels for selection and action controls.

Document the example's selection and pagination semantics. Do not accidentally
present a client-side sample as a server-side data-loading solution. Keep data
provision separate from presentation so apps can later adapt the example.

Share small pieces such as column headers, toolbar controls, and pagination when
useful. Avoid a universal table API that hides all TanStack behavior behind a
large options object. Virtualization, server querying, and spreadsheet editing
are outside the initial requirement.

## 4. Full forms example

Provide a complete, realistic settings or record-editing form. React Hook Form
with Zod is the current recommendation; confirm it before implementation.

The example should include text input, multiline text, a boolean control,
selection, combobox, and date picker as appropriate to a coherent form. Group
fields with useful headings and descriptions. Use labels, help text, required
indicators where needed, and errors associated with the relevant controls.

Demonstrate:

- Initial/default values, edits, validation, and reset behavior.
- A clearly documented validation timing policy.
- Pending submission and prevention of unintended repeated submissions.
- Success feedback and explicit failure/retry behavior.
- Retention of useful user input after a submission failure.
- Form-level errors as well as field-level errors.
- Keyboard submission and focus behavior, including invalid fields.

Use deterministic local example behavior so success and server-style failure
can be exercised without a backend. Explain how an application replaces that
submission function with real data access.

Include a form-in-dialog composition and a destructive-action confirmation
example to demonstrate pending state, failure recovery, and focus restoration.
Do not treat a toast as the only source of important validation feedback.

## 5. Combobox

Provide working single-select and multi-select compositions using the chosen
shadcn primitive. Define the relationship between stable values and display
labels, controlled state, clearing, and selection callbacks.

Include search, empty results, disabled state, long labels, and keyboard
interaction. Multi-select should show selected items and allow their removal
without losing a usable input. Verify composition inside the form and dialog.

Provide an async-search recipe explaining loading/error states, preservation of
selected labels, and handling stale requests. A reusable remote data client,
large-dataset virtualizer, and automatic creation of new items are not required.

## 6. Date picker

Include a single-date field integrating the calendar/popover and form behavior.
Make formatting, clearing, validation, disabled dates, and keyboard interaction
explicit. If typed entry is supported, parse it deliberately and show invalid
input rather than silently guessing.

Document the value contract for calendar dates versus timestamps. A date-only
field must not change day merely because it is serialized or viewed in a
different time zone. Confirm the concrete representation and localization
defaults during implementation.

Date ranges are optional. Time selection, scheduling, recurring events, and a
general time-zone library are not initial requirements.

## 7. Sidebar

Use shadcn Sidebar as part of the sidebar shell. The shell, routing integration,
collapse behavior, and mobile interaction are defined in [Layouts](layouts.md).
Keep primitive components available for app-specific navigation compositions.

## 8. Command palette

Use shadcn Command with a dialog composition. Provide a visible trigger and
the conventional platform-appropriate command shortcut (Cmd/Ctrl+K). The
shortcut must not produce duplicate dialogs or interfere with normal typing
and input composition.

Support grouped navigation destinations and useful actions, search, an empty
state, arrow-key navigation, selection, Escape dismissal, and focus restoration.
Close after executing a selected command. Share destination definitions with
the sidebar/header navigation so titles, icons, and paths remain consistent.

Use real local routes and functional actions in the playground. Application-wide
remote search, command history, and a generalized command registry service are
not required.

## Supporting pieces

Use shadcn primitives for buttons, inputs, menus, dialogs, tooltips, tabs,
badges, feedback, and other dependencies of these examples. Small helpers may
include Icon, IconButton, copy feedback, an aligned details list, and consistent
content-state compositions. Each should earn its place through an actual
included example rather than speculative completeness.
