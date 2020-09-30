import queryString from 'query-string';

const updateQueryStr = (arr) => {
  // const updParams = { ...params };
  arr.forEach((el) => {
    const key = el[0];
    const value = el[1];
    // updParams[key] = value;
  });
  // return queryString.stringify(updParams);
};

const parseQueryString = (str) => queryString.parse(str);
const stringifyQuery = (obj) => queryString.stringify(obj);

export { parseQueryString, stringifyQuery };
