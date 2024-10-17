import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse, UserInfo, UserState } from './auth.model';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../../../shared/intefaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly env = inject(Environment);

  public login(dto: UserState): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.env.apiUrl}auth/login`, dto);
  }

  public register(dto: UserState): Observable<void> {
    return this.http.post<void>(`${this.env.apiUrl}auth/register`, dto);
  }

  //todo implement on backend
  public logout(): Observable<void> {
    return this.http.post<void>(`${this.env.apiUrl}auth/logout`, {});
  }

  public refresh(accessToken: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.env.apiUrl}auth/refresh`,
      accessToken,
    );
  }

  public getCurrentUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.env.apiUrl}users/me`);
  }
}
