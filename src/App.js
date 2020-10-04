import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import useWindowSize from './CustomHooks/useWindowSize';
import { checkCredentials } from './Store/Actions/authActions';
import { setIsMobile } from './Store/Actions/appStateActions';
import { getProfileInfo } from './Store/Actions/profileActions';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import PlatformSelector from './Components/PlatformSelector/PlatformSelector';
import GameSelector from './Components/GameSelector/GameSelector';
import GameDetailed from './Components/GameDetailed/GameDetailed';
import Profile from './Components/Profile/Profile';
import sassVars from './Сonfigs/Variables.scss';
import styles from './App.module.scss';

const mobileBreakPointWidth = parseInt(sassVars['breakpoints-mobile']);

function App(props) {
  const { isLogged } = props;
  const { width } = useWindowSize();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkCredentials());
  }, [dispatch]);

  useEffect(() => {
    if (!isLogged) return;
    dispatch(getProfileInfo());
  }, [isLogged, dispatch]);

  useEffect(() => {
    if (width < mobileBreakPointWidth) {
      dispatch(setIsMobile(true));
    } else {
      dispatch(setIsMobile(false));
    }
  }, [width, dispatch]);

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
