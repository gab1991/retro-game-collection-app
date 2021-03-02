const MS_IN_SECONDS = 1000;
const SECONDS_IN_DAY = 86400;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

const FULL_HOURS_MODULAR = 24;
const FULL_MINUTES_SECONDS_MODULAR = 60;

export interface ITimeSpread {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const calcExpiringTime = (endTimeMs: number | string): ITimeSpread => {
  const endTime = Number(new Date(endTimeMs));
  const currentTime = Number(new Date());
  const diffInSecs = Math.abs(endTime - currentTime) / MS_IN_SECONDS;

  const days = Math.floor(diffInSecs / SECONDS_IN_DAY);
  const hours = Math.floor(diffInSecs / SECONDS_IN_HOUR) % FULL_HOURS_MODULAR;
  const minutes = Math.floor(diffInSecs / SECONDS_IN_MINUTE) % FULL_MINUTES_SECONDS_MODULAR;
  const seconds = Math.floor(diffInSecs % FULL_MINUTES_SECONDS_MODULAR);

  return { days, hours, minutes, seconds };
};
