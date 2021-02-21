import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { ButtonNeon } from 'Components/UI';
import { TPlatformNames } from 'Configs/appConfig';
import { useGameDetailedContext } from 'Routes/GameDetailed/context';
import { showAuthModal } from 'Store/appStateReducer/actions';
import { selectLoggedUser } from 'Store/authReducer/selectors';
import { setIsOwned, setIsWished } from 'Store/gameDetailedReducer/actions';
import { selectIsOwned, selectIsWished } from 'Store/gameDetailedReducer/selectors';
import { addGame } from 'Store/gameDetailedReducer/thunks';
import { removeGame } from 'Store/profileReducer/thunks';
import { IRawgGameDetails } from 'Typings/RawgData';

import styles from './ControlSection.module.scss';

export function ControlSection(): JSX.Element {
  const { platformName, gameDetails } = useGameDetailedContext();
  const dispatch = useDispatch();
  const history = useHistory();
  const isWished = useSelector(selectIsWished);
  const isOwned = useSelector(selectIsOwned);
  const username = useSelector(selectLoggedUser);

  const toggleList = (platform: TPlatformNames, gameDetails: IRawgGameDetails, list) => {
    if (list === 'wish_list') {
      dispatch(setIsWished(!isWished));
      isWished
        ? dispatch(removeGame(gameDetails.name, list, platform))
        : dispatch(addGame(gameDetails, list, platform));
    } else if (list === 'owned_list') {
      dispatch(setIsOwned(!isOwned));
      isOwned ? dispatch(removeGame(gameDetails.name, list, platform)) : dispatch(addGame(gameDetails, list, platform));
    }
  };

  const showAuth = () => {
    dispatch(showAuthModal(true));
  };

  const getBack = () => {
    history.goBack();
  };

  const buttons = [
    {
      color: isWished ? 'red' : 'green',
      disabled: username ? false : true,
      name: 'wishListBtn',
      onClick: () => toggleList(platformName, gameDetails as IRawgGameDetails, 'wish_list'),
      tooltip: !username && {
        btnOnclick: showAuth,
        txtContent: `Need to be logged in to add games to the lists `,
      },
      txtContent: isWished ? 'Remove from Wishlist' : 'Add to Wishlist',
    },
    {
      color: isOwned ? 'red' : 'green',
      disabled: username ? false : true,
      name: 'ownedListBtn',
      onClick: () => toggleList(platformName, gameDetails as IRawgGameDetails, 'owned_list'),
      tooltip: !username && {
        btnOnclick: showAuth,
        txtContent: `Need to be logged in to add games to the lists `,
      },
      txtContent: isOwned ? 'Remove from Owned' : 'Owned',
    },
    {
      color: 'gray',
      name: 'backBtn',
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
