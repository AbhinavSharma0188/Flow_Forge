import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { setAllChannelData, setChannelData } from '../redux/userSlice'

const UsegetChannel = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user);
    useEffect(() => {
        if (!userData) return;
        const fetchChannel = async () => {
            try {
                const result = await axios.get(serverUrl + "/api/user/getchannel", { withCredentials: true })
                dispatch(setChannelData(result.data))
            } catch (error) {
                if (error.response?.status !== 401) {
                    console.error("GetChannel error:", error)
                }
                dispatch(setChannelData(null))
            }
        }
        fetchChannel()
    }, [dispatch, userData])

    useEffect(() => {
        const fetchAllChannel = async () => {
            try {
                const result = await axios.get(serverUrl + "/api/user/getallchannel", { withCredentials: true })
                dispatch(setAllChannelData(result.data))
            } catch (error) {
                console.error("GetAllChannel error:", error)
                dispatch(setAllChannelData(null))
            }
        }
        fetchAllChannel()
    }, [dispatch])
}

export default UsegetChannel
