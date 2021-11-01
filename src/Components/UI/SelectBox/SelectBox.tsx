import React, { SyntheticEvent, useEffect, useState } from 'react';
import cn from 'classnames';

import { ArrowSvg } from '../Svg';

import styles from './SelectBox.module.scss';

interface ISelectBoxProps {
  changedSelected: (option: string) => void;
  className: string;
  options: Array<string>;
  selected: string;
}

export function SelectBox(props: ISelectBoxProps): JSX.Element {
  const { selected, options, changedSelected, className } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState(selected);

  const clickHandler = () => setShowDropdown(!showDropdown);

  const changeHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
    if (e.target instanceof HTMLButtonElement) {
      setSelectedValue(e.target.textContent || '');
      changedSelected(e.target.textContent || '');
    }
  };

  const leaveHandler = () => setShowDropdown(false);

  useEffect(() => {
    if (selectedValue !== selected) setSelectedValue(selected);
  }, [selected, selectedValue]);

  return (
    <div className={cn(styles.SelectBox, className)} onMouseLeave={leaveHandler}>
      <button
        className={cn(styles.TextSection, styles.TextSection_first, { [styles.TextSection_first_open]: showDropdown })}
        onClick={clickHandler}
      >
        <span>{selectedValue}</span>
        <ArrowSvg className={cn(styles.ArrowSvg, { [styles.ArrowSvg_rotated]: showDropdown })} />
      </button>
      {showDropdown && (
        <ul className={styles.Options}>
          {options.map((option, ind) => {
            const isLast = ind === options.length - 1;
            if (option !== selectedValue) {
              return (
                <li key={option}>
                  <button
                    className={cn(styles.TextSection, { [styles.TextSection_last]: isLast })}
                    onClick={changeHandler}
                  >
                    {option}
                  </button>
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      )}
    </div>
  );
}
