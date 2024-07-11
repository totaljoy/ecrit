import { useState, useEffect, forwardRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './SingleShow.scss'
import addIcon from '../../assets/icons/add.svg'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import DatePickerMUI from '../DatePickerMUI/DatePickerMUI.jsx'
import starIcon from '../../assets/icons/star.svg'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const SingleShow = () => {

    const API_URL = import.meta.env.VITE_API_URL 
    let navigate = useNavigate()
    const { exhibitionId } = useParams()
    const [show, setShow] = useState({})
    const [reviews, setReviews] = useState([])
    const [open, setOpen] = useState(false)
    const [visitDate, setVisitDate] = useState(dayjs());

    dayjs.extend(relativeTime)

    const handleClose = () => {
        setOpen(false)
    };
 
    const handleClickOpen = () => {
        setOpen(true);
    };


    const getSingleExhibition = async() => {

        const response = await axios(`${API_URL}/exhibitions/${ exhibitionId }`);
        setShow(response.data)
    }

    const getReviews = async() => {

        const response = await axios(`${API_URL}/reviews/${ exhibitionId }`);
        const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date))
        setReviews(sortedData)
    }

    const postNewReview = async (newReview) => {
        try {
            await axios.post(`${API_URL}/reviews`, newReview)
        } catch(err) {
            console.log(err)
        }
    }   

    const handleSubmit = (event) => {
        event.preventDefault();
        const newReview = {
            user_id: 1,
            show_id: exhibitionId,
            date: visitDate.format('YYYY-MM-DD HH:mm:ss'),
            seen: true,
            review: event.target.review.value
        }
        postNewReview(newReview);
        console.log(newReview)
        navigate(`/:exhibitionId`)
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
        <main className="single-show__page">
            <Dialog
                open={open}
                onClose={handleClose}
                className="dialog"
            >
                <form action="submit" onSubmit={handleSubmit}>
                    <div className="review-dialog">
                        <h2 className="review-dialog__title">Add Exhibition</h2>
                        <DialogContent className="review-dialog__content">
                        <h3 className="review-dialog__label">{show.title}</h3>
                        <img src={`${API_URL}/public/images/${show.show_image}`} alt="Exhibition Image" className="review-dialog__thumbnail"/>
                        <label className="review-dialog__label">
                            Visit Date
                        </label>
                        <DatePickerMUI 
                                className='review-dialog__date'
                                value={visitDate}
                                onChange={(newValue) => setVisitDate(newValue)}                              
                        />
                        <label className="review-dialog__label review-dialog__label--bottom">Add Review</label>
                        <textarea type="text" name="review" className="review-dialog__input"/>
                        </DialogContent>
                        <DialogActions>
                            <button className='review-dialog__post' onClick={handleClose} type="submit">Post</button>
                            <button className='review-dialog__post' onClick={handleClose} type="button">Cancel</button>
                        </DialogActions>
                    </div>
                </form>
            </Dialog>
        <h1 className="single-show__header">{show.title}</h1>
        <section className="single-show">
            <article>
                <img className='single-show__image' src={`${API_URL}/public/images/${show.show_image}`} alt="" />
                <div className="single-show__info-container">
                    <div className="single-show__info">
                        <p className="single-show__info-item">{show.title}</p>
                        <p className="single-show__info-item">{`${show.opening_date} - ${show.closing_date}`}</p>
                    </div>
                    <div className="single-show__info">
                        <p className="single-show__info-item single-show__info-item--right">{show.location}</p>
                        <p className="single-show__info-item single-show__info-item--right">{show.address}</p>
                    </div>
                </div>
                <p className="single-show__info-item--artists">{artistsAsString}</p>
                <p className="single-show__info-item--artists">{show.description}</p>
            </article>
            <div className="single-show__buttons">
                <img className='single-show__icon' src={starIcon} alt="Add to List" />
                <img className='single-show__icon' src={addIcon} alt='Add Exhibition' onClick={handleClickOpen}/>
            </div>
        </section>
        <section className="show-reviews">
            <h1 className="show-reviews__header">Reviews</h1>
            {
                reviews.map((review) => {
                    if (review.review) {
                        return (
                            <Link to={`/profile/${review.user_id}`} className='show-review__link'>
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
                            </Link>
                        )
                    }
                })
            }
        </section>
        </main>
    )

}

export default SingleShow