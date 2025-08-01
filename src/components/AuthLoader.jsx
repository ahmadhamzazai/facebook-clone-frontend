import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../redux/authSlice";

const AuthLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get(
          "https://facebook-clone-backend-production-e1fc.up.railway.app/api/me",
          {
            withCredentials: true,
          }
        );
        dispatch(setUser(res.data.user));
      } catch (err) {
        dispatch(setUser(null));
        console.error(
          "AuthLoader error (user not authenticated or token invalid):",
          err.response ? err.response.data : err.message
        );
        dispatch(setLoading(false));
      }
    };

    loadUser();
  }, [dispatch]);

  return null;
};

export default AuthLoader;
