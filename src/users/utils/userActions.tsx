import { DetailCell } from "@/src/components";
import { PATHS } from "@/src/utils";

export const userTableActions = (id: string | number) => {
  return <DetailCell id={id} update deletePath={PATHS.USERS.UPDATE} />;
};
