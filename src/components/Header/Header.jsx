import logo from '../../assets/eCritLogo.png'
import './Header.scss';

const Header = () => {
    return (
        <header className="header">
            <img className="logo" src={logo} alt="eCrit Logo" />
            <h2 className='header__title'>éCrit</h2>
            <ul className='header-nav'>
                <li className='header-nav__item'>Openings</li>
                <li className='header-nav__item'>Current Shows</li>
                <li className='header-nav__item'>Feed</li>
                <li className='header-nav__item'>Profile</li>
            </ul>
        </header>
    )
}

export default Header