import { inject, Pipe, PipeTransform } from '@angular/core';
import { Environment } from '../intefaces/environment';

@Pipe({
  name: 'url',
  standalone: true
})
export class UrlPipe implements PipeTransform {
  private readonly environment = inject(Environment);
  transform(url: string): unknown {
    return `${this.environment.apiUrl}${url}`;
  }

}
