import { useState, useEffect } from "react";
import axios from "axios";
import './UserNav.scss'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const UserNav = () => {

    const [user, setUser] = useState([])
    const [friends, setFriends] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('query') || '');
    const [isFriendsOpen, setIsFriendsOpen] = useState(false);
    const navigate = useNavigate()

    const API_URL = import.meta.env.VITE_API_URL 

    const getUser = async() => {
        const response = await axios(`${API_URL}/users/2`);
        setUser(response.data[0])
    }

    const getFriendsList = async() => {
        const response = await axios(`${API_URL}/users/friends/2`)
        console.log(response.data)
        setFriends(response.data)
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch =  (e) => {
        e.preventDefault();
        setSearchParams({ query: search})
        navigate(`/search?query=${search}`)
        setSearch('')
    }

    const toggleDropdown = () => {
        setIsFriendsOpen(!isFriendsOpen);
      };

    useEffect(() => {
        getUser()
        getFriendsList()
    }, [])

    return (
        <nav className="nav">
            <form onSubmit={handleSearch}>
                <input type="search" name="search" value={search} className="search" placeholder="Search..." onChange={handleChange}/>
            </form>
            <section className="profile-widget">
                    <div className="profile-widget__info">
                        <img className="profile-widget__avatar" src={`${API_URL}/public/images/${user.avatar}`} alt='Avatar' />
                        <div className="profile-widget__info-user">
                            <p className="profile-widget-info__name">{user.name}</p>
                            <p className="profile-widget-info__user">{user.username}</p>
                        </div>
                    </div>
                    <div className="user-nav__info">   
                            <div className="user-nav__dropdown" onClick={toggleDropdown}>
                                <h4>Friends</h4>
                                {!isFriendsOpen && (<ArrowLeftIcon />)}
                                {isFriendsOpen && (<ArrowDropDownIcon />)}
                            </div>
                            <div className="user-nav__friends">
                            {isFriendsOpen && (
                                friends.map((friend) => {
                                    return (
                                        <Link className='user-nav__link' to={`/profile/${friend.friend_id}`}>
                                            <p className="user-nav__friend">{friend.friend_username}</p>
                                        </Link>
                                    )
                                }))
                            }
                            </div>
                    </div>
            </section>
        </nav>
    )

}

export default UserNav