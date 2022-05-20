import React, { useEffect } from 'react';
import DisplayJobTable from '../Components/DisplayJobTable';
import DisplayResourceTable from '../Components/DisplayResourceTable';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import HomeScreen from './HomeScreen/HomeScreen';

const Home = () => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [history, userInfo]);

  return (
    <HomeScreen />
    // <main className='bg-dark text-light'>
    //   <section className='p-3'>
    //     <h4 className='text-center my-4'>Resource List</h4>
    //     <DisplayResourceTable />
    //     <h4 className='text-center my-4'>Job List</h4>
    //     <DisplayJobTable />
    //   </section>
    // </main>
  );
};

export default Home;
