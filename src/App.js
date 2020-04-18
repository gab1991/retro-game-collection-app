import React, { useEffect } from 'react';
import styles from './App.module.scss';
import { useDispatch } from 'react-redux';
import { profile, signIn } from './actions/actions';
import { Route, Switch } from 'react-router-dom';
import Backend from './Backend/Backend';
import Layout from './components/Layout/Layout';
import PlatformSelector from './components/PlatformSelector/PlatformSelector';
import GameSelector from './components/GameSelector/GameSelector';
import GameDetailed from './components/GameDetailed/GameDetailed';
import Profile from './components/Profile/Profile';

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
          <Route exact path="/" component={PlatformSelector} />
          <Route exact path="/profile/:section?" component={Profile} />
          <Route exact path="/:platformName" component={GameSelector} />
          <Route
            exact
            path={`/:platformName/:gameSlug`}
            component={GameDetailed}
          />
          )}
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
