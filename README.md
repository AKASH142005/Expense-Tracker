# Expense Tracker

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Expense Tracker

React single-page application built with Vite.

## Local Development

Requirements: Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

For local development, Vite proxies `/api` requests to the Catalyst API configured in `vite.config.js`.

## Production Build

Set `VITE_API_BASE_URL` to the origin of the deployed API before building. It must be an origin only, with no `/api` suffix. The API path definitions already include `/api`.

```sh
VITE_API_BASE_URL=https://your-appsail-domain npm run build
```

On Windows PowerShell:

```powershell
$env:VITE_API_BASE_URL = "https://your-appsail-domain"
npm run build
```

The generated static site is in `dist/`. Configure the hosting provider to serve `index.html` for unknown application routes so paths such as `/dashboard` work after refresh. In the provider's build settings, use `npm ci` and `npm run build`, and set the output directory to `dist`.

`VITE_API_BASE_URL` is embedded in browser code; never put secrets in `VITE_*` variables. Because the production browser calls the API directly, configure the backend CORS allowlist to include the deployed frontend origin and permit the `Authorization` and `Content-Type` headers. Local `vite preview` uses a proxy only when `VITE_API_BASE_URL` is unset.

Run `npm run lint` to check the source before deployment.
