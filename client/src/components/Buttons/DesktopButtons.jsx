import React from 'react';
import { NavLink } from 'react-router-dom';

const CustomButton = React.forwardRef(({ children, to, ...props }, ref) => {
    return (
        <NavLink
            ref={ref}
            to={to}
            {...props}
            className={({ isActive }) =>
                isActive
                    ? 'bg-[--color-secondary-light] text-[--color-highlight] font-bold uppercase rounded-lg flex items-center justify-between px-4'
                    : 'bg-[--color-primary-dark] hover:bg-[--color-primary] text-white font-bold uppercase rounded-lg flex items-center justify-between px-4'
            }
        >
            {children}
        </NavLink>
    );
});

CustomButton.displayName = 'CustomButton';

export default CustomButton;

