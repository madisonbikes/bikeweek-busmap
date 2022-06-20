/*
 * Copyright (c) Madison Bikes and Ben Sandee (tbsandee@orangebikelabs.com) 2021.
 */

/** simple schedule api that's easy to replace/mock with DI for testing */
type ScheduledFunction = (() => Promise<void>) | (() => void);

/** a thing that can be cancelled */
export interface Cancellable {
  cancel(): void;
}

type ScheduleOnceProps = {
  delayInMillis?: number;
};

type ScheduleRepeatProps = ScheduleOnceProps & {
  intervalInMillis: number;
};

export const scheduleOnce = (
  run: ScheduledFunction,
  { delayInMillis }: ScheduleOnceProps
): Cancellable => {
  const canceller = setTimeout(run, delayInMillis);

  return {
    cancel: () => {
      clearTimeout(canceller);
    },
  };
};

export const scheduleRepeat = (
  run: ScheduledFunction,
  { intervalInMillis, delayInMillis }: ScheduleRepeatProps
): Cancellable => {
  if (delayInMillis === undefined) {
    delayInMillis = intervalInMillis;
  }
  const timeouts = new Array<NodeJS.Timeout | undefined>(2);
  timeouts[0] = setTimeout(async () => {
    timeouts[0] = undefined;
    timeouts[1] = setInterval(run, intervalInMillis);
    await run();
  }, delayInMillis);
  return {
    cancel: () => {
      if (timeouts[0]) {
        clearTimeout(timeouts[0]);
        timeouts[0] = undefined;
      }
      if (timeouts[1]) {
        clearInterval(timeouts[1]);
        timeouts[1] = undefined;
      }
    },
  };
};
