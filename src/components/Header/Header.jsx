import logo from '../../assets/eCritLogo.png'
import './Header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <img className="logo" src={logo} alt="eCrit Logo" />
            <h2 className='header__title'>éCrit</h2>
            <ul className='header-nav'>
                <Link to='/' className='header-nav__link'><li className='header-nav__item'>Feed</li></Link>
                <Link to='/explore' className='header-nav__link'><li className='header-nav__item'>Explore</li></Link>
                <li className='header-nav__item'>Profile</li>
            </ul>
        </header>
    )
}

export default Header