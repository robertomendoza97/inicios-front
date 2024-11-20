import { DetailCell } from "@/src/components";
import { GENERAL_LABELS, PATHS } from "@/src/utils";

export const subcategoriesAction = (id: string | number) => {
  return (
    <DetailCell
      id={id}
      options={[
        {
          icon: "update",
          path: PATHS.SUBCATEGORIES.UPDATE,
          tooltip: GENERAL_LABELS.ACTIONS.UPDATE
        }
      ]}
    />
  );
};
