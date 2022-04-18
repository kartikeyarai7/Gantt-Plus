import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <>
      <div className='p-4 w-50 mx-auto'>
        <form>
          <h3 className='my-5 text-light'>Log in</h3>

          <div className='form-group p-2'>
            <label className='my-2 text-light'>Email</label>
            <input type='email' className='form-control' placeholder='Enter email' />
          </div>

          <div className='form-group p-2'>
            <label className='my-2 text-light'>Password</label>
            <input type='password' className='form-control' placeholder='Enter password' />
          </div>

          <button type='submit' className='btn btn-dark btn-lg btn-block my-5'>
            Sign in
          </button>
          {/* <p className='forgot-password text-right text-light'>
            Forgot <a href='#'>password?</a>
          </p> */}
        </form>
      </div>
    </>
  );
};

export default Login;
