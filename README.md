# React + TypeScript + Vite

## Install TanStack Router, Vite Plugin, and the Router Devtools

```
npm install @tanstack/react-router
npm install -D @tanstack/router-plugin @tanstack/react-router-devtools

```

## vite.config.ts add

```
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
    // ...,
  ],
})

```

## create router.tsx

```
// Import the generated route tree
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;

```

## add router in app.tsx using RouterProvider

```
 <RouterProvider router={router} />

```
