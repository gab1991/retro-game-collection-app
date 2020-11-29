import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getProfileInfo } from '../../Store/Actions/profileActions';
import CollectionList from '../Profile/CollictionList/CollectionLIst';
import WishList from '../Profile/WishList/WishList';
import styles from './Profile.module.scss';

function Profile(props) {
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
    const name = e.target.getAttribute('desc');
    setActiveSection(name);
    props.history.push(`/profile/${name}`);
  };

  return (
    <section className={styles.Profile}>
      <nav className={styles.NavTabs}>
        <ul>
          <li
            desc={'CollectionList'}
            onClick={sectionToggler}
            className={activeSection === 'CollectionList' ? styles.active : ''}
          >
            My Collection
          </li>
          <li desc={'WishList'} onClick={sectionToggler} className={activeSection === 'WishList' ? styles.active : ''}>
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
    loggedUser: state.logged,
    profileInfo: state.profile,
  };
}

export default connect(mapStateToProps)(Profile);
