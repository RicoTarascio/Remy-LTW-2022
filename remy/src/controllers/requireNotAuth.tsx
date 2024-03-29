import { ComponentType, FunctionComponent, ReactComponentElement, useEffect, useState } from "react";
import { Navigate, NavigateFunction, useLocation, Location, useNavigate } from "react-router-dom";
import Spinner from "../components/commons/spinner/spinner";
import useUser from "../hooks/useUser";

export type LocationProps = {
    state: {
        from: Location;
    };
};

export type NavigationRouter = {
    location: LocationProps, navigate: NavigateFunction
}

const requireNotAuth = (Component: any) => {
    const ElemToRender = () => {
        const [user, loading] = useUser();
        const location = useLocation() as unknown as LocationProps;
        const navigate = useNavigate();

        return (loading ? <Spinner /> : user ? <Navigate to={"/"} replace /> : <Component {...{
            location: location, navigate: navigate
        }} ></Component>);
    }

    return ElemToRender
};

export default requireNotAuth;
