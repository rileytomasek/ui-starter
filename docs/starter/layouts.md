# Shells, navigation, and inner-page layouts

## Shared structure

Provide two shell examples that share navigation destinations, theme controls,
command palette, and page-content conventions. Choosing a shell is an explicit
route-layout decision using React Router declarative routing. Define the small
exported component APIs during implementation.

Use readable React composition. Candidate names are AppShell, AppSidebar,
HeaderShell, PageHeader, PageContent, PageSection, and PageToolbar; these are
design sketches, not existing exports or a mandatory abstraction hierarchy.

## Sidebar shell

Use [sidebar-07](https://ui.shadcn.com/blocks/sidebar#sidebar-07) as the starting
reference: a left sidebar that can collapse to icons, with a compact header
above the main content. Adapt it to the selected shadcn/create preset.

- Sidebar header: small app mark/name and a command-palette trigger with shortcut.
- Primary navigation: icon and label, clear active state, optional groups, and
  support for one meaningful nested level.
- Footer: settings and appearance controls, with an extension point for an
  account menu. Authentication and team switching are not implied features.
- Main header: sidebar toggle, page title or breadcrumbs, and optional actions.
- Desktop: persist collapse preference and label collapsed controls accessibly.
- Mobile: open navigation in an overlay, close after choosing a destination,
  and restore focus appropriately. Mobile open state is independent of desktop
  collapse preference.

Start with flat navigation. Supply a nested example without making every
destination a collapsible group. Retain subtle visual separation and compact
controls. The reference block's placeholder dashboard cards are not a mandated
content layout.

sidebar-08 (inset content with secondary navigation) and sidebar-16 (full-width
site header) were considered references. They are not additional required shells.

## Header shell

Provide a simple shell with **no sidebar and a fixed full-width header**.

- App mark/name on the left.
- Optional navigation links with active state.
- Command-palette trigger and appearance controls on the right.
- A usable mobile menu when the links no longer fit.
- Main-content offset matching header height.
- Anchor-scroll spacing so headings and focused destinations are not obscured.
- The same full-width, form, and reading content options as the sidebar shell.

Fixed-header behavior should be tested with long content, direct navigation,
keyboard focus, and narrow viewports. Use shared sizing tokens rather than
unrelated offsets on each page.

## Navigation contract

Keep labels, icons, and destination paths in a small shared definition consumed
by navigation and the command palette. Route matching determines active state.
Use actual navigable links for destinations and buttons for actions. Support
deep links and refresh behavior appropriate to the eventual hosting setup.

Use breadcrumbs when they communicate real hierarchy. A top-level page can use
a simple title. Avoid repeating the same title in a shell bar and an oversized
page header without an informational reason.

Page actions should sit with the page title where appropriate. Collapse secondary
actions into an overflow menu or wrap them on small screens. Keep important
actions discoverable and distinguish global search from page-specific filtering.

Include keyboard navigation, visible focus, meaningful landmarks, and a
skip-to-content link. Define a sensible focus/announcement behavior for route
changes. Prevent fixed headers and overlays from trapping or obscuring focus.

## Inner-page patterns

These are copyable examples made from shared pieces and ordinary grid/flex
composition. Each must work in either shell.

| Pattern       | Composition                                                          | Example                                 |
| ------------- | -------------------------------------------------------------------- | --------------------------------------- |
| Collection    | Title/actions, search/filter toolbar, list/table, pagination         | Data table                              |
| Detail        | Breadcrumbs, title/actions, optional tabs, main content and metadata | Record with Markdown and a details list |
| Settings/form | Title/description, grouped sections and fields, save/reset           | Full forms example                      |
| Reading       | Constrained prose column, Typeset, wider content where useful        | Markdown document                       |

The detail layout's supporting metadata column stacks below the main content
on narrow screens. Toolbars and actions adapt rather than overflowing. Reading
width is a layout decision; tables should not inherit a prose-width constraint
that prevents useful comparison.

PageContent owns responsive gutters and width conventions. PageSection
coordinates heading, optional description, and content. PageToolbar groups
search/filter controls and secondary actions. Keep these APIs small.

Main content normally uses page scrolling. Internal scroll regions should be
deliberate, such as wide tables, bounded code, and long menus; avoid unnecessary
nested vertical scrolling. A resizable split-pane or inbox layout is deferred.

## Gallery navigation

Use the sections defined in the [UI gallery](foundations.md#ui-gallery) for
searchable example navigation. Keep stable links to individual examples. Shell
demos may use realistic sample destinations such as Overview, Data table, Forms,
and Markdown; these are not a required information architecture for consuming
apps. Make shell examples easy to inspect without adding a permanent
shell-switching feature to end-user applications.
