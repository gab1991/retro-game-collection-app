import React, { SyntheticEvent, useEffect, useState } from 'react';

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

  const clickHandler = () => {
    setShowDropdown(!showDropdown);
  };

  const changeHandler = (e: SyntheticEvent<HTMLLIElement>) => {
    if (e.target instanceof HTMLLIElement) {
      setSelectedValue(e.target.textContent || '');
      changedSelected(e.target.textContent || '');
    }
  };

  const leaveHandler = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    if (selectedValue !== selected) setSelectedValue(selected);
  }, [selected, selectedValue]);

  return (
    <div
      className={`${styles.SelectBox} ${className}`}
      onClick={clickHandler}
      onKeyPress={clickHandler} //accessability rule
      onMouseLeave={leaveHandler}
      role='listbox'
      tabIndex={0}
    >
      <div className={`${styles.Selection} ${showDropdown && styles.ListOpen}`}>
        <span className={styles.TextSection}>{selectedValue}</span>
        <div className={`${styles.SvgContainer} `}>
          <svg
            className={showDropdown ? styles.SvgRotate : undefined}
            width='100%'
            height='100%'
            viewBox='0 0 400 400'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M 100 100 L 300 100 L 200 300 z' strokeWidth='3' />
          </svg>
        </div>
      </div>
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
                  tabIndex={0}
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
    </div>
  );
}
