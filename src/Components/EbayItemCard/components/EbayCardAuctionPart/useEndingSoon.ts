import { useEffect, useState } from 'react';
import { useInterval } from 'CustomHooks';

import { calcExpiringTime, ITimeSpread } from './countdownConverter';

const REFRESH_TIME_MS = 1000;
const ADDITIONAL_ZERO_BOUNDARY = 10;

type TTimeSpreadStingVal = { [k in keyof ITimeSpread]?: string };

interface IUseEndingSoon {
  endingSoon: null | TTimeSpreadStingVal;
}

export function useEndingSoon(endTime?: string): IUseEndingSoon {
  const [endingSoon, setIsEndingSoon] = useState<null | TTimeSpreadStingVal>(null);
  const { clearHookInterval, setHookInterval } = useInterval();

  useEffect(() => {
    if (!endTime) {
      return;
    }

    const { days } = calcExpiringTime(endTime);

    if (days < 1) {
      setHookInterval(() => {
        const { hours, minutes, seconds } = calcExpiringTime(endTime);

        setIsEndingSoon({
          hours: `${hours < ADDITIONAL_ZERO_BOUNDARY ? '0' : ''}${hours}`,
          minutes: `${minutes < ADDITIONAL_ZERO_BOUNDARY ? '0' : ''}${minutes}`,
          seconds: `${seconds < ADDITIONAL_ZERO_BOUNDARY ? '0' : ''}${seconds}`,
        });
      }, REFRESH_TIME_MS);
    }
    return () => clearHookInterval();
  }, [endTime]);

  return { endingSoon };
}
