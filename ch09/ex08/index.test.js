import { Action, cancelAlarm, elapseSnoozeTime, reachedToAlarmTime, setAlarm, snooze, State, } from './index.ts';
describe('AlarmClock state transitions - exhaustive test', () => {
    const transitions = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLE1BQU0sRUFFTixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixRQUFRLEVBQ1IsTUFBTSxFQUNOLEtBQUssR0FFTixNQUFNLFlBQVksQ0FBQztBQUlwQixRQUFRLENBQUMsZ0RBQWdELEVBQUUsR0FBRyxFQUFFO0lBQzlELE1BQU0sV0FBVyxHQVFiO1FBQ0YsUUFBUSxFQUFFO1lBQ1I7Z0JBQ0UsRUFBRSxFQUFFLFFBQVE7Z0JBQ1osSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNO2dCQUNsQixFQUFFLEVBQUUsS0FBSyxDQUFDLFNBQVM7Z0JBQ25CLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSTthQUNwQjtZQUNEO2dCQUNFLEVBQUUsRUFBRSxRQUFRO2dCQUNaLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUztnQkFDckIsRUFBRSxFQUFFLEtBQUssQ0FBQyxTQUFTO2dCQUNuQixNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUk7YUFDcEI7WUFDRDtnQkFDRSxFQUFFLEVBQUUsUUFBUTtnQkFDWixJQUFJLEVBQUUsS0FBSyxDQUFDLGNBQWM7Z0JBQzFCLEVBQUUsRUFBRSxLQUFLLENBQUMsY0FBYztnQkFDeEIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJO2FBQ3BCO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFFLFFBQVE7Z0JBQ1osSUFBSSxFQUFFLEtBQUssQ0FBQyxRQUFRO2dCQUNwQixFQUFFLEVBQUUsS0FBSyxDQUFDLFFBQVE7Z0JBQ2xCLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSTthQUNwQjtTQUNGO1FBQ0QsV0FBVyxFQUFFO1lBQ1g7Z0JBQ0UsRUFBRSxFQUFFLFdBQVc7Z0JBQ2YsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNO2dCQUNsQixFQUFFLEVBQUUsS0FBSyxDQUFDLE1BQU07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