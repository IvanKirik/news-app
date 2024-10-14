import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RequestStatus } from '../../../../shared/signal-store-features';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './create-login-modal.component.html',
  styleUrl: './create-login-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, Button, InputTextModule],
})
export class CreateLoginModalComponent {
  private readonly config = inject(DynamicDialogConfig);
  private readonly fb = inject(FormBuilder);
  private readonly submit$ = this.config.data.event;
  public readonly load: Signal<RequestStatus> = this.config.data.load;
  private currentModal$: Subject<'login' | 'register'> =
    this.config.data.currentModal;

  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  public onSubmit() {
    const dto = this.loginForm.getRawValue();
    this.loginForm.reset();
    this.submit$.next(dto);
  }

  public switchToRegister() {
    this.currentModal$.next('register');
  }
}
