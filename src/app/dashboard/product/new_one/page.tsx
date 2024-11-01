import { AllCategoriesResponse } from "@/src/categories";
import { ErrorResponsePage } from "@/src/components";
import {
  CREATE_PRODUCT_PREVIEW,
  CreateProductForm,
  PRODUCT_IMAGES_PREVIEW,
  PRODUCT_PROPERTIES_PREVIEW
} from "@/src/products";
import { customFetch } from "@/src/services/rest.service";
import { cookies } from "next/headers";

const INITIAL_STATE = {
  name: "",
  description: "",
  state: "",
  category: "",
  retailPrice: "",
  costPrice: "",
  quantity: "",
  subCategory: "",
  barCode: ""
};

const getCategories = async () => {
  const {
    data: { data },
    error,
    success
  } = await customFetch<AllCategoriesResponse>(
    "category",
    {
      cache: "no-cache"
    },
    { data: [] }
  );

  return { data, error, success };
};

const page = async () => {
  const { data: categories, error } = await getCategories();
  const cookieStore = cookies();

  const initialValues = JSON.parse(
    cookieStore.get(CREATE_PRODUCT_PREVIEW)?.value ??
      JSON.stringify(INITIAL_STATE)
  );
  const initialProperties = JSON.parse(
    cookieStore.get(PRODUCT_PROPERTIES_PREVIEW)?.value ?? "[]"
  );
  const initialImages = JSON.parse(
    cookieStore.get(PRODUCT_IMAGES_PREVIEW)?.value ?? "[]"
  );

  if (error) return <ErrorResponsePage />;

  return (
    <div className="w-full flex flex-col h-full items-center justify-center">
      <CreateProductForm
        categories={categories}
        initialValues={initialValues}
        initialProperties={initialProperties}
        initialImages={initialImages}
      />
    </div>
  );
};

export default page;
