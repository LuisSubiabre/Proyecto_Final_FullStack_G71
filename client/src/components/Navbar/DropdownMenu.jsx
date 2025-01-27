import { useState, useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import menuCategories from '../../data/menuCategories.json';
import CustomButton from '../Buttons/DesktopButtons.jsx';

const DropdownMenuComponent = () => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        setMenus(menuCategories.menus);
    }, []);

    return (
        <div className="flex justify-around w-full">
            {menus.map((menu) => (
                <Dropdown key={menu.id}>
                    <DropdownTrigger>
                        <CustomButton>{menu.title}</CustomButton>
                    </DropdownTrigger>
                    <DropdownMenu variant="flat" color="secondary">
                        {menu.items.map((item, index) => (
                            <DropdownItem key={`${menu.id}-${index}`}>
                                <Link
                                    to={`/category/${menu.id}/${encodeURIComponent(item)}`}
                                    className="text-inherit"
                                >
                                    {item}
                                </Link>
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            ))}
        </div>
    );
};

export default DropdownMenuComponent;
