import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { useEffectCallback } from 'CustomHooks';
import { parse, stringify } from 'query-string';

import { IGameSelectorQuery } from '../reducer/types';

import { changePageNumber, changeSearchStrAction, setNewOrdering, setParsedQueryParams } from '../reducer/actions';
import { selectQuery } from '../reducer/selectors';
import { isEGameSelectorOrderingDirection, isEGameSelectorOrderingName } from 'Configs/appConfig';

interface IUseGameSelectorUrlReturn {
  changePage: (page: number) => void;
  changeSearchStr: (str: string) => void;
  query: IGameSelectorQuery;
  setOrdering: (option: string) => void;
}

export function useGameSelectorUrl(): IUseGameSelectorUrlReturn {
  const { search: searchUrl, pathname } = useLocation();
  const history = useHistory();
  const query = useSelector(selectQuery);
  const { search, page, ordername, direction } = query;
  const dispatch = useDispatch();

  const parseInitialUrl = useEffectCallback(() => {
    const parsedParams = parse(searchUrl);
    dispatch(setParsedQueryParams(parsedParams));
  });

  useEffect(() => {
    parseInitialUrl();
  }, [parseInitialUrl]);

  useEffect(() => {
    history.push(`${pathname}?${stringify({ direction, ordername, page, search })}`);
  }, [search, page, ordername, direction, history, pathname]);

  const setOrdering = (option: string) => {
    const [ordername, direction] = option.split(' ');

    if (isEGameSelectorOrderingDirection(direction) && isEGameSelectorOrderingName(ordername)) {
      dispatch(setNewOrdering({ direction, ordername }));
    }
  };

  const changeSearchStr = (str: string) => dispatch(changeSearchStrAction(encodeURI(str)));

  const changePage = (page: number) => dispatch(changePageNumber(page));

  return { changePage, changeSearchStr, query, setOrdering };
}
