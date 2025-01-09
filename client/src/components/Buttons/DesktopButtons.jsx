import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const CustomButton = React.forwardRef(({ children, className, onClick, ...props }, ref) => {
    return (
        <button
            ref={ref}
            onClick={onClick}
            {...props}
            className={`bg-[--color-primary-dark] hover:bg-[--color-primary] text-white font-oswald font-bold uppercase rounded-lg flex items-center justify-around px-6 py-2 gap-8 transition-all focus:bg-[--color-secondary] focus:text-[--color-primary-light] hover:underline ${className}`}
        >
            {children}
            <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" />
        </button>
    );
});

CustomButton.displayName = 'CustomButton';


export default CustomButton;
