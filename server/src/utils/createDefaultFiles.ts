import File from '@models/File';

const htmlDefaultValue = `
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title> HTML Playground </title>

  <link rel="stylesheet" href="/style.css">

</head>

<body>
  <h1>Hello There!</h1>
  <p>Have a nice day :)</p>

<p>
  It is currently:
  <span id="time"></span>
</p>
    
  <script src="/script.js"></script>
</body>
</html>

`;

const cssDefaultValue = `
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#time{
    color: darkblue
}
`;
const jsDefaultValue = `
const timer = document.querySelector('#time')

setInterval(() => {
	timer.innerText = new Date().toLocaleString()
}, 1000)

`;

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
    value: htmlDefaultValue,
    ...defaultFields,
  });
  const js = new File({
    name: 'script.js',
    value: jsDefaultValue,
    ...defaultFields,
  });

  const css = new File({
    name: 'style.css',
    value: cssDefaultValue,
    ...defaultFields,
  });

  await Promise.all([html.save(), js.save(), css.save()]);
  return { html, js, css };
};
