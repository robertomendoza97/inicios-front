import { IOneOrder } from "../interfaces/get-one-order.interface";
import { ORDER_LABELS } from "../utils/const";
import { Divider } from "@/src/components";
import {
  formatNumberToPrice,
  GENERAL_LABELS,
  getFormattedDate
} from "@/src/utils";

interface Props {
  orderDetails: IOneOrder;
}
export const OrderDetails = ({ orderDetails }: Props) => {
  const receiveDate = orderDetails.receiptDate
    ? orderDetails.receiptDate
    : ORDER_LABELS.DETAILS.NO_RECEIVED;

  return (
    <div className="shadow-lg rounded-sm border border-gray-200 max-w-[90%] min-w-[50%] p-6 bg-white flex gap-3 flex-col items-center grow max-h-[90%]">
      <h1 className="text-3xl font-semibold">{ORDER_LABELS.DETAILS.TITLE}</h1>
      <div className="w-full flex flex-col gap-5">
        <div className="flex gap-5 w-full justify-between">
          <div className="flex flex-col justify-between grow shadow rounded bg-gray-50 p-3">
            <div className="h-full flex gap-2">
              <h5 className="font-semibold">{ORDER_LABELS.RECEIVE.PROVIDER}</h5>
              <p>{orderDetails.provider}</p>
            </div>
            <div className="h-full flex justify-between">
              <h5 className="font-semibold">
                {ORDER_LABELS.RECEIVE.ORDER_DATE}
              </h5>
              <p>{orderDetails.orderDate}</p>
            </div>
          </div>
          <div className="grow min-w-[30%] shadow bg-gray-50 p-3">
            <div className="">
              <h5 className="font-semibold">
                {ORDER_LABELS.DETAILS.RECEIVE_DATE}
              </h5>
              <p>{receiveDate}</p>
            </div>
            <div>
              <h5 className="font-semibold">
                {ORDER_LABELS.DETAILS.RECEIVE_DATE}
              </h5>
              <p>{orderDetails.receivedBy?.name}</p>
            </div>
          </div>
        </div>
      </div>
      <Divider />

      <div className="w-full grow overflow-auto flex flex-col gap-3">
        {orderDetails.orderDetail.map(od => (
          <div
            key={od.id}
            className="shadow rounded bg-gray-50 p-3 flex flex-col gap-3"
          >
            <div className="flex gap-5">
              <span className="font-bold">{ORDER_LABELS.DETAILS.NAME}</span>
              <h6>{od.productId.name}</h6>
            </div>
            <div className="flex justify-between items-center gap-5">
              <p className="flex gap-3">
                <span className="font-bold">
                  {ORDER_LABELS.NEW_ONE.COST_PRICE}
                </span>
                <span>
                  {formatNumberToPrice(od.costPrice, "$", true)}{" "}
                  {GENERAL_LABELS.C_U}
                </span>
              </p>
              <div className="flex gap-5">
                <p className="flex gap-3">
                  <span className="font-bold">
                    {ORDER_LABELS.DETAILS.REQUESTED}
                  </span>
                  <span>{od.quantity}</span>
                </p>
                <p className="flex gap-3">
                  <span className="font-bold">
                    {ORDER_LABELS.DETAILS.DAMAGED}
                  </span>
                  <span> {od.damagedUnits}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
