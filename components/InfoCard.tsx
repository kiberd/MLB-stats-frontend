import React from "react";
import { ArrowTrendingUpIcon } from '@heroicons/react/24/solid';

interface InfoCardProps{
    title: string,
    subTitle: string,
    logo: any
}

const InfoCard:React.FC<InfoCardProps> = ({ title, subTitle, logo }) => {
  return (
    <div className="p-3">
      <div className=" min-h-[45vh] bg-white flex-col w-full p-3 border border-gray-400 rounded-md">
        
        {/* Title */}
        <div className="p-6 text-2xl text-center text-gray-700 border-b border-gray-300">
            {title}
        </div>

        {/* SubTitle */}
        <div className="p-6 text-base text-center text-gray-400 h-[17vh] flex items-center justify-center">
            <span className="line-clamp-5">{subTitle}</span>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center p-6">
            {logo}
        </div>


        
      </div>
    </div>
  );
};

export default InfoCard;
