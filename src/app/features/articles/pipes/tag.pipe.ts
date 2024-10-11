import { Pipe, PipeTransform } from '@angular/core';
import { Tag } from '../data-access/dto/article.dto';

@Pipe({
  name: 'tag',
  standalone: true
})
export class TagPipe implements PipeTransform {

  transform(tag: Tag): string {
    return `#${tag.name}`;
  }

}
