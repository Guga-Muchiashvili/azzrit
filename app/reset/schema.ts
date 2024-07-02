'use client'
import * as yup from "yup";

 const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default schema