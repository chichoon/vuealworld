import type { AuthorData } from './userData';

export interface CommentData {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: AuthorData;
}
