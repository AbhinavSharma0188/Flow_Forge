import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setShortHistory, setVideoHistory } from "../redux/userSlice";

const UseGetHistory = () => {
  const dispatch = useDispatch();

  const { userData } = useSelector(state => state.user);
  useEffect(() => {
    if (!userData) return;
    const fetchHistory = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/user/gethistory", {
          withCredentials: true,
        });

        const history = result.data || [];

        const videos = history.filter(item => item.contentType === "Video");
        const shorts = history.filter(item => item.contentType === "Short");

        dispatch(setVideoHistory(videos));
        dispatch(setShortHistory(shorts));

      } catch (error) {
        if (error.response?.status !== 401) {
          console.error("❌ Error fetching history:", error);
        }
        dispatch(setVideoHistory([]));
        dispatch(setShortHistory([]));
      }
    };

    fetchHistory();
  }, [dispatch, userData]);
};

export default UseGetHistory;  