import { useState, useEffect } from "react";
import axios from "axios";
import './CurrentShows.scss'
import { Link } from "react-router-dom";
import addIcon from '../../assets/icons/add-icon.png'
import starIcon from '../../assets/icons/star.png'

const CurrentShows = () => {

    const [shows, setShows] = useState([])
    const API_URL = import.meta.env.VITE_API_URL 

    const getCurrentShows = async() => {
        const response = await axios(`${API_URL}/exhibitions`);
        setShows(response.data)
    }

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
                            <Link className='exhibition__link' to={`/${exhibition.show_id}`} key={exhibition.show_id}>
                            <article className="exhibition">
                                <div className="exhibition__icons">
                                    <img className='icon' src={starIcon} alt="Add to List" />
                                    <img className='icon' src={addIcon} alt='Add Exhibition'/>
                                </div>
                                <img className='exhibition__image' src={`${API_URL}/public/images/${exhibition.show_image}`} />
                                <div className="exhibition-info">
                                    <h3 className="exhibition-info__title">{exhibition.title} <span className="exhibition-info__artist">| {artistsAsString}</span></h3>
                                    <p className="exhibition-info__place">{exhibition.location}</p>
                                </div>
                            </article>
                            </Link>
                        )
                    })
                }
            </section>
        </main>
    )
}

export default CurrentShows