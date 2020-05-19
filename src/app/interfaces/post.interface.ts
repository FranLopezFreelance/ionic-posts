import { User } from './user.interface';

export interface IPost {
  _id: string;
  created: string;
  message: string;
  images: string[];
  coords: string;
  user: User;
}