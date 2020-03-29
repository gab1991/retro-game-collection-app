import React, { useState, useEffect } from 'react';
import styles from './SelectBox.css';

export default function SelectBox(props) {
  const { selected, options, changedSelected, height, width } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState(selected);

  const clickHandler = e => {
    setShowDropdown(!showDropdown);
  };

  const changeHandler = e => {
    setSelectedValue(e.target.textContent);
  };

  useEffect(() => {
    changedSelected(selectedValue);
  }, [selectedValue]);

  return (
    <div className={styles.SelectBox} onClick={clickHandler}>
      <div className={`${styles.TextSection} ${styles.Selection}`}>
        {selectedValue}
      </div>
      {showDropdown && (
        <div className={styles.Options}>
          {options.map(option => {
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
