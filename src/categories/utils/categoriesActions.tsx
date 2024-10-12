import { DetailCell } from "@/src/components";
import { PATHS } from "@/src/utils";

export const categoriesAction = (id: string | number) => {
  return <DetailCell id={id} update updatePath={PATHS.CATEGORIES.UPDATE} />;
};
