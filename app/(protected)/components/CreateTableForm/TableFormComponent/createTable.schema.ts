'use client'
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required").min(5),
  private: yup
    .mixed()
    .nullable()
    .test('is-boolean', 'Choose method', (value) => value === 'true' || value === 'false')
    .required('Choose Method'),
  classic: yup
    .mixed()
    .nullable()
    .test('is-boolean', 'Choose Method', (value) => value === 'true' || value === 'false')
    .required('Choose Method'),
});

export default schema;
