import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonsBar } from '../ButtonsBar/ButtonsBar';
import { EAvailableLists } from 'Configs/appConfig';
import { useGameDetailedContext } from 'Routes/GameDetailed/context';
import { setIsOwned, setIsWished } from 'Routes/GameDetailed/reducer/actions';
import { selectProfile } from 'Routes/Profile/reducer/selectors';

import { checkIfInList } from './helpers';

import styles from './ControlSection.module.scss';

export function ControlSection(): JSX.Element {
  const { platform, gameDetails } = useGameDetailedContext();
  const dispatch = useDispatch();
  const profileInfo = useSelector(selectProfile);

  useEffect(() => {
    if (!(profileInfo && gameDetails)) return;
    const listToCheck = [EAvailableLists.ownedList, EAvailableLists.wishList];

    for (const list of listToCheck) {
      const inList = checkIfInList(profileInfo, list, platform, gameDetails.name);

      if (!inList) continue;

      switch (list) {
        case EAvailableLists.ownedList: {
          dispatch(setIsOwned(true));
          break;
        }
        case EAvailableLists.wishList: {
          dispatch(setIsWished(true));
          break;
        }
      }
    }
  }, [profileInfo, gameDetails, platform, dispatch]);

  return (
    <div className={styles.ContorlsSection}>
      <hr></hr>
      <ButtonsBar />
      <hr></hr>
    </div>
  );
}
