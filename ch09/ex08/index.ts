export const State = {
  NORMAL: 'normal',
  ALARM_SET: 'alarmSet',
  ALARM_SOUNDING: 'alarmSounding',
  SNOOZING: 'snoozing',
} as const;

export type StateType = (typeof State)[keyof typeof State];

export const Action = {
  NONE: 'none',
  SOUND_ALARM: 'soundAlarm',
  STOP_ALARM: 'stopAlarm',
} as const;

type EventResult = [StateType, ActionType];

export type ActionType = (typeof Action)[keyof typeof Action];

export const setAlarm = (state: StateType): EventResult => {
  switch (state) {
    case State.NORMAL:
      return [State.ALARM_SET, Action.NONE];
    default:
      return [state, Action.NONE];
  }
};

export const cancelAlarm = (state: StateType): EventResult => {
  switch (state) {
    case State.ALARM_SET:
      return [State.NORMAL, Action.NONE];
    case State.ALARM_SOUNDING:
      return [State.NORMAL, Action.STOP_ALARM];
    case State.SNOOZING:
      return [State.NORMAL, Action.NONE];
    default:
      return [state, Action.NONE];
  }
};

export const reachedToAlarmTime = (state: StateType): EventResult => {
  switch (state) {
    case State.ALARM_SET:
      return [State.ALARM_SOUNDING, Action.SOUND_ALARM];
    default:
      return [state, Action.NONE];
  }
};

export const snooze = (state: StateType): EventResult => {
  switch (state) {
    case State.ALARM_SOUNDING:
      return [State.SNOOZING, Action.STOP_ALARM];
    default:
      return [state, Action.NONE];
  }
};

export const elapseSnoozeTime = (state: StateType): EventResult => {
  switch (state) {
    case State.SNOOZING:
      return [State.ALARM_SOUNDING, Action.SOUND_ALARM];
    default:
      return [state, Action.NONE];
  }
};

// フローにないパターンではエラーを出すようにするなども考える
