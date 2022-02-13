# How we scaffolded this project

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

- add a `postcss.config.cjs` (not the .cjs extension!)

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
the import in `App.svelte`:

```sveltehtml
import "./index.scss";
```
