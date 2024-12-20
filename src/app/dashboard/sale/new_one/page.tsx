import { Invoice, SALES_LABELS } from "@/src/sales";

const NewSalePage = () => {
  return (
    <div className="w-full h-full flex">
      <aside className="grow "></aside>
      <Invoice />
    </div>
  );
};

export default NewSalePage;
