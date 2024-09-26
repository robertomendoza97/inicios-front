import { Dispatch, SetStateAction } from "react";
import { CREATE_PRODUCT_LABELS, NewProperty, ProductProperty } from "../";
import { useUIStore } from "@/src/store/ui-store";
import { FaRegCircleDot } from "react-icons/fa6";
import { BsTrash } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { Button } from "flowbite-react";

interface Props {
  properties: ProductProperty[];
  setProperties: Dispatch<SetStateAction<ProductProperty[]>>;
}

export const PropertiesSection = ({ properties, setProperties }: Props) => {
  const openModal = useUIStore(state => state.toggleModal);
  const setModalContent = useUIStore(state => state.setModalContent);

  const handleOpenModal = () => {
    setModalContent(<NewProperty setProperties={setProperties} />);
    openModal();
  };

  const handleDeleteProperty = (key: string) => {
    setProperties(properties.filter(prop => prop.key !== key));
  };

  return (
    <div className="flex flex-col gap-5 items-stretch">
      <h3 className="text-lg font-semibold">
        {CREATE_PRODUCT_LABELS.PROPERTIES}
      </h3>
      <div className="grow overflow-y-auto min-w-80">
        {!Boolean(properties.length) && (
          <div className="h-full w-full flex items-center justify-center">
            <FaRegListAlt
              size={200}
              className="text-gray-200 relative top-[-25px]"
            />
          </div>
        )}
        {properties.map(prop => (
          <div
            key={prop.key}
            className="flex gap-2 items-center text-sm text-nowrap justify-between"
          >
            <FaRegCircleDot size={13} />
            <div className="flex w-full gap-2">
              <p className="font-semibold">{prop.name}:</p>
              <p>{prop.value}</p>
            </div>
            <BsTrash
              size={20}
              className="cursor-pointer text-red-700"
              onClick={() => handleDeleteProperty(prop.key)}
            />
          </div>
        ))}
      </div>
      <Button
        className="bg-secondary5 hover:!bg-secondary1"
        onClick={handleOpenModal}
      >
        {CREATE_PRODUCT_LABELS.ADD_PROPERTY_BUTTON}
      </Button>
    </div>
  );
};
