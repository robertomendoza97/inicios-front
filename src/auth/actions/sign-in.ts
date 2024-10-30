export const signInWithCredentials = async (
  email: string,
  password: string
) => {
  const response = await fetch(`${process.env.MY_DFS_HOST}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "content-type": "application/json"
    }
  });

  const data = await response.json();

  return data;
};
