# Component recipes

Shared helpers compose CLI-installed shadcn components; use the primitives directly
when their full API fits better. [UI conventions](ui.md) owns styling and installation.

## Code and Markdown

```tsx
import { CodeDisplay } from "@/components/code-display"
import { Markdown } from "@/components/markdown"

<CodeDisplay code={source} language="tsx" filename="example.tsx" lineNumbers />
<Markdown source={markdown} variant="reading" />
```

CodeDisplay wraps the installed CodeBlock and Shiki hook. Copy receives the original
string, including blank lines and trailing newlines. Clipboard errors remain visible.
Long code scrolls; opt into `wrap`. Unsupported languages and failed grammar loads
remain readable plain text. Add language loaders/aliases in src/lib/highlighter.tsx;
load only needed grammars. GitHub high-contrast themes follow the shared theme class.

Markdown supports GFM tables, tasks, links, lists, and fenced code through CodeDisplay.
Raw HTML is skipped and react-markdown's default URL transform stays enabled. Do not
add raw-HTML processing or bypass URL filtering for untrusted input. External HTTP
links open with noopener/noreferrer; images load lazily and display alt text on failure.
Wide tables scroll within prose. PageContent controls reading width; Typeset owns
prose rhythm. Extend the component mapping for application-specific links or images.

## Compact grouped controls

Use the CLI-installed InputGroup, ToggleGroup, ButtonGroup, and Tabs to keep related
controls together. Prefer their supported sizes, variants, and spacing props over
caller-specific restyling. Retain visible labels and usable focus/disabled states.

- InputGroup combines an input with InputGroupAddon, InputGroupButton, or
  InputGroupText. Keep the input's accessible name; label icon-only actions.
  Clearing a search should return focus to the input.
- ToggleGroup selects values; Base UI uses an array for `value` even in single-select
  mode. Use `multiple` only for independent choices. With `spacing={0}` and
  `variant="outline"`, related choices form a compact segmented group. If exactly
  one choice is required, ignore empty value changes and provide an explicit All
  choice for filters. Give the group an accessible name and preserve arrow-key navigation.
- ButtonGroup groups related actions, such as Previous/Next. It does not implement
  selection or change button semantics. Label the group; disable each unavailable action.
- Tabs switches local content panels using TabsList, TabsTrigger, and TabsContent.
  Name the tab list, use stable values, and preserve keyboard navigation. Use route
  links for navigation that requires independent URLs; do not turn links into tabs.

## Forms and inputs

src/examples/project-form.tsx is a complete RHF + Zod reference, with schema, defaults,
Controller wiring, labelled fields, descriptions, required state, and error IDs.
Validation starts on submit and revalidates edits after failure. A rejected async
`submit(values)` keeps input and shows a form error; successful submission resets the
dirty baseline. Pending disables the fieldset and prevents repeated submission.
To add a field, update the schema/defaults/type, then add Field + label + control +
FieldError with matching IDs. Pass RHF refs to the actual focusable control. Replace
the gallery's local callback with the app's service; map known server errors with
setError and keep unexpected failures recoverable. Do not log sensitive form values.

SelectCombobox and MultiCombobox use stable string IDs externally and labelled objects
internally. Single selection supports clearing; multi-selection exposes named chip
removal. Both accept disabled, invalid, describedBy, onBlur, and inputRef. For async
search compose the installed Combobox with controlled inputValue/onInputValueChange,
`filter={null}` for server filtering, and explicit loading/error/empty states. Abort
superseded requests and also compare a request ID before accepting results; keep
selected options available while results change. Do not conflate loading with no results.

DatePicker accepts an optional date-only `YYYY-MM-DD` string, empty string for no date,
and `min` for disabled earlier days. Use dateFromValue/dateToValue helpers; never serialize
these values through UTC/ISO timestamps. Store a date-only field on the server. A
separate time or time-zone selection needs an explicit product contract.

ProjectDialogs demonstrates an installed Dialog form and AlertDialog confirmation.
Save closes only after success. Archive prevents dismissal/repeated submission while
pending and keeps failure visible for retry. Example outcomes are local to the gallery
and reset on reload; wire real persistence in the consuming app.

## Tables and page patterns

ProjectTable takes typed ProjectRow[] and onOpen(row). It uses TanStack Table v8 and
installed Table, InputGroup, ToggleGroup, ButtonGroup, Checkbox, DropdownMenu, and Button components. Add columns in
the local ColumnDef array; add row actions to the dropdown and keep accessible labels.
Stable row IDs preserve selection across pages and filters. The header checkbox selects
only the current page; the count explicitly includes all selected pages. Filtering,
sorting, and pagination are client-side. Text search and the exact status filter
combine; either filter resets pagination to the first page. All removes only the
status filter. Clearing search preserves the status filter and selection. Column visibility cannot hide selection/actions.
Use loading for pending data and [] for a genuine empty collection. A filter with no
matches is distinct. Numeric data uses tabular figures and right alignment.

For remote data, move filter/sort/page state to the owning route and use TanStack's
manual filtering/sorting/pagination with server totals. Define selection across unloaded
rows deliberately; do not treat selected client rows as a server-wide bulk operation.
The example is intentionally local, not a universal data-table framework.

Grouped-control compositions live in src/examples/project-table-filters.tsx,
project-table-controls.tsx, and project-detail-tabs.tsx. Both shells and the gallery
Patterns index expose them. Detail tabs start at Overview and keep local state.

[Layouts](layouts.md) describes collection/detail/settings/reading compositions.
Gallery routes under `/__gallery/layouts/header/` and `/__gallery/layouts/sidebar/`
use collection, detail, settings, and reading suffixes. Add `?state=empty` or
`?state=loading` to collection; `?scenario=failure` makes the first form/confirmation
submission fail and the next succeed. Fixtures and simulated submission belong only
in src/examples. Shared components must not import them.
