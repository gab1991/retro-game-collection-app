import React from 'react';
import styles from './Layout.module.css';
import Navigation from '../Navigation/Navigation';

export default function Layout(props) {
  return (
    <div className={styles.Layout}>
      <Navigation />
      {props.children}
      <footer className={styles.Footer}>
        <a href="https://rawg.io/" target="_blank">
          RAWG
        </a>{' '}
        is the source of the data and screenshots / boxarts are provided by{' '}
        <a href="https://emumovies.com/" target="_blank">
          emumovies.com
        </a>
      </footer>
    </div>
  );
}
