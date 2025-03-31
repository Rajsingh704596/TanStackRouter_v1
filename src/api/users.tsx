//interface create for api data
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

// function that call api get user data
export const fetchUsers = async () => {
  console.log("Fetching users...");
  const res = (await fetch("https://reqres.in/api/users")).json();
  return res;
};

// function that call api and pass the useId and get that particular user detail
export const fetchUser = async (userId: string) => {
  console.log(`Fetching user with id`);
  const res = (await fetch(`https://reqres.in/api/users/${userId}`)).json();
  return res;
};
