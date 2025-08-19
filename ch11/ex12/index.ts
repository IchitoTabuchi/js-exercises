export class FileSizeExceededError extends Error {
  readonly filePath: string;
  readonly fileSize: number;
  readonly maxSize: number;

  constructor(filePath: string, fileSize: number, maxSize: number) {
    super(
      `File "${filePath}" size ${fileSize} bytes exceeds maximum allowed ${maxSize} bytes.`
    );
    this.name = 'FileSizeExceededError';
    this.filePath = filePath;
    this.fileSize = fileSize;
    this.maxSize = maxSize;
    Object.setPrototypeOf(this, FileSizeExceededError.prototype);
  }
}

const isValidFileSize = (
  filePath: string,
  fileSize: number,
  maxSize: number
): boolean => {
  if (fileSize > maxSize)
    throw new FileSizeExceededError(filePath, fileSize, maxSize);
  return true;
};

try {
  isValidFileSize('example.txt', 1024 * 1024, 500000);
} catch (e) {
  if (e instanceof FileSizeExceededError) console.log(e.message);
}
