import { formatNumberToPrice } from "@/src/utils";

interface Props {
  date: string;
  amount: number;
  index: number;
}

export const InvoiceQuota = ({ amount, date, index }: Props) => {
  return (
    <div className="flex justify-between items-center bg-white select-none border rounded py-2 px-4">
      <p>
        cuota<span className="font-semibold ml-2">#{index}</span>
      </p>
      <p>
        el dia:<span className="font-semibold ml-2">{date}</span>
      </p>
      <p>
        de:
        <span className="font-semibold ml-2">
          {formatNumberToPrice(Number(amount.toFixed(2)), "$")}
        </span>
      </p>
    </div>
  );
};
