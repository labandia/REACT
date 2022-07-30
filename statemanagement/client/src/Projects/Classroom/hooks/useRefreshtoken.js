import { useDispatch } from "react-redux";
import { changetoken } from "../redux/auth";
import axios from "../api/axios";

const useRefreshtoken = () => {
   const dispatch = useDispatch();

   const refresh = async () => {
      const res = await axios.get("refresh");

      dispatch(
         changetoken({
            token: res.data.accesstoken,
         })
      );
      return res.data.accesstoken;
   };

   return refresh;
};

export default useRefreshtoken;
