import { DetailCell } from "@/src/components";
import { PATHS } from "@/src/utils";

export const subcategoriesAction = (id: string | number) => {
  return <DetailCell id={id} update updatePath={PATHS.SUBCATEGORIES.UPDATE} />;
};
