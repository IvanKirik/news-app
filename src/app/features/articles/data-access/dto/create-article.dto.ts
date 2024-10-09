import { Tag } from 'primeng/tag';
import { EmailsToSend } from './article.dto';

export interface CreateArticleDto {
  title: string
  description: string
  image: string
  tags: Partial<Tag>[]
  emails: Partial<EmailsToSend>[]
  emailIsAuthor: string
  nameIsAuthor: string
}
