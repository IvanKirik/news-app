import { concat, defer, EMPTY, finalize, MonoTypeOperatorFunction, Subject } from 'rxjs';

/**
 * Toggles loading subject when observable execution starts and ends.
 * @param subject$ Execution state subject. Will accept `true` when execution started and `false` when it's finalized.
 */
export function toggleExecutionState<T>(
  subject$: Subject<boolean>,
): MonoTypeOperatorFunction<T> {
  const startLoadingSideEffect$ = defer(() => {
    subject$.next(true);
    return EMPTY;
  });

  return (source$) =>
    concat(startLoadingSideEffect$, source$).pipe(
      finalize(() => subject$.next(false)),
    );
}
