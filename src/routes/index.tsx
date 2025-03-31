import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Welcome to TanStack React Router</h1>
      <p> Here we will explore the Following features</p>
      <ul>
        <li>Tanstack Router provide routing like-</li>
        <li>File Based Routing</li>
        <li>Dynamic Routing</li>
        <li> Nested Routing</li>
        <li> Data Loading</li>
        <li> Search Params</li>
        <li> Path Params</li>
        <li> Code Spliting</li>
        <li>Not Found Errors</li>
      </ul>
    </div>
  );
}
