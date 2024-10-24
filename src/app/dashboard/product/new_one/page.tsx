import { SingleCategory } from "@/src/categories";
import { ErrorResponsePage } from "@/src/components";
import { CustomResponse } from "@/src/interfaces/CustomResponse";
import {
  CREATE_PRODUCT_PREVIEW,
  CreateProductForm,
  CreateProductFormValues,
  PRODUCT_IMAGES_PREVIEW,
  PRODUCT_PROPERTIES_PREVIEW,
  ProductProperty
} from "@/src/products";
import { cookies } from "next/headers";

const getCategories = async (): Promise<CustomResponse<SingleCategory[]>> => {
  try {
    const resp = await fetch(`${process.env.MY_DFS_HOST}/category`, {
      cache: "no-cache"
    });

    const { data } = await resp.json();

    return { data, error: false, success: true };
  } catch (error) {
    console.log(error);
    return { data: [], error: true, success: false };
  }
};

const page = async () => {
  const { data: categories, error } = await getCategories();
  const cookieStore = cookies();

  const initialValues = JSON.parse(
    cookieStore.get(CREATE_PRODUCT_PREVIEW)?.value ?? "{}"
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
