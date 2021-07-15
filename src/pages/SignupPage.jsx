import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import isEmail from 'validator/lib/isEmail';
import { useApolloClient } from '@apollo/react-hooks';

import { Button, Typography } from "@material-ui/core";
// import { Button, Card, InputAdornment, TextField, Typography } from "@material-ui/core";
// import { HighlightOff, CheckCircleOutline } from '@material-ui/icons';

import SEO from '../components/shared/Seo';
import { AuthContext } from '../auth';
import { CHECK_IF_USERNAME_EXISTS } from "../graphql/queries";


// TO DO:
// [] Style Form
// [] Validate username and password inputs 


const SignupPage = () => {
  const { signUpWithEmailAndPassword } = useContext(AuthContext);
  // const { register, handleSubmit, watch, formState: { errors }, } = useForm();
  const history = useHistory();
  const [error, setError] = useState('');
  const client = useApolloClient();

  
  // Basic Controlled Form:
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


  
  const handleError = (error) => {
    if (error.message.includes('users_username_key')) {
      setError('Username already exists');
    } else if (error.code.includes('auth')) {
      setError(error.message);
    }
  }

  const validateUsername = async username => {
    console.log('username:', username)
    const variables = { username };
    const response = await client.query({
      query: CHECK_IF_USERNAME_EXISTS,
      variables
    });
    const isUsernameValid = response.data.users.length === 0;
    return isUsernameValid;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // await signUpWithEmailAndPassword(userInfo);
    // history.push('/');

    console.log('valid username?', await validateUsername(userInfo.username));
    
    try {
      if (await validateUsername(userInfo.username)) {
        setError('');
        await signUpWithEmailAndPassword(userInfo);
        setTimeout(() => history.push('/'), 0);
      } else {
        setError('Username taken')
      }
    } catch (error) {
      setError(error.message);
      handleError(error);
    }
  }
  

  /* 
  // React Hook Form:
  // const onSubmit = async userDataObj => {
  async function onSubmit(userDataObj) {
    console.log('submitted signup data:', userDataObj);
    try {
      setError('');
      await signUpWithEmailAndPassword(userDataObj);
      setTimeout(() => history.push('/'), 0);
    } catch (error) {
      setError(error.message);
      handleError(error);
    }
  }

  const handleError = (error) => {
    if (error.message.includes('users_username_key')) {
      setError('Username already exists');
    } else if (error.code.includes('auth')) {
      setError(error.message);
    }
  }

  const validateUsername = async username => {
    console.log('username:', username)
    // const variables = { username };
    // const response = await client.query({
    //   query: CHECK_IF_USERNAME_EXISTS,
    //   variables
    // });
    // console.log('validate username response:', response);
    // const isUsernameValid = response.data.users.length === 0;
    // return isUsernameValid;
  }

  const errorIcon = (
    <InputAdornment>
      <HighlightOff style={{ color: 'red', height: 30, width: 30 }} />
    </InputAdornment>
  )

  const validIcon = (
    <InputAdornment>
      <CheckCircleOutline style={{ color: 'lightseagreen', height: 30, width: 30 }} />
    </InputAdornment>
  )
  */

  return (
    <>
      <SEO title='Signup' />
      <h2>this pArt</h2>
      <p>Sign up to see public art pieces from around the world.</p>
      <Button
        type='submit'
        style={{ backgroundColor: 'slateblue', color: 'white' }}
      >
        Signup with Google
      </Button>
      <p>- or -</p>

      {/*  React Hook Form:   

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          type='email' 
          label='Email..' 
          inputRef={register('email', {
            required: true,
            validate: input => isEmail(input),
          })}
        />
        <TextField 
          type='text' 
          label='Fullname...'
          inputRef={register('name', {
            required: true,
            minLength: 5,
            maxLength: 50
          })}
          // InputProps={{
          //   endAdornment: errors.name 
          //     ? errorIcon 
          //     : validIcon
          // }}
        />
        <TextField 
          type='text' 
          label='Username...' 
          inputRef={register('username', {
            required: true,
            minLength: 5,
            maxLength: 25,
            // validate: async input => await validateUsername(input),
            pattern: /^[a-zA-Z0-9._-|$<>]*$/
          })}
        />
        <TextField 
          type='password' 
          label='Password...' 
          inputRef={register('password', {
            required: true,
            minLength: 5
          })}

          autoComplete='new-password'
        />
        <Button
          // disabled={!isValid || !isSubmitting}
          // type='submit'
          type="submit"
          // style={{ backgroundColor: 'lightseagreen'}}
        >
          Signup
        </Button>
      </form>

      <AuthError error={error} />
      */}

      <div>
        <form onSubmit={handleSubmit}>
          <input
            name='email'
            onChange={handleChange}
            type='text'
            placeholder='Email...'
          />
          <input
            name='name'
            onChange={handleChange}
            type='text'
            placeholder='Fullname...'
          />
          <input
            name='username'
            onChange={handleChange}
            type='text'
            placeholder='Username...'
          />
          <input
            name='password'
            onChange={handleChange}
            type='password'
            placeholder='Password...'
          />

          <button
            type='submit'
            style={{
              backgroundColor: 'lightseagreen',
              color: 'white',
              border: 'none',
              margin: '10px',
              padding: '10px',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            Signup
          </button>
        </form>
        <AuthError error={error} />
      </div>

      <div>
        <br />
        <p>Already signed up?</p>
        <Link to='/accounts/login'>
          <Button style={{ backgroundColor: 'lightseagreen' }}>Login</Button>
        </Link>
      </div>
    </>
  );
};

export function AuthError({ error }) {
  return Boolean(error) && (
    <Typography 
      align='center'
      gutterBottom
      variant='body2'
      style={{ color: 'red' }}
    >
      {error}
    </Typography>
  )
}

export default SignupPage;


/* Pieces for a controlled form:

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

<form onSubmit={handleSubmit}>
  <input name='email' onChange={handleChange} type='text' placeholder='Email...' />
  <input name='name' onChange={handleChange} type='text' placeholder='Fullname...' />
  <input name='username' onChange={handleChange} type='text' placeholder='Username...' />
  <input name='password' onChange={handleChange} type='password' placeholder='Password...' />
  <button>Signup</button>
</form>

*/