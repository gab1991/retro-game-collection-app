import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import CollectionList from './CollictionList/CollectionLIst';
import WishList from './WishList/WishList';
import { getProfileInfo } from 'Store/profileReducer/thunks';

import styles from './Profile.module.scss';

function _Profile(props) {
  const { loggedUser } = props;
  const { section } = props.match.params;
  const [activeSection, setActiveSection] = useState(section || 'CollectionList');
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedUser) {
      dispatch(getProfileInfo());
    }
  }, [loggedUser, activeSection, dispatch]);

  const sectionToggler = (e) => {
    const name = e.target.getAttribute('data-desc');
    setActiveSection(name);
    props.history.push(`/profile/${name}`);
  };

  return (
    <section className={styles.Profile}>
      <nav className={styles.NavTabs}>
        <ul>
          <li
            data-desc={'CollectionList'}
            onClick={sectionToggler}
            className={activeSection === 'CollectionList' ? styles.active : ''}
          >
            My Collection
          </li>
          <li
            data-desc={'WishList'}
            onClick={sectionToggler}
            className={activeSection === 'WishList' ? styles.active : ''}
          >
            Wish List
          </li>
        </ul>
      </nav>
      <div className={styles.Content}>
        {activeSection === 'CollectionList' && <CollectionList />}
        {activeSection === 'WishList' && <WishList />}
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    loggedUser: state.logged.username,
    profileInfo: state.profile,
  };
}

export const Profile = connect(mapStateToProps)(_Profile);
