# How to scaffold a svelte + tailwind + typescript + scss project 

The aim of this structure is to have a base skeleton for a project with svelte (and TS and SCSS and Tailwind) + HMR and fast builds.

This project was created using the following commands:

- create a vite project and select svelte and typescript

`pnpm create vite`

- add tailwind

`pnpm add -D tailwindcss autoprefixer postcss-load-config`

`pnpx tailwindcss init tailwind.config.cjs`

- add the following content to the content field in tailwind.config.cjs

```js
content: [
    './index.html',
    './src/**/*.svelte'
]
```

- add a `postcss.config.cjs` (note the .cjs extension!)

```js
module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    }
}
```

- add scss support

`pnpm add -D sass`

- add `src/index.scss` and paste:

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

then import in `App.svelte`:

```sveltehtml
import "./index.scss";
```
