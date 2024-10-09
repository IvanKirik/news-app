export interface ArticleDto {
  id: number
  title: string
  author: string
  description: string
  image: string
  emailIsAuthor: string
  nameIsAuthor: string
  tags: Tag[]
  emailsToSend: EmailsToSend[]
  createdAt: string
  updatedAt: string
}

export interface Tag {
  id: number
  name: string
}

export interface EmailsToSend {
  id: number
  email: string
}
