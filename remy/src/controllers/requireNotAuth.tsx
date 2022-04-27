import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

type LocationProps = {
    state: {
        from: Location;
    };
};

const RequireNotAuth = ({ children }: { children: JSX.Element }) => {
    const [user, loading, error] = useUser();
    const location = useLocation() as unknown as LocationProps;
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
        if (loading) setContent(loadingContent);
        else if (!user) setContent(children);
        else {
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        }
    }, [error, loading, user]);

    return (content);
};

export default RequireNotAuth;
