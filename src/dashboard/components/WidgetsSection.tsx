import { TodaySales, Compliance, Income } from "..";

export const WidgetsSection = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-5 w-[80%]">
        <TodaySales />
        <Compliance />
        <Income />
        <div className="bg-white shadow-md rounded p-4">4</div>
      </div>
      <div className="grid grid-cols-[1fr_1fr] gap-5 w-[80%]">
        <div className="bg-white shadow-md rounded">1</div>
        <div className="bg-white shadow-md rounded">2</div>
      </div>
    </div>
  );
};
