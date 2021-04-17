export interface IHeaderReducer {
  showBackdrop: boolean;
  showMenuSlider: boolean;
}

export enum EHeaderReducerActions {
  'HIDE_MENU' = 'HIDE_MENU',
  'TOGGLE_MENU_SLIDER' = 'TOGGLE_MENU_SLIDER',
}
