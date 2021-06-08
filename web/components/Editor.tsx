import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import { File } from '@gql/generated';

interface Props extends React.ComponentProps<typeof MonacoEditor> {
  files: File[];
}

interface EditorPickerItemProps {
  label: string;
}
const EditorPickerItem = ({ label }: EditorPickerItemProps) => {
  return <div className="px-2 py-1">{label}</div>;
};

const Editor = ({ files, ...props }: Props) => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex p-4 text-white bg-black">
        {files.map((x) => (
          <EditorPickerItem label={x.name} key={x.id} />
        ))}
      </div>

      {/* 101% width because I encounterd a bug where the editor is slightly not filling the div
          by a few pixels
      */}
      <MonacoEditor width="101%" height="100%" theme="vs-dark" {...props} />
    </div>
  );
};

export default Editor;
