import React, { useState, useContext } from 'react';
import SEO from '../components/shared/Seo';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../auth';


const SignupPage = () => {
  const { signUpWithEmailAndPassword } = useContext(AuthContext);

  const history = useHistory();

  const [userInfo, setUserInfo] = useState({
      name: '',
      username: '',
      email: '',
      password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await signUpWithEmailAndPassword(userInfo);
    history.push('/');
  }

  return (
    <>
      <SEO title='Signup' />
      <h2>this pArt</h2>
      <p>Sign up to see public art pieces from around the world.</p>
      <button>Sign Up with Google</button>
      <p>- or -</p>
      <form onSubmit={handleSubmit}>
        <input name='email' onChange={handleChange} type='text' placeholder='Email...' />
        <input name='name' onChange={handleChange} type='text' placeholder='Fullname...' />
        <input name='username' onChange={handleChange} type='text' placeholder='Username...' />
        <input name='password' onChange={handleChange} type='password' placeholder='Password...' />
        <button>Signup</button>
      </form>
      <div>
        <p>------------------------</p>
        <p>Already signed up?</p>
        <Link to='/accounts/login'>
          <button>Login</button>
        </Link>
      </div>
    </>
  );
};

export default SignupPage;
