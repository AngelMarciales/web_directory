import { setLocale } from 'yup';

setLocale({
  mixed: {
    default: 'El valor ingresado no es válido.',
    required: 'Este campo es obligatorio.',
    notType: 'El campo debe ser de tipo ${type}.',
  },
  string: {
    email: 'El campo debe ser un correo electrónico válido.',
    min: 'El campo debe tener al menos ${min} caracteres.',
    max: 'El campo no debe superar los ${max} caracteres.',
  },
  number: {
    min: 'El valor debe ser mayor o igual a ${min}.',
    max: 'El valor debe ser menor o igual a ${max}.',
    integer: 'El valor debe ser un número entero.',
  },
  boolean: {
    isTrue: 'Debe aceptar los términos y condiciones'
  }
});