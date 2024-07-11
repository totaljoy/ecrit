import { useState, useEffect, forwardRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './Profile.scss'
import axios from "axios";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import firstPost from '../../assets/badges/firstpost.png'
import firstVisit from '../../assets/badges/firstvisit.png'
import makingFriends from '../../assets/badges/makingfriends.png'

const Profile = () => {
    const API_URL = import.meta.env.VITE_API_URL
    let navigate = useNavigate()
    const { userId } = useParams()
    const [user, setUser] = useState([])
    const [friends, setFriends] = useState([])
    const [userReviews, setUserReviews] = useState([])
    dayjs.extend(relativeTime)
    
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
    }, [ userId ])

    const reviews = userReviews.filter(item => item.review !== null)

 return (
    <main className="profile">
        <header className="profile__hero">
                <h1 className="profile__title">Profile</h1>
        </header>
        <section className="profile__top">
            <article className="profile__user-box">
                <img className='profile__user-image' src={`${API_URL}/public/images/${user.avatar}`} alt={user.username}/>
                <p className="profile__user-name">{user.name}</p>
                <p className="profile__username">{user.username}</p>
                <p className="profile__userdate">Joined {dayjs(user.created_at).format('MMMM D, YYYY')}</p>
            </article>
            <div className="profile-right">
                <article className="profile__info-box">
                    <div className="profile__info-container">
                        <p className="profile__info-value">{friends.length}</p>
                        <h2 className="profile__info-label">Friends</h2>
                    </div>
                    <div className="profile__info-container">
                        <p className="profile__info-value">{userReviews.length}</p>
                        <h2 className="profile__info-label">Visits</h2>
                    </div>
                    <div className="profile__info-container">
                        <p className="profile__info-value">{reviews.length}</p>
                        <h2 className="profile__info-label">Reviews</h2>
                    </div>
                </article>
                <article className="profile__badges">
                        <div  className="profile__badge-container">
                            <p className='profile__badge-icon'>🖋️</p>
                            <h3 className='profile__badge-title'>First Post</h3>
                        </div>
                        <div className="profile__badge-container">
                        <p className='profile__badge-icon'>🖼️</p>
                            <h3 className='profile__badge-title'>First Visit</h3>
                        </div>
                        <div className="profile__badge-container">
                            <p className='profile__badge-icon'>💗</p>
                            <h3 className='profile__badge-title'>Making Friends</h3>
                        </div>
                </article>
            </div>
        </section>
        <section className="profile-reviews">
            <h1 className="profile-reviews__header">Reviews ({reviews.length})</h1>
            {
                userReviews.map((review) => {
                    if (review.review) {
                        return (
                            <article className="show-review__container">
                                <div className="show-review__user">
                                    <img className="show-review__user-image" src={`${API_URL}/public/images/${review.avatar}`} alt={review.username} />
                                </div>
                                <div className="show-review">
                                    <div className='show-review__user-info'> 
                                        <p className="show-review__username">{review.username}</p>
                                        <p className="show-review__date">{review.date && dayjs(review.date).fromNow()}</p>
                                    </div>
                                    <div className="show-review__content">
                                        <p className="feed-review__review">{review.review}</p>
                                    </div>
                                </div>
                            </article>
                        )
                    }
                })
            }
        </section>
    </main>
 )
}

export default Profile