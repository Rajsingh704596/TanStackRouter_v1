import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/users/"!
      <h1> User listing</h1>
    </div>
  );
}
