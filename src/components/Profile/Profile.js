import React, { useState } from 'react';
import styles from './Profile.css';
import AuthModal from '../AuthModal/AuthModal';
import CollectionList from '../Profile/CollictionList/CollectionLIst';
import WishList from '../Profile/WishList/WishList';
import { logOut } from '../../actions/actions';
import { connect, useDispatch } from 'react-redux';

function Profile(props) {
  const { userData } = props;
  const [activeSection, setActiveSection] = useState('CollecitionList');
  const dispatch = useDispatch();

  const sectionToggler = e => {
    const name = e.target.getAttribute('desc');
    setActiveSection(name);
  };

  const loggingOut = () => {
    dispatch(logOut());
  };

  return (
    <div className={styles.Profile}>
      <div className={styles.Content}>
        {activeSection === 'CollecitionList' && <CollectionList />}
        {activeSection === 'WishList' && <WishList />}
      </div>
      <div className={styles.SideBar}>
        <ul>
          <li desc={'CollecitionList'} onClick={sectionToggler}>
            <span></span>
            My Colletcion
          </li>
          <li desc={'WishList'} onClick={sectionToggler}>
            <span></span>
            Wish List
          </li>
          <li onClick={loggingOut}>
            <span></span>Log Out
          </li>
        </ul>
      </div>
      {!userData && <AuthModal />}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.logged,
    profileInfo: state.profile
  };
}

export default connect(mapStateToProps)(Profile);
