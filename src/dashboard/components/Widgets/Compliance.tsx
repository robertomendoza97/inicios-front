import { Badge } from "flowbite-react";
import { BiError } from "react-icons/bi";
import { LuCheckCircle } from "react-icons/lu";
import { DASHBOARD_LABELS } from "../../";

export const Compliance = () => {
  return (
    <div className="bg-white shadow-md rounded">
      <div className="p-4 pb-0">
        <h3 className="font-bold uppercase text-sm">
          {DASHBOARD_LABELS.COMPLIANCE.TITLE}
        </h3>
        <p className="lowercase text-[10px]">
          {DASHBOARD_LABELS.COMPLIANCE.SUBTITLE}
        </p>
      </div>
      <div className="w-full bg-paletteColor2 flex p-2 items-center justify-center my-4">
        <span className="text-black font-bold text-4xl">70%</span>
      </div>
      <div className="p-4 pt-0">
        <p className="lowercase text-[14px]">
          {DASHBOARD_LABELS.COMPLIANCE.SUMMARY}
        </p>

        <div className="flex justify-between p-4 items-center">
          <Badge
            icon={LuCheckCircle}
            className="flex text-lg rounded-full cursor-pointer"
            color="green"
          >
            5
          </Badge>
          <Badge
            icon={BiError}
            className="flex text-lg rounded-full cursor-pointer"
            color="red"
          >
            0
          </Badge>
        </div>
      </div>
    </div>
  );
};
