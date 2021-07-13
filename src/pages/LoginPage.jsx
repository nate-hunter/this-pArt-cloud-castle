import React, { useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Card, CardHeader, InputAdornment, TextField, Typography } from "@material-ui/core";

import { AuthContext } from '../auth';
import isEmail from 'validator/lib/isEmail';
import { useApolloClient } from "@apollo/react-hooks";
import { GET_USER_EMAIL } from "../graphql/queries";
import { AuthError } from './SignupPage';

import SEO from '../components/shared/Seo';


const LoginPage = () => {
  const {
    register,
    handleSubmit, 
    watch,
    formState: { errors },
  } = useForm();

  const { logInWithEmailAndPassword } = useContext(AuthContext);
  const [showPassword, setPasswordToggle] = useState(false);
  const hasPassword = Boolean(watch('password'));
  const history = useHistory();
  const client = useApolloClient();
  const [error, setError] = React.useState('');

  const getUserEmail = async input => {
    const variables = { username: input };
    const response = await client.query({
      query: GET_USER_EMAIL,
      variables
    })
    const userEmail = response.data.users[0]?.email || 'error@email.com';
    console.log('user email:', userEmail)
    return userEmail;
  }

  const handleError = (error) => {
    if (error.code.includes('auth')) {
      setError(error.message);
    }
  }

  const onSubmit = async ({ input, password }) => {
    try {
      setError('');
      if (!isEmail(input)) {
        input = await getUserEmail(input);
      }
      await logInWithEmailAndPassword(input, password);
      setTimeout(() => history.push('/'), 0);
    } catch (error) {
      console.error('error code in catch:', error.code)
      setError(error.message);
      handleError(error)
    }
  };

  const handlePasswordToggle = () => {
    setPasswordToggle(!showPassword)
  }

  return (
    <>
      <SEO title='Login' />
      <h2>this pArt</h2>
      <p>Please Login</p>

      <div className='login-form'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <br/>
          <label>Username or Email:</label>
          <input
            type='text'
            placeholder='Username...'
            {...register('input', { required: true, minLength: 5 })}
          />
          {errors.input?.type === 'minLength' && 'Email/username below minimum character requirement'}

          <br/>
          <label>Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password...'
            {...register('password', { required: true, minLength: 5 })}
          />
          {hasPassword && (
            <span onClick={handlePasswordToggle} style={{ backgroundColor: 'lemonchiffon', cursor: 'pointer', padding: '5px', border: '0.5px solid slategrey', borderRadius: '5px' }}>
              {showPassword ? 'Hide Password' : 'Show Password'}
            </span>)
          }
          {errors.password?.type === 'minLength' && 'Password below minimum character requirement'}

          <br/>
          <br/>
          {/* <Button type="submit" variant="contained">Login Btn Component</Button> */}
          <button type='submit' style={{ backgroundColor: 'lightseagreen', color: 'white', padding: '5px', border: '0.5px solid slategrey', borderRadius: '5px' }}>Login Btn Tag</button>
          {/* <input type="submit" value="Login Input Tag" /> */}
        </form>
        <AuthError error={error} />
      </div>

      <p>- or -</p>

      <GoogleLogin />
      {/* <button className='googleLoginBtn'>Login with Google</button> */}

      <div className='signup'>
        <p>------------------------</p>
        <p>Not signed up?</p>
        <Link to='/accounts/emailsignup'>
          <button>Sign Up</button>
        </Link>
      </div>
    </>
  );
};

export const GoogleLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = React.useState('');
  const history = useHistory();


  async function handleLogInWithGoogle() {
    try {
      await signInWithGoogle();
      setTimeout(() => history.push("/"), 0);
    } catch (err) {
      console.error('Error logging in with Google', err);
      setError(err.message)
    }
  }

  return (
    <>
      {/* <Button onClick={handleLogInWithGoogle} fullWidth color={color} variant={variant} > */}
      <Button onClick={handleLogInWithGoogle} color='primary'  >
        Log In with Google
      </Button>
      <AuthError error={error} />
    </>
  )
}

export default LoginPage;
