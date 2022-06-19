import { object, string } from "yup";

export const validationSchema = object({
  email: string()
    .email("Please enter a valid email")
    .required("Your email is required"),
});
