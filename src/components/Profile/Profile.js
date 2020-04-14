import React, { useState } from 'react';
import styles from './Profile.module.scss';
import AuthModal from '../AuthModal/AuthModal';
import CollectionList from '../Profile/CollictionList/CollectionLIst';
import WishList from '../Profile/WishList/WishList';
import { connect, useDispatch } from 'react-redux';
import queryString from 'query-string';

function Profile(props) {
  const { userData } = props;
  const { section } = props.match.params;
  const [activeSection, setActiveSection] = useState(
    section || 'CollecitionList'
  );
  const dispatch = useDispatch();

  const sectionToggler = (e) => {
    const name = e.target.getAttribute('desc');
    setActiveSection(name);
    props.history.push(`/profile/${name}`);
  };

  return (
    <div className={styles.Profile}>
      <div className={styles.NavTabs}>
        <ul>
          <li
            desc={'CollecitionList'}
            onClick={sectionToggler}
            className={
              activeSection === 'CollecitionList' ? styles.active : undefined
            }>
            My Colletcion
          </li>
          <li
            desc={'WishList'}
            onClick={sectionToggler}
            className={
              activeSection === 'WishList' ? styles.active : undefined
            }>
            Wish List
          </li>
        </ul>
      </div>
      <div className={styles.Content}>
        {activeSection === 'CollecitionList' && <CollectionList />}
        {activeSection === 'WishList' && <WishList />}
      </div>
      {!userData && <AuthModal />}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.logged,
    profileInfo: state.profile,
  };
}

export default connect(mapStateToProps)(Profile);
