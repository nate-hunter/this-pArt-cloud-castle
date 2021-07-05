import React from 'react';
import SEO from '../components/shared/Seo';
import { Link } from 'react-router-dom';


const SignupPage = () => {
    return (
        <>
            <SEO title="Signup" />
            <h2>this pArt</h2>
            <p>Sign up to see public art pieces from around the world.</p>
            <button>Sign Up with Google</button>
            <p>- or -</p>
            <form>
                <input type="text" placeholder="Email..." />
                <input type="text" placeholder="Fullname..." />
                <input type="text" placeholder="Username..." />
                <input type="password" placeholder="Password..." />
                <button>Signup</button>
            </form>
            <div>
                <p>------------------------</p>
                <p>Already signed up?</p>
                <Link to="/accounts/login">
                    <button>Login</button>
                </Link>
            </div>
        </>
    )
}

export default SignupPage
