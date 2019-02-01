import * as fromUi from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initState: State = {
  isLoading: false
};

export function uiReducer(state = initState, action: fromUi.acciones) {

  switch (action.type) {
    case fromUi.ACTIVATE_LOADING:
      return {
        isLoading: true
      };

    case fromUi.CLOSE_LOADING:
      return {
        isLoading: false
      };
  }

  return state;

}

