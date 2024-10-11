import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private readonly load$ = new BehaviorSubject<boolean>(false);

  public readonly isLoad$ = this.load$.asObservable();

  public show(): void {
    this.load$.next(true);
  }

  public hide(): void {
    this.load$.next(false);
  }
}
