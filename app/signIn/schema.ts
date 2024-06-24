'use client'
import * as yup from "yup";

 const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required").min(8),
});

export default schema