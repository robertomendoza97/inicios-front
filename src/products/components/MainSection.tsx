import { CustomInput, CustomRadioInput, CustomSelect } from "@/src/components";
import { CREATE_PRODUCT_LABELS, CreateProductFormValues } from "../";
import { GENERAL_LABELS } from "@/src/utils";
import { Dispatch, SetStateAction, useCallback } from "react";
import { SingleCategory } from "@/src/categories";

interface Props {
  setFormValues: Dispatch<SetStateAction<CreateProductFormValues>>;
  formValues: CreateProductFormValues;
  showErrors: boolean;
  categories: SingleCategory[];
}

export const MainSection = ({
  formValues,
  setFormValues,
  showErrors,
  categories
}: Props) => {
  const handleChange = (name: string, value: string) => {
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const getSubCategories = useCallback(() => {
    const selectedCategory: SingleCategory | undefined = categories.find(
      c => c.id === Number(formValues.category)
    );

    return (
      selectedCategory?.subCategories.map(sc => ({
        key: sc.id.toString(),
        value: sc.name
      })) || []
    );
  }, [formValues.category, categories]);

  return (
    <section className="flex flex-col gap-3 items-stretch">
      <CustomInput
        type="text"
        value={formValues.name}
        name="name"
        placeholder={CREATE_PRODUCT_LABELS.PLACEHOLDER.NAME}
        label={CREATE_PRODUCT_LABELS.NAME}
        onChange={handleChange}
        showErrorMessage={showErrors}
        errorMessaje={GENERAL_LABELS.VALIDATE_INPUTS.NOT_EMPTY}
      />
      <CustomInput
        value={formValues.description}
        placeholder={CREATE_PRODUCT_LABELS.PLACEHOLDER.DESCRIPTION}
        textArea
        label={CREATE_PRODUCT_LABELS.DESCRIPTION}
        name="description"
        showErrorMessage={showErrors}
        onChange={handleChange}
        errorMessaje={GENERAL_LABELS.VALIDATE_INPUTS.CONTAIN_MORE_WORDS}
      />
      <CustomSelect
        value={formValues.category}
        onChange={handleChange}
        name="category"
        label="Categoria"
        options={categories.map(c => ({
          key: c.id.toString(),
          value: c.name
        }))}
        showErrorMessage={showErrors}
        errorMessage="Debe seleccionar una categoria."
      />
      <CustomSelect
        value={formValues.subCategory}
        onChange={handleChange}
        name="subCategory"
        label="Sub Categoria"
        options={getSubCategories()}
        showErrorMessage={showErrors}
        errorMessage="Debe seleccionar una sub categoria."
      />
      <div>
        <div className="flex items-center gap-4 py-2 border-b-2 border-gray-100">
          <p className="text-paletteColor3 font-semibold">Estado:</p>
          <CustomRadioInput
            onChange={handleChange}
            name="state"
            value="new"
            label={CREATE_PRODUCT_LABELS.NEW}
          />
          <CustomRadioInput
            onChange={handleChange}
            name="state"
            value={CREATE_PRODUCT_LABELS.SECOND_HAND}
            label="Usado"
          />
        </div>
        {showErrors && formValues.state === "" && (
          <p className="text-red-500 text-sm">
            * {GENERAL_LABELS.VALIDATE_INPUTS.SELECT_ERROR}
          </p>
        )}
      </div>
      <div className="flex w-full justify-between gap-5">
        <CustomInput
          showErrorMessage={showErrors}
          type="number"
          thousandFormat
          label={CREATE_PRODUCT_LABELS.COST_PRICE}
          placeholder={CREATE_PRODUCT_LABELS.PLACEHOLDER.COST_PRICE}
          value={formValues.costPrice}
          name="costPrice"
          onChange={handleChange}
          errorMessaje={GENERAL_LABELS.VALIDATE_INPUTS.NOT_EMPTY}
        />
        <CustomInput
          showErrorMessage={showErrors}
          type="number"
          label={CREATE_PRODUCT_LABELS.RETAIL_PRICE}
          placeholder={CREATE_PRODUCT_LABELS.PLACEHOLDER.RETAIL_PRICE}
          thousandFormat
          value={formValues.retailPrice}
          name="retailPrice"
          onChange={handleChange}
          errorMessaje={GENERAL_LABELS.VALIDATE_INPUTS.NOT_EMPTY}
        />
      </div>
      <div className="flex w-full justify-between gap-5">
        <CustomInput
          showErrorMessage={showErrors}
          type="number"
          placeholder={CREATE_PRODUCT_LABELS.PLACEHOLDER.STOCK}
          label={CREATE_PRODUCT_LABELS.STOCK}
          thousandFormat
          value={formValues.quantity}
          name="quantity"
          onChange={handleChange}
          errorMessaje={GENERAL_LABELS.VALIDATE_INPUTS.NOT_EMPTY}
        />
        <CustomInput
          showErrorMessage={showErrors}
          type="number"
          placeholder={CREATE_PRODUCT_LABELS.PLACEHOLDER.BAR_CODE}
          label={CREATE_PRODUCT_LABELS.BAR_CODE}
          value={formValues.barCode}
          name="barCode"
          onChange={handleChange}
          errorMessaje={GENERAL_LABELS.VALIDATE_INPUTS.NOT_EMPTY}
        />
      </div>
    </section>
  );
};
