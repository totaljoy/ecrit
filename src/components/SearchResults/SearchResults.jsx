import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import addIcon from '../../assets/icons/add.svg'
import starIcon from '../../assets/icons/star.svg'

const SearchResults = () => {

    const API_URL = import.meta.env.VITE_API_URL 
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('query') || '');
    const [results, setResults] = useState([])

    const getSearchResults = async () =>{
        const result = await axios(`${API_URL}/search/?search=${ search }`)
        console.log(result.data)
        setResults(result.data)
    }

    useEffect(() => {
        getSearchResults()
    }, [])

    return (
        <main className="search-result">
            <h2 className="search-result__title">{`Search results for: ${search}`}</h2>
            <section>
                <h3>Exhibitions</h3>
                <div>
                    {   
                        results.exhibitions && results.exhibitions.map((exhibition) => {

                            return (
                                <article className="exhibition">
                                <div className="exhibition__icons">
                                    <img className='icon' src={starIcon} alt="Add to List" />
                                    <img className='icon' src={addIcon} alt='Add Exhibition' onClick={() => handleClickOpen(exhibition)}/>
                                </div>
                                <Link className='exhibition__link' to={`/${exhibition.show_id}`} key={exhibition.show_id}>
                                <img className='exhibition__image' src={`${API_URL}/public/images/${exhibition.show_image}`} />
                                <div className="exhibition-info">
                                    <h3 className="exhibition-info__title">{exhibition.title}</h3>
                                    <p className="exhibition-info__place">{exhibition.location}</p>
                                </div>
                                </Link>
                            </article>
                            )
                        })
                    }
                </div>
            </section>
            <section>
                <h3>Users</h3>
                {   
                        results.users && results.users.map((exhibition) => {

                            return (
                                <article className="exhibition">
                                <div className="exhibition__icons">
                                    <img className='icon' src={addIcon} alt='Add Exhibition' onClick={() => handleClickOpen(exhibition)}/>
                                </div>
                                <Link className='exhibition__link' to={`/${exhibition.show_id}`} key={exhibition.show_id}>
                                <img className='exhibition__image' src={`${API_URL}/public/images/${exhibition.avatar}`} />
                                <div className="exhibition-info">
                                    <h3 className="exhibition-info__title">{exhibition.name}</h3>
                                    <p className="exhibition-info__place">{exhibition.username}</p>
                                </div>
                                </Link>
                            </article>
                            )
                        })
                    }
            </section>
        </main>
    )
}

export default SearchResults