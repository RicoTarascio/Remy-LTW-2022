import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../types/user";

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

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRmVkZXJpY28iLCJlbWFpbCI6InRlc3QxQGVtYWlsLmNvbSIsImlhdCI6MTY1MDgyNDQ1NywiZXhwIjoxNjUxNjg4NDU3fQ.-tALMG5iIxZis3d1I2aKGWn3P3F85qmonnj8uxgr7mE"; //localStorage.getItem("token");

    if (!token) {
      setLoading(false);
    } else {
      axios
        .get("http://localhost:4000/auth", { params: { token: token } })
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
    }
  }, []);
  return [user, loading, err];
};

export default useUser;
