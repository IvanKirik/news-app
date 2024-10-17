import { inject, Injectable } from '@angular/core';
import { Environment } from '../intefaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly env = inject(Environment);
}
