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

  if (!session || !session.user?.token) {
    return {
      data: initialValue as T,
      error: true,
      success: false
    };
  }

  const mergedHeaders = {
    Authorization: `Bearer ${session.user.token}`,
    ...(config.headers || {})
  };

  const requestConfig: RequestInit = {
    ...config,
    headers: mergedHeaders
  };

  let mustRedirect = false;
  try {
    const response = await fetch(
      `${process.env.MY_DFS_HOST}/${url}`,
      requestConfig
    );

    if (!response.ok) {
      console.log(await response.json());

      if (response.status === 401) {
        mustRedirect = true;
      }

      return {
        data: initialValue as T,
        error: true,
        success: true
      };
    }

    const data = await response.json();

    return { data: data as T, error: false, success: true };
  } catch (error) {
    console.log(error);

    return { data: initialValue as T, error: true, success: false };
  } finally {
    if (mustRedirect) {
      redirect(PATHS.SIGNIN);
    }
  }
};
