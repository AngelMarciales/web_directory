import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required(),
  businessName: yup.string().required(),
  password: yup.string().required(),
  phone: yup.number().required().max(10),
  address: yup.string().required(),
  confirm_password: yup.string().required(),
  email: yup.string().email().required(),
  website: yup.string().url().nullable(),
  createdOn: yup.date().default(() => new Date()),
  check: yup.boolean().isTrue("Debe aceptar los terminos y condiciones"),
  file: yup.mixed().required("Agregue una imagen"),
  latitude: yup.number(),
  longitude: yup.number(),
  number: yup.number(),
});
