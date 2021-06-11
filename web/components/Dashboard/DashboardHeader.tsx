import { useLogoutMutation } from '@gql/generated';
import { graphqlClient } from '@utils/graphqlClient';
import Avatar from 'boring-avatars';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Props {
  userName: string;
}

interface PopupProps {
  closePopup: () => void;
}

const Popup = ({ closePopup }: PopupProps) => {
  const logOutMutation = useLogoutMutation(graphqlClient);
  const roter = useRouter();

  useEffect(() => {
    window.addEventListener('mousedown', closePopup);
    return () => {
      window.removeEventListener('mousedown', closePopup);
    };
  }, [closePopup]);
  return (
    <div className="absolute top-[110%] right-0 bg-white shadow-md py-2 flex flex-col ">
      <button
        type="button"
        className="w-full px-4 py-2 hover:bg-black hover:bg-opacity-10"
        onMouseDown={(e) => {
          // Stops closing when clicking button
          e.stopPropagation();
        }}
        onClick={() => {
          logOutMutation.mutate({});
          roter.push('/login');
        }}
      >
        Logout
      </button>
    </div>
  );
};

const DashboardHeader = ({ userName }: Props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="flex justify-between ">
      <h1 className="text-4xl font-bold">Playgrounds</h1>
      <div
        className="relative flex items-center space-x-3 cursor-pointer group "
        onClick={openPopup}
        // For accesibility
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            openPopup();
          }
        }}
        tabIndex={0}
        role="button"
      >
        <Avatar name={userName} variant="beam" size={30} />
        <span className={`group-hover:font-bold ${isPopupOpen && 'font-bold'}`}>{userName}</span>

        {isPopupOpen && <Popup closePopup={closePopup} />}
      </div>
    </div>
  );
};

export default DashboardHeader;
