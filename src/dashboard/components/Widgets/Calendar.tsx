"use client";

import { es } from "react-day-picker/locale";
import { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { Button } from "flowbite-react";

export const CalendarWidget = () => {
  const defaultClassNames = getDefaultClassNames();
  const [selected, setSelected] = useState<Date>();
  const today = new Date();
  const [month, setMonth] = useState(today);

  return (
    <div className="bg-white shadow-md rounded">
      <div className="p-4 flex justify-center ">
        <DayPicker
          month={month}
          onMonthChange={setMonth}
          locale={es}
          mode="single"
          selected={selected}
          onSelect={setSelected}
          classNames={{
            root: `${defaultClassNames.root} w-full p-5 border rounded bg-gray-50`,
            months: `${defaultClassNames.months} w-full !max-w-full`,
            month: `${defaultClassNames.month} w-full`,
            month_grid: `${defaultClassNames.month_grid} w-full`
          }}
          footer={
            <Button className="uppercase" onClick={() => setMonth(today)}>
              hoy
            </Button>
          }
        />
      </div>
    </div>
  );
};
