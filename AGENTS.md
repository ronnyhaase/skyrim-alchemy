<!-- BEGIN:nextjs-agent-rules -->

**This is NOT the Next.js you know**

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# File Modifications

Do not create, modify, move, or delete files unless the user has explicitly or reasonably clearly requested a change to the codebase.

Treat questions, requests for explanations, reviews, opinions, investigations, and discussions as read-only by default.

If the user's intent is ambiguous and the request could reasonably be interpreted as either asking for information or requesting a modification, clarify their intent before writing to any files.

Examples:

- "How does this component work?" → Explain only; do not modify files.
- "Would it be better to extract this into a hook?" → Give an opinion; do not modify files.
- "Can you investigate why this fails?" → Investigate and report findings; do not modify files unless asked to fix it.
- "Fix this error." → File modifications are clearly implied and allowed.
- "Extract this into a hook." → File modifications are clearly requested and allowed.

# Scope of Changes

When modifying existing code, keep changes scoped to the request. Do not refactor, reformat, rename, or clean up unrelated code unless required for the requested change.

# Incremental Coding Discipline

When the user asks for a small coding step, implement only the explicitly requested behavior and avoid adding UI, logic, styling, sample layouts, placeholder content, or extra functionality unless the user specifically asks for it.

For example, if asked to load data and pass it into a component, create the component and wire the props, but keep the component render minimal, such as `return null` or a tiny structural placeholder if needed for validity. Do not infer the next product feature or design the page ahead of the user.

# Code Style

Functions and components should be ordered dependency-first where possible: a function or component should appear before functions or components that call or render it.

**Example:** If function "two" calls function "one", "one" should appear in the file before "two".

## JavaScript / TypeScript / JSX / TSX

User-defined source filenames must use `kebab-case`, not `camelCase` or `PascalCase`. Framework-defined, tool-defined, and conventional filenames are exempt.

If set up in the workspace and rules are defined, run Prettier on touched files, otherwise don't.

### Imports

Imports must be organized into three blocks, separated by a blank line:

1. External dependencies
2. Source-root (`@/` or similar) dependencies
3. Local/relative dependencies

Within each block:

- Order imports alphabetically by module/package name, with uppercase letters before lowercase letters. Module/package ordering always takes priority over the form of the import.
- Order imported members alphabetically using the same rule.
- Within the import clause (the part between `import` and `from`), namespace/bulk imports (`* as ...`) come before specific/default imports where applicable.

For local/relative dependencies, order by distance first, with more distant imports before closer imports, then alphabetically within the same distance.

**Example:**

```ts
import React, { Element, useState } from "react";

import helpers from "@/helpers";
import { Aclass, autility, butility } from "@/utils";

import * as whatever1 from "../../another-more-distant-file";
import * as whatever2 from "../../more-distant-file";
import whatever from "../distant-file";
import { Whatever, whatever } from "./a-file";
```

## CSS, Class Names and Tailwind

CSS properties and Tailwind utility classes must be ordered by semantic group first and alphabetically within each group. Related properties must stay together; alphabetical ordering must never separate related properties.

Use the following group order:

1. **Layout and positioning**

    - Position (`position`)
    - Coordinates (`inset`, `top`, `right`, `bottom`, `left`)
    - `z-index`
    - `display`
    - `overflow`
    - Grid properties
    - Flexbox properties
    - Opacity
    - Visibility
    - Object sizing and fitting (`object-fit`, `object-position`)

2. **Box model and sizing**

    - Size (`width`, `height`, min/max variants)
    - Margin
    - Padding
    - Border, including border radius
    - Within directional properties, order general before increasingly specific variants: all sides → horizontal/vertical → individual sides.
    - Example: `margin` → `margin-inline` / `margin-block` → `margin-left` / `margin-top`, etc.

3. **Visual appearance, back to front**

    - Background properties before foreground/content properties.
    - Typography and text properties (`font-*`, `text-*`) must stay together.
    - Cursor and pointer-event properties belong to this group.
    - Keep related groups together, e.g. `background-*`, then typography (`font-*`, `text-*`), rather than globally alphabetizing individual properties or classes.

4. **Animations and transitions**

    - Transform properties
    - Filter properties
    - Animation properties
    - Transition properties

Properties and utilities not explicitly covered should be placed next to the semantically closest group. Preserve established ordering in the surrounding code when no group clearly applies.

Apply the same semantic ordering to Tailwind classes. Tailwind utilities belonging to the same conceptual CSS group must remain adjacent and are ordered alphabetically only within that group.

Tailwind variants (`hover:`, `focus:`, `md:`, `dark:`, etc.) do not define separate groups. Classify utilities by their underlying property and keep related utilities and their variants together.

For example:

```tsx
className =
	"relative top-0 z-10 flex items-center gap-4 overflow-hidden w-full mx-auto p-4 border rounded-lg bg-white font-medium text-black text-sm transition-colors";
```
