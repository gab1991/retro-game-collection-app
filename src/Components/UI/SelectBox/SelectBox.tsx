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

  const changeHandler = (e: SyntheticEvent<HTMLLIElement>) => {
    if (e.target instanceof HTMLLIElement) {
      setSelectedValue(e.target.textContent || '');
      changedSelected(e.target.textContent || '');
    }
  };

  const leaveHandler = () => setShowDropdown(false);

  useEffect(() => {
    if (selectedValue !== selected) setSelectedValue(selected);
  }, [selected, selectedValue]);

  return (
    <ul
      className={cn(styles.SelectBox, className)}
      onClick={clickHandler}
      onKeyPress={clickHandler} //accessability rule
      onMouseLeave={leaveHandler}
      role='listbox'
    >
      <li className={cn(styles.Selection, { [styles.ListOpen]: showDropdown })}>
        <span className={styles.TextSection}>{selectedValue}</span>
        <div className={styles.SvgContainer}>
          <ArrowSvg className={cn({ [styles.SvgRotate]: showDropdown })} />
        </div>
      </li>
      {showDropdown && (
        <ul className={styles.Options}>
          {options.map((option) => {
            if (option !== selectedValue) {
              return (
                <li
                  key={option}
                  onClick={changeHandler}
                  onKeyPress={changeHandler}
                  className={styles.TextSection}
                  role='treeitem'
                >
                  {option}
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      )}
    </ul>
  );
}
