function makeFixedSizeArray(size) {
    const array = new Array(size);
    return {
        get(index) {
            if (index < 0 || index >= array.length) {
                throw new Error(`Array index out of range: ${index}`);
            }
            const value = array[index];
            if (value === undefined) {
                throw new Error(`Value at index ${index} is undefined`);
            }
            return value;
        },
        set(index, value) {
            if (index < 0 || index >= array.length) {
                throw new Error(`Array index out of range: ${index}`);
            }
            array[index] = value;
        },
        length() {
            return array.length;
        },
    };
}
export class DynamicSizeArray {
    static INITIAL_SIZE = 4;
    array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE);
    len = 0;
    get(index) {
        if (index < 0 || index >= this.len)
            throw new Error(`Index out of range: ${index}`);
        return this.array.get(index);
    }
    set(index, value) {
        if (index < 0 || index >= this.len)
            throw new Error(`Index out of range: ${index}`);
        this.array.set(index, value);
    }
    length() {
        return this.len;
    }
    push(value) {
        if (this.len >= this.array.length()) {
            const old = this.array;
            this.array = makeFixedSizeArray(old.length() * 2);
            for (let i = 0; i < old.length(); i++)
                this.array.set(i, old.get(i));
        }
        this.array.set(this.len, value);
        this.len++;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTLGtCQUFrQixDQUFJLElBQVk7SUFDekMsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQWdCLElBQUksQ0FBQyxDQUFDO0lBQzdDLE9BQU87UUFDTCxHQUFHLENBQUMsS0FBYTtZQUNmLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN2QyxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELENBQUM7WUFDRCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFLENBQUM7Z0JBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLEtBQUssZUFBZSxDQUFDLENBQUM7WUFDMUQsQ0FBQztZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELEdBQUcsQ0FBQyxLQUFhLEVBQUUsS0FBUTtZQUN6QixJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUN4RCxDQUFDO1lBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBQ0QsTUFBTTtZQUNKLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUN0QixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLE1BQU0sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBRWhCLEtBQUssR0FBRyxrQkFBa0IsQ0FBSSxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3RCxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBRWhCLEdBQUcsQ0FBQyxLQUFhO1FBQ2YsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRztZQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELEdBQUcsQ0FBQyxLQUFhLEVBQUUsS0FBUTtRQUN6QixJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHO1lBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBUTtRQUNYLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7WUFDcEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNyRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtnQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNiLENBQUMifQ==