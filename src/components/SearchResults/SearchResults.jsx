import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import addIcon from '../../assets/icons/add.svg'
import starIcon from '../../assets/icons/star.svg'
import './SearchResults.scss'

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
        if (search) {
            setSearchParams(search)
            getSearchResults()
    }}, [search])

    return (
        <main className="search-results">
            <h2 className="search-results__header">{`Search results for: ${search}`}</h2>
            <section className="search-results__container">
                <h3 className="search-result__header">Exhibitions</h3>
                <div className="search-result">
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
            <section className="search-results__container">
                <h3 className="search-result__header">Users</h3>
                <div className="search-result">
                {   
                        results.users && results.users.map((user) => {

                            return (
                                <article className="user">
                                <Link className='user__link exhibition__link' to={`/profile/${user.user_id}`} key={user.user_id}>
                                    <img className='user__image' src={`${API_URL}/public/images/${user.avatar}`} />
                                    <div className="user-info">
                                        <h3 className="exhibition-info__title">{user.name}</h3>
                                        <p className="exhibition-info__place">{user.username}</p>
                                    </div>
                                    <img className='user__icon' src={addIcon} alt='Add Exhibition' onClick={() => handleClickOpen(user)}/>
                                </Link>
                            </article>
                            )
                        })
                    }
                </div>
            </section>
        </main>
    )
}

export default SearchResults