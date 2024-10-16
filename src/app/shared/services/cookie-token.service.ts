import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieTokenService {
  private readonly accessTokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';
  private readonly cookieService = inject(CookieService);

  public setTokens(accessToken: string, refreshToken: string): void {
    this.cookieService.set(this.accessTokenKey, accessToken);
    this.cookieService.set(this.refreshTokenKey, refreshToken);
  }

  public getTokens(): { accessToken: string | null; refreshToken: string | null } {
    return {
      accessToken: this.cookieService.get(this.accessTokenKey) || null,
      refreshToken: this.cookieService.get(this.refreshTokenKey) || null,
    };
  }

  public removeTokens(): void {
    this.cookieService.delete(this.accessTokenKey, '/');
    this.cookieService.delete(this.refreshTokenKey, '/');
  }
}
