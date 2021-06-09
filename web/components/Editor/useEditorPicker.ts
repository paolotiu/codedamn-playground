import { useState } from 'react';
import { File } from '@gql/generated';

export const useEditorFilePicker = () => {
  const [filesInPicker, setFilesInPicker] = useState<File[]>([]);
  const [activeFile, setActiveFile] = useState<File | null>(null);

  const addToEditorFilePicker = (file: File) => {
    setActiveFile(file);
    // No duplicates
    if (filesInPicker.find((f) => f.id === file.id)) return;
    setFilesInPicker((prev) => [...prev, file]);
  };

  const removeFromEditorFilePicker = (file: File) => {
    setFilesInPicker((prev) => {
      const filteredFiles = prev.filter((f) => f.id !== file.id);

      if (activeFile?.id === file.id) {
        // We'll use this to indicate the position of our next active file
        const removedFileIndex = prev.findIndex((f) => f.id === file.id);

        setActiveFile(
          filteredFiles[removedFileIndex] || filteredFiles[removedFileIndex - 1] || null,
        );
      }
      return filteredFiles;
    });
  };

  const getActiveIndex = () => {
    return filesInPicker.findIndex((f) => f.id === activeFile?.id);
  };

  return {
    filesInPicker,
    addToEditorFilePicker,
    removeFromEditorFilePicker,
    activeFile,
    setActiveFile,
    getActiveIndex,
  };
};
