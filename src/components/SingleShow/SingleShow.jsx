import { useState, useEffect, forwardRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './SingleShow.scss'
import addIcon from '../../assets/icons/add-icon.png'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import TextAreaMUI from '../TextAreaMUI/TextAreaMUI.jsx'
import DatePickerMUI from '../DatePickerMUI/DatePickerMUI.jsx'

const SingleShow = () => {

    const API_URL = import.meta.env.VITE_API_URL 
    let navigate = useNavigate()
    const { exhibitionId } = useParams()
    const [show, setShow] = useState({})
    const [reviews, setReviews] = useState([])
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    };
 
    const handleClickOpen = () => {
        setOpen(true);
    };

    const Transition = forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

    const getSingleExhibition = async() => {

        const response = await axios(`${API_URL}/exhibitions/${ exhibitionId }`);
        setShow(response.data)
    }

    const getReviews = async() => {

        const response = await axios(`${API_URL}/reviews/${ exhibitionId }`);
        setReviews(response.data)
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
            seen: true,
            review: event.target.review.value
        }
        postNewReview(newReview);
        console.log(newReview)
        navigate('/:exhibitionId')
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
            <article>
                <img className='show__image' src={`${API_URL}/public/images/${show.show_image}`} alt="" />
                <p>{show.title}</p>
                <p>{artistsAsString}</p>
                <p>{show.location}</p> 
                <p>{show.address}</p>
                <p>{`${show.opening_date} - ${show.closing_date}`}</p>
                <p>{show.description}</p>
            </article>
            <button onClick={handleClickOpen}>
                + Add <span>{show.title}</span>
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
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
                        <DatePickerMUI className='review-dialog__date'/>
                        <label className="review-dialog__label review-dialog__label--bottom">Add Review</label>
                        <textarea type="text" name="review" className="review-dialog__input"/>
                        </DialogContent>
                        <DialogActions>
                            <button className='review-dialog__post' type="submit">Post</button>
                            <button className='review-dialog__post' onClick={handleClose} type="cancel">Cancel</button>
                        </DialogActions>
                    </div>
                </form>
            </Dialog>
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