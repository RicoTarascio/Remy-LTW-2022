import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../types/user";
import UserController from "../core/controllers/userController";

const useUser = (): [
  user: User | undefined,
  loading: boolean,
  error: string
] => {
  // 1 try to get token from local storage
  // 2 if token is present 2.1 else 2.2
  // 2.1 call auth api 3
  // 2.2 user not present
  // 3 if auth is successful return user else return error
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [err, setError] = useState("");

  const fetchUser = () => {
    axios
      .get("http://localhost:4000/auth", { withCredentials: true })
      .then((res) => {
        setLoading(false);
        if (res.status !== 200) {
          setUser(undefined);
          setError(res.data);
        } else {
          setUser(res.data as User);
          setError("");
        }
      })
      .catch((otherError) => {
        setLoading(false);
        setUser(undefined);
        setError(otherError);
      });
  };

  useEffect(() => {
    UserController.addOnAuthChangedhandler(fetchUser);
    fetchUser();
  }, []);

  return [user, loading, err];
};

export default useUser;
