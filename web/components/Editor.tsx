import React from 'react';
import MonacoEditor from '@monaco-editor/react';

interface Props extends React.ComponentProps<typeof MonacoEditor> {}

const Editor = ({ ...props }: Props) => {
  return <MonacoEditor width="100%" height="100%" language="html" theme="vs-dark" {...props} />;
};

export default Editor;
