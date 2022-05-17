import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/commons/spinner/spinner";
import useUser from "../hooks/useUser";
import { LocationProps } from "./requireNotAuth";


const requireAuth = (Component: any) => {
    const ElemToRender = () => {
        const [user, loading, error, fetchUser] = useUser();
        const location = useLocation() as unknown as LocationProps;
        const navigate = useNavigate();

        useEffect(() => {
            fetchUser();
        });

        return (loading ? <Spinner /> : user ? <Component {...{
            location: location, navigate: navigate, user: user
        }} ></Component> : <Navigate to={"/remy"} replace />);
    }

    return ElemToRender
};

export default requireAuth;
