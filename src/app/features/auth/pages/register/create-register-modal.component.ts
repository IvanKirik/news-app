import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { RequestStatus } from '../../../../shared/signal-store-features';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './create-register-modal.component.html',
  styleUrl: './create-register-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputTextModule, Button],
})
export class CreateRegisterModalComponent {
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

  public switchToLogin() {
    this.currentModal$.next('login');
  }
}
