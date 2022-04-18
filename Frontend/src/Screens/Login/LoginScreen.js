import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../Components/FormContainer';
import { login } from '../../Actions/userActions';
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';
import './LoginScreen.css';

const LoginScreen = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo && userInfo.username) {
      console.log(userInfo.username);
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(userName, password));
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className='container-fluid ps-md-0'>
      <div className='row g-0'>
        <div className='d-none d-md-flex col-md-4 col-lg-6 bg-image'></div>
        <div className='col-md-8 col-lg-6'>
          {/* <h2 className='text-center'>Giesecke+Devrient</h2> */}
          {error && <Message variant='danger'>{error}</Message>}
          {/* {loading && <Loader />} */}
          <div className='login d-flex align-items-center '>
            <div className='container'>
              <div className='row'>
                <div className='col-md-9 col-lg-8 mx-auto'>
                  <h3 className='login-heading mb-4'>Welcome back!</h3>

                  <form onSubmit={submitHandler}>
                    <div className='form-floating mb-3'>
                      <input type='text' className='form-control' id='floatingInput' placeholder='Username' value={userName} onChange={e => setUserName(e.target.value)} />
                      <label for='floatingInput'>Username</label>
                    </div>
                    <div className='form-floating mb-3'>
                      <input type={passwordShown ? 'text' : 'password'} className='form-control' id='floatingPassword' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                      <label for='floatingPassword'>Password</label>
                    </div>

                    <div className='form-check mb-3'>
                      <input className='form-check-input' type='checkbox' value='' id='rememberPasswordCheck' onClick={togglePassword} />
                      <label className='form-check-label' for='rememberPasswordCheck'>
                        Show Password
                      </label>
                    </div>

                    <div className='d-grid'>
                      <button className='btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2' type='submit'>
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
