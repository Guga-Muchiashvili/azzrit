'use client'
import * as yup from "yup";

 const schema = yup.object().shape({
    password: yup.string().required("Password is required").min(8),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
});

export default schema