import React from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Button, Form, Row, Col } from 'react-bootstrap';
import NotyfContext from './NotyfContext';

const JobTable = ({ childToParent, editDataChildToParent }) => {
  const [db, setDb] = useState([]);
  const [dbf, setDbf] = useState([]);
  const [projectFilter, setProjectFilter] = useState('');
  const [skillsFilter, setSkillsFilter] = useState('');
  const [resources, setResources] = useState([]);
  const notyf = useContext(NotyfContext);

  useEffect(() => {
    getDataHandler();
  }, [db]); // Check Better Method

  useEffect(() => {
    getResources();
  }, []);

  const filterResults = () => {
    // console.log(skillsFilter);
    let a = [];
    if (projectFilter && !skillsFilter) {
      db.forEach(item => {
        if (item.projectName.trim().toLowerCase() === projectFilter.trim().toLowerCase()) {
          a.push(item);
        }
      });
      setDbf(a);
    }
    if (!projectFilter && skillsFilter) {
      db.forEach(item => {
        if (item.skillsReq.trim().toLowerCase() === skillsFilter.trim().toLowerCase()) {
          a.push(item);
        }
      });
      setDbf(a);
    }
    if (projectFilter && skillsFilter) {
      db.forEach(item => {
        if (item.skillsReq.trim().toLowerCase() === skillsFilter.trim().toLowerCase() && item.projectName.trim().toLowerCase() === projectFilter.trim().toLowerCase()) {
          a.push(item);
        }
      });
      setDbf(a);
    }
    if (!projectFilter && !skillsFilter) {
      a = [];
      setDbf(a);
    }
  };

  async function getDataHandler() {
    try {
      const { data } = await axios.get('/api/jobs');
      setDb(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteHandler(i) {
    try {
      const id = { id: db[i]._id };
      const { res } = await axios.post('/api/delete_job', id);
      notyf.error('Job deleted');
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async function getResources() {
    try {
      const { data } = await axios.get('/api/get_resource');
      if (data) {
        setResources(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const ganttHandler = i => {
    try {
      const namesArray = [];
      let objArray = [];
      const idsArray = [];
      // const idObj = { resourceId: '' };
      db[i].assigned.forEach(item => {
        const name = item.trim();
        namesArray.push(name);
      });
      namesArray.forEach(item => {
        objArray.push(getId(item));
      });
      objArray.forEach(item => {
        idsArray.push(item.id);
      });
      // console.log(idsArray);
      // console.log(objArray);
      const data = {
        taskId: db[i].taskId,
        resources: idsArray
      };
      assignHandler(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getId = name => {
    const a = resources.find(item => item.name.includes(name));
    return a;
  };

  async function assignHandler(d) {
    try {
      console.log(d);
      const res = await axios.post('/api/assign_ganttPro', d);
      if (res.data === 'Updated') {
        notyf.success('GanttPRO updated');
      } else if (res.data === 'Error') {
        notyf.error('Server Error');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function editHandler(i) {
    try {
      // console.log('Clicked ' + db[i]._id);
      // const id = { id: db[i]._id };
      console.log('clicked at index ' + i);
      editDataChildToParent(db[i]);
      // const res = await axios.put('/edit_user', id);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function taskHandler(i) {
    // childToParent(db[i]);
    // console.log(db[i].category + 'General');
    // console.log(db[i].skillsReq);

    const data = {
      skills: db[i].skillsReq,
      machines: db[i].category,
      country: db[i].country,
      startDate: db[i].startDate,
      endDate: db[i].endDate,
      feLevel: db[i].feLevel,
      productExp: db[i].machines, //product in user model
      exp: db[i].exp,
      isLeader: db[i].lead
    };

    const res = await axios.post('/api/assign_jobs', data);
    console.log(res);
    childToParent(res.data, db[i]);
  }

  return (
    <>
      <>
        <Row className='my-3'>
          <Col>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicCategory'>
                <Form.Control type='string' placeholder='Project Name' value={projectFilter} onChange={e => setProjectFilter(e.target.value)}></Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicCategory'>
                <Form.Control as='select' value={skillsFilter} onChange={e => setSkillsFilter(e.target.value)}>
                  <option value=''>Team</option>
                  <option value='BPS'>BPS</option>
                  <option value='BDS'>BDS</option>
                  <option value='Adaptation'>Adaptation</option>
                  <option value='Software'>Software</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Button onClick={filterResults} className='btn-block btn-primary'>
            Filter
          </Button>
        </Row>
        <Table striped bordered hover variant='dark' className='text-light job-table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Project</th>
              <th>Name</th>
              <th>Team Req</th>
              {/* <th> Duration</th> */}
              {/* <th>Segment</th> */}
              {/* <th>Customer</th> */}
              <th>Start</th>
              <th>End</th>
              {/* <th>Machines</th> */}
              <th>Assigned </th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {db &&
              dbf.length === 0 &&
              db.map((job, index) => (
                <tr>
                  <td>
                    <Link to={`/jobs/${job._id}`} className=' btn btn-light btn-sm text-dark text-decoration-none text-light'>
                      {index + 1}
                    </Link>
                  </td>
                  <td>{job.projectName}</td>
                  <td>{job.name}</td>
                  <td>{job.skillsReq}</td>
                  {/* <td>{job.duration}</td> */}
                  {/* <td>{job.category}</td> */}
                  {/* <td>{job.country ? job.country : '-'}</td> */}
                  <td>{job.startDate && job.startDate}</td>
                  <td>{job.endDate && job.endDate}</td>
                  {/* <td>{job.machines.map(machine => machine + ' ')}</td> */}
                  <td>{job.assigned ? job.assigned.map(item => item + ', ') : '-'}</td>

                  <td>
                    {/* <i className='fas fa-edit mx-1 btn btn-warning' onClick={() => editHandler(index)}></i> */}
                    <i className='fas fa-calendar-check mx-1 btn btn-success btn-sm' onClick={() => taskHandler(index)}></i>

                    <i className='fas fa-edit mx-1 btn btn-warning btn-sm' onClick={() => editHandler(index)}></i>
                    <i className='fas fa-trash-alt mx-1 btn btn-danger btn-sm' onClick={() => deleteHandler(index)}></i>
                    <button className='btn btn-secondary m-1 btn-sm'>
                      <i className='fas fa-arrow-circle-up' onClick={() => ganttHandler(index)}></i>
                    </button>
                  </td>
                </tr>
              ))}
            {dbf &&
              dbf.map((job, index) => (
                <tr>
                  <td>
                    <Link to={`/jobs/${job._id}`} className=' btn btn-light text-dark text-decoration-none text-light'>
                      {index + 1}
                    </Link>
                  </td>
                  <td>{job.name}</td>
                  <td>{job.skillsReq}</td>
                  {/* <td>{job.duration}</td> */}
                  <td>{job.category}</td>
                  {/* <td>{job.country ? job.country : '-'}</td> */}
                  <td>{job.startDate && job.startDate}</td>
                  <td>{job.endDate && job.endDate}</td>
                  {/* <td>{job.machines.map(machine => machine + ' ')}</td> */}
                  <td>{job.assigned ? job.assigned.map(item => item + ' ') : '-'}</td>

                  <td>
                    {/* <i className='fas fa-edit mx-1 btn btn-warning' onClick={() => editHandler(index)}></i> */}
                    <i className='fas fa-calendar-check mx-1 btn btn-success' onClick={() => taskHandler(index)}></i>

                    <i className='fas fa-edit mx-1 btn btn-warning' onClick={() => editHandler(index)}></i>
                    <i className='fas fa-trash-alt mx-1 btn btn-danger' onClick={() => deleteHandler(index)}></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </>

      <Button
        onClick={() => {
          window.location.reload();
        }}
      >
        Refresh
      </Button>
    </>
  );
};

export default JobTable;
