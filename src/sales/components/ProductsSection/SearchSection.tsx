"use client";

import { Button, TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import { SALES_LABELS } from "../../utils/const";

export const SearchSection = () => {
  return (
    <div className="p-5 flex gap-5">
      <TextInput
        placeholder={SALES_LABELS.PLACEHOLDERS.SEARCH_PRODUCTS}
        className="grow"
        icon={CiSearch}
      />
      <Button>{SALES_LABELS.NEW_PRODUCT}</Button>
    </div>
  );
};
