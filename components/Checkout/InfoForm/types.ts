import { object, string } from "yup";

export const validationSchema = object().shape({
  firstName: string()
    .required("Your first name is required")
    .min(3, "Please enter a valid name"),
  lastName: string()
    .required("Your last name is required")
    .min(3, "Please enter a valid name"),
  email: string()
    .email("Please enter a valid email address")
    .required("Your email address is required")
    .min(3, "Please enter a valid email address."),
});

export default validationSchema;
