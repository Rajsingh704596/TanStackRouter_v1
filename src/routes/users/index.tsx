//User route

import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchUsers, User } from "../../api/users";

export const Route = createFileRoute("/users/")({
  validateSearch: (search) => {
    return {
      page: search.page || 1, //default value page 1 pass
    };
  },
  component: RouteComponent,
  loaderDeps: ({ search: { page } }) => page, // loaderDeps help to pass the value or pass the search param into our loader
  loader: async ({ deps: page }) => fetchUsers(page), //api function call and loader load the data into the routes ,
});

function RouteComponent() {
  const { data } = Route.useLoaderData(); // get api data using Route.useLoaderData

  console.log("The data is : ", data);
  return (
    <div>
      Hello "/users/"!
      <h1> User listing</h1>
      <ul>
        {data.map((u: User) => (
          <li key={u.id}>
            <Link to={"/users/$userId"} params={{ userId: u.id }}>
              {/* params pass userId */}
              {u.first_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
