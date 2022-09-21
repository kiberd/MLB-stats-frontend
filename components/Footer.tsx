import React from 'react';

const Footer = () => {
    return (
        <footer className='relative flex items-center justify-end w-full h-16 text-gray-400 bg-teal-800'>
            <div className='px-4 text-gray-400 ext-sm '>
                <p className='mb-1'>By youngmin park</p>
                <p>Github : <a href="https://github.com/kiberd" className='underline' >@kiberd</a></p>
            </div>
        </footer>
    );
};

export default Footer;