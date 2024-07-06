import { useState, useEffect } from "react";
import axios from "axios";
import './Feed.scss'

const Feed = () => {

    const [activity, setActivity] = useState([])
    const API_URL = import.meta.env.VITE_API_URL 

    const getActivity = async() => {
        const response = await axios(`${API_URL}/reviews`)
        setActivity(response.data)
    }

    useEffect(() => {
        getActivity()
    }, [])

    return (
        <main className="feed">
            <header>
                <h1 className="feed-header__title">Feed</h1>
            </header>
            <section>
                {
                    activity.map((e) => {
                        if (!e.review) {
                            return (
                                <article className="post">
                                    <div className="post__user">
                                        <img className="post__user-image" src={`${API_URL}/public/images/${e.avatar}`} alt={e.username} />
                                    </div>
                                    <p className="post__info"><span className="post__info--special">{e.username}</span> visited <span className="post__info--italic">{e.title}</span> at <span className="post_info--special">{e.location}</span></p>
                                </article>
                            )
                        } else {
                            return (
                                <article className="post">
                                    <div className="post__user">
                                        <img className="post__user-image" src={`${API_URL}/public/images/${e.avatar}`} alt={e.username} />
                                    </div>
                                    <div className="post__review">
                                        <p className="post__info"><span className="post__info--special">{e.username}</span> visited</p>
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
                            )
                        }
                    })
                }
            </section>
        </main>
    )
}

export default Feed