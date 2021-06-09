import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import { monacoSetup } from '@utils/monacoSetup';
import EmptyEditor from './EmptyEditor';

interface Props extends React.ComponentProps<typeof MonacoEditor> {}

const Editor = ({ ...props }: Props) => {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden bg-black">
      {/* 101% width because I encounterd a bug where the editor is slightly not filling the div
          by a few pixels
      */}
      <MonacoEditor
        width="101%"
        height="100%"
        theme="myTheme"
        loading={<EmptyEditor />}
        options={{
          wordWrap: 'on',
          minimap: {
            enabled: false,
          },
          scrollBeyondLastLine: false,
        }}
        beforeMount={monacoSetup}
        {...props}
      />
    </div>
  );
};

export default Editor;
