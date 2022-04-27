import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";


const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const [user, loading, error] = useUser();
    const location = useLocation();
    const navigate = useNavigate();
    const [content, setContent] = useState(children);

    const errorContent = () => {
        return <>
            <h1>Error</h1>
            <h3>{error}</h3>
        </>
    }
    const loadingContent = () => {
        return <>
            <h3>Loading...</h3>
        </>
    }

    useEffect(() => {
        if (error) setContent(errorContent);
        else if (loading) setContent(loadingContent);
        else if (!user) navigate("/login", { replace: true, state: { from: location } });
        else setContent(children);
    }, [error, loading, user]);

    return (content);
};

export default RequireAuth;
