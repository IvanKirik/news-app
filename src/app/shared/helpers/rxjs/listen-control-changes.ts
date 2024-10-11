import { debounceTime, defer, distinctUntilChanged, Observable, startWith } from 'rxjs';
import { AbstractControl } from '@angular/forms';

export const DEFAULT_DEBOUNCE_TIME = 300;
/**
 * Listens control's `valueChanges` field.
 * Immediately starts with default value of the control.
 * Adds delay and emits value only if it was changed.
 * Uses validation to schema to make sure the return value is correct.
 * @param control Form control.
 * @param compare Function for distinctUntilChanged.
 * @param time Debounce time.
 */
export function listenControlChanges<T>(
  control: AbstractControl,
  compare?: (x: T, y: T) => boolean,
  time: number = DEFAULT_DEBOUNCE_TIME,
): Observable<T> {
  return defer(() =>
    control.valueChanges.pipe(
      startWith(control.value),
      debounceTime(time),
      distinctUntilChanged(compare),
    ),
  );
}
