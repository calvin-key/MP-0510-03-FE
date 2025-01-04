import * as Yup from "yup";

export const EditUserSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  profilePicture: Yup.mixed().nullable().notRequired(),
});
