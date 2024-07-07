import { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import './CurrentShows.scss'
import { Link, useNavigate } from "react-router-dom";
import addIcon from '../../assets/icons/add-icon.png'
import starIcon from '../../assets/icons/star.png'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import DatePickerMUI from '../DatePickerMUI/DatePickerMUI.jsx'

const CurrentShows = () => {

    const [shows, setShows] = useState([])
    const [open, setOpen] = useState(false)
    const [currentExhibition, setCurrentExhibition] = useState({});

    const API_URL = import.meta.env.VITE_API_URL 

    const getCurrentShows = async() => {
        const response = await axios(`${API_URL}/exhibitions`);
        setShows(response.data)
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
            show_id: currentExhibition?.show_id,
            seen: true,
            review: event.target.review.value
        }
        postNewReview(newReview);
        console.log(newReview)
        navigate('/:exhibitionId')
    }

    const Transition = forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

    const handleClose = () => {
        setCurrentExhibition(null);
        setOpen(false)
    };
 
    const handleClickOpen = (exhibition) => {
        setCurrentExhibition(exhibition);
        setOpen(true);
    };

    useEffect(() => {
        getCurrentShows()
    }, [])

    return (
        <main className="home">
            <header>
                <h1 className="current-shows__title">Exhibitions</h1>
            </header>
            <section className="current-shows">
                {
                    Object.keys(shows).map((showId) => {
                        const exhibition = shows[showId]

                        const makeArtistsArrString = (exhibition) => {
                            if (exhibition.artists.length > 1) {
                                return exhibition.artists.join(', ') 
                        } else {
                            return exhibition.artists
                        }}

                        const artistsAsString = makeArtistsArrString(exhibition)

                        return (
                            <>

                            <article className="exhibition">
                                <div className="exhibition__icons">
                                    <img className='icon' src={starIcon} alt="Add to List" />
                                    <img className='icon' src={addIcon} alt='Add Exhibition' onClick={() => handleClickOpen(exhibition)}/>
                                </div>
                                <Link className='exhibition__link' to={`/${exhibition.show_id}`} key={exhibition.show_id}>
                                <img className='exhibition__image' src={`${API_URL}/public/images/${exhibition.show_image}`} />
                                <div className="exhibition-info">
                                    <h3 className="exhibition-info__title">{exhibition.title} <span className="exhibition-info__artist">| {artistsAsString}</span></h3>
                                    <p className="exhibition-info__place">{exhibition.location}</p>
                                </div>
                                </Link>
                            </article>
                            {currentExhibition && (
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
                                                <h3 className="review-dialog__label">{currentExhibition.title}</h3>
                                                <img src={`${API_URL}/public/images/${currentExhibition.show_image}`} alt="Exhibition Image" className="review-dialog__thumbnail" />
                                                <label className="review-dialog__label">
                                                    Visit Date
                                                </label>
                                                <DatePickerMUI className='review-dialog__date' />
                                                <label className="review-dialog__label review-dialog__label--bottom">Add Review</label>
                                                <textarea type="text" name="review" className="review-dialog__input" />
                                            </DialogContent>
                                            <DialogActions>
                                                <button className='review-dialog__post' type="submit">Post</button>
                                                <button className='review-dialog__post' onClick={handleClose} type="button">Cancel</button>
                                            </DialogActions>
                                        </div>
                                    </form>
                                </Dialog>
                            )}
                         </>
                        )
                    })
                }
            </section>
        </main>
    )
}

export default CurrentShows