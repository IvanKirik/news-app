import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  public getItem(): Observable<string | null> {
    const data = localStorage.getItem('access_token');
    if (data) {
      return of(data);
    }
    return of(null);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public setItem(data: string): Observable<string> {
    localStorage.setItem('access_token', data);
    return of(data);
  }

  public removeItem(): Observable<boolean> {
    localStorage.removeItem('access_token');
    return of(true);
  }
}
