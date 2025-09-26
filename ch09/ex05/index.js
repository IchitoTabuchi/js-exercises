export const instanceOf = (object, constructor) => {
    // nullの場合は、.constructorが存在しないため、falseを返す
    if (typeof object !== 'object' || object === null)
        return false;
    let proto = Object.getPrototypeOf(object);
    while (proto) {
        if (proto === constructor.prototype)
            return true;
        proto = Object.getPrototypeOf(proto);
    }
    return false;
};
// Functionも引数に取れるようにする必要がある。
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsQ0FHeEIsTUFBZSxFQUNmLFdBQWMsRUFDTCxFQUFFO0lBQ1gseUNBQXlDO0lBQ3pDLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sS0FBSyxJQUFJO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFaEUsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxLQUFLLEtBQUssV0FBVyxDQUFDLFNBQVM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUNqRCxLQUFLLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUM7QUFFRiw2QkFBNkIifQ==