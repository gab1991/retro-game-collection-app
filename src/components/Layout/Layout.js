import React from 'react';
import styles from './Layout.css';

export default function Layout(props) {
  return (
    <div className={styles.Layout}>
      {props.children}
      <div className={styles.Footer}>
        <footer>
          <a href="https://rawg.io/" target="_blank">
            RAWG
          </a>{' '}
          is the source of the data and screenshots / boxarts are provided by{' '}
          <a href="https://emumovies.com/" target="_blank">
            emumovies.com
          </a>
        </footer>
      </div>
    </div>
  );
}
