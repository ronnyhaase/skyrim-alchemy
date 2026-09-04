<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Incremental Coding Discipline

When the user asks for a small coding step, implement only the explicitly requested behavior and
avoid adding UI, logic, styling, sample layouts, placeholder content, or extra functionality unless
the user specifically asks for it.

For example, if asked to load data and pass it into a component, create the component and wire the
props, but keep the component render minimal, such as `return null` or a tiny structural placeholder
if needed for validity. Do not infer the next product feature or design the page ahead of the user.
