import logo from '../../../assets/eCritLogo.png'
import { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase'
import './SignIn.scss'

const SignIn = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [isSignUpOpen, setIsSignUpOpen] = useState(false)
    const [signInEmail, setSignInEmail] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpUsername, setSignUpUsername] = useState('')
    const [signInPW, setSignInPW] = useState('')
    const [signUpPW, setSignUpPW] = useState('')
    const [signUpConfirmPW, setSignUpConfirmPW] = useState('')

    const toggleLoginDropdown = () => {
        setIsLoginOpen(!isLoginOpen)
        setIsSignUpOpen(false)
    }

    const toggleSignUpDropdown = () => {
        setIsSignUpOpen(!isSignUpOpen)
        setIsLoginOpen(false)
    }

    const createServerUser = async () => {
        try {
            const newUser = {
                username: signUpUsername,
                email: signUpEmail
            }
            await axios.post(`${API_URL}/users`, newUser)
        } catch(err) {
            console.log(err)
        }
    }

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, signInEmail, signInPW)
        .then((userCredential) => {
            console.log(userCredential)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const signUp = (e) => {
        e.preventDefault();

        if (signUpPW === signUpConfirmPW) {
            createUserWithEmailAndPassword(auth, signUpEmail, signUpPW)
            createServerUser()
            .then((userCredential) => {
                console.log(userCredential)
            })
            .catch((error) => {
                console.log(error)
            })
        } else {
            alert('Passwords must match!')
        }
    }

    return (
        <main className='login'>
            <img className="login__logo" src={logo} alt="eCrit Logo" />
            <h2 className='login__title'>éCrit</h2>
            <h3 className='login__tagline'>A social art reviewing hub with the goal of coming to a more collective understanding of the meaning of contemporary art</h3>

            {isLoginOpen && (
                    <form onSubmit={signIn} className='login__form' action="submit">
                        <label className='login__label' htmlFor="email">Email</label>
                        <input 
                            className='login__input' 
                            value={signInEmail} 
                            onChange={(e) => setSignInEmail(e.target.value)}
                            type="text" 
                        />
                        <label className='login__label' htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            value={signInPW} 
                            className='login__input'
                            onChange={(e) => setSignInPW(e.target.value)}
                        />
                        <button type='submit' className='login__button login__button--form'>Login</button>
                    </form>
                )}

                {isSignUpOpen && (
                    <form onSubmit={signUp} className='login__form' action="submit">
                        <label className='login__label' htmlFor="email">Email</label>
                        <input 
                            type="text" 
                            className='login__input'
                            value={signUpEmail} 
                            onChange={(e) => setSignUpEmail(e.target.value)}
                        />
                        <label className='login__label' htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            value={signUpUsername} 
                            className='login__input'
                            onChange={(e) => setSignUpUsername(e.target.value)}
                        />
                        <label className='login__label' htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            className='login__input'
                            value={signUpPW} 
                            onChange={(e) => setSignUpPW(e.target.value)}
                        />
                        <label className='login__label' htmlFor="password">Confirm Password</label>
                        <input 
                            type="password" 
                            className='login__input'
                            value={signUpConfirmPW} 
                            onChange={(e) => setSignUpConfirmPW(e.target.value)}
                        />
                        <button type='submit' className='login__button login__button--form'>Sign Up</button>
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