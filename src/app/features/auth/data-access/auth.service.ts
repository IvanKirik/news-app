import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { Observable } from 'rxjs';
import { LoginResponse, UserState } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiService = inject(ApiService);

  public login(dto: UserState): Observable<LoginResponse> {
    return this.apiService.post<LoginResponse, UserState>('auth/login', dto);
  }

  public register(dto: UserState): Observable<void> {
    return this.apiService.post<void, UserState>('auth/register', dto);
  }
}
