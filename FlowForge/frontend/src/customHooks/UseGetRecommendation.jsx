import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { serverUrl } from "../App";
import { setRecommendationData } from "../redux/contentSlice";

const UseGetRecommendation = () => {
  const dispatch = useDispatch();

  const { userData } = useSelector(state => state.user);
  useEffect(() => {
    if (!userData) return;
    const fetchRecommendation = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/user/getrecommendation`,
          { withCredentials: true }
        );
        dispatch(setRecommendationData(res.data))
      } catch (err) {
        if (err.response?.status !== 401) {
          console.error("Recommendation fetch error:", err);
        }
      }
    };

    fetchRecommendation();
  }, [dispatch, userData]);

  return null; // hook kuch render nahi karega
};

export default UseGetRecommendation;
