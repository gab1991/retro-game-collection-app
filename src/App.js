import React from 'react';
import styles from './App.module.scss';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Navigation from './components/Navigation/Navigation';
import PlatformSelector from './components/PlatformSelector/PlatformSelector';
import GameSelector from './components/GameSelector/GameSelector';
import GameDetailed from './components/GameDetailed/GameDetailed';
import Profile from './components/Profile/Profile';

function App(props) {
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
