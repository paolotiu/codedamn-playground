import mime from 'mime/lite';

mime.define(
  {
    'text/javascript': ['js'],
  },
  true,
);

export const getFileLanguage = (name: string) => {
  return mime.getType(name);
};
