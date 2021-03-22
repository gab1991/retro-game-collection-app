const isStoreExist = window.localStorage ? true : false;

interface IStorageHandler {
  getItem: (key: string) => string | void;
  getItems: (arrOfKeys: Array<string>) => { [key: string]: string };
  removeItem: (key: string) => void;
  removeItems: (arrOfKeys: Array<string>) => void;
  setItem: (key: string, value: string) => void;
  setItems: (arrOfKeyVals: Array<[key: string, value: string]>) => void;
}

export const storageHandler: IStorageHandler = {
  getItem: (key) => {
    if (!isStoreExist) return;
    return localStorage[key];
  },
  getItems: (arrOfKeys) => {
    const result: Record<string, string> = {};

    arrOfKeys.forEach((key) => {
      result[key] = storageHandler.getItem(key) || '';
    });
    return result;
  },
  removeItem: (key) => {
    if (!isStoreExist) return;
    localStorage.removeItem(key);
  },
  removeItems: (arrOfKeys) => {
    if (!isStoreExist) return;
    for (const key of arrOfKeys) {
      storageHandler.removeItem(key);
    }
  },
  setItem: (key, value) => {
    if (!isStoreExist) return;
    localStorage.setItem(key, value);
  },
  setItems: (arrOfKeyVals) => {
    if (!isStoreExist) return;
    for (const keyValue of arrOfKeyVals) {
      storageHandler.setItem(...keyValue);
    }
  },
};
