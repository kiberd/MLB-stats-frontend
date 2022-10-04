import React from 'react';

interface PageLayoutProps{
    children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <div className="container min-h-full py-10 bg-transparent max-w-[330px] tablet:max-w-2xl laptop:max-w-4xl desktop:max-w-5xl mx-auto">
            {children}
        </div>
    );
};

export default PageLayout;