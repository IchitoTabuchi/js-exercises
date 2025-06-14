export const hashString = (key: string): number => {
  let hash = 0;
  for (let i = 0; i < key.length; i++)
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return hash;
};

export const newHashTable = (capacity: number) => {
  return {
    size: 0,
    entries: new Array(capacity),

    get(key: string) {
      const index = hashString(key) % capacity;
      let node = this.entries[index];
      while (node) {
        if (node.key === key) return node.value;
        node = node.next;
      }
      return undefined;
    },

    put(key: string, value: any) {
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

    remove(key: string) {
      const index = hashString(key) % capacity;
      let node = this.entries[index];
      let prev = null;

      while (node) {
        if (node.key === key) {
          if (prev) prev.next = node.next;
          else this.entries[index] = node.next;
          this.size--;
          return;
        }
        prev = node;
        node = node.next;
      }
    },
  };
};
