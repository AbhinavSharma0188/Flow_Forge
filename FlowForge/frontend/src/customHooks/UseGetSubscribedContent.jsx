import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setSubscribeChannel, setSubscribeShort, setSubscribeVideo } from "../redux/userSlice";

const UseGetSubscribedContent = () => {
  const dispatch = useDispatch();

  const { userData } = useSelector(state => state.user);
  useEffect(() => {
    if (!userData) return;
    const fetchSubscribedContent = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/user/subscribedcontent", {
          withCredentials: true
        });

        const { subscribedChannels, videos, shorts } = result.data;
        dispatch(setSubscribeChannel(subscribedChannels || []));
        dispatch(setSubscribeVideo(videos || []));
        dispatch(setSubscribeShort(shorts || []));

      } catch (error) {
        if (error.response?.status !== 401) {
          console.error("Error fetching subscribed content:", error);
        }
        dispatch(setSubscribeChannel([]));
        dispatch(setSubscribeVideo([]));
        dispatch(setSubscribeShort([]));
      }
    };

    fetchSubscribedContent();
  }, [dispatch, userData?._id]);
};

export default UseGetSubscribedContent;
