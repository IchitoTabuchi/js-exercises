import { jest } from '@jest/globals';
import { retryWithExponentialBackoff } from './index.ts';
jest.useFakeTimers();
describe('retryWithExponentialBackoff', () => {
    let callback;
    beforeEach(() => {
        callback = jest.fn();
    });
    const cases = [
        {
            name: 'should succeed immediately on first try',
            funcResults: [true],
            maxRetry: 3,
            expectedResult: true,
            expectedCallbackCalls: 1,
        },
        {
            name: 'should fail after maxRetry reached',
            funcResults: [false, false, false, false],
            maxRetry: 3,
            expectedResult: false,
            expectedCallbackCalls: 1,
        },
        {
            name: 'should succeed on second attempt',
            funcResults: [false, true],
            maxRetry: 3,
            expectedResult: true,
            expectedCallbackCalls: 1,
        },
        {
            name: 'should succeed on third attempt',
            funcResults: [false, false, true],
            maxRetry: 5,
            expectedResult: true,
            expectedCallbackCalls: 1,
        },
        {
            name: 'should fail immediately if maxRetry = 0',
            funcResults: [false],
            maxRetry: 0,
            expectedResult: false,
            expectedCallbackCalls: 1,
        },
    ];
    cases.forEach(({ name, funcResults, maxRetry, expectedResult, expectedCallbackCalls, }) => {
        it(name, () => {
            let callCount = 0;
            const func = jest.fn(() => funcResults[callCount++] ?? false);
            retryWithExponentialBackoff(func, maxRetry, callback);
            if (funcResults[0] === true) {
                expect(callback).toHaveBeenCalledWith(expectedResult);
                expect(callback).toHaveBeenCalledTimes(expectedCallbackCalls);
                return;
            }
            for (let i = 1; i <= maxRetry; i++)
                jest.advanceTimersByTime(1000 * 2 ** i);
            expect(callback).toHaveBeenCalledWith(expectedResult);
            expect(callback).toHaveBeenCalledTimes(expectedCallbackCalls);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFekQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBRXJCLFFBQVEsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7SUFDM0MsSUFBSSxRQUFtQixDQUFDO0lBRXhCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxLQUFLLEdBQUc7UUFDWjtZQUNFLElBQUksRUFBRSx5Q0FBeUM7WUFDL0MsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ25CLFFBQVEsRUFBRSxDQUFDO1lBQ1gsY0FBYyxFQUFFLElBQUk7WUFDcEIscUJBQXFCLEVBQUUsQ0FBQztTQUN6QjtRQUNEO1lBQ0UsSUFBSSxFQUFFLG9DQUFvQztZQUMxQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7WUFDekMsUUFBUSxFQUFFLENBQUM7WUFDWCxjQUFjLEVBQUUsS0FBSztZQUNyQixxQkFBcUIsRUFBRSxDQUFDO1NBQ3pCO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsa0NBQWtDO1lBQ3hDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7WUFDMUIsUUFBUSxFQUFFLENBQUM7WUFDWCxjQUFjLEVBQUUsSUFBSTtZQUNwQixxQkFBcUIsRUFBRSxDQUFDO1NBQ3pCO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsaUNBQWlDO1lBQ3ZDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO1lBQ2pDLFFBQVEsRUFBRSxDQUFDO1lBQ1gsY0FBYyxFQUFFLElBQUk7WUFDcEIscUJBQXFCLEVBQUUsQ0FBQztTQUN6QjtRQUNEO1lBQ0UsSUFBSSxFQUFFLHlDQUF5QztZQUMvQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDcEIsUUFBUSxFQUFFLENBQUM7WUFDWCxjQUFjLEVBQUUsS0FBSztZQUNyQixxQkFBcUIsRUFBRSxDQUFDO1NBQ3pCO0tBQ0YsQ0FBQztJQUVGLEtBQUssQ0FBQyxPQUFPLENBQ1gsQ0FBQyxFQUNDLElBQUksRUFDSixXQUFXLEVBQ1gsUUFBUSxFQUNSLGNBQWMsRUFDZCxxQkFBcUIsR0FDdEIsRUFBRSxFQUFFO1FBQ0gsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDWixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDbEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQztZQUU5RCwyQkFBMkIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRXRELElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO2dCQUM1QixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3RELE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUM5RCxPQUFPO1lBQ1QsQ0FBQztZQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUUxQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDdEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDIn0=