import { useState, useEffect } from "react";
import axios from "axios";
import './Feed.scss'
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const Feed = () => {

    const [activity, setActivity] = useState([])
    const API_URL = import.meta.env.VITE_API_URL 

    const getActivity = async() => {
        const response = await axios(`${API_URL}/reviews`)
        const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date))
        setActivity(sortedData)
    }

    dayjs.extend(relativeTime)

    useEffect(() => {
        getActivity()
    }, [])

    return (
        <main className="feed">
            <header className="feed-hero">
                <h2 className="feed-hero__title">Welcome back to éCrit, <span className="feed-hero__title--username">internalgarden</span></h2>
                <h3 className="feed-hero__tagline">From the French word for write, éCrit is a social internet hub for art critique</h3>
            </header>
            <section>
                {
                    activity.map((e) => {
                        if (!e.review && !e.starred) {
                            return (
                                <Link to={`/${e.show_id}`} key={e.id} className="post__link">
                                <article className="post">
                                    <div className="post__user--single">
                                        <img className="post__user-image" src={`${API_URL}/public/images/${e.avatar}`} alt={e.username} />
                                    </div>
                                    <p className="post__info"><span className="post__info--special">{e.username}</span> visited <span className="post__info--italic">{e.title}</span> at <span className="post__info--special">{e.location}</span></p>
                                    <p className="post__info-date post__info-date--single">{e.date && dayjs(e.date).fromNow()}</p>
                                </article>
                                </Link>
                            )
                        } else if (!e.review && e.starred) {
                            return (
                                <Link to={`/${e.show_id}`} key={e.id} className="post__link">
                                <article className="post">
                                    <div className="post__user--single">
                                        <img className="post__user-image" src={`${API_URL}/public/images/${e.avatar}`} alt={e.username} />
                                    </div>
                                    <p className="post__info"><span className="post__info--special">{e.username}</span> added <span className="post__info--italic">{e.title}</span> at <span className="post__info--special">{e.location}</span> to Go See List</p>
                                    <p className="post__info-date post__info-date--single">{e.date && dayjs(e.date).fromNow()}</p>
                                </article>
                                </Link>
                            )
                        } else {
                            return (
                                <Link to={`/${e.show_id}`} key={e.id} className="post__link">
                                <article className="post">
                                    <div className="post__user">
                                        <img className="post__user-image" src={`${API_URL}/public/images/${e.avatar}`} alt={e.username} />
                                    </div>
                                    <div className="post__review">
                                        <div className="post__info-top">
                                            <p className="post__info"><span className="post__info--special">{e.username}</span> visited</p>
                                            <p className="post__info-date">{e.date && dayjs(e.date).fromNow()}</p>
                                        </div>
                                        <div className="feed-review">
                                            <div className="feed-review__container">
                                                <img className="feed-review__show-image" src={`${API_URL}/public/images/${e.show_image}`} alt={e.username} />
                                                <p className="feed-review__show-title post__info--italic" >{e.title}</p>
                                                <p className="feed-review__show-title">{e.location}</p>
                                            </div>
                                            <div>
                                                <p className="feed-review__review">{e.review}</p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                                </Link>
                            )
                        }
                    })
                }
            </section>
        </main>
    )
}

export default Feed