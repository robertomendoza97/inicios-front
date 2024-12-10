import { TextInput } from "flowbite-react";
import React, { ChangeEvent } from "react";
import { IOrderDetail, IReceiveOrderForm } from "../";
import { allowOnlyNumbers } from "@/src/utils";

interface Props {
  orderDetail: IOrderDetail[];
  handleProduct: (id: number, name: string, values: string) => void;
  formValues: IReceiveOrderForm;
}
export const ReceiveOrderProduct = ({
  orderDetail,
  handleProduct,
  formValues
}: Props) => {
  const handleChange = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    handleProduct(id, name, value);
  };

  return (
    <>
      <div className="w-full flex justify-between">
        <p className="font-semibold">Nombre:</p>
        <p className="font-semibold">Unidades dañadas</p>
      </div>
      <div className="w-full grow overflow-auto flex flex-col gap-3">
        {orderDetail.map(orderDetail => (
          <div key={orderDetail.id} className="flex items-center gap-5">
            <div className="flex w-full border rounded p-3 relative">
              <div>
                <p className="pr-10">{orderDetail.productId.name}</p>
                <div className="absolute top-2 right-2 rounded-full border w-8 h-8 flex items-center justify-center">
                  {orderDetail.quantity}
                </div>
              </div>
            </div>
            <TextInput
              onKeyDown={allowOnlyNumbers}
              value={
                formValues.orderDetails.find(od => od.id === orderDetail.id)
                  ?.damagedUnits
              }
              name="damagedUnits"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(orderDetail.id, e)
              }
            />
          </div>
        ))}
      </div>
    </>
  );
};
