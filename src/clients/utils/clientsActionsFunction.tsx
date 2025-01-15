import { DetailCell } from "@/src/components";
import { GENERAL_LABELS, PATHS } from "@/src/utils";

export const clientsActionsFunction = (id: string | number) => (
  <DetailCell
    id={id}
    options={[
      {
        path: PATHS.CLIENTS.UPDATE,
        icon: "update",
        tooltip: GENERAL_LABELS.ACTIONS.UPDATE
      }
    ]}
  />
);
