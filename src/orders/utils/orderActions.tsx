import { DetailCell } from "@/src/components";
import { GENERAL_LABELS, PATHS } from "@/src/utils";

export const orderActions = (value: string | number) => {
  return (
    <DetailCell
      id={value}
      options={[
        {
          icon: "details",
          path: PATHS.ORDERS.DETAILS,
          tooltip: GENERAL_LABELS.ACTIONS.SEE_DETAILS
        },
        {
          icon: "update",
          path: PATHS.ORDERS.UPDATE,
          tooltip: GENERAL_LABELS.ACTIONS.UPDATE
        },
        {
          icon: "receive",
          path: PATHS.ORDERS.RECEIVE,
          tooltip: GENERAL_LABELS.ACTIONS.RECEIVE
        }
      ]}
    />
  );
};
