const isStoreExist = window.localStorage ? true : false;

const storageHandler = {
  setItem: (key, value) => {
    if (!isStoreExist) return null;
    return localStorage.setItem(key, value);
  },
  setItems: (arr) => {
    if (!isStoreExist) return null;
    for (const keyValue of arr) {
      storageHandler.setItem(...keyValue);
    }
  },
  removeItem: (key, value) => {
    if (!isStoreExist) return null;
    return localStorage.removeItem(key, value);
  },
  removeItems: (arr) => {
    if (!isStoreExist) return null;
    for (const key of arr) {
      storageHandler.removeItem(key);
    }
  },
  getItem: (key) => {
    if (!isStoreExist) return null;
    return localStorage[key];
  },
  getItems: (arrOfKeys) => {
    const result = {};

    arrOfKeys.forEach((key) => {
      result[key] = storageHandler.getItem(key);
    });
    return result;
  },
};

export { storageHandler };
