import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Skeleton } from "@nextui-org/react";
import { Link } from "react-router-dom";
import CustomButton from "../Buttons/DesktopButtons.jsx";
import useCategories from "../../hook/useCategories.jsx";

const DropdownMenuComponent = () => {
    const { menus, loading, error } = useCategories();

    if (loading) {
        return (
            <div className="flex justify-around w-full">
                {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                        <Skeleton className="h-6 w-32 rounded" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="flex justify-around w-full">
            {menus.map((menu) => (
                <Dropdown key={menu.id}>
                    <DropdownTrigger>
                        <CustomButton>{menu.title}</CustomButton>
                    </DropdownTrigger>
                    <DropdownMenu variant="flat" color="secondary">
                        {menu.items.map((item) => (
                            <DropdownItem key={`${menu.id}-${item.id}`} textValue={item.title}>
                                <Link to={`/category/${menu.id}/${item.id}`} className="text-inherit">
                                    {item.title}
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


