import React from 'react';
import { File } from '@gql/generated';
import { FileIcon } from '@components/FileIcon';

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
            className="flex items-center w-full px-2 py-1 space-x-3 outline-none cursor-pointer hover:bg-gray-700 hover:text-white"
            onClick={() => onFileClick(file)}
          >
            <FileIcon name={file.name} />
            <span>{file.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default FileExplorer;
