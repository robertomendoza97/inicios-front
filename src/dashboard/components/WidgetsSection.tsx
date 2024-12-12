import {
  TodaySales,
  Compliance,
  Income,
  CalendarWidget,
  LoansWidget
} from "..";

export const WidgetsSection = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-5 w-[80%]">
        <TodaySales />
        <Compliance />
        <Income />
        <LoansWidget />
      </div>
      <div className="grid grid-cols-[1fr_1fr] gap-5 w-[80%]">
        <div className="bg-white shadow-md rounded">shorcuts</div>
        <CalendarWidget />
      </div>
    </div>
  );
};
