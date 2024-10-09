import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../../intefaces/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly environment = inject(Environment);

  public get<T>(
    url: string,
    params: HttpParams = new HttpParams(),
  ): Observable<T> {
    return this.http.get<T>(`${this.environment.apiUrl}${url}`, {
      headers: this.headers,
      params,
    });
  }

  public post<T, D>(
    url: string,
    dto: FormData,
    p0: { headers: { 'Content-Type': string } },
    data?: D,
  ): Observable<T> {
    return this.http.post<T>(`${this.environment.apiUrl}${url}`, data, {
      headers: this.headers,
    });
  }

  public patch<T, D>(url: string, data: D): Observable<T> {
    return this.http.put<T>(`${this.environment.apiUrl}${url}`, data, {
      headers: this.headers,
    });
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.environment.apiUrl}${url}`, {
      headers: this.headers,
    });
  }

  get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return new HttpHeaders(headersConfig);
  }
}
