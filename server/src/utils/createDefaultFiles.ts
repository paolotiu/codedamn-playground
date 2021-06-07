import File from '@models/File';

export const createDefaultFiles = (userId: string) => {
  const html = new File({
    name: 'index.html',
    value: `<div> Hello World </div>`,
    user: userId,
  });
};
