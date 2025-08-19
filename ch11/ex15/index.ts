type UrlParts = {
  base: string;
  addQuery?: [string, string][];
  path?: string;
};

export const modifyUrl = ({ base, addQuery = [], path }: UrlParts): string => {
  const url = new URL(base);
  if (path) url.pathname = path;
  addQuery.forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
};
