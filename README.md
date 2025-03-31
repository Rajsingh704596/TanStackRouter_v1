# TanStack Router v1 - Beginner's Guide with Best Practices

## 🎯 Introduction to TanStack Router

TanStack Router is a modern, type-safe routing solution for React applications that offers excellent performance and developer experience.

### Why Choose TanStack Router?

- ⚡ **Blazing fast** routing with optimized performance
- 📘 **First-class TypeScript support** for type safety
- 🧩 **Modular architecture** that scales with your app
- 🔄 **Automatic code-splitting** out of the box
- 🛠️ **Devtools integration** for debugging

## 🛠️ Setup Guide (Step-by-Step)

### 1. Install Required Packages

```bash
npm install @tanstack/react-router
npm install -D @tanstack/router-plugin @tanstack/react-router-devtools
```

### 2. Configure Vite

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true, // Automatically splits code by routes
      routesDirectory: "src/routes", // Where your route files live
    }),
    react(),
  ],
});
```

### 3. Create Basic Route Structure

```
src/
├── routes/
│   ├── _root.tsx      # Root layout
│   ├── index.tsx      # Home page
│   ├── about.tsx      # About page
│   └── products/
│       ├── index.tsx  # Products listing
│       └── [id].tsx   # Single product page
```

### 4. Root Route Setup

```tsx
// routes/_root.tsx
import { createRootRoute } from "@tanstack/react-router";
import { AppLayout } from "../components/AppLayout";

export const Route = createRootRoute({
  component: AppLayout, // Wraps all routes
});
```

### 5. Home Route Example

```tsx
// routes/index.tsx
import { createRoute } from "@tanstack/react-router";
import { _root } from "./_root";

export const Route = createRoute({
  getParentRoute: () => _root,
  path: "/",
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <h1>Welcome to our store!</h1>
      <p>Browse our amazing products</p>
    </div>
  );
}
```

### 6. Initialize the Router

```tsx
// router.tsx
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen"; // Auto-generated

export const router = createRouter({ routeTree });

// Type safety declaration
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
```

### 7. Connect to React

```tsx
// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

## 🔍 Core Concepts Explained

### Navigation Between Routes

```tsx
import { Link } from "@tanstack/react-router";

function NavBar() {
  return (
    <nav>
      <Link
        to="/"
        activeProps={{ className: "active-link" }}
        inactiveProps={{ className: "nav-link" }}
      >
        Home
      </Link>
      <Link to="/about">About</Link>
      <Link to="/products">Products</Link>
    </nav>
  );
}
```

### Dynamic Routes with Parameters

```tsx
// routes/products/[id].tsx
export const Route = createRoute({
  getParentRoute: () => productsRoute,
  path: "$id", // Note the $ prefix for params
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams(); // Type-safe params
  const product = useProduct(id); // Custom hook to fetch product

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}
```

### Data Loading Best Practices

```tsx
export const Route = createRoute({
  path: "/products",
  loader: async ({ context }) => {
    // Use context to access dependencies like queryClient
    return await context.queryClient.fetchQuery({
      queryKey: ["products"],
      queryFn: fetchAllProducts,
    });
  },
  component: ProductsPage,
});

function ProductsPage() {
  const products = Route.useLoaderData(); // Type-safe loader data

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link to="/products/$id" params={{ id: product.id }}>
            {product.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

## 🛡️ Authentication & Protected Routes

### 1. Create Auth Context

```tsx
// router.tsx
const router = createRouter({
  routeTree,
  context: {
    auth: {
      isAuthenticated: false,
      user: null,
      login: (user) => {
        /* ... */
      },
      logout: () => {
        /* ... */
      },
    },
  },
});
```

### 2. Protected Route Component

```tsx
// routes/_protected.tsx
export const Route = createRoute({
  id: "protected",
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href, // Remember where they wanted to go
        },
      });
    }
  },
});
```

### 3. Usage in App

```tsx
// routes/dashboard.tsx
export const Route = createRoute({
  getParentRoute: () => protectedRoute, // Inherits protection
  path: "/dashboard",
  component: DashboardPage,
});
```

## ⚡ Performance Optimizations

### 1. Route-based Code Splitting

```tsx
export const Route = createRoute({
  path: "/heavy-component",
  component: lazy(() => import("./HeavyComponent")),
  pendingComponent: () => <LoadingSpinner />,
});
```

### 2. Prefetching Routes

```tsx
function ProductLink({ id }) {
  return (
    <Link
      to="/products/$id"
      params={{ id }}
      preload="intent" // Preload on hover
      preloadDelay={200} // After 200ms of hovering
    >
      View Product
    </Link>
  );
}
```

### 3. Smart Route Grouping

```typescript
// vite.config.ts
TanStackRouterVite({
  codeSplitting: {
    strategy: "route-group",
    group: (route) => {
      if (route.path.startsWith("/admin")) return "admin";
      if (route.path.startsWith("/dashboard")) return "dashboard";
      return "main";
    },
  },
});
```

## 🛠️ Development Tools

### Router Devtools

```tsx
import { ReactRouterDevtools } from "@tanstack/react-router-devtools";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ReactRouterDevtools position="bottom-right" initialIsOpen={false} />
    </>
  );
}
```

### CLI Utilities

```bash
# Analyze bundle size
npx tanstack-router analyze

# Generate routes manually
npx tanstack-router generate
```

## 🚨 Error Handling

### Route-level Error Boundaries

```tsx
export const Route = createRoute({
  errorComponent: ({ error }) => (
    <div className="error-boundary">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  ),
});
```

### Global Error Handling

```tsx
const router = createRouter({
  routeTree,
  defaultErrorComponent: ({ error }) => (
    <div className="global-error">
      <h1>Application Error</h1>
      <pre>{error.stack}</pre>
      <Link to="/">Return Home</Link>
    </div>
  ),
});
```

## 📝 Best Practices Checklist

1. **Project Structure**

   - Group related routes in directories
   - Use clear naming conventions
   - Separate layout routes from content routes

2. **Type Safety**

   - Always declare router types
   - Use proper typing for route params
   - Type your route context

3. **Performance**

   - Implement code splitting
   - Use route preloading
   - Optimize data loading

4. **Security**

   - Validate all route params
   - Implement proper auth checks
   - Sanitize dynamic content

5. **Maintainability**
   - Keep routes focused and small
   - Document complex route logic
   - Use consistent patterns

## 🆙 Migration Tips

From React Router to TanStack Router:

1. **Path Syntax Changes**

   - `:id` becomes `$id`
   - `useNavigate()` becomes `router.navigate()`

2. **Data Loading**

   - Move from `loader` functions to route `loaders`
   - Update data access patterns

3. **Type System**
   - Add proper type declarations
   - Update your component props

```bash
# Use the migration helper
npx tanstack-router migrate-from-react-router
```
