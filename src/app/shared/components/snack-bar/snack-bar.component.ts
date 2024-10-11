import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarMessageType } from '../../services/snack-bar.service';

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [NgSwitch, NgClass, NgSwitchCase, NgSwitchDefault],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackBarComponent {
  private readonly snackRef = inject(MatSnackBarRef<SnackBarComponent>);
  public readonly snackbarMessageType = SnackbarMessageType;
  /** Snack bar data. */
  protected readonly data = inject(MAT_SNACK_BAR_DATA);

  /** Dismiss snack bar. */
  protected close(): void {
    this.snackRef.dismiss();
  }
}
