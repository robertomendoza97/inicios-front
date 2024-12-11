import { WidgetsSection } from "./WidgetsSection";

export const Dashboard = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="bg-white w-full flex justify-center py-5">
        <div className="w-[80%]">
          <p>crear una venta</p>
          <p>recibir un pago</p>
          <p>otra mas</p>
        </div>
      </div>
      <WidgetsSection />
    </div>
  );
};
