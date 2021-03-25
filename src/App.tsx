import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'Components';
import { useWindowSize } from 'CustomHooks';
import { GameSelector, PlatformSelector, Profile, Routes } from 'Routes';

import { Layout } from 'Components/Layout';
import { getProfileInfo } from 'Routes/Profile/reducer/thunks';
import { setIsMobile } from 'Store/appStateReducer/actions';
import { selectLoggedUser } from 'Store/authReducer/selectors';
import { checkCredentialsThunk } from 'Store/authReducer/thunks';

import styles from './App.module.scss';
import sassVars from 'Configs/Variables.scss';

const mobileBreakPointWidth = parseInt(sassVars['breakpoints-mobile']);

const GameDetailed = React.lazy(() =>
  import(
    /* webpackChunkName: "GameDetailedPage" */
    './Routes/GameDetailed'
  ).then((module) => ({ default: module.GameDetailed }))
);

export function App(): JSX.Element {
  const isLogged = useSelector(selectLoggedUser);
  const { width } = useWindowSize();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkCredentialsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!isLogged) return;
    dispatch(getProfileInfo());
  }, [isLogged, dispatch]);

  useEffect(() => {
    dispatch(setIsMobile(width < mobileBreakPointWidth));
  }, [width, dispatch]);

  return (
    <div className={styles.App}>
      <ErrorBoundary>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Layout>
            <Switch>
              <Route path={Routes.Profile.template} component={Profile} />
              <Route path={Routes.GameDetailed.template} component={GameDetailed} />
              <Route path={Routes.GameSelector.template} component={GameSelector} />
              <Route path={Routes.PlatformSelector.template} component={PlatformSelector} />
            </Switch>
          </Layout>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
