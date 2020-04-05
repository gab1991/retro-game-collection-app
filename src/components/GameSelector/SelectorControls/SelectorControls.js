import React, { useState, useEffect } from 'react';
import styles from './SelectorControls.module.css';
import Input from '../../UI/Inputs/Input';
import SelectBox from '../../UI/SelectBox/SelectBox';
import Button from '../../UI/Buttons/Button/Button';

export default function SelectorControls(props) {
  const {
    gameSearchChange,
    selectChange,
    directionChange,
    sendRequest,
    ordering,
    orderingOptions,
  } = props;
  const [pressedBtn, setPressedBtn] = useState(ordering.direction);

  useEffect(() => {
    setPressedBtn(ordering.direction);
  }, [ordering]);

  return (
    <div className={styles.SelectorControls}>
      <div className={styles.SearchContainer}>
        <div>
          <p>Search game :</p>
        </div>
        <div className={styles.InputSection}>
          <div className={styles.Input}>
            <Input
              type="text"
              placeholder="Name of a game"
              name="gameSearch"
              onChange={gameSearchChange}
              onKeyPress={sendRequest}
            />
          </div>
          <div className={styles.InputBtn}>
            <Button
              txtContent="Search"
              onClick={sendRequest}
              rectangular
              name="searchBtn"
              letterSpacing
            />
          </div>
        </div>
      </div>
      <div className={styles.FilterContainer}>
        <div>
          <p>Filter by :</p>
        </div>
        <div className={styles.SelectBoxSection}>
          <div className={styles.SelectBox}>
            <SelectBox
              selected={ordering.name}
              options={orderingOptions}
              changedSelected={selectChange}
            />
          </div>
          <div className={styles.SelectBoxButons}>
            <Button
              txtContent="↓"
              onClick={directionChange}
              direction="desc"
              pressed={pressedBtn === 'desc' ? true : false}
              letterSpacing={false}
            />
            <Button
              txtContent="↑"
              onClick={directionChange}
              direction="acs"
              pressed={pressedBtn === 'acs' ? true : false}
              letterSpacing={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
