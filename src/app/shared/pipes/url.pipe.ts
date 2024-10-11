import { inject, Pipe, PipeTransform } from '@angular/core';
import { Environment } from '../intefaces';

@Pipe({
  name: 'url',
  standalone: true
})
export class UrlPipe implements PipeTransform {
  private readonly environment = inject(Environment);
  transform(url: string): string {
    return `${this.environment.apiUrl.replace('/api', '')}${url}`;
  }

}
