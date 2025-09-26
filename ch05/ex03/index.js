export const is31DayMonthIf = (month) => {
    if (['Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec'].includes(month))
        return true;
    else if (['Feb', 'Apr', 'Jun', 'Sep', 'Nov'].includes(month))
        return false;
    else
        throw new Error(`Invalid month: ${month}`);
};
export const is31DayMonthSwitch = (month) => {
    switch (month) {
        case 'Jan':
        case 'Mar':
        case 'May':
        case 'Jul':
        case 'Aug':
        case 'Oct':
        case 'Dec':
            return true;
        case 'Feb':
        case 'Apr':
        case 'Jun':
        case 'Sep':
        case 'Nov':
            return false;
        default:
            throw new Error(`Invalid month: ${month}`);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsQ0FBQyxLQUFhLEVBQVcsRUFBRTtJQUN2RCxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUNuRSxPQUFPLElBQUksQ0FBQztTQUNULElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDOztRQUN0RSxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQ2xELENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLENBQUMsS0FBYSxFQUFXLEVBQUU7SUFDM0QsUUFBUSxLQUFLLEVBQUUsQ0FBQztRQUNkLEtBQUssS0FBSyxDQUFDO1FBQ1gsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssS0FBSyxDQUFDO1FBQ1gsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssS0FBSztZQUNSLE9BQU8sSUFBSSxDQUFDO1FBQ2QsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssS0FBSyxDQUFDO1FBQ1gsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLEtBQUs7WUFDUixPQUFPLEtBQUssQ0FBQztRQUNmO1lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDIn0=