import React from 'react';

export default function ButtonBasic(props) {
  const { txtContent, onClick: clickHander, name, color } = props;

  return (
    <button name={name} onClick={clickHander} direction={direction} className={`${styles.ButtonBasic}`}>
      {txtContent}
    </button>
  );
}
