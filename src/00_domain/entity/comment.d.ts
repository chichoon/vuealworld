import type { ID, Text, Timestamp } from '../common/value';
import type { ProfileData } from './user';

export interface CommentData {
  id: ID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  body: Text;
  author: ProfileData;
}
