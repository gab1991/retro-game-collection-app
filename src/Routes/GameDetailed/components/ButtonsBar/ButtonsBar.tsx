import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { ButtonNeon, IButtonNeon } from 'Components/UI';
import { EAvailableLists } from 'Configs/appConfig';
import { useGameDetailedContext } from 'Routes/GameDetailed/context';
import { showAuthModal } from 'Store/appStateReducer/actions';
import { selectLoggedUser } from 'Store/authReducer/selectors';

import styles from './ButtonsBar.module.scss';

interface IControlSectionButton extends IButtonNeon {
  text?: string;
  tooltip?: {
    btnOnclick: () => void;
    txtContent: string;
  };
}

export function ButtonsBar() {
  const { platform, gameDetails, toggleList, isWished, isOwned, slug } = useGameDetailedContext();
  const dispatch = useDispatch();
  const history = useHistory();
  const username = useSelector(selectLoggedUser);

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
      onClick: () => gameDetails && toggleList(platform, gameDetails.name, EAvailableLists.wishList, slug),
      text: isWished ? 'Remove from Wishlist' : 'Add to Wishlist',
      tooltip: !username
        ? {
            btnOnclick: showAuth,
            txtContent: `Need to be logged in to add games to the lists `,
          }
        : undefined,
    },
    {
      color: isOwned ? 'red' : 'green',
      disabled: username ? false : true,
      onClick: () => gameDetails && toggleList(platform, gameDetails.name, EAvailableLists.ownedList, slug),
      text: isOwned ? 'Remove from Owned' : 'Owned',
      tooltip: !username
        ? {
            btnOnclick: showAuth,
            txtContent: `Need to be logged in to add games to the lists `,
          }
        : undefined,
    },
    {
      color: 'gray',
      onClick: getBack,
      text: 'Back',
    },
  ];

  return (
    <div className={styles.ButtonsContainer}>
      {buttons.map(({ disabled, color, text, onClick, tooltip }) => (
        <div className={styles.ButtonNeonWrapper} key={text}>
          <ButtonNeon className={styles.ButtonNeon} disabled={disabled} color={color} onClick={onClick}>
            {text}
          </ButtonNeon>
          {tooltip && (
            <div className={styles.ButtonTooltip}>
              {tooltip.txtContent}
              <button onClick={tooltip.btnOnclick}>GO TO LOGIN</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
