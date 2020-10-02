const trimName = (name) => {
  const regexTrim = /.+?(?=\s\()/g;
  const needToTrim = name.match(regexTrim);
  return needToTrim ? needToTrim[0] : name;
};

export { trimName };
