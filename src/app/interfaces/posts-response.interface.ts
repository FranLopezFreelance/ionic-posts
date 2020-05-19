import { IPost } from './post.interface';

export interface IPostsResponse {
  ok: boolean;
  page: number;
  posts: IPost[];
}