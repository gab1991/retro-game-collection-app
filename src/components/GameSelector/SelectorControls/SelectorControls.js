import React from 'react';
import styles from './SelectorControls.css';

export default function SelectorControls(props) {
  const {
    gameSearchChange,
    selectChange,
    directionChange,
    sendRequest,
    ordering,
    orderingOptions
  } = props;

  return (
    <div className={styles.SelectorControls}>
      <div>
        <p>Search game :</p>
        <input
          type="text"
          placeholder="Name of a game"
          name="gameSearch"
          onChange={gameSearchChange}
          onKeyPress={sendRequest}
        />
        <button name="searchBtn" onClick={sendRequest}>
          Search
        </button>
      </div>
      <div>
        <p>Filter by :</p>
        <select value={ordering.name} onChange={selectChange}>
          {orderingOptions.map(option => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <button onClick={directionChange} direction="desc">
          ↓
        </button>
        <button onClick={directionChange} direction="acs">
          ↑
        </button>
      </div>
    </div>
  );
}
