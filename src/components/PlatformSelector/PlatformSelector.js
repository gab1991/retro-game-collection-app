import React from "react";
import styles from "./PlatformSelector.css";
import PlatformCard from "../PlatformCard/PlatformCard";

export default function PlatformSelector(props) {
  const platformList = props.platforms;

  return (
    <div className={styles.PlatformSelector}>
      <div className={styles.box1}>
        <h1 className={styles.PlatformSelectorHeading}>Choose your platform</h1>
      </div>
      <div className={styles.PlatformContainer}>
        {platformList.map(platform => (
          <PlatformCard key={platform} name={platform} />
        ))}
      </div>
    </div>
  );
}
