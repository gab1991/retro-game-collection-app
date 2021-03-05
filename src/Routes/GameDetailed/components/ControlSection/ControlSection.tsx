import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ButtonNeon, IButtonNeon } from 'Components/UI';
import { EAvailableLists } from 'Configs/appConfig';
import { useGameDetailedContext } from 'Routes/GameDetailed/context';
import { setIsOwned, setIsWished } from 'Routes/GameDetailed/reducer/actions';
import { showAuthModal } from 'Store/appStateReducer/actions';
import { selectLoggedUser } from 'Store/authReducer/selectors';
import { selectProfile } from 'Store/profileReducer/selectors';
import { IRawgGameDetails } from 'Typings/RawgData';

import { checkIfInList } from './helpers';

import styles from './ControlSection.module.scss';

export function ControlSection(): JSX.Element {
  const { platformName, gameDetails, toggleList, isWished, isOwned } = useGameDetailedContext();
  const dispatch = useDispatch();
  const history = useHistory();
  const username = useSelector(selectLoggedUser);
  const profileInfo = useSelector(selectProfile);

  useEffect(() => {
    if (!(profileInfo && gameDetails)) return;
    const listToCheck = [EAvailableLists.ownedList, EAvailableLists.wishList];

    for (const list of listToCheck) {
      const inList = checkIfInList(profileInfo, list, platformName, gameDetails.name);

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
  }, [profileInfo, gameDetails, platformName, dispatch]);

  const showAuth = () => {
    dispatch(showAuthModal(true));
  };

  const getBack = () => {
    history.goBack();
  };

  const buttons: IControlSectionButton[] = [
    {
      color: isWished ? 'red' : 'green',
      disabled: username ? false : true,
      onClick: () => toggleList(platformName, gameDetails as IRawgGameDetails, EAvailableLists.wishList),
      tooltip: !username
        ? {
            btnOnclick: showAuth,
            txtContent: `Need to be logged in to add games to the lists `,
          }
        : undefined,
      txtContent: isWished ? 'Remove from Wishlist' : 'Add to Wishlist',
    },
    {
      color: isOwned ? 'red' : 'green',
      disabled: username ? false : true,
      onClick: () => toggleList(platformName, gameDetails as IRawgGameDetails, EAvailableLists.ownedList),
      tooltip: !username
        ? {
            btnOnclick: showAuth,
            txtContent: `Need to be logged in to add games to the lists `,
          }
        : undefined,
      txtContent: isOwned ? 'Remove from Owned' : 'Owned',
    },
    {
      color: 'gray',
      onClick: getBack,
      txtContent: 'Back',
    },
  ];

  return (
    <div className={styles.ContorlsSection}>
      <hr></hr>
      <div className={styles.ButtonsContainer}>
        {buttons.map(({ disabled, color, txtContent, onClick, tooltip }) => (
          <div className={styles.ButtonNeonWrapper} key={txtContent}>
            <ButtonNeon
              className={styles.ButtonNeon}
              disabled={disabled}
              color={color}
              txtContent={txtContent}
              onClick={onClick}
            />
            {tooltip && (
              <div className={styles.ButtonTooltip}>
                {tooltip.txtContent}
                <button onClick={tooltip.btnOnclick}>GO TO LOGIN</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <hr></hr>
    </div>
  );
}

interface IControlSectionButton extends IButtonNeon {
  tooltip?: {
    btnOnclick: () => void;
    txtContent: string;
  };
}
