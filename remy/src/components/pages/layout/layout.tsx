import { Link, LinkProps, Outlet, useMatch, useResolvedPath } from "react-router-dom";
import { Icon } from "../../../icons/types";
import { User } from "../../../types/user";
import "./layout.css"

interface NavLinkWithIcon extends LinkProps {
    icon: Icon
}

const NavLink = ({ icon, children, to, ...props }: NavLinkWithIcon) => {
    let resolved = useResolvedPath(to);

    let match = useMatch({ path: resolved.pathname, end: false });

    return (
        <Link
            to={to}
            {...props}
        >
            <div className={`link ${match ? "active" : ""}`}>
                <i className={`link-icon ${icon}`}></i>
                {children}
            </div>
        </Link>
    );
}

const Layout = (props: { location: Location, navigate: NavigationType, user: User }) => {
    return (
        <div className="layout">
            <div className="sidebar">
                <div className="logo">
                    <h1 className="logo-inner">Remy</h1>
                </div>
                <div className="links-container">
                    <NavLink to="pets" icon="Heart">Pets</NavLink>
                    <NavLink to="calendar" icon="Calendar">Calendario</NavLink>
                    <NavLink to="user" icon="Profile">{props.user.name}</NavLink>
                </div>
            </div>
            <div className="page" id="page">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;