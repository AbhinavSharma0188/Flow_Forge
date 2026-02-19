import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { serverUrl } from '../App';
import { setAllPostData, setAllShortData, setAllVideoData } from '../redux/contentSlice';

const UsegetAllContent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAllVideos = async () => {

      try {
        const res = await axios.get(
          `${serverUrl}/api/content/allvideos`,
          { withCredentials: true }
        );
        dispatch(setAllVideoData(res.data || []));
      } catch (err) {
        if (err.response?.status !== 401) {
          console.error("Fetch all videos error:", err);
        }
      }
    };
    fetchAllVideos();
  }, [dispatch]);
  useEffect(() => {
    const fetchAllShorts = async () => {

      try {
        const res = await axios.get(
          `${serverUrl}/api/content/allshorts`,
          { withCredentials: true }
        );
        dispatch(setAllShortData(res.data || []));
      } catch (err) {
        if (err.response?.status !== 401) {
          console.error("Fetch all videos error:", err);
        }
      }
    };
    fetchAllShorts();
  }, [dispatch]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/content/allposts`,
          { withCredentials: true }
        );
        dispatch(setAllPostData(res.data || []));
      } catch (err) {
        if (err.response?.status !== 401) {
          console.error("Fetch all posts error:", err);
        }
      }
    };
    fetchAllPosts();
  }, [dispatch]);

}

export default UsegetAllContent
