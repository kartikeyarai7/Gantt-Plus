import React from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Button, Row, Form, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NotyfContext from './NotyfContext';

const ResourceTable = ({ childToParent }) => {
  const notyf = useContext(NotyfContext);

  const [db, setDb] = useState([]);
  const [dbf, setDbf] = useState([]);
  const [skillsFilter, setSkillsFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [nationalityFilter, setNationalityFilter] = useState('');

  useEffect(() => {
    getDataHandler();
  }, []); // RUN ONCE, RELOAD ON ACTIONS

  async function getDataHandler() {
    try {
      const { data } = await axios.get('/api/users');
      data.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      setDb(data);
      let a = [];
      data.forEach(item => {
        a.push(item.name);
      });
    } catch (error) {
      console.log(error);
    }
  }
  const editHandler = i => {
    try {
      childToParent(db[i]);
      // const updatedData = {
      //   item: db[i],
      //   index: db[i]._id
      // };
      // childToParent(updatedData);
      // const res = await axios.put('/edit_user', id);
    } catch (error) {
      console.log(error);
    }
  };
  async function deleteHandler(i) {
    try {
      const id = { id: db[i]._id };
      const { res } = await axios.post('/api/delete', id);
      console.log(res);
      notyf.error('Resource deleted');
      window.location.reload();

      // notyf.error('Resource deleted');
    } catch (error) {
      console.log(error);
    }
  }

  async function filterResults() {
    // console.log('Filter results for ' + nameFilter);
    let a = [];
    if (!skillsFilter) {
      if (nameFilter && !nationalityFilter) {
        db.forEach(item => {
          if (item.name.trim().toLowerCase().includes(nameFilter.trim().toLowerCase())) {
            a.push(item);
          }
        });
      }
      if (nationalityFilter && !nameFilter) {
        db.forEach(item => {
          if (item.nationality.trim().toLowerCase().includes(nationalityFilter.trim().toLowerCase())) {
            a.push(item);
            // console.log(a);
          }
        });
      }
      if (nationalityFilter && nameFilter) {
        db.forEach(item => {
          if (item.nationality.trim().toLowerCase().includes(nationalityFilter.trim().toLowerCase()) && item.name.trim().toLowerCase().includes(nameFilter.trim().toLowerCase())) {
            a.push(item);
          }
        });
      }
    } else {
      if (nameFilter && !nationalityFilter) {
        db.forEach(item => {
          if (item.name.trim().toLowerCase().includes(nameFilter.trim().toLowerCase()) && item.skills.trim().toLowerCase() === skillsFilter.trim().toLowerCase()) {
            a.push(item);
          }
        });
      }
      if (nationalityFilter && !nameFilter) {
        db.forEach(item => {
          if (item.nationality.trim().toLowerCase().includes(nationalityFilter.trim().toLowerCase()) && item.skills.trim().toLowerCase() === skillsFilter.trim().toLowerCase()) {
            a.push(item);
          }
        });
      }
      if (nationalityFilter && nameFilter) {
        db.forEach(item => {
          if (item.nationality.trim().toLowerCase().includes(nationalityFilter.trim().toLowerCase()) && item.name.trim().toLowerCase().includes(nameFilter.trim().toLowerCase()) && item.skills.trim().toLowerCase() === skillsFilter.trim().toLowerCase()) {
            a.push(item);
          }
        });
      }
      if (!nationalityFilter && !nameFilter) {
        db.forEach(item => {
          if (item.skills.trim().toLowerCase() === skillsFilter.trim().toLowerCase()) {
            a.push(item);
          }
        });
      }
    }
    setDbf(a);
  }

  return (
    <>
      <Row className='my-3'>
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
        <Col>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicCategory'>
              <Form.Control type='string' placeholder='Full Name' value={nameFilter} onChange={e => setNameFilter(e.target.value)}></Form.Control>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicCategory'>
              <Form.Control type='string' placeholder='Nationality' value={nationalityFilter} onChange={e => setNationalityFilter(e.target.value)}></Form.Control>
            </Form.Group>
          </Form>
        </Col>
        <Button onClick={filterResults} className='btn-block btn-primary'>
          Filter
        </Button>
      </Row>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr className='text-light'>
            <th>#</th>
            <th>Name</th>
            <th>Team</th>
            {/* <th>Skill-Set</th> */}
            <th>Segment</th>
            {/* <th>FE-Level</th> */}
            {/* <th>Customers</th> */}
            <th>Nationality</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {db &&
            dbf.length === 0 &&
            db.map((user, index) => (
              <tr className='text-light'>
                <td>
                  <Link to={`/resources/${user._id}`} className=' btn btn-light text-dark text-decoration-none text-light'>
                    {index + 1}
                  </Link>
                </td>
                <td>{user.name}</td>
                <td>{user.skills}</td>
                {/* <td>{user.skillSet && user.skillSet.map(skill => skill + ' ')} </td> */}

                <td>{user.machines.map(machine => machine + ', ')}</td>
                {/* <td>{user.countries && user.countries.map(country => country + ', ')}</td> */}
                {/* <td>{user.feLevel}</td> */}
                <td>{user.nationality}</td>

                <td>
                  {/* <i className='fas fa-edit mx-1 btn btn-warning' onClick={() => childToParent(db[index])}></i> */}

                  <i className='fas fa-edit mx-1 btn btn-warning' onClick={() => editHandler(index)}></i>
                  <i className='fas fa-trash-alt mx-1 btn btn-danger' onClick={() => deleteHandler(index)}></i>
                </td>
              </tr>
            ))}

          {dbf.length !== 0 &&
            dbf.map((user, index) => (
              <tr className='text-light'>
                <td>
                  <Link to={`/resources/${user._id}`} className=' btn btn-light text-dark text-decoration-none text-light'>
                    {index + 1}
                  </Link>
                </td>
                <td>{user.name}</td>
                <td>{user.skills}</td>
                {/* <td>{user.skillSet && user.skillSet.map(skill => skill + ' ')} </td> */}

                <td>{user.machines.map(machine => machine + ', ')}</td>
                {/* <td>{user.countries && user.countries.map(country => country + ', ')}</td> */}
                <td>{user.nationality}</td>

                <td>
                  {/* <i className='fas fa-edit mx-1 btn btn-warning' onClick={() => childToParent(db[index])}></i> */}

                  <i className='fas fa-edit mx-1 btn btn-warning' onClick={() => editHandler(index)}></i>
                  <i className='fas fa-trash-alt mx-1 btn btn-danger' onClick={() => deleteHandler(index)}></i>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

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

export default ResourceTable;
