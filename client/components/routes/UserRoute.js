import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "../Spinner";

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  const [state] = useContext(UserContext);
  useEffect(() => {
    if (state && state.token) getCurrentUser();
  }, [state && state.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/currentuser`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (data.ok) setOk(true);
    } catch (error) {
      router.push("/login");
    }
  };
  process.browser &&
    state === null &&
    setTimeout(() => {
      getCurrentUser();
    }, 1000);
  return !ok ? <Spinner /> : <>{children}</>;
};

export default UserRoute;
