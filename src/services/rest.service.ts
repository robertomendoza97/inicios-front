import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CustomResponse } from "../interfaces/CustomResponse";
import { authOptions } from "../auth";
import { PATHS } from "../utils";

export const customFetch = async <T>(
  url: string,
  config: RequestInit,
  initialValue?: T
): Promise<CustomResponse<T>> => {
  const session = await getServerSession(authOptions);

  const headers = config.headers ? config.headers : {};

  delete config.headers;

  const response = await fetch(`${process.env.MY_DFS_HOST}/${url}`, {
    ...config,
    headers: {
      Authorization: `Bearer ${session!.user!.token}`,
      ...headers
    }
  });

  if (!response.ok) {
    console.log(await response.json());

    if (response.status === 401) {
      redirect(PATHS.SIGNIN);
    }
    return {
      data: initialValue ? initialValue : (null as T),
      error: true,
      success: true
    };
  }

  const data = await response.json();

  return { data: data as T, error: false, success: true };
};
