import { EHeaderReducerActions, IHeaderReducer } from './types';

export const initial: IHeaderReducer = {
  showBackdrop: false,
  showMenuSlider: false,
};

export const headerReducer = (state: IHeaderReducer, { type }: { type: EHeaderReducerActions }): IHeaderReducer => {
  switch (type) {
    case EHeaderReducerActions.TOGGLE_MENU_SLIDER: {
      const { showMenuSlider, showBackdrop } = state;
      return {
        ...state,
        showBackdrop: !showBackdrop,
        showMenuSlider: !showMenuSlider,
      };
    }
    case EHeaderReducerActions.HIDE_MENU: {
      return {
        ...state,
        showBackdrop: false,
        showMenuSlider: false,
      };
    }
    default:
      return state;
  }
};
