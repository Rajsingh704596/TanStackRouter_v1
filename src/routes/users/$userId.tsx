import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchUser } from "../../api/users";

export const Route = createFileRoute("/users/$userId")({
  loader: async ({ params: { userId } }) => {
    // loader which have async fun and pass userId to api fun
    return fetchUser(userId); //api fun call
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = Route.useLoaderData();
  return (
    <div>
      Hello "/users/$userId"!
      <h1>User Detail (Part of Dynamic Routing)</h1>
      <div>
        <img src={data.avatar} alt={data.avatar} />
      </div>
      <div>
        {data.first_name}
        {data.last_name}
      </div>
      <div>{data.email}</div>
      <div>
        <Link to={"/users"}>Back to User List</Link>
      </div>
    </div>
  );
}
