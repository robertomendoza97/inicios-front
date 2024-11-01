import { customFetch } from "@/src/services/rest.service";

const getUsers = async () => {
  const { data } = await customFetch("users", {
    cache: "no-cache"
  });

  return data;
};

const Users = async () => {
  await getUsers();
  return <div>Users</div>;
};

export default Users;
