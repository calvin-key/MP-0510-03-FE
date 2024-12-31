import * as Yup from "yup";

export interface CategoryFormValues {
  name: string;
  description: string;
}

export const CategorySchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  description: Yup.string().required("Description is required"),
});
