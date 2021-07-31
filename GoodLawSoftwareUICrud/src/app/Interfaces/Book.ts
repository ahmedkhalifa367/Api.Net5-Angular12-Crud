import { IAuthor } from "./Author";

export interface IBook {
  id: number;
  title: string;
  author: IAuthor;
}
