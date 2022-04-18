import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

// import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
// import SchedulerCalendar from 'scheduler-calendar';
import 'scheduler-calendar/dist/index.css';

const ProfileScreen = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [resourceId, setResourceId] = useState('');

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
      setResourceId(id);
      async function checkUser() {
        const id = { id: resourceId };
        const { data } = await axios.post('/check_user', id);
        if (data) {
          setUser(data);
        }
      }
      checkUser();
    }
  }, [id, resourceId, userInfo]);

  // const deleteSchedule = job => {
  //   console.log('Deleting job name ' + job.name + ' for ' + id);
  //   delSched(job);
  // };

  async function delSched(job) {
    try {
      const headerData = {
        id: id,
        nameDel: job.name
      };

      const { res } = await axios.post('/delete_schedule', headerData);
      console.log(res);
      // notyf.error('Deleted Schedule');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  // const data = [
  //   {
  //     subject: 'M3',
  //     A: user.m3Value,
  //     fullMark: 100
  //   },
  //   {
  //     subject: 'M5',
  //     A: user.m5Value,
  //     fullMark: 100
  //   },
  //   {
  //     subject: 'M7',
  //     A: user.m7Value,
  //     fullMark: 100
  //   },
  //   {
  //     subject: 'X9',
  //     A: user.x9Value,
  //     fullMark: 100
  //   },
  //   {
  //     subject: 'Pronote',
  //     A: user.pronoteValue,
  //     fullMark: 100
  //   },
  //   {
  //     subject: 'C3',
  //     A: user.cSegmentValue,
  //     fullMark: 100
  //   }
  // ];

  return (
    <>
      <section>
        <h3 className='my-4 text-center'>Info</h3>
        <Row className=' mx-auto'>
          {user && (
            <section className='p-4 my-2'>
              <Card className='bg-dark text-light'>
                {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
                <Card.Body>
                  <Card.Title className='my-4 text-center'>{user.name}</Card.Title>
                  <Card.Text className='my-3 '>
                    <span> Team : </span> {user.skills}
                  </Card.Text>

                  <Card.Text className='my-3 '>
                    <span> Segment : </span> {user.machines && user.machines.map(machine => machine + ' ')}
                  </Card.Text>
                  <Card.Text className='my-3 '>
                    <span> Product Experience : </span> {user.productExp && user.productExp.map(product => product + ', ')}
                  </Card.Text>
                  <Card.Text className='my-3 '>
                    <span> Experience : </span> {user.exp && user.exp.map(product => product + ',  ')}
                  </Card.Text>
                  <Card.Text className='my-3 '>
                    <span> Customers : </span> {user.countries && user.countries.map(country => country + ' , ')}
                  </Card.Text>
                  <Card.Text className='my-3'>
                    <span>FE Level : </span> {user.skills === 'Adaptation' ? 'Adaptation-Specialist-' + user.feLevel : 'FE-' + user.feLevel}
                  </Card.Text>

                  <Card.Text className='my-3 '>
                    <span> Nationality : </span> {user.nationality}
                  </Card.Text>
                  {/* <Card.Text className='my-3 '>
                    <span> Religion : </span> {user.religion && user.religion}
                  </Card.Text>
                  <Card.Text className='my-3 '>
                    <span> Languages : </span> {user.languages && user.languages.map(i => i + ', ')}
                  </Card.Text> */}
                  <Card.Text className='my-3 '>
                    <span>Can Lead : </span> {user.isLeader && user.isLeader.map(item => item + ', ')}
                  </Card.Text>

                  {/* {user.skills === 'BPS' && (
                      <>
                        <Card.Text className='my-3 '>
                          <span>Installation Experience : </span> {user.insExpBps}
                        </Card.Text>

                        <Card.Text className='my-3 '>
                          <span>PM Experience : </span>
                          {user.pmExpBps}
                        </Card.Text>
                        <Card.Text className='my-3 '>
                          <span>CM Experience : </span> {user.cmExpBps}
                        </Card.Text>
                      </>
                    )}
                    {user.skills === 'BDS' && (
                      <>
                        <Card.Text className='my-3 '>
                          <span>Installation Experience : </span> {user.insExpBds}
                        </Card.Text>

                        <Card.Text className='my-3 '>
                          <span>PM Experience : </span>
                          {user.pmExpBds}
                        </Card.Text>
                        <Card.Text className='my-3 '>
                          <span>CM Experience : </span> {user.cmExpBds}
                        </Card.Text>
                      </>
                    )} */}

                  {/* {user.assignedTo && (
                      <>
                        <Card.Text className='my-3 '>
                          <span>Assigned At: </span> {user.assignedTo[0] ? user.assignedTo[0].country : '-'}
                        </Card.Text>
                        <Card.Text className='my-3 '>
                          <span>Project: </span> {user.assignedTo[0] ? user.assignedTo[0].name : '-'}
                        </Card.Text>
                        <Card.Text className='my-3 '>
                          <span>From : </span> {user.assignedTo[0] ? user.assignedTo[0].startDate : '-'}
                        </Card.Text>
                        <Card.Text className='my-3 '>
                          <span>To : </span> {user.assignedTo[0] ? user.assignedTo[0].endDate : '-'}
                        </Card.Text>
                      </>
                    )} */}

                  <div className='text-center'>
                    <Link to='/resources' className='btn btn-primary'>
                      Go Back
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </section>
          )}
          {/* <Col lg={6} md={12}>
            <ResponsiveContainer width='100%' height='100%'>
              <RadarChart cx='50%' cy='50%' outerRadius='80%' data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey='subject' />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name={user.name} dataKey='A' stroke='#8884d8' fill='#8884d8' fillOpacity={0.6} />
                
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Col> */}
        </Row>
      </section>
      <section className='p-4'>
        <h3 className='text-center my-4 '>Jobs Assigned</h3>
        <Table striped bordered hover>
          <thead>
            <tr className='text-dark'>
              <th>#</th>
              <th>Project</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Location</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {user.assignedTo &&
              user.assignedTo.map((job, index) => (
                <tr className='text-dark'>
                  <td>{index + 1}</td>
                  <td>{job.name}</td>
                  <td>{job.startDate}</td>
                  <td>{job.endDate}</td>
                  <td>{job.country}</td>
                  <td>
                    <i className='fas fa-trash-alt mx-1 btn btn-danger' onClick={() => delSched(job)}></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default ProfileScreen;
