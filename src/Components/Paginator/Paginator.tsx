import React, { useEffect, useState } from 'react';
import { useEffectCallback } from 'CustomHooks';

import styles from './Paginator.module.scss';

const DOTS_SYMBOL = '...';

interface IPaginator {
  changeCurrentPage: (pageNum: number) => void;
  className: string;
  currentPage: number;
  itemsPerPage: number;
  totalCount: number;
}

export function Paginator(props: IPaginator): JSX.Element {
  const { changeCurrentPage, className, currentPage, itemsPerPage, totalCount } = props;
  const pageCount = Math.ceil(totalCount / itemsPerPage);
  const [buttons, setButtons] = useState<Array<JSX.Element>>([]);
  const delta = 1;

  const buttonClick: React.MouseEventHandler<HTMLButtonElement> = useEffectCallback((e) => {
    const lastPage = pageCount;
    const leftArrow = e.currentTarget.getAttribute('data-page') === '<<';
    const rightArrow = e.currentTarget.getAttribute('data-page') === '>>';

    if (leftArrow && currentPage !== 1) {
      changeCurrentPage(currentPage - 1);
    } else if (leftArrow && currentPage === 1) {
      changeCurrentPage(1);
    } else if (rightArrow && currentPage !== lastPage) {
      changeCurrentPage(currentPage + 1);
    } else if (rightArrow && currentPage === lastPage) {
      changeCurrentPage(lastPage);
    } else {
      changeCurrentPage(Number(e.currentTarget.getAttribute('data-page')));
    }
  });

  useEffect(() => {
    const arrPaginator = pagination(currentPage, pageCount, delta);
    const newButtons: JSX.Element[] = [];

    for (let i = 0; i < arrPaginator.length; i++) {
      const btnTxt = arrPaginator[i];
      const isDots = btnTxt === DOTS_SYMBOL;
      const className = currentPage === btnTxt ? styles.active : '';
      let pageToGo = btnTxt;

      if (isDots && arrPaginator[i - 1] === 1) {
        pageToGo = Math.ceil((1 + currentPage - delta) / 2);
      } else if (isDots && arrPaginator[i + 1] === pageCount) {
        pageToGo = Math.ceil((currentPage + pageCount + delta) / 2);
      }

      newButtons.push(
        <button key={pageToGo} className={className} data-page={pageToGo} onClick={buttonClick}>
          {btnTxt}
        </button>
      );
    }

    setButtons(newButtons);
  }, [currentPage, pageCount, delta, buttonClick]);

  return (
    <div className={`${styles.Paginator} ${className}`}>
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

function pagination(currentPage: number, pageCount: number, delta: number) {
  const left = currentPage - delta;
  const right = currentPage + delta + 1;
  const result: Array<number | string> = Array.from({ length: pageCount }, (_, btnTxt) => btnTxt + 1).filter(
    (i) => i && i >= left && i < right
  );

  if (result.length > 1) {
    // Add first page and dots
    if (result[0] > 1) {
      if (result[0] > 2) {
        result.unshift(DOTS_SYMBOL);
      }
      result.unshift(1);
    }

    // Add dots and last page
    if (result[result.length - 1] < pageCount) {
      if (result[result.length - 1] !== pageCount - 1) {
        result.push(DOTS_SYMBOL);
      }
      result.push(pageCount);
    }
  }

  return result;
}
