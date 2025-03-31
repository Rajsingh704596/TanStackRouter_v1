import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "../Components/Navbar";
import NotFound from "../Components/NotFound";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound, // Root level error handle when wrong path type so show norFoundComponent
});

function RootComponent() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
