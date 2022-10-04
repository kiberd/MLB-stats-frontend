import React from 'react';

interface LandingLayoutProps{
    children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
    return (
        <div className="container mx-auto bg-transparent">
            {children}
        </div>
    );
};

export default LandingLayout;