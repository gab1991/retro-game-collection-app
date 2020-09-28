import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { profile, signIn } from './Actions/actions';
import { Route, Switch, Redirect } from 'react-router-dom';
import Backend from './Backend/Backend';
import Layout from './Components/Layout/Layout';
import PlatformSelector from './Components/PlatformSelector/PlatformSelector';
import GameSelector from './Components/GameSelector/GameSelector';
import GameDetailed from './Components/GameDetailed/GameDetailed';
import Profile from './Components/Profile/Profile';

import styles from './App.module.scss';

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.token;
    if (token) {
      Backend.getProfileInfo(token)
        .then((res) => {
          dispatch(signIn(res.username, token));
          dispatch(profile(res));
        })
        .catch((err) => {
          if (err.status === 400) localStorage.removeItem('token');
          console.log({ ...err });
        });
    }
  }, []);

  return (
    <div className={styles.App}>
      <Layout>
        <Switch>
          <Route exact path="/profile/:section?" component={Profile} />
          <Route exact path="/:platformName" component={GameSelector} />
          <Route
            exact
            path={`/:platformName/:gameSlug`}
            component={GameDetailed}
          />
          <Route exact path="/" component={PlatformSelector} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
