"use client";

import { Button, TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import { SALES_LABELS } from "../../utils/const";
import { useSaleStore } from "@/src/store/sale-store";
import { ChangeEvent } from "react";
import Link from "next/link";
import { PATHS } from "@/src/utils";

export const SearchSection = () => {
  const setTermToSearch = useSaleStore(state => state.setTermToSearch);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTermToSearch(e.target.value);
  };

  return (
    <div className="p-5 flex gap-5">
      <TextInput
        placeholder={SALES_LABELS.PLACEHOLDERS.SEARCH_PRODUCTS}
        className="grow"
        icon={CiSearch}
        onChange={handleChange}
      />
      <Button>
        <Link href={PATHS.PRODUCTS.CREATE} target="_blank">
          {SALES_LABELS.NEW_PRODUCT}
        </Link>
      </Button>
    </div>
  );
};
