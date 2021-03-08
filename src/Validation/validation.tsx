const regexList = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*\d).{4,15}$/,
  username: /^[a-zA-Z0-9]+$/,
};

type TAcceptableNames = keyof typeof regexList;

export function validate(name: TAcceptableNames, value: string): boolean {
  return regexList[name].test(value);
}
