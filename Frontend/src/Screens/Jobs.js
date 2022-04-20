import React, { useState, useContext, useEffect } from 'react';
import JobInfo from '../Components/JobInfo';
import JobTable from '../Components/JobTable';
import CandidateTable from '../Components/CandidateTable';
import NotyfContext from '../Components/NotyfContext';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const Jobs = () => {
  const [assignJob, setAssignJob] = useState(false);
  const [jobAssigned, setJobAssigned] = useState({});
  const [resourceArray, setResourceArray] = useState([]);
  const [editData, setEditData] = useState({});
  const [sendData, setSendData] = useState({});
  const [projects, setProjects] = useState([]);

  const notyf = useContext(NotyfContext);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (userInfo && userInfo.username) {
      getProjects();
    }
  }, [history, userInfo]);

  useEffect(() => {
    if (userInfo && userInfo.username) {
      if (editData) {
        populateData(editData);
      }
    }
  }, [editData, userInfo]);

  // useEffect(() => {
  //   getProjects();
  // }, []); Combined with above

  async function getProjects() {
    const { data } = await axios.get('/api/get_projects');
    setProjects(data);
  }

  // useEffect(() => {
  //   if (Number(assignCount) > Number(jobAssigned.feCount)) {
  //     setError(true);
  //   }
  // }, [assignCount]);

  const populateData = data => {
    setSendData(data);
  };

  const childToParent = (item, job) => {
    item.sort((a, b) => (a.feLevel < b.feLevel ? 1 : -1));
    setAssignJob(true);
    setResourceArray(item);
    setJobAssigned(job);
    // console.log('Job Id is ' + jobAssigned);

    // setJobName(item.name);
  };

  const editDataChildToParent = data => {
    setEditData(data);
  };

  async function assignTask(resource) {
    // if (resource.availability !== 'No') {
    const data = {
      name: resource.name,
      jobId: jobAssigned._id,
      id: resource._id
    };
    try {
      const res = await axios.post('/api/assign_resource', data);
      console.log(res);
      if (res.data === 'Assigned') {
        notyf.success('Resource assigned');
      } else if (res.data === 'Filled') {
        notyf.error('Requirement Filled');
      } else if (res.data === 'Duplicate') {
        notyf.error('Already Assigned');
      }
      // console.log(res);
    } catch (error) {
      console.log(error);
    }

    // } else {
    //   notyf.error('Resource not available');
    // }
  }

  return (
    <main className='bg-dark text-light'>
      <section className='w-50 mx-auto p-4'>
        <h3 className='my-4 text-center'>Jobs Form </h3>
        <JobInfo sendData={sendData} projects={projects} />
      </section>
      <section className='p-2 w-75 mx-auto mt-3'>
        <h3 className='mb-3'>Table </h3>
        <JobTable childToParent={childToParent} editDataChildToParent={editDataChildToParent} />
      </section>
      {assignJob && (
        <section className='p-2 w-75 mx-auto'>
          {/* <h3 className='my-3'>Suitable Candidates for {jobName}</h3> */}
          <h3 className='my-4'>Suitable Candidates for {jobAssigned.name}</h3>
          <h6>Number of Field Engineers Required : {jobAssigned.feCount}</h6>
          {/* <h6>Number of Field Engineers Assigned: {jobAssigned && jobAssigned.assigned && jobAssigned.assigned.length}</h6> */}

          <CandidateTable resourceArray={resourceArray} assignTask={assignTask} jobAssigned={jobAssigned} projects={projects} />
        </section>
      )}
    </main>
  );
};

export default Jobs;
