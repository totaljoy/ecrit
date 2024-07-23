import logo from '../../assets/eCritLogo.png'
import { useState } from 'react'
import './SignIn.scss'

const SignIn = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [isSignUpOpen, setIsSignUpOpen] = useState(false)

    const toggleLoginDropdown = () => {
        setIsLoginOpen(!isLoginOpen)
        setIsSignUpOpen(false)
    }

    const toggleSignUpDropdown = () => {
        setIsSignUpOpen(!isSignUpOpen)
        setIsLoginOpen(false)
    }

    return (
        <main className='login'>
            <img className="login__logo" src={logo} alt="eCrit Logo" />
            <h2 className='login__title'>éCrit</h2>
            <h3 className='login__tagline'>A social art reviewing hub with the goal of coming to a more collective understanding of the meaning of contemporary art</h3>

            {isLoginOpen && (
                    <form className='login__form' action="submit">
                        <label className='login__label' htmlFor="email">Email</label>
                        <input className='login__input' type="text" />
                        <label className='login__label' htmlFor="password">Password</label>
                        <input type="password" className='login__input'/>
                        <button className='login__button login__button--form'>Login</button>
                    </form>
                )}

                {isSignUpOpen && (
                    <form className='login__form' action="submit">
                        <label className='login__label' htmlFor="email">Email</label>
                        <input type="text" className='login__input'/>
                        <label className='login__label' htmlFor="password">Password</label>
                        <input type="password" className='login__input'/>
                        <label className='login__label' htmlFor="password">Confirm Password</label>
                        <input type="password" className='login__input'/>
                        <button className='login__button login__button--form'>Sign Up</button>
                    </form>
                )}

            {(!isSignUpOpen && !isLoginOpen) && (<section className='login__buttons'>
                <button className='login__button' onClick={toggleLoginDropdown}>
                    Login
                </button>
                <button className='login__button' onClick={toggleSignUpDropdown}>
                    Sign Up
                </button>
            </section>)}
        </main>
    )
}

export default SignIn