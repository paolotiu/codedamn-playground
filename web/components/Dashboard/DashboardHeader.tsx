import Avatar from 'boring-avatars';
import React from 'react';

interface Props {
  userName: string;
}

const DashboardHeader = ({ userName }: Props) => {
  return (
    <div className="flex justify-between">
      <h1 className="text-4xl font-bold">Playgrounds</h1>
      <div className="flex items-center space-x-3 cursor-pointer group">
        <Avatar name={userName} variant="beam" size={30} />
        <span className="group-hover:font-bold">{userName}</span>
      </div>
    </div>
  );
};

export default DashboardHeader;
