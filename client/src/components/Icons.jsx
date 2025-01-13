import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faUser,
    faShoppingCart,
    faCog,
    faFolder,
    faUsers,
    faRightToBracket,
    faSackDollar,
    faPlusCircle,
    faShoppingBag,
    faHeart,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
    search: faSearch,
    user: faUser,
    cart: faShoppingCart,
    cog: faCog,
    folder: faFolder,
    users: faUsers,
    signOutAlt: faRightToBracket,
    dollarSign: faSackDollar,
    plusCircle: faPlusCircle,
    shoppingBag: faShoppingBag,
    heart: faHeart,
};

const Icon = ({ name, ...props }) => {
    const icon = icons[name];
    return icon ? <FontAwesomeIcon icon={icon} {...props} /> : null;
};

export default Icon;
