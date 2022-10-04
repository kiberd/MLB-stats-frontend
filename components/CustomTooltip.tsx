import { ReactNode } from "react";
export const CustomTooltip = ({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
}) => {
  return (
    <div className="relative flex flex-col items-center group">
      {children}
      <div className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex">
        {/* <span className="relative z-10 p-3 text-xs leading-none text-white whitespace-no-wrap bg-black border border-black rounded-md shadow-lg"> */}
        <span className="relative z-10 p-3 text-xs bg-black border border-black rounded-md shadow-lg">
        {message}
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
      </div>
    </div>
  );
};
