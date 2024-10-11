import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  ImageTuple } from '../intefaces/image.interface';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../intefaces/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private readonly apiService = inject(HttpClient);
  private readonly environment = inject(Environment);

  public upload(dto: FormData): Observable<ImageTuple> {
    return this.apiService.post<ImageTuple>(this.environment.apiUrl + 'files/upload', dto);
  }
}
