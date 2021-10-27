import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
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
  const { search, pathname } = useLocation();
  const history = useHistory();
  const query = useSelector(selectQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    const parsedParams = parse(search);
    dispatch(setParsedQueryParams(parsedParams));
  }, [search, dispatch]);

  useEffect(() => {
    history.push(`${pathname}?${stringify(query)}`);
  }, [query, history, pathname]);

  const setOrdering = (option: string) => {
    const [ordername, direction] = option.split(' ');

    if (isEGameSelectorOrderingDirection(direction) && isEGameSelectorOrderingName(ordername)) {
      dispatch(setNewOrdering({ direction, ordername }));
    }
  };

  const changeSearchStr = (str: string) => {
    dispatch(changeSearchStrAction(encodeURI(str)));
  };

  const changePage = (page: number) => {
    dispatch(changePageNumber(page));
  };

  return { changePage, changeSearchStr, query, setOrdering };
}
