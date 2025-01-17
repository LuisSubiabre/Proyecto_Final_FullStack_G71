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
    faArrowLeft,
    faArrowRight,
    faEnvelope
} from "@fortawesome/free-solid-svg-icons";

import {
    faFacebook,
    faInstagram,
    faTwitter
} from "@fortawesome/free-brands-svg-icons";

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
    facebook: faFacebook,
    instagram: faInstagram,
    x: faTwitter,
    arrowLeft: faArrowLeft,
    arrowRight: faArrowRight,
    mail: faEnvelope
};

const Icon = ({ name, ...props }) => {
    const icon = icons[name];
    return icon ? <FontAwesomeIcon icon={icon} {...props} /> : null;
};

export default Icon;
