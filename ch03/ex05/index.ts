export const convertLFtoCRLF = (input: string): string =>
  input.replace(/\n/g, '\r\n');

export const convertCRLFtoLF = (input: string): string =>
  input.replace(/\r\n/g, '\n');
