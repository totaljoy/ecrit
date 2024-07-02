import { useState, useEffect } from "react";
import axios from "axios";
import './CurrentShows.scss'

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
                <h1 className="current-shows__title">Current Shows</h1>
            </header>
            <section className="current-shows">
                {
                    shows.map((show) => {
                        return (
                            <article className="exhibition">
                                <img className='exhibition__image' src={`${API_URL}/public/images/${show.show_image}`} />
                                <div className="exhibition-info">
                                    <h3 className="exhibition-info__title">{show.title} <span className="exhibition-info__artist">| {show.artist}</span></h3>
                                    <p className="exhibition-info__place">{show.location}</p>
                                </div>
                            </article>
                        )
                    })
                }
            </section>
        </main>
    )
}

export default CurrentShows