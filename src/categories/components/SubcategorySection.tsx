import React, { Dispatch, SetStateAction } from "react";
import { CREATE_CATEGORY_LABELS, NewSubcategory, SingleCategory } from "../";
import { Button } from "flowbite-react";
import { useUIStore } from "@/src/utils";
import { FaRegCircleDot } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { BsTrash } from "react-icons/bs";

interface Props {
  setCategory: Dispatch<SetStateAction<SingleCategory>>;
  category: SingleCategory;
}

export const SubcategorySection = ({ setCategory, category }: Props) => {
  const openModal = useUIStore(state => state.toggleModal);
  const setModalContent = useUIStore(state => state.setModalContent);

  const handleOpenModal = () => {
    setModalContent(<NewSubcategory setCategory={setCategory} />);
    openModal();
  };

  const handleUpdateSubcategory = (name: string) => {
    setModalContent(
      <NewSubcategory
        setCategory={setCategory}
        subcategory={category.subCategories.find(sc => sc.name === name)}
      />
    );
    openModal();
  };

  const handleDeleteSubcategory = (name: string) => {
    setCategory({
      ...category,
      subCategories: category.subCategories.filter(sc => sc.name !== name)
    });
  };

  return (
    <div className="flex flex-col gap-5 items-stretch max-h-full overflow-hidden w-full">
      <h3 className="text-lg font-semibold">
        {CREATE_CATEGORY_LABELS.SUBCATEGORY}
      </h3>
      <div className="max-h-[80%] overflow-y-auto">
        {category.subCategories.map(sc => (
          <div
            key={sc.name}
            className="flex gap-2 items-center text-sm justify-between"
          >
            <FaRegCircleDot size={13} />
            <p className="flex w-full gap-2">{sc.name}</p>
            <GrUpdate
              size={15}
              className="cursor-pointer"
              onClick={() => handleUpdateSubcategory(sc.name)}
            />
            <BsTrash
              size={20}
              className="cursor-pointer text-red-700"
              onClick={() => handleDeleteSubcategory(sc.name)}
            />
          </div>
        ))}
      </div>
      <Button
        className="bg-secondary5 hover:!bg-secondary1"
        onClick={handleOpenModal}
      >
        {CREATE_CATEGORY_LABELS.ADD_SUBCATEGORY}
      </Button>
    </div>
  );
};
