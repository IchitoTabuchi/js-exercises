// node --loader ts-node/esm ch05/ex01/index.ts

const useSameVariableName = (): void => {
  {
    const x: number = 1;
    console.log('Block 1:', x);
  }

  {
    const x: number = 2;
    console.log('Block 2:', x);
  }

  {
    const x: string = 'hello';
    console.log('Block 3:', x);
  }
};

useSameVariableName();
