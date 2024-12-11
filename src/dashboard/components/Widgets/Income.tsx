import { Badge } from "flowbite-react";
import { FcMoneyTransfer } from "react-icons/fc";
import { DASHBOARD_LABELS } from "../../";

export const Income = () => {
  return (
    <div className="bg-white shadow-md rounded p-4 flex flex-col justify-between">
      <div>
        <h3 className="font-bold uppercase text-sm">
          {DASHBOARD_LABELS.INCOMIN.TITLE}
        </h3>
        <p className="lowercase text-[10px]">
          {DASHBOARD_LABELS.INCOMIN.SUBTITLE}
        </p>
      </div>
      <p className="p-3 flex items-center gap-1 justify-center font-bold text-4xl">
        <FcMoneyTransfer size={25} />
        <span>10</span>
      </p>
      <p className="lowercase text-[10px]">{DASHBOARD_LABELS.INCOMIN.TOTAL}</p>
      <p className="p-3 flex items-center justify-center font-bold text-2xl">
        $ 213
      </p>
      <div className="flex items-center justify-center">
        <Badge className="bg-paletteColor3 text-white text-lg cursor-pointer">
          {DASHBOARD_LABELS.INCOMIN.DETAILS}
        </Badge>
      </div>
    </div>
  );
};
