import { useState, useEffect } from "react";
import axios from "axios";
import './Profile.scss'

const Profile = () => {

    const [user, setUser] = useState([])
    const [friends, setFriends] = useState([])
    const API_URL = import.meta.env.VITE_API_URL 

    const getUser = async() => {
        const response = await axios(`${API_URL}/users/2`);
        setUser(response.data[0])
    }

    const getFriendsList = async() => {
        const response = await axios(`${API_URL}/users/friends/2`)
        setFriends(response.data)
    }

    useEffect(() => {
        getUser()
        getFriendsList()
    }, [])

    return (
        <>
        <form>
            <input type="search" name="search" className="search" placeholder="Search..."/>
        </form>
        <section className="profile-widget">
            <img className="profile-widget__avatar" src={`${API_URL}/public/images/${user.avatar}`} alt='Avatar' />
            <article className="profile-widget-info">
                <p className="profile-widget-info__name">{user.name}</p>
                <p className="profile-widget-info__user">@{user.username}</p>
                <p className="profile-widget-info__user">Friends: {friends.length}</p>
                <p className="profile-widget-info__user">Fave Artist: {user.fave_artist}</p>
            </article>
        </section>
        </>
    )

}

export default Profile