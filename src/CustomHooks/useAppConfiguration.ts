import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'CustomHooks';

import { TView } from 'Store/appStateReducer/types';

import { setCurrentView } from 'Store/appStateReducer/actions';
import { selectCurrenView } from 'Store/appStateReducer/selectors';

import sassVars from 'vars.scss';

const mobileBreakPoint = parseInt(sassVars['breakpoints-mobile']);
const tabletBreakpoint = parseInt(sassVars['breakpoints-tablet']);

export function useAppConfiguration(): void {
  const { width } = useWindowSize();
  const currentView = useSelector(selectCurrenView);
  const dispatch = useDispatch();

  useEffect(() => {
    let updateView: TView | null = null;

    if (width < mobileBreakPoint) {
      updateView = 'mobile';
    } else if (width < tabletBreakpoint) {
      updateView = 'tablet';
    } else if (width > tabletBreakpoint) {
      updateView = 'desktop';
    }

    if (updateView && updateView !== currentView) {
      dispatch(setCurrentView(updateView));
    }
  }, [width, currentView, dispatch]);
}
