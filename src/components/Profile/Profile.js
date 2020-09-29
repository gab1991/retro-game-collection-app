import React, { useState, useEffect } from 'react';
import styles from './Profile.module.scss';
import { logOut } from '../../Store/Actions/authActions';
import { getProfileInfo } from '../../Store/Actions/profileActions';
import ErrorModal from '../UI/Modals/ErrorModal/ErrorModal';
import CollectionList from '../Profile/CollictionList/CollectionLIst';
import WishList from '../Profile/WishList/WishList';
import { connect, useDispatch } from 'react-redux';

function Profile(props) {
  const { userData } = props;
  const { section } = props.match.params;
  const [activeSection, setActiveSection] = useState(
    section || 'CollectionList'
  );
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let isSubscribed = true;
    if (userData) {
      dispatch(getProfileInfo());
    }
    return () => {
      isSubscribed = false;
    };
  }, [userData, activeSection]);

  const sectionToggler = (e) => {
    const name = e.target.getAttribute('desc');
    setActiveSection(name);
    props.history.push(`/profile/${name}`);
  };

  const cleanAuth = () => {
    dispatch(logOut());
    setShowError(false);
  };

  return (
    <div className={styles.Profile}>
      <div className={styles.NavTabs}>
        <ul>
          <li
            desc={'CollectionList'}
            onClick={sectionToggler}
            className={
              activeSection === 'CollectionList' ? styles.active : undefined
            }>
            My Collection
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
        {activeSection === 'CollectionList' && <CollectionList />}
        {activeSection === 'WishList' && <WishList />}
      </div>
      {showError && (
        <ErrorModal
          message={showError.message}
          onBackdropClick={cleanAuth}
          onBtnClick={cleanAuth}
        />
      )}
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
