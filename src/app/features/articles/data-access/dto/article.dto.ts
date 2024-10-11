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
  [key: string]: string | number,
  id: number
  name: string
}

export interface EmailsToSend {
  [key: string]: string | number,
  id: number
  email: string
}
