import { createAction, props } from '@ngrx/store';
import { ReportProgress } from 'src/app/root/helpers/report-progress';

export const saveToken = createAction(
  '[Token] save token',
  props<{ token: string }>()
);

export const tokenSaved = createAction(
  '[Token] token saved',
  props<{ token: string }>()
);

export const authenticateToken = createAction(
  '[Token] authenticate token',
  props<{ token: string; reportProgress: ReportProgress }>()
);
export const tokenAuthenticated = createAction(
  '[Token] token authenticated',
  props<{ isAuthenticated: boolean }>()
);
