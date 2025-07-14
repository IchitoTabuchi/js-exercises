type Counter = {
  count: () => number;
  reset: () => void;
};

type CounterGroup = {
  newCounter: () => Counter;
  total: () => number;
  average: () => number;
  variance: () => number;
};

export const counterGroup = (): CounterGroup => {
  const counters: number[] = [];

  return {
    newCounter: () => {
      let value = 0;
      counters.push(value);

      return {
        count: () => {
          counters[counters.indexOf(value)] = ++value;
          return value - 1;
        },
        reset: () => {
          counters[counters.indexOf(value)] = 0;
          value = 0;
        },
      };
    },
    total: () => counters.reduce((sum, v) => sum + v, 0),
    average: () => {
      if (!counters.length) throw new TypeError('No counters exist');
      return counters.reduce((sum, v) => sum + v, 0) / counters.length;
    },
    variance: () => {
      if (counters.length < 2)
        throw new TypeError('Less than 2 counters exist');
      const avg = counters.reduce((sum, v) => sum + v, 0) / counters.length;
      return (
        counters.reduce((sum, v) => sum + (v - avg) ** 2, 0) / counters.length
      );
    },
  };
};
