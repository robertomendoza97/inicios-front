import { BsCalendarDate } from "react-icons/bs";
import { DASHBOARD_LABELS } from "../../utils/const";
import { Badge } from "flowbite-react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

export const LoansWidget = () => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h3 className="font-bold uppercase text-sm">
        {DASHBOARD_LABELS.LOANS.TITLE}
      </h3>
      <p className="lowercase text-[10px]">{DASHBOARD_LABELS.LOANS.SUBTITLE}</p>
      <p className="p-3 flex items-center gap-1 justify-center font-bold text-4xl">
        <FaMoneyBillTrendUp />
        <span>10</span>
      </p>
      <p className="lowercase text-[10px]">{DASHBOARD_LABELS.LOANS.TOTAL}</p>
      <p className="p-3 flex items-center justify-center font-bold text-xl">
        $ 2.000
      </p>
      <div className="flex items-center justify-between">
        <Badge icon={BsCalendarDate} className="bg-paletteColor1 text-white">
          12/12/2024
        </Badge>
        <Badge className="w-fit bg-paletteColor3 text-white cursor-pointer">
          {DASHBOARD_LABELS.LOANS.DETAILS}
        </Badge>
      </div>
    </div>
  );
};
