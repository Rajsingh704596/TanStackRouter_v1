import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchUser } from "../../api/users";

export const Route = createFileRoute("/users/$userId")({
  loader: async ({ params: { userId } }) => {
    // loader which have async fun and pass userId to api fun
    // await new Promise((resolve) => setTimeout(resolve, 2000));        // testing purpose use for delay loading screen show (pendingComponent)
    // throw new Error();                                  // testing purpose to check if error throw errorComponent work
    return fetchUser(userId); //api fun call
  },
  component: RouteComponent,
  pendingComponent: () => <div>...loading</div>, // here we using spinner for loading screen when data not get
  errorComponent: () => <div>There was an error fetching data...</div>, //here Error component show if api data not get
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
        <Link to={"/users"} search={{ page: 2 }}>
          Back to User List
        </Link>
      </div>
    </div>
  );
}
