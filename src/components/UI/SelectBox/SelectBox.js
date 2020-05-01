import React, { useState, useEffect } from 'react';
import styles from './SelectBox.module.scss';

export default function SelectBox(props) {
  const { selected, options, changedSelected } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState(selected);

  const clickHandler = (e) => {
    setShowDropdown(!showDropdown);
  };

  const changeHandler = (e) => {
    setSelectedValue(e.target.textContent);
  };

  const leaveHandler = (e) => {
    setShowDropdown(false);
  };

  useEffect(() => {
    if (selectedValue !== selected) changedSelected(selectedValue);
  }, [selectedValue]);

  return (
    <div
      className={`${styles.SelectBox} 
    `}
      onClick={clickHandler}
      onMouseLeave={leaveHandler}>
      <div className={`${styles.Selection} ${showDropdown && styles.ListOpen}`}>
        <span className={styles.TextSection}>{selectedValue}</span>
        <div className={`${styles.SvgContainer} `}>
          <svg
            className={showDropdown ? styles.SvgRotate : undefined}
            width="100%"
            height="100%"
            viewBox="0 0 400 400"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M 100 100 L 300 100 L 200 300 z" strokeWidth="3" />
          </svg>
        </div>
      </div>
      {showDropdown && (
        <div className={styles.Options}>
          {options.map((option) => {
            if (option !== selectedValue) {
              return (
                <div
                  key={option}
                  onClick={changeHandler}
                  className={styles.TextSection}>
                  {option}
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
