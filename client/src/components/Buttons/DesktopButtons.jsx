import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const CustomButton = React.forwardRef(({ children, className, onClick, ...props }, ref) => {
    return (
        <button
            ref={ref}
            onClick={onClick}
            {...props}
            className={`bg-[--color-primary-dark] hover:bg-[--color-primary] text-white font-oswald font-bold uppercase rounded-lg flex items-center px-2 py-1 gap-2 transition-all focus:bg-[--color-secondary] focus:text-[--color-primary-light] hover:underline text-xs lg:text-lg lg:px-6 lg:py-1.5 lg:gap-8 ${className}`}
        >
            {children}
            <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" />
        </button>
    );
});

CustomButton.displayName = 'CustomButton';


export default CustomButton;
