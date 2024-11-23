import { DetailCell } from "@/src/components";
import { GENERAL_LABELS, PATHS } from "@/src/utils";

export const orderActions = (value: string | number) => {
  const id = value.toString().split("%")[0];
  const state = value.toString().split("%")[1];

  return (
    <DetailCell
      id={id}
      options={[
        {
          icon: "details",
          path: PATHS.ORDERS.DETAILS,
          tooltip: GENERAL_LABELS.ACTIONS.SEE_DETAILS
        },
        {
          icon: "update",
          path: PATHS.ORDERS.UPDATE,
          tooltip: GENERAL_LABELS.ACTIONS.UPDATE,
          disabled: state === "received"
        },
        {
          icon: "receive",
          path: PATHS.ORDERS.RECEIVE,
          tooltip: GENERAL_LABELS.ACTIONS.RECEIVE,
          disabled: state === "received"
        }
      ]}
    />
  );
};
