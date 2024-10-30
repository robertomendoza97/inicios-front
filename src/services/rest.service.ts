import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CustomResponse } from "../interfaces/CustomResponse";
import { authOptions } from "../auth";

export const customFetch = async <T>(
  url: string,
  config: RequestInit,
  initialValue?: T
): Promise<CustomResponse<T>> => {
  const session = await getServerSession(authOptions);

  const headers = config.headers ? config.headers : {};

  const response = await fetch(url, {
    ...config,
    headers: {
      Authorization: `Bearer ${session!.user!.token}`,
      ...headers
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      redirect("/api/auth/signin");
    }
    return {
      data: initialValue ? initialValue : (null as T),
      error: true,
      success: true
    };
  }

  const data = await response.json();

  return { data, error: false, success: true };
};
