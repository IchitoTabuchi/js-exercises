export class TypeMap {
    map = new Map();
    set(key, value) {
        if (key === null || key === undefined)
            throw new TypeError('Key must be a constructor function');
        if (value === null || value === undefined)
            throw new TypeError('Value must be a instance of key constructor');
        if (value.constructor !== key) {
            throw new TypeError(`Constructor of value must be key: ${key.name}`);
        }
        this.map.set(key, value);
    }
    get(key) {
        return this.map.get(key);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLE9BQU8sT0FBTztJQUNWLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBd0IsQ0FBQztJQUU5QyxHQUFHLENBQUksR0FBbUIsRUFBRSxLQUFRO1FBQ2xDLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssU0FBUztZQUNuQyxNQUFNLElBQUksU0FBUyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFDNUQsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTO1lBQ3ZDLE1BQU0sSUFBSSxTQUFTLENBQUMsNkNBQTZDLENBQUMsQ0FBQztRQUNyRSxJQUFLLEtBQWdCLENBQUMsV0FBVyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQzFDLE1BQU0sSUFBSSxTQUFTLENBQUMscUNBQXFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELEdBQUcsQ0FBSSxHQUFtQjtRQUN4QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBa0IsQ0FBQztJQUM1QyxDQUFDO0NBQ0YifQ==