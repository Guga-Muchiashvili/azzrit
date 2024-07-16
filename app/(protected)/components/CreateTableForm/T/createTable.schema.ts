'use client'
import * as yup from "yup";

 const schema = yup.object().shape({
  title: yup.string().required("title is required"),
  private: yup.boolean(),
  classic : yup.boolean()
});

export default schema