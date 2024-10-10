import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  Renderer2,
  Signal,
} from '@angular/core';
import { AuthStore } from '../../features/auth/data-access/auth.store';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appShowIfNotAuthenticated]',
  standalone: true,
})
export class ShowIfNotAuthenticatedDirective {
  private readonly authStore = inject(AuthStore);
  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  public $isLoggedIn: Signal<boolean> = this.authStore.loggedIn;

  constructor() {
    toObservable(this.$isLoggedIn)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
        } else {
          this.renderer.removeStyle(this.el.nativeElement, 'display');
        }
      });
  }
}
