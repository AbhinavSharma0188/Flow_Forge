import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'

const getCurrentUser = () => {
    const dispatch = useDispatch()
    const { channelData } = useSelector(state => state.user)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(serverUrl + "/api/user/getcurrentuser", { withCredentials: true })
                dispatch(setUserData(result.data))
            } catch (error) {
                if (error.response?.status !== 401) {
                    console.error("GetCurrentUser error:", error)
                }
                dispatch(setUserData(null))
            }
        }
        fetchUser()
    }, [dispatch])
}

export default getCurrentUser
