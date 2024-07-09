import { useState, useEffect, forwardRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const API_URL = import.meta.env.VITE_API_URL
    let navigate = useNavigate()
    const { userId } = useParams()
    const [user, setUser] = useState([])
    const [friends, setFriends] = useState([])
    const [userReviews, setUserReviews] = useState([])
    
    const getUser = async() => {
        const response = await axios(`${API_URL}/users/${ userId }`);
        setUser(response.data[0])
    }

    const getFriendsList = async() => {
        const response = await axios(`${API_URL}/users/friends/${ userId }`)
        setFriends(response.data)
    }

    const getUserReviews = async() => {
        const response = await axios(`${API_URL}/users/reviews/${ userId }`)
        setUserReviews(response.data)
    }

    useEffect(() => {
        getUser()
        getFriendsList()
        getUserReviews()
    }, [])

 return (
    <section>
        <article>
            <img src={`${API_URL}/public/images/${user.avatar}`} alt="user.username" />
            <p>{user.name}</p>
            <p>{user.username}</p>
        </article>

    </section>
 )
}

export default Profile