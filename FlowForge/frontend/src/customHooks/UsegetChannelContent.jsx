import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../App';
import { setVideoData } from '../redux/contentSlice';

const UsegetChannelContent = () => {
  const dispatch = useDispatch()
  const { channelData, userData } = useSelector(state => state.user)
  useEffect(() => {
    const fetchChannelVideos = async () => {
      if (!channelData?._id || !userData) return;

      try {
        const res = await axios.post(
          `${serverUrl}/api/content/get-videos`,
          { channelId: channelData._id },
          { withCredentials: true }
        );
        dispatch(setVideoData(res.data.videos || []));
      } catch (err) {
        if (err.response?.status !== 401) {
          console.error("Fetch channel videos error:", err);
        }
      }
    };
    fetchChannelVideos();
  }, [channelData?._id, dispatch, userData?._id]);

}

export default UsegetChannelContent
