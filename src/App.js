import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import PlatformSelector from './components/PlatformSelector/PlatformSelector';
import GameSelector from './components/GameSelector/GameSelector';
import GameDetailed from './components/GameDetailed/GameDetailed';

function App(props) {
  return (
    <div className="App">
      <Layout>
        <Navigation />
        <Switch>
          <Route exact path="/" component={PlatformSelector} />
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

export default withRouter(App);
