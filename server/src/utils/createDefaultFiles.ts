import File from '@models/File';

export const createDefaultFiles = async (
  userId: string,
  playgroundId: string
) => {
  const defaultFields = {
    user: userId,
    playground: playgroundId,
  };

  const html = new File({
    name: 'index.html',
    value: `<div> Hello World </div>`,
    ...defaultFields,
  });
  const js = new File({
    name: 'script.js',
    value: ``,
    ...defaultFields,
  });

  const css = new File({
    name: 'style.css',
    value: '',
    ...defaultFields,
  });

  await Promise.all([html.save(), js.save(), css.save()]);
  return { html, js, css };
};
