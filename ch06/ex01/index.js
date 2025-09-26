export const hashString = (key) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++)
        hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    return hash;
};
export const newHashTable = (capacity) => {
    return {
        size: 0,
        entries: new Array(capacity),
        get(key) {
            const index = hashString(key) % capacity;
            let node = this.entries[index];
            while (node) {
                if (node.key === key)
                    return node.value;
                node = node.next;
            }
            return undefined;
        },
        put(key, value) {
            const index = hashString(key) % capacity;
            let node = this.entries[index];
            if (!node) {
                this.entries[index] = { key, value, next: undefined };
                this.size++;
                return;
            }
            let prev = null;
            while (node) {
                if (node.key === key) {
                    node.value = value;
                    return;
                }
                prev = node;
                node = node.next;
            }
            prev.next = { key, value, next: undefined };
            this.size++;
        },
        remove(key) {
            const index = hashString(key) % capacity;
            let node = this.entries[index];
            let prev = null;
            while (node) {
                if (node.key === key) {
                    if (prev)
                        prev.next = node.next;
                    else
                        this.entries[index] = node.next;
                    this.size--;
                    return;
                }
                prev = node;
                node = node.next;
            }
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFXLEVBQVUsRUFBRTtJQUNoRCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7SUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7UUFDakMsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLENBQUMsUUFBZ0IsRUFBRSxFQUFFO0lBQy9DLE9BQU87UUFDTCxJQUFJLEVBQUUsQ0FBQztRQUNQLE9BQU8sRUFBRSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFFNUIsR0FBRyxDQUFDLEdBQVc7WUFDYixNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQ3pDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsT0FBTyxJQUFJLEVBQUUsQ0FBQztnQkFDWixJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRztvQkFBRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3hDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ25CLENBQUM7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNuQixDQUFDO1FBRUQsR0FBRyxDQUFDLEdBQVcsRUFBRSxLQUFVO1lBQ3pCLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7WUFDekMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUvQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO2dCQUN0RCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ1osT0FBTztZQUNULENBQUM7WUFFRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsT0FBTyxJQUFJLEVBQUUsQ0FBQztnQkFDWixJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNuQixPQUFPO2dCQUNULENBQUM7Z0JBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDWixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNuQixDQUFDO1lBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFFRCxNQUFNLENBQUMsR0FBVztZQUNoQixNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQ3pDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBRWhCLE9BQU8sSUFBSSxFQUFFLENBQUM7Z0JBQ1osSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO29CQUNyQixJQUFJLElBQUk7d0JBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDOzt3QkFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNyQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ1osT0FBTztnQkFDVCxDQUFDO2dCQUNELElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ1osSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbkIsQ0FBQztRQUNILENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFDIn0=