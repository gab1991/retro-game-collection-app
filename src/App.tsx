import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'Components';
import { useAppConfiguration } from 'CustomHooks';
import { GameDetailedAsync, GameSelector, PlatformSelector, ProfileAsync, Routes } from 'Routes';

import { Layout } from 'Components/Layout';
import { getProfileInfo } from 'Routes/Profile/reducer/thunks';
import { selectLoggedUser } from 'Store/authReducer/selectors';
import { checkCredentialsThunk } from 'Store/authReducer/thunks';

import styles from './App.module.scss';

export function App(): JSX.Element {
  const isLogged = useSelector(selectLoggedUser);
  const dispatch = useDispatch();
  useAppConfiguration();

  useEffect(() => {
    dispatch(checkCredentialsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!isLogged) return;
    dispatch(getProfileInfo());
  }, [isLogged, dispatch]);

  return (
    <div className={styles.App}>
      <ErrorBoundary>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path={Routes.Profile.template} component={ProfileAsync} />
              <Route path={Routes.GameDetailed.template} component={GameDetailedAsync} />
              <Route path={Routes.GameSelector.template} component={GameSelector} />
              <Route path={Routes.PlatformSelector.template} component={PlatformSelector} />
            </Switch>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    </div>
  );
}
