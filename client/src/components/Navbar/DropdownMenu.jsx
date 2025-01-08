import { useState, useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import menuData from '../../data/menuData.json';
import CustomButton from '../Buttons/DesktopButtons.jsx';

const DropdownMenuComponent = () => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        setMenus(menuData.menus);
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {menus.map((menu) => (
                <Dropdown key={menu.id}>
                    <DropdownTrigger>
                        <CustomButton>{menu.title}</CustomButton>
                    </DropdownTrigger>
                    <DropdownMenu>
                        {menu.items.map((item, index) => (
                            <DropdownItem key={`${menu.id}-${index}`}>{item}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            ))}
        </div>
    );
};

export default DropdownMenuComponent;
