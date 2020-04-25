import React, { useState, useEffect } from 'react';
import styles from './Profile.module.scss';
import { profile, logOut } from '../../actions/actions';
import ErrorModal from '../UI/Modals/ErrorModal/ErrorModal';
import Backend from '../../Backend/Backend';
import CollectionList from '../Profile/CollictionList/CollectionLIst';
import WishList from '../Profile/WishList/WishList';
import { connect, useDispatch } from 'react-redux';

function Profile(props) {
  const { userData } = props;
  const { section } = props.match.params;
  const [activeSection, setActiveSection] = useState(
    section || 'CollecitionList'
  );
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let isSubscribed = true;
    if (userData) {
      Backend.getProfileInfo(userData.token)
        .then((res) => {
          dispatch(profile(res));
        })
        .catch((err) => {
          if (isSubscribed)
            setShowError({
              message: `Couldn't get your profile info. Try to relog`,
            });
          console.log({ Profile_err: err });
        });
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
            desc={'CollecitionList'}
            onClick={sectionToggler}
            className={
              activeSection === 'CollecitionList' ? styles.active : undefined
            }>
            My Colletction
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
