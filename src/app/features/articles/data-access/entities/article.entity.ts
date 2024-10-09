import { EmailsToSend, Tag } from '../dto/article.dto';

export interface ArticleEntity {
  id: number
  title: string
  author: string
  description: string
  image: string
  emailIsAuthor: string
  nameIsAuthor: string
  tags: Tag[]
  emailsToSend: EmailsToSend[]
  createdAt: Date
  updatedAt: Date
}
