import React from "react";
import styles from "./Layout.css";

export default function Layout(props) {
  return (
    <div className={styles.Layout}>
      {props.children}
      <div className={styles.Footer}>
        <footer>All right reserved</footer>
      </div>
    </div>
  );
}
