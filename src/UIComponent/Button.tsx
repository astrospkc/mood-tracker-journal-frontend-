import React from 'react';

const Button = ({ onclick, children }: any) => {


    return (
        <button
            className="px-4 py-2 relative overflow-hidden border-2 border-transparent rounded-3xl hover:bg-blue-400 transition-colors duration-300"
            onClick={onclick}
        >
            <span className="relative z-10 text-white">{children}</span>
            <div className="absolute inset-0 border-2 border-blue-500 border-r-yellow-500 rounded-3xl"></div>
        </button>
    );
};

export default Button;
