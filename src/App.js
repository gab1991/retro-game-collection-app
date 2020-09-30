import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { checkCredentials } from './Store/Actions/authActions';
import { getProfileInfo } from './Store/Actions/profileActions';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import PlatformSelector from './Components/PlatformSelector/PlatformSelector';
import GameSelector from './Components/GameSelector/GameSelector';
import GameDetailed from './Components/GameDetailed/GameDetailed';
import Profile from './Components/Profile/Profile';

import styles from './App.module.scss';

function App(props) {
  const { isLogged } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkCredentials());
  }, []);

  useEffect(() => {
    if (!isLogged) return;
    dispatch(getProfileInfo());
  }, [isLogged]);

  return (
    <div className={styles.App}>
      <Layout>
        <Switch>
          <Route exact path="/profile/:section?" component={Profile} />
          <Route
            exact
            path={`/:platformName/:gameSlug`}
            component={GameDetailed}
          />
          <Route exact path="/:platformName" component={GameSelector} />
          <Route exact path="/" component={PlatformSelector} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLogged: state.logged,
  };
}

export default connect(mapStateToProps)(App);
