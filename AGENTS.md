# Repository Guidelines

## Project Structure & Module Organization

This pnpm workspace contains two independently deployable applications:

- `apps/web/`: Vue 3 + Vite site. Components live in `src/components/`, composables in `src/composables/`, and global styles in `src/styles/`.
- `apps/api/`: Hono API with Node and Cloudflare Worker entry points. Keep route behavior in `src/`; API tests belong in `tests/`.
- `packages/dataset/`: generated love-line data and validation tests.
- `packages/shared/`: TypeScript types shared across applications.
- `data/love-lines.txt`: canonical cleaned dataset; `scripts/prepare-data.mjs` regenerates `packages/dataset/src/generated.ts`.
- `infra/docker/` and `.github/workflows/`: container and CI/deployment configuration.

Do not hand-edit generated dataset output; update the source data or preparation script and regenerate it.

## Build, Test, and Development Commands

Use Node.js 20.19+ and pnpm 10 (CI currently runs Node 24).

- `corepack enable && pnpm install`: install locked dependencies.
- `pnpm prepare:data`: clean source data and regenerate the dataset module.
- `pnpm dev:web`: run the Vite frontend locally.
- `pnpm dev:api`: run the Node API in watch mode.
- `pnpm test`: regenerate data and run all tests.
- `pnpm typecheck`: validate TypeScript and Vue types.
- `pnpm build`: produce builds under each app's `dist/`.

Before submitting changes, run `pnpm test && pnpm typecheck && pnpm build`.

## Coding Style & Naming Conventions

Follow `.editorconfig`: UTF-8, LF endings, final newline, and two-space indentation. Use TypeScript and ES modules. Vue components use PascalCase filenames (`LoveLineCard.vue`), composables use `useXxx.ts`, and variables/functions use camelCase. Follow the existing Vue `<script setup lang="ts">` Composition API style. Import workspace packages through `@love-story/*`. No formatter or linter is configured, so match nearby single-quoted, semicolon-free TypeScript.

## Testing Guidelines

API tests use Vitest; dataset tests use `node:test`. Name tests `*.test.ts` or `*.test.mjs` under the relevant package's `tests/` directory. Add regression coverage for changed authentication, response-shape, dataset-cleaning, or generation behavior. There is no numeric coverage threshold, but new behavior should include focused assertions.

## Commit & Pull Request Guidelines

The repository has no commit history yet, so no established convention can be inferred. Use short, imperative subjects, optionally scoped, such as `api: reject malformed bearer tokens`. Keep generated output in the same commit as its source change. Pull requests should explain intent, list validation commands, link related issues, call out configuration or data-license changes, and include screenshots for visible web UI changes. Never commit real API keys; copy the provided `.env.example` files and use high-entropy local secrets.
