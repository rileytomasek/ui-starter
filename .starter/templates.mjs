export const json = (value) => `${JSON.stringify(value, null, 2)}\n`
export function replacements(config, read) {
  const q = JSON.stringify
  const pkg = JSON.parse(read("package.json"))
  pkg.name = config.packageName
  pkg.description = config.purpose
  for (const name of ["setup:finalize", "setup:baseline", "test:setup"]) delete pkg.scripts[name]
  if (!config.retainGallery) delete pkg.scripts["build:gallery"]
  // Shared UI retains its integration dependencies. Only reference-specific
  // dependencies are candidates; the finalizer checks all remaining code first.
  const values = {
    "package.json": json(pkg),
    "src/app/config.ts": `export const appConfig: {name:string;purpose:string;users:string;shell:"header"|"sidebar";routes:{path:string;title:string;description:string}[]} = ${json({ name: config.name, purpose: config.purpose, users: config.users, shell: config.shell, routes: config.routes })}\n`,
    "src/app/navigation.ts": `import Home from "~icons/carbon/home"\nimport type { SvgIcon } from "@/components/icon"\nexport type Destination = { title: string; path: string; icon: SvgIcon; children?: Destination[] }\nexport const destinations: Destination[] = ${q(config.routes.map(({ title, path }) => ({ title, path })))}.map(item => ({...item, icon:Home}))\nexport function flattenDestinations(items: Destination[]): Destination[] { return items.flatMap(item => [item,...flattenDestinations(item.children ?? [])]) }\n`,
    "src/App.tsx": `import { Route, Routes } from "react-router"\nimport { appConfig } from "@/app/config"\nimport { destinations } from "@/app/navigation"\nimport { HeaderShell, SidebarShell } from "@/components/shells"\nimport { PageContent, PageHeader } from "@/components/page"\nexport default function App() {\n const Shell = appConfig.shell === "sidebar" ? SidebarShell : HeaderShell\n return <Shell name={appConfig.name} destinations={destinations}><Routes>{appConfig.routes.map(route => <Route key={route.path} path={route.path} element={<PageContent><PageHeader title={route.title} description={route.description} /></PageContent>} />)}<Route path="*" element={<PageContent><PageHeader title="Page not found" description="Choose a destination from navigation." /></PageContent>} /></Routes></Shell>\n}\n`,
    "README.md": `# ${config.name}\n\n${config.purpose}\n\nIntended users: ${config.users}\n\n## Development\n\nUse Node 24.10.0 and pnpm 11.14.0. Run \`pnpm install\`,\n\`pnpm exec playwright install chromium firefox webkit\`, then \`pnpm dev\`.\nRun \`pnpm check\` and \`pnpm test:e2e\` before shipping changes.\n\n- [Architecture and app choices](docs/architecture.md)\n- [Development and verification](docs/development.md)\n- [UI customization and installation](docs/ui.md)\n- [Components](docs/components.md)\n- [Shells and navigation](docs/layouts.md)\n- [Optional integrations](docs/optional.md)\n- [Source provenance](docs/sources.md)\n\n${config.retainGallery ? "The development UI reference is at `/__gallery/theme`; `pnpm build:gallery` makes an explicit preview. Default production builds exclude it.\n" : "Application routes live in src/App.tsx and src/app/config.ts.\n"}\nMIT-licensed source; retain LICENSE and public/licenses notices.\n`,
    "AGENTS.md": `# ${config.name}\n\n${config.purpose}\nIntended users: ${config.users}.\n\nRead [README](README.md) and [architecture](docs/architecture.md).\nAgents are the primary authors. Prefer reliable agent discovery, modification,\nand deterministic verification when authoring workflows conflict with human\ndeveloper convenience; preserve end-user usability, accessibility, and visual quality.\n\n- For every UI task read and follow [.agents/skills/interface-design/SKILL.md](.agents/skills/interface-design/SKILL.md). Reread before rendered review.\n- Install shadcn components through the CLI: \`pnpm ui:add <component>\`, then \`pnpm ui:icons\`. Never handwrite replacement primitives. See [UI guide](docs/ui.md).\n- Reuse semantic tokens, Carbon icons, shared components, and shell/page layouts. Keep abstractions small.\n- App routes belong in src/App.tsx; app identity/navigation in src/app. Shared UI belongs in src/components.\n- Run \`pnpm check\` and relevant \`pnpm test:e2e\`; inspect UI changes in both themes and relevant mobile/desktop sizes, including keyboard focus and failure states.\n- Update affected documentation, examples, commands, and tests with behavior changes; search for stale consumers before reporting completion.\n- Preserve unrelated work, license notices, and skill provenance. Backend/auth/deployment choices require the application's own scope.\n`,
    "docs/architecture.md": `# ${config.name} architecture\n\n${config.purpose}\nUsers: ${config.users}.\n\n## Application decisions\n\nShell: ${config.shell}. Initial destinations: ${config.routes.map((r) => `${r.title} (\`${r.path}\`)`).join(", ")}.\n\n${Object.entries(
      config.visual,
    )
      .map(([k, v]) => `- ${k}: ${v}`)
      .join(
        "\n",
      )}\n\n## Boundaries\n\nVite + React + strict TypeScript, Tailwind v4, Base UI Nova shadcn source,\nReact Router declarative routes, and static Carbon SVGs. src/main.tsx owns\nThemeProvider, TooltipProvider, and BrowserRouter. src/App.tsx composes routes;\nsrc/app owns identity and destinations shared with commands. Shared components\nnever import development fixtures. Use local React state until the app has a\nconcrete need for a server cache or shared state library.\n\nLight/Dark/System uses public/theme.js before paint and src/components/theme.tsx\nafter mount. Keep the shared storage key synchronized. Styles live in\nsrc/index.css and the official Typeset stylesheet. Narrow installed-source adaptations retain Carbon icons, labelled combobox controls,\nclipboard-error feedback, high-contrast Shiki themes, and the Calendar day-button\nfocus ref needed for arrow-key navigation. Component provenance is in\n[installation.json](installation.json); ongoing conventions are in [UI](ui.md).\n\n${config.retainExamples ? "Reference forms/tables and fixture pages are retained in src/examples for development. They simulate persistence and reset on reload; wire application services before reusing them in production. See [components](components.md)." : "No sample records or form-submission simulations are included in the application."}\n${config.retainGallery ? "The gallery in src/gallery is an explicitly retained development reference. The normal production bundle excludes it." : "The application has no gallery routes or gallery build command."}\n`,
    "src/App.browser.test.tsx": `import "@/index.css"\nimport {expect,test} from "vitest"\nimport {render} from "vitest-browser-react"\nimport {MemoryRouter} from "react-router"\nimport {ThemeProvider} from "./components/theme"\nimport {TooltipProvider} from "./components/ui/tooltip"\nimport {appConfig} from "./app/config"\nimport App from "./App"\ntest("application home renders",async()=>{const s=await render(<ThemeProvider><TooltipProvider><MemoryRouter><App /></MemoryRouter></TooltipProvider></ThemeProvider>);await expect.element(s.getByRole("heading",{name:appConfig.routes[0].title,exact:true})).toBeVisible()})\n`,
    "tests/e2e/smoke.spec.ts": `import {test,expect} from "@playwright/test"\nimport {appConfig} from "../../src/app/config"\ntest("application routes render after direct navigation",async({page})=>{for(const route of appConfig.routes){await page.goto(route.path);await expect(page.getByRole("heading",{name:route.title,exact:true})).toBeVisible()}})\n`,
  }
  values[".github/workflows/check.yml"] = read(".github/workflows/check.yml").replace(
    /      - name: Setup workflow tests\n        if:.*\n        run: pnpm test:setup\n/,
    "",
  )
  const formatter = JSON.parse(read(".oxfmtrc.json"))
  formatter.ignorePatterns = formatter.ignorePatterns.filter((p) => p !== ".starter/state.json")
  values[".oxfmtrc.json"] = json(formatter)
  values[".gitignore"] = read(".gitignore").replace(/^\.starter\/state\.json\n/gm, "")
  if (!config.retainExamples) {
    const lint = JSON.parse(read(".oxlintrc.json"))
    lint.overrides = lint.overrides.filter(
      (o) => !o.files.every((p) => p.startsWith("src/examples/")),
    )
    values[".oxlintrc.json"] = json(lint)
  }
  values["index.html"] = read("index.html").replace(
    /<title>[^<]*<\/title>/,
    `<title>${config.name.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</title>`,
  )
  if (!config.retainGallery) {
    values["src/main.tsx"] =
      `import {StrictMode} from "react"\nimport {createRoot} from "react-dom/client"\nimport {BrowserRouter} from "react-router"\nimport App from "./App"\nimport {ThemeProvider} from "@/components/theme"\nimport {TooltipProvider} from "@/components/ui/tooltip"\nimport "./index.css"\ncreateRoot(document.getElementById("root")!).render(<StrictMode><ThemeProvider><TooltipProvider><BrowserRouter><App /></BrowserRouter></TooltipProvider></ThemeProvider></StrictMode>)\n`
    // Structured configuration is generated below; no remaining test uses gallery.
    values["playwright.config.ts"] =
      `import {defineConfig,devices} from "@playwright/test"\nexport default defineConfig({testDir:"./tests/e2e",fullyParallel:true,forbidOnly:!!process.env.CI,retries:process.env.CI?1:0,reporter:"list",use:{baseURL:"http://127.0.0.1:4173",trace:"retain-on-failure",screenshot:"only-on-failure"},projects:[{name:"chromium",use:{...devices["Desktop Chrome"]}},{name:"firefox",use:{...devices["Desktop Firefox"]},testMatch:/smoke.spec.ts/},{name:"webkit",use:{...devices["Desktop Safari"]},testMatch:/smoke.spec.ts/}],webServer:{command:"pnpm build && pnpm preview --port 4173 --strictPort",url:"http://127.0.0.1:4173",reuseExistingServer:!process.env.CI}})\n`
    values["docs/ui.md"] =
      read("docs/ui.md").split("## Inspect and verify")[0] +
      "## Verify changes\n\nRun `pnpm check` and relevant `pnpm test:e2e`. Inspect both themes at desktop and mobile widths, keyboard focus, long content, and reduced motion. Shared source must not depend on fixtures.\n"
    values["docs/layouts.md"] =
      read("docs/layouts.md").split("Inspect /__gallery/")[0] +
      "Review narrow screens, both themes, and focus/anchor positioning after changes.\n"
  }
  if (!config.retainExamples) {
    const source = read("docs/components.md")
    values["docs/components.md"] =
      source.split("## Forms and inputs")[0] +
      `## Inputs and forms\n\nUse SelectCombobox/MultiCombobox from src/components/select-combobox.tsx with\nstring IDs and labelled Option objects. They support disabled, invalid, describedBy,\ninputRef, onBlur, clearing, and named chip removal. For async results, compose the\ninstalled Combobox with controlled inputValue/onInputValueChange, filter={null},\nloading/error/empty states, AbortController, and a request ID to reject stale results.\n\nDatePicker uses date-only YYYY-MM-DD strings (empty means none), with min for\ndisabled earlier dates. Use src/lib/date-only.ts; never serialize a calendar day\nthrough UTC. For full forms prefer React Hook Form + Zod; add them when needed.\nUse installed Field components, matching labels/error IDs, focusable refs,\ninput-preserving failures, and disabled pending submission.\n\n## Tables\n\nCompose installed Table with TanStack Table when needed. Keep typed columns and\nrow actions local to the feature, use stable IDs, and define selection scope explicitly.\nSeparate loading/empty/no-match states. Numeric values use tabular figures and\nright alignment. Server pagination requires explicit totals and selection semantics.\nSee [optional integrations](optional.md) for dependency choices.\n`
  }
  return values
}
