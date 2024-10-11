import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

const DEFAULT_DURATION_MS = 3000;

export enum SnackbarMessageType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private readonly snackBar = inject(MatSnackBar);

  /**
   * Notify a user with a message.
   * @param message Human-readable message.
   * @param type Whether the message is potentially dangerous. Applies styles for extra attention when `true`.
   * @param duration Duration of notification message.
   */
  public open(
    message: string,
    type: SnackbarMessageType = SnackbarMessageType.Success,
    duration: number = DEFAULT_DURATION_MS,
  ): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration,
      data: { message, type },
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'custom-snack-bar',
    });
  }
}
