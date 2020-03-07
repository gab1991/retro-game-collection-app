import React from 'react';
import styles from './Paginator.css';

function pagination(currentPage, pageCount, delta) {
  let left = currentPage - delta,
    right = currentPage + delta + 1,
    result = [];

  result = Array.from({ length: pageCount }, (v, k) => k + 1).filter(
    i => i && i >= left && i < right
  );

  if (result.length > 1) {
    // Add first page and dots
    if (result[0] > 1) {
      if (result[0] > 2) {
        result.unshift('...');
      }
      result.unshift(1);
    }

    // Add dots and last page
    if (result[result.length - 1] < pageCount) {
      if (result[result.length - 1] !== pageCount - 1) {
        result.push('...');
      }
      result.push(pageCount);
    }
  }

  return result;
}

export default function Paginator({
  totalCount,
  itemsPerPage,
  currentPage,
  changeCurrentPage
}) {
  const pageCount = Math.ceil(totalCount / itemsPerPage);
  const buttons = [];
  let delta = 2;

  const buttonClick = e => {
    const lastPage = pageCount;
    const leftArrow = e.target.getAttribute('data-page') === '<<';
    const rightArrow = e.target.getAttribute('data-page') === '>>';

    if (leftArrow && currentPage !== 1) {
      changeCurrentPage(currentPage - 1);
    } else if (leftArrow && currentPage === 1) {
      changeCurrentPage(1);
    } else if (rightArrow && currentPage !== lastPage) {
      changeCurrentPage(currentPage + 1);
    } else if (rightArrow && currentPage === lastPage) {
      changeCurrentPage(lastPage);
    } else {
      changeCurrentPage(Number(e.target.getAttribute('data-page')));
    }
  };

  const arrPaginator = pagination(currentPage, pageCount, delta);

  for (let i = 0; i < arrPaginator.length; i++) {
    let k = arrPaginator[i];
    let isDots = k === '...';

    if (isDots && arrPaginator[i - 1] === 1) {
      buttons.push(
        <button
          key={Math.ceil((1 + currentPage - delta) / 2)}
          className={currentPage === k ? styles.active : null}
          data-page={Math.ceil((1 + currentPage - delta) / 2)}
          onClick={buttonClick}
        >
          {k}
        </button>
      );
    } else if (isDots && arrPaginator[i + 1] === pageCount) {
      buttons.push(
        <button
          key={Math.ceil((currentPage + pageCount + delta) / 2)}
          className={currentPage === k ? styles.active : null}
          data-page={Math.ceil((currentPage + pageCount + delta) / 2)}
          onClick={buttonClick}
        >
          {k}
        </button>
      );
    } else {
      buttons.push(
        <button
          key={k}
          className={currentPage === k ? styles.active : null}
          data-page={k}
          onClick={buttonClick}
        >
          {k}
        </button>
      );
    }
  }

  return (
    <div className={styles.Paginator}>
      {pageCount > 1 && (
        <button data-page={'<<'} onClick={buttonClick}>
          {'<<'}
        </button>
      )}
      {buttons}
      {pageCount > 1 && (
        <button data-page={'>>'} onClick={buttonClick}>
          {'>>'}
        </button>
      )}
    </div>
  );
}