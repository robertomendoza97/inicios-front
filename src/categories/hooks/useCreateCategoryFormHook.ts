import { FormEvent, useState } from "react";
import { validateCreateCategoryData } from "../utils/validateCreateCategoryData";
import { SingleCategory } from "../interfaces/ category.inaterface";

const INITIAL_VALUES: SingleCategory = {
  name: "",
  subCategories: []
};

export const useCreateCategoryFormHook = () => {
  const [formValues, setFormValues] = useState<SingleCategory>(INITIAL_VALUES);
  const [loading, setLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateCreateCategoryData(formValues)) {
      setShowErrors(true);
      setLoading(false);
      return;
    }
  };

  return {
    formValues,
    handleChange,
    loading,
    handleSubmit,
    showErrors,
    setFormValues
  };
};
