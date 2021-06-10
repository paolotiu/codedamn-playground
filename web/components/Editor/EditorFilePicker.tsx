import { FileIcon } from '@components/FileIcon';
import { File } from '@gql/generated';
import { FiX } from 'react-icons/fi';
import React from 'react';

interface EditorPickerItemProps {
  label: string;
  handleDelete: () => void;
  onClick: () => void;
  isActive: boolean;
}
const EditorPickerItem = ({ label, handleDelete, onClick, isActive }: EditorPickerItemProps) => {
  return (
    <button
      type="button"
      className={`flex items-center px-2 py-3 space-x-2 hover:pr-2 focus:outline-none group  ${
        isActive && 'shadow-border-b-gray-500'
      }`}
      onClick={onClick}
    >
      <FileIcon name={label} size=".85em" />
      <span className="text-sm text-gray-200">{label}</span>
      <button
        type="button"
        onClick={handleDelete}
        className="invisible p-[2px] rounded-sm group-hover:visible hover:bg-white hover:bg-opacity-20"
      >
        <FiX size=".9em" />
      </button>
    </button>
  );
};

interface Props {
  files: File[];
  activeIndex: number;
  removeFromPicker: (file: File) => void;
  changeActiveFile: (file: File) => void;
}

const EditorFilePicker = ({ files, removeFromPicker, changeActiveFile, activeIndex }: Props) => {
  return (
    <div className="flex px-4 pt-2 pb-4 min-h-[44px] text-white bg-black">
      {files.map((file, index) => (
        <EditorPickerItem
          isActive={activeIndex === index}
          label={file.name}
          onClick={() => changeActiveFile(file)}
          handleDelete={() => removeFromPicker(file)}
          key={file.id}
        />
      ))}
    </div>
  );
};

export default EditorFilePicker;
