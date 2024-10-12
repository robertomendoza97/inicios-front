import { DetailCell } from "@/src/components";
import { PATHS } from "@/src/utils";

export const productActionsFunction = (value: string | number) => {
  return (
    <DetailCell
      id={value}
      update
      updatePath={PATHS.PRODUCTS.UPDATE}
      details
      detailsPath={PATHS.PRODUCTS.DETAILS}
    />
  );
};
