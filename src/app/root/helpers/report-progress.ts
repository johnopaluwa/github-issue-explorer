import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Progress } from './progress';

export class ReportProgress<T = string> {
  private readonly internalProgress$ = new BehaviorSubject<Progress>(
    Progress.None
  );

  public readonly result$ = new ReplaySubject<T>(1);

  public readonly isInProgress$ = this.internalProgress$.pipe(
    map((s) => s === Progress.InProgress)
  );
  public readonly isFailed$ = this.internalProgress$.pipe(
    map((s) => s === Progress.Failed)
  );
  public readonly isDone$ = this.internalProgress$.pipe(
    map((s) => s === Progress.Done)
  );

  inProgress() {
    this.internalProgress$.next(Progress.InProgress);
  }

  done(withResult: T | null = null) {
    this.internalProgress$.next(Progress.Done);
    if (withResult !== null) {
      this.result$.next(withResult);
    }
  }

  failed(withResult: T | null = null) {
    this.internalProgress$.next(Progress.Failed);
    if (withResult !== null) {
      this.result$.next(withResult);
    }
  }
}
