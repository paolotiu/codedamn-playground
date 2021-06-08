import { Monaco } from '@monaco-editor/react';
import { emmetCSS, emmetHTML } from 'emmet-monaco-es';

export const monacoSetup = (monaco: Monaco) => {
  // Add emmet
  emmetCSS(monaco);
  emmetHTML(monaco);

  // Redefine editor bg to match website's color theme
  monaco.editor.defineTheme('myTheme', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#181818',
    },
  });
};
