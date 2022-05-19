import React, { useState, useContext, useEffect } from 'react';
import JobInfo from '../Components/JobInfo';
import JobTable from '../Components/JobTable';
import CandidateTable from '../Components/CandidateTable';
import NotyfContext from '../Components/NotyfContext';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const Jobs = () => {
  const [assignJob, setAssignJob] = useState(false);
  const [jobAssigned, setJobAssigned] = useState({});
  const [resourceArray, setResourceArray] = useState([]);
  const [updatedResourceArray, setUpdatedResourceArray] = useState([]);
  const [editData, setEditData] = useState({});
  const [sendData, setSendData] = useState({});
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [avl, setAvl] = useState(true);

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

  async function getProjects() {
    const { data } = await axios.get('/api/get_projects');
    setProjects(data);
    let ids = [];
    data.forEach(item => {
      ids.push(item.projectId);
    });
    const a = {
      arr: ids
    };
    const pro = await axios.post('/api/workload', a);
    let events = [];
    setEvents(pro.data);
  }

  const populateData = data => {
    setSendData(data);
  };

  const childToParent = (item, job) => {
    item.sort((a, b) => (a.feLevel < b.feLevel ? 1 : -1));
    item.forEach(it => (it.availability = false));

    setAssignJob(true);
    setResourceArray(item);
    setJobAssigned(job);
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

  const checkHandler = () => {
    let relEvents = events.filter(event => new Date(event.startDate.split(' ')[0]) <= new Date(jobAssigned.endDate) && new Date(event.endDate.split(' ')[0]) >= new Date(jobAssigned.startDate));
    let dataArr = [...resourceArray];
    dataArr.forEach(item => {
      let flag = true;
      relEvents.forEach(rel => {
        rel.resources.forEach(res => {
          if (res.resourceId === Number(item.gid)) {
            flag = false;
          }
        });
      });
      if (flag) {
        item.availability = true;
      }
    });
    setUpdatedResourceArray(resourceArray);
  };

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
          <Button className='my-2' onClick={checkHandler}>
            Check All
          </Button>
          {/* <h6>Number of Field Engineers Assigned: {jobAssigned && jobAssigned.assigned && jobAssigned.assigned.length}</h6> */}

          <CandidateTable resourceArray={resourceArray} assignTask={assignTask} jobAssigned={jobAssigned} projects={projects} avl={avl} />
        </section>
      )}
    </main>
  );
};

export default Jobs;
