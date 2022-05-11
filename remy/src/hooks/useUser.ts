import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../types/user";
import UserController from "../core/controllers/userController";

const useUser = (): [
  user: User | undefined,
  loading: boolean,
  error: string
] => {
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
