import React from 'react';
import { File } from '@gql/generated';

interface Props {
  files: File[];
  onFileClick: (file: File) => void;
}

const FileExplorer = ({ files, onFileClick }: Props) => {
  return (
    <div className="flex flex-col items-start h-full p-4 overflow-hidden text-gray-300 bg-black pane-content">
      {files.map((file) => {
        return (
          <button
            type="button"
            key={file.id}
            className="px-2 cursor-pointer hover:bg-gray-700 hover:text-white"
            onClick={() => onFileClick(file)}
          >
            {file.name}
          </button>
        );
      })}
    </div>
  );
};

export default FileExplorer;
