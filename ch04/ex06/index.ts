type ResizeParams = {
  maxWidth?: number;
  maxHeight?: number;
};

const resize1 = (params?: ResizeParams): void => {
  const maxWidth: number = (params && params.maxWidth) || 600;
  const maxHeight: number = (params && params.maxHeight) || 480;

  console.log({ maxWidth, maxHeight });
};

const resize2 = (params?: ResizeParams): void => {
  const maxWidth: number = params?.maxWidth ?? 600;
  const maxHeight: number = params?.maxHeight ?? 480;

  console.log({ maxWidth, maxHeight });
};
