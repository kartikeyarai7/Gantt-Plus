import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const JobScreen = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [jobId, setJobId] = useState('');

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
      setJobId(id);
      async function checkJob() {
        const id = { id: jobId };
        const { data } = await axios.post('/api/check_job', id);
        if (data) {
          setJob(data);
        }
      }
      checkJob();
    }
  }, [id, jobId, userInfo]);

  async function clearAssignment() {
    console.log(job.assigned);
    console.log(jobId);
    try {
      const body = {
        id: jobId,
        resourceArray: job.assigned
      };
      const res = await axios.put('/api/delete_assigned', body);
      console.log(res);
      if (res.data === 'Updated job') {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section>
        <h3 className='my-4 text-center'>Info</h3>
        <Row className=' mx-auto'>
          <Col lg={6}>
            {job && (
              <section className='p-4 my-2'>
                <Card className='bg-dark text-light'>
                  <Card.Body>
                    <Card.Title className='my-4 text-center'>{job.name}</Card.Title>
                    <Card.Text className='my-3 '>
                      <span> Project : </span> {job.projectName}
                    </Card.Text>
                    <Card.Text className='my-3 '>
                      <span> Start Date : </span> {job.startDate}
                    </Card.Text>
                    <Card.Text className='my-3 '>
                      <span> End Date : </span> {job.endDate}
                    </Card.Text>
                    {/* <Card.Text className='my-3 '>
                      <span> Time Slot : </span> {job.startTimeStart} - {job.endTimeStart}
                    </Card.Text> */}
                    <Card.Text className='my-3 '>
                      <span> Team : </span> {job.skillsReq}
                    </Card.Text>

                    <Card.Text className='my-3 '>
                      <span> Segment : </span> {job.category}
                    </Card.Text>
                    <Card.Text className='my-3 '>
                      <span> Product : </span> {job.machines}
                    </Card.Text>
                    <Card.Text className='my-3 '>
                      <span> Experience Required : </span> {job.exp}
                    </Card.Text>
                    <Card.Text className='my-3 '>
                      <span> Customer : </span> {job.country}
                    </Card.Text>
                    <Card.Text className='my-3'>
                      <span>FE Level Required: </span> {job.skillsReq === 'Adaptation' ? 'Adaptation-Specialist-' + job.feLevel : 'FE-' + job.feLevel}
                    </Card.Text>

                    <div className='text-center'>
                      <Link to='/jobs' className='btn btn-primary'>
                        Go Back
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </section>
            )}
          </Col>
          <Col lg={6}>
            {job.assigned && job.assigned.length !== 0 && (
              <section className='p-4 my-2'>
                <Card className='bg-dark text-light'>
                  <Card.Body>
                    <Card.Title className='my-4 text-center'>Assigned </Card.Title>
                    {job.assigned.map((item, index) => (
                      <Card.Text className='my-3'>
                        <span>{index + 1} : </span> {item}
                      </Card.Text>
                    ))}

                    <div className='row '>
                      <div className='col text-center'>
                        <Link to='/jobs' className='btn btn-primary'>
                          Go Back
                        </Link>
                      </div>
                      <div className='col text-center '>
                        <Button className='btn btn-danger' onClick={clearAssignment}>
                          Clear Assignments
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </section>
            )}
          </Col>
        </Row>
      </section>
    </>
  );
};

export default JobScreen;
