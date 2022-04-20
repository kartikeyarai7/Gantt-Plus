import React from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import { useEffect, useState } from 'react';
import { Row, Button } from 'react-bootstrap';
// import { Card, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const Plan = () => {
  // const notyf = useContext(NotyfContext);
  const [db, setDb] = useState([]);
  const [dbf, setDbf] = useState([]);
  const [team, setTeam] = useState('');
  const [dataPresent, setDataPresent] = useState(false);
  // const data = {
  //   team
  // };

  useEffect(() => {
    getDataHandler();
  }, []); // Fetching API once on reload

  useEffect(() => {
    // if (dbf.data && dbf.data.length > 0) {
    //   setDataPresent(true);
    // } else {
    //   // console.log('Empty Array');
    // }
    if (dbf && dbf.length > 0) {
      setDataPresent(true);
    }
  }, [dbf]);

  async function getDataHandler() {
    try {
      const { data } = await axios.get('/api/jobs');
      setDb(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function filterResults() {
    let arr = [];
    if (team === 'Choose') {
      setDbf(db);
    } else {
      arr = db.filter(item => item.skillsReq === team);
      setDbf(arr);
    }
    // const jobs = await axios.post('/filter_jobs', data); API ROUTE NOT NEEDED
    // setDbf(jobs);
  }

  return (
    <section className='p-3'>
      {db.length ? (
        <Row className='my-3'>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicCategory'>
              <Form.Control as='select' value={team} onChange={e => setTeam(e.target.value)}>
                <option value='Choose'>View All</option>
                <option value='BPS'>BPS</option>
                <option value='BDS'>BDS</option>
                <option value='Adaptation'>Adaptation</option>
                <option value='Software'>Software</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <Button onClick={filterResults} className='btn-block btn-dark'>
            Filter
          </Button>
        </Row>
      ) : (
        <h2 className='text-center'>No Jobs</h2>
      )}
      {/*
      {db.length && !dataPresent ? (
        <Row>
          {db.map(job => (
            <>
              <Col lg={3} className='p-2 my-3'>
                <Card className='bg-dark text-light'>
                  <Card.Body>
                    <Card.Text>
                      <h5> {job.name} </h5>
                    </Card.Text>
                    <Card.Text>Team : {job.skillsReq}</Card.Text>
                    <Card.Text>Segment: {job.category}</Card.Text>
                    <Card.Text>
                      Assigned:{'  '}
                      {job.assigned ? (
                        <Link className='btn btn-warning' to='/jobs'>
                          {job.assigned}
                        </Link>
                      ) : (
                        <Link className='btn btn-danger' to='/jobs'>
                          Not assigned
                        </Link>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </>
          ))}
        </Row>
      ) : (
        <Row>
          {dataPresent ? (
            dbf.data.map(job => (
              <Col lg={3} className='p-2 my-3'>
                <Card className='bg-dark text-light'>
                  <Card.Body>
                    <Card.Text>
                      <h5> {job.name} </h5>
                    </Card.Text>
                    <Card.Text>Team : {job.skillsReq}</Card.Text>
                    <Card.Text>Segment: {job.category}</Card.Text>
                    <Card.Text>
                      Assigned:{'  '}
                      {job.assigned ? (
                        <Link className='btn btn-warning' to='/jobs'>
                          {job.assigned}
                        </Link>
                      ) : (
                        <Link className='btn btn-danger' to='/jobs'>
                          Not assigned
                        </Link>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <h3 className='text-center p-3'>No jobs found</h3>
          )}
        </Row>
      )} */}

      {db.length ? (
        <Table striped bordered hover variant='dark' className='text-light'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Team Req</th>

              <th>Category</th>
              <th>Customer Req</th>
              <th>Start</th>
              <th>End</th>
              <th>Assigned </th>
            </tr>
          </thead>
          {db.length && !dataPresent && (
            <tbody>
              {db &&
                db.map((job, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{job.name}</td>
                    <td>{job.skillsReq}</td>
                    <td>{job.category}</td>
                    <td>{job.country ? job.country : '-'}</td>
                    <td>{job.startDate && job.startDate}</td>
                    <td>{job.endDate && job.endDate}</td>
                    <td>{job.assigned ? job.assigned.map(item => item + ', ') : '-'}</td>
                  </tr>
                ))}
            </tbody>
          )}
          <tbody>
            {db.length &&
              dataPresent &&
              dbf.map((job, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{job.name}</td>
                  <td>{job.skillsReq}</td>
                  <td>{job.category}</td>
                  <td>{job.country ? job.country : '-'}</td>
                  <td>{job.startDate && job.startDate}</td>
                  <td>{job.endDate && job.endDate}</td>
                  <td>{job.assigned ? job.assigned.map(item => item + ' ') : '-'}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Plan;
