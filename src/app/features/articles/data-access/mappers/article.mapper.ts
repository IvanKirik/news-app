import { Injectable } from '@angular/core';
import { ArticleDto } from '../dto/article.dto';
import { ArticleEntity } from '../entities/article.entity';

@Injectable({
  providedIn: 'root'
})
export class ArticleMapper {
  public fromDto(dto: ArticleDto): ArticleEntity {
    return {
      ...dto,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    }
  }
}
