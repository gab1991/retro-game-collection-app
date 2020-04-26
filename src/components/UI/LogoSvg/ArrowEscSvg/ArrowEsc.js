import React from 'react';
import styles from './ArrowEsc.module.scss';

export default function ArrowEsc({ arrow }) {
  return (
    <svg
      className={styles.SvgArrow}
      viewBox={arrow ? '0 0 694 374' : '0 0 42 42'}
      fill="parentColor"
      xmlns="http://www.w3.org/2000/svg">
      {arrow && (
        <>
          <path d="M1 26.0623L26.7497 0.404449L374.26 346.786L346.948 374L1 26.0623Z" />
          <path d="M693.347 28.1222L667.651 2.41028L319.636 346.786L346.948 374L693.347 28.1222Z" />
        </>
      )}
      {!arrow && (
        <>
          <path d="M8.34465e-07 2.82843L2.82843 0L41.0122 38.1838L38.1838 41.0122L8.34465e-07 2.82843Z" />
          <path d="M41.0122 2.82843L38.1838 0L0 38.1838L2.82843 41.0122L41.0122 2.82843Z" />
        </>
      )}
    </svg>
  );
}
