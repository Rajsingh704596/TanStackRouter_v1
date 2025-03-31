import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/users/$userId"!
      <h1>User Detail (Part of Dynamic Routing)</h1>
    </div>
  );
}
