'use client'
import * as yup from "yup";

 const schema = yup.object().shape({
  name: yup.string().required("name is required").max(15, 'name must be lower than 15 characters'),
  email: yup.string().email("Invalid email").required("Email is required").min(8),
  image : yup.string().nullable()
});

export default schema