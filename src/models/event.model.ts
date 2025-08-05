import { Dayjs } from "dayjs";
import type {Category} from "../enums/categories.enum.ts";

export interface Event {
  id: number;
  title: string;
  date: Dayjs;
  description: string;
  image: string;
  category: Category;
  phone: string;
  email: string;
  location: string;
}