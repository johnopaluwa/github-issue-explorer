import { createAction, props } from '@ngrx/store';
import { ReportProgress } from 'src/app/root/helpers/report-progress';

export const authenticateToken = createAction(
  '[Token] authenticate token',
  props<{ token: string; reportProgress: ReportProgress }>()
);
export const tokenAuthenticated = createAction(
  '[Token] token authenticated',
  props<{ token: string }>()
);
