import { getFileType } from '@utils/getFileType';
import React from 'react';
import { FaCss3, FaHtml5, FaJs } from 'react-icons/fa';
import { FiFile } from 'react-icons/fi';
import { IconType } from 'react-icons/lib';

interface Props extends React.ComponentProps<IconType> {
  name: string;
}
export const FileIcon = ({ name, ...rest }: Props) => {
  const type = getFileType(name);
  if (!type) return null;
  if (type === 'text/javascript') return <FaJs color=" #f0db4f " {...rest} />;
  if (type === 'text/html') return <FaHtml5 color=" #e34c26 " {...rest} />;
  if (type === 'text/css') return <FaCss3 color="#42A5F5" {...rest} />;
  return <FiFile {...rest} />;
};
