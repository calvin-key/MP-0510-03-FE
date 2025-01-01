import * as Yup from "yup";

export const updateProfileSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
});
