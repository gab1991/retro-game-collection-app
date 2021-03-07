import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import CollectionList from './CollictionList/CollectionLIst';
import WishList from './WishList/WishList';
import { selectLoggedUser } from 'Store/authReducer/selectors';
import { getProfileInfo } from 'Store/profileReducer/thunks';

import styles from './Profile.module.scss';

enum EProfileSections {
  CollectionList = 'CollectionList',
  WishList = 'WishList',
}

const AVAILABLE_SECTION = {
  [EProfileSections.CollectionList]: <CollectionList />,
  [EProfileSections.WishList]: <WishList />,
};

export function Profile(): JSX.Element {
  const loggedUser = useSelector(selectLoggedUser);
  const { section } = useParams<{ section: EProfileSections }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState(section || EProfileSections.CollectionList);

  useEffect(() => {
    if (loggedUser) {
      dispatch(getProfileInfo());
    }
  }, [loggedUser, activeSection, dispatch]);

  const sectionToggler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const name = e.currentTarget.getAttribute('data-desc');

    if (!isProfileSectionName(name)) {
      return;
    }

    setActiveSection(name);
    history.push(`/profile/${name}`);
  };

  return (
    <section className={styles.Profile}>
      <nav className={styles.NavTabs}>
        <ul>
          <li className={activeSection === EProfileSections.CollectionList ? styles.active : ''}>
            <button onClick={sectionToggler} data-desc={EProfileSections.CollectionList}>
              My Collection
            </button>
          </li>
          <li className={activeSection === EProfileSections.WishList ? styles.active : ''}>
            <button onClick={sectionToggler} data-desc={EProfileSections.WishList}>
              Wish List
            </button>
          </li>
        </ul>
      </nav>
      <div className={styles.Content}>{AVAILABLE_SECTION[activeSection]}</div>
    </section>
  );
}

const isProfileSectionName = (name: unknown): name is EProfileSections => {
  return typeof name === 'string' ? Object.keys(EProfileSections).includes(name) : false;
};
