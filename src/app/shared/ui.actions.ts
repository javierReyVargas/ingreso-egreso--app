import {Action} from '@ngrx/store';

export const  ACTIVATE_LOADING = '[UI Loading] Cargando...';
export const  CLOSE_LOADING = '[UI Loading] Fin de carga';


export class ActivarLoadingAction implements Action {
  readonly type = ACTIVATE_LOADING;
}

export class CerrarLoadingAction implements Action {
  readonly type = CLOSE_LOADING;
}


export type acciones = ActivarLoadingAction | CerrarLoadingAction;
