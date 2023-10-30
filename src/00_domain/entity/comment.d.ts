import type { ID, Text, Timestamp } from '../common/value';
import type { AuthorData } from './author';

export interface CommentData {
  id: ID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  body: Text;
  author: AuthorData;
}
