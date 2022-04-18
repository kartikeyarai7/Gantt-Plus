import React, { useState, useEffect } from 'react';
import ResourceInfo from '../Components/ResourceInfo';
import ResourceTable from '../Components/ResourceTable';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const Resources = () => {
  const [editData, setEditData] = useState({});
  const [sendData, setSendData] = useState({});

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [history, userInfo]);

  useEffect(() => {
    if (userInfo && userInfo.username) {
      if (editData) {
        populateData(editData);
      }
    }
  }, [editData, userInfo]);

  const childToParent = data => {
    setEditData(data);
  };

  const populateData = data => {
    setSendData(data);
  };

  return (
    <main className='bg-dark text-light'>
      <section className='w-50 mx-auto p-4'>
        <h3 className='my-4 text-center'>Resources Form </h3>

        <ResourceInfo sendData={sendData} />
      </section>

      <section className='p-2 w-75 mx-auto'>
        <h3 className='my-3'>Table </h3>
        <ResourceTable childToParent={childToParent} />
      </section>
    </main>
  );
};

export default Resources;
