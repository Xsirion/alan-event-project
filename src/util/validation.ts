import dayjs from "dayjs";
import * as Yup from 'yup';
import { type Event } from "../models/event.model.ts";
import { categories } from "../enums/categories.enum.ts";

export const validationSchema = Yup.object({
    title: Yup.string()
      .required('Tytuł jest wymagany')
      .min(3, 'Tytuł musi mieć co najmniej 3 znaki'),
    description: Yup.string()
      .required('Opis jest wymagany')
      .min(10, 'Opis musi mieć co najmniej 10 znaków'),
    date: Yup.date()
      .required('Data i czas są wymagane')
      .typeError('Nieprawidłowy format daty'),
    location: Yup.string()
      .required('Lokalizacja jest wymagana'),
    image: Yup.string()
      .url('Podaj poprawny URL')
      .nullable(),
    category: Yup.string()
      .required('Kategoria jest wymagana')
      .oneOf(categories, 'Wybierz kategorię z listy'),
    phone: Yup.string()
      .matches(/^\d{9}$/, 'Niepoprawny numer telefonu')
      .required(),
    email: Yup.string()
      .email('Niepoprawny adres email')
      .nullable()
  });

  export const initialValues: Omit<Event, 'id'> = {
    title: '',
    description: '',
    date: dayjs().add(1, 'day').hour(10).minute(0),
    location: '',
    image: '',
    category: 'Inne',
    phone: '',
    email: ''
  };