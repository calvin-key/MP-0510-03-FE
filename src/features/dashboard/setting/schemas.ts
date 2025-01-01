import * as yup from "yup";

export const PasswordSettingsSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Current password is required")
    .min(8, "Password must be at least 8 characters"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .notOneOf(
      [yup.ref("currentPassword")],
      "New password must be different from current password",
    ),
  confirmNewPassword: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});
