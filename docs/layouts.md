# Shells and navigation

Use HeaderShell or SidebarShell from src/components/shells.tsx. Pass `name`,
`destinations`, and ordinary page children. Choose the production shell in
src/app/config.ts; add destinations in src/app/navigation.ts and matching routes
in the app. Destinations use real links and supply the command palette too.

```tsx
<HeaderShell name="Fieldnotes" destinations={destinations}>
  <PageContent width="reading">
    <PageHeader title="Working guide" description="How we organize research." />
    <Markdown source={guide} />
  </PageContent>
</HeaderShell>
```

PageContent, PageHeader, PageSection, and PageToolbar
are in src/components/page.tsx. Widths are full/form/reading; layout owns gutters
and reading measure. Actions wrap beside titles. Keep data tables full width.

HeaderShell uses --spacing-header for fixed height, main offset, and anchor
scrolling. Menus/dialogs sit above the header. SidebarShell follows the installed
sidebar-07 structure, with compact header, navigation, and appearance footer.
Desktop collapse stores app.sidebar. The installed provider owns independent
mobile open state. Navigation closes mobile sheets; route changes focus the new
h1. Sidebar destinations can include one level of children. Start flat.

CommandProvider composes installed Dialog and Command. CommandTrigger and
Cmd/Ctrl+K open it; repeated/composing key events are ignored. Appearance actions
call the same theme provider. Escape restores focus to the prior element. Keep
labels, icons, and paths in one destination definition rather than a second
command registry.

Inspect /__gallery/layouts/header/collection and
/__gallery/layouts/sidebar/collection in `pnpm dev`. The examples are full-page
views. `pnpm test:e2e` builds production and an explicit gallery preview, then
checks navigation, shortcuts, persistence, mobile dismissal, and accessibility.
Review narrow screens, both themes, and focus/anchor positioning after changes.

Detail examples use local Overview/Research guide tabs; collection examples group
search, status filtering, and pagination. Use the
[grouped-control recipes](components.md#compact-grouped-controls) when extending
these patterns. Tabs switch related content within a page; shell navigation remains links.
