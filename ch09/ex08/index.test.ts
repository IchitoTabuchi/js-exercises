import {
  Action,
  ActionType,
  cancelAlarm,
  elapseSnoozeTime,
  reachedToAlarmTime,
  setAlarm,
  snooze,
  State,
  StateType,
} from './index.ts';

type TransitionFn = (state: StateType) => [StateType, ActionType];

describe('AlarmClock state transitions - exhaustive test', () => {
  const transitions: Record<
    string,
    {
      fn: TransitionFn;
      from: StateType;
      to: StateType;
      action: ActionType;
    }[]
  > = {
    setAlarm: [
      {
        fn: setAlarm,
        from: State.NORMAL,
        to: State.ALARM_SET,
        action: Action.NONE,
      },
      {
        fn: setAlarm,
        from: State.ALARM_SET,
        to: State.ALARM_SET,
        action: Action.NONE,
      },
      {
        fn: setAlarm,
        from: State.ALARM_SOUNDING,
        to: State.ALARM_SOUNDING,
        action: Action.NONE,
      },
      {
        fn: setAlarm,
        from: State.SNOOZING,
        to: State.SNOOZING,
        action: Action.NONE,
      },
    ],
    cancelAlarm: [
      {
        fn: cancelAlarm,
        from: State.NORMAL,
        to: State.NORMAL,
        action: Action.NONE,
      },
      {
        fn: cancelAlarm,
        from: State.ALARM_SET,
        to: State.NORMAL,
        action: Action.NONE,
      },
      {
        fn: cancelAlarm,
        from: State.ALARM_SOUNDING,
        to: State.NORMAL,
        action: Action.STOP_ALARM,
      },
      {
        fn: cancelAlarm,
        from: State.SNOOZING,
        to: State.NORMAL,
        action: Action.NONE,
      },
    ],
    reachedToAlarmTime: [
      {
        fn: reachedToAlarmTime,
        from: State.NORMAL,
        to: State.NORMAL,
        action: Action.NONE,
      },
      {
        fn: reachedToAlarmTime,
        from: State.ALARM_SET,
        to: State.ALARM_SOUNDING,
        action: Action.SOUND_ALARM,
      },
      {
        fn: reachedToAlarmTime,
        from: State.ALARM_SOUNDING,
        to: State.ALARM_SOUNDING,
        action: Action.NONE,
      },
      {
        fn: reachedToAlarmTime,
        from: State.SNOOZING,
        to: State.SNOOZING,
        action: Action.NONE,
      },
    ],
    snooze: [
      { fn: snooze, from: State.NORMAL, to: State.NORMAL, action: Action.NONE },
      {
        fn: snooze,
        from: State.ALARM_SET,
        to: State.ALARM_SET,
        action: Action.NONE,
      },
      {
        fn: snooze,
        from: State.ALARM_SOUNDING,
        to: State.SNOOZING,
        action: Action.STOP_ALARM,
      },
      {
        fn: snooze,
        from: State.SNOOZING,
        to: State.SNOOZING,
        action: Action.NONE,
      },
    ],
    elapseSnoozeTime: [
      {
        fn: elapseSnoozeTime,
        from: State.NORMAL,
        to: State.NORMAL,
        action: Action.NONE,
      },
      {
        fn: elapseSnoozeTime,
        from: State.ALARM_SET,
        to: State.ALARM_SET,
        action: Action.NONE,
      },
      {
        fn: elapseSnoozeTime,
        from: State.ALARM_SOUNDING,
        to: State.ALARM_SOUNDING,
        action: Action.NONE,
      },
      {
        fn: elapseSnoozeTime,
        from: State.SNOOZING,
        to: State.ALARM_SOUNDING,
        action: Action.SOUND_ALARM,
      },
    ],
  };

  for (const [transitionName, cases] of Object.entries(transitions)) {
    describe(transitionName, () => {
      cases.forEach(({ fn, from, to, action }) => {
        it(`from ${from} -> to ${to} (action: ${action})`, () => {
          const [nextState, resultAction] = fn(from);
          expect(nextState).toBe(to);
          expect(resultAction).toBe(action);
        });
      });
    });
  }
});
