import { ErrorResponsePage } from "@/src/components";
import { customFetch } from "@/src/services/rest.service";
import { IAllUsers, UsersTable } from "@/src/users";

const getUsers = async () => {
  const {
    data: { data },
    error
  } = await customFetch<IAllUsers>("user", {
    cache: "no-cache"
  });

  return { data, error };
};

const Users = async () => {
  const { data, error } = await getUsers();

  if (error || !data) return <ErrorResponsePage />;

  return <UsersTable users={data} />;
};

export default Users;
