import React from 'react';
import { File } from '@gql/generated';

interface Props {
  files: File[];
}

const FileExplorer = ({ files }: Props) => {
  return (
    <div className="h-full p-4 overflow-hidden text-gray-300 bg-black pane-content">
      {files.map((file) => {
        return (
          <div key={file.id} className="px-2 cursor-pointer hover:bg-gray-700 hover:text-white">
            {file.name}
          </div>
        );
      })}
    </div>
  );
};

export default FileExplorer;
