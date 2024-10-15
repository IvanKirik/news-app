import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  OnDestroy,
  OnInit,
  Signal,
  untracked,
} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthStore } from '../../../features/auth/data-access/auth.store';
import { Subject } from 'rxjs';
import { UserState } from '../../../features/auth/data-access/auth.model';
import { CreateLoginModalComponent } from '../../../features/auth/pages/login/create-login-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateRegisterModalComponent } from '../../../features/auth/pages/register/create-register-modal.component';
import { ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { ShowIfNotAuthenticatedDirective } from '../../directives';
import { RequestStatus } from '../../signal-store-features';
import { LoaderService, LocalStorageService } from '../../services';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonDirective,
    Ripple,
    ShowIfNotAuthenticatedDirective,
    OverlayPanelModule,
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly dialogService = inject(DialogService);
  private readonly authStore = inject(AuthStore);
  private readonly loaderService = inject(LoaderService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly localStorageService = inject(LocalStorageService);

  public readonly requestStatus: Signal<RequestStatus> =
    this.authStore.requestStatus;
  public isLoggedIn: Signal<boolean> = this.authStore.loggedIn;
  private readonly currentModal$ = new Subject<'login' | 'register'>();

  private createDialog: DynamicDialogRef | undefined;

  constructor() {
    effect(() => {
      const requestStatus = this.requestStatus();
      untracked(() => {
        requestStatus === 'pending'
          ? this.loaderService.show()
          : this.loaderService.hide();

        if (this.createDialog && requestStatus === 'fulfilled') {
          this.createDialog.destroy();
        }
      });
    });
  }

  ngOnInit() {
    this.currentModal$.subscribe((modal) => {
      if (modal === 'login') {
        this.createDialog?.destroy();
        this.openLoginModal();
      }
      if (modal === 'register') {
        this.createDialog?.destroy();
        this.openRegisterModal();
      }
    });
  }

  public openLoginModal(): void {
    const loginSubject$ = new Subject<UserState>();
    const payload = {
      data: {
        event: loginSubject$,
        load: this.authStore.requestStatus,
        currentModal: this.currentModal$,
      },
    };
    this.createDialog = this.dialogService.open(CreateLoginModalComponent, {
      width: '500px',
      header: 'Зайдите в свой аккаунт',
      ...payload,
    });
    loginSubject$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((dto) => {
      this.authStore.login(dto);
    });
  }

  public openRegisterModal(): void {
    const registerSubject$ = new Subject<UserState>();
    const payload = {
      data: {
        event: registerSubject$,
        load: this.authStore.requestStatus,
        currentModal: this.currentModal$,
      },
    };
    this.createDialog = this.dialogService.open(CreateRegisterModalComponent, {
      width: '500px',
      header: 'Зарегестрируйте аккаунт',
      ...payload,
    });
    registerSubject$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((dto) => {
        this.authStore.register(dto);
      });
  }

  public userExit(): void {
    //todo add backend on user exit, change to authStore logout
    this.localStorageService.removeTokens();
    this.authStore.setLoggedOut();
  }

  ngOnDestroy() {
    this.currentModal$.unsubscribe();
  }
}
