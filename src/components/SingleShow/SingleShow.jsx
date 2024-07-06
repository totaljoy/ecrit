import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './SingleShow.scss'

const SingleShow = () => {

    const API_URL = import.meta.env.VITE_API_URL 

    const { exhibitionId } = useParams()
    const [show, setShow] = useState({})
    const [reviews, setReviews] = useState([])

    const getSingleExhibition = async() => {

        const response = await axios(`${API_URL}/exhibitions/${ exhibitionId }`);
        setShow(response.data)
    }

    const getReviews = async() => {

        const response = await axios(`${API_URL}/reviews/${ exhibitionId }`);
        setReviews(response.data)
    }

    useEffect(() => {
        getSingleExhibition()
        getReviews()
    }, [])

    const makeArtistsArrString = (show) => {
        if (show.artists && show.artists.length > 1) {
            return show.artists.join(', ') 
    } else {
        return show.artists
    }}

    const artistsAsString = makeArtistsArrString(show)

    return (
        <main className="single-show">
        <h1 className="single-show__header">{show.title}</h1>
        <section className="show">
            <img className='show__image' src={`${API_URL}/public/images/${show.show_image}`} alt="" />
            <p>{show.title}</p>
            <p>{artistsAsString}</p>
            <p>{show.location}</p> 
            <p>{show.address}</p>
            <p>{`${show.opening_date} - ${show.closing_date}`}</p>
            <p>{show.description}</p>
        </section>
        <section className="show-reviews">
            {
                reviews.map((review) => {
                    if (review.review) {
                        return (
                            <>
                            <article className="show-review">
                                <p>{review.name}</p>
                                <p>@{review.username}</p>
                                <p>{review.created_at}</p>
                                <p>{review.review}</p>
                            </article>
                            </>
                        )
                    }
                })
            }
        </section>
        </main>
    )

}

export default SingleShow