import React from 'react'
import SEO from '../componenets/shared/Seo'
import { Link } from 'react-router-dom'


const LoginPage = () => {
    return (
        <>
            <SEO title="Login" />
            <h2>this pArt</h2>
            <p>Please Login</p>
            <form>
                <input type="text" placeholder="Username..." />
                <input type="password" placeholder="Password..." />
                <button>Login</button>
            </form>
            <p>- or -</p>
            <button>Login with Google</button>
            <div>
                <p>------------------------</p>
                <p>Not signed up?</p>
                <Link to="/accounts/emailsignup">
                    <button>Sign Up</button>
                </Link>
            </div>
        </>
    )
}

export default LoginPage
