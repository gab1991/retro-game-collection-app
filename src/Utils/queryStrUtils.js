import queryString from 'query-string';

const parseQueryString = (str) => queryString.parse(str);
const stringifyQuery = (obj) => queryString.stringify(obj);

export { parseQueryString, stringifyQuery };
