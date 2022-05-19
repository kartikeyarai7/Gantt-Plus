import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import NotyfContext from './NotyfContext';
import { useContext } from 'react';

const CandidateTable = ({ resourceArray, assignTask, jobAssigned, projects, avl }) => {
  const notyf = useContext(NotyfContext);

  async function checkSchedule(resource, jobAssigned) {
    console.log(resource.name);
    const rName = resource.name.trim();
    const pro = [];
    projects.forEach(item => {
      pro.push(item.projectId);
    });
    const options = { name: rName, projectsGp: pro };
    try {
      const res = await axios.post('/api/gantt_pro', options);
      console.log(res.data);
      if (res.data) {
        notyf.success('Received List of Projects');
        // console.log(pro);
        ganttProCheck(res.data.link, res.data.id, jobAssigned);
      }
    } catch (error) {
      console.log(error);
      notyf.error('Encountered Error');
    }
  }

  async function ganttProCheck(link, id, job) {
    const options = {
      url: link,
      id: id,
      startDate: job.startDate,
      endDate: job.endDate
    };
    try {
      const res = await axios.post('/api/gantt_proCheck', options);
      console.log(res);
      if (res.data.includes('Clashed')) {
        notyf.error(res.data);
      } else {
        notyf.success('Available');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {resourceArray.length ? (
        <Row>
          {resourceArray.map(resource => (
            <>
              <Col md={4} className='my-2'>
                <Card>
                  <Card.Body>
                    <Card.Title className='text-dark'>
                      {resource.name}
                      {resource.countries.includes(jobAssigned.country) && <i class='fas fa-star goldStar'></i>}
                    </Card.Title>

                    <Card.Subtitle className='my-3 text-muted'>{resource.skills} </Card.Subtitle>

                    <Card.Text className='text-dark'>
                      {' '}
                      FE-Level : <span> {resource.skills === 'Adaptation' ? 'Adaptation-Specialist-' + resource.feLevel : 'FE-' + resource.feLevel} </span>
                    </Card.Text>
                    <Card.Text className='text-dark'>
                      {' '}
                      Segment : <span> {resource.machines && resource.machines.map(item => item + ' ')} </span>
                    </Card.Text>
                    <Card.Text className='text-dark'>
                      {' '}
                      Product Experience : <span> {resource.productExp && resource.productExp.map(item => item + ' ')} </span>
                    </Card.Text>
                    {(resource.skills === 'BPS' || resource.skills === 'Adaptation') && (
                      <Card.Text className='text-dark'>
                        {' '}
                        Can Lead : <span> {resource.isLeader && resource.isLeader.filter(item => item.includes(jobAssigned.machines)).map(item => item + ' ')} </span>
                      </Card.Text>
                    )}
                    {(resource.skills === 'BPS' || resource.skills === 'Adaptation') && (
                      <Card.Text className='text-dark'>
                        {' '}
                        Experience : <span> {resource.exp && resource.exp.filter(item => item.includes(jobAssigned.machines)).map(item => item + ', ')} </span>
                      </Card.Text>
                    )}
                    <Card.Text className='text-dark'>
                      {' '}
                      Nationality : <span> {resource.nationality} </span>
                    </Card.Text>
                    {avl && <Card.Text className='text-dark'> Available : {resource.availability ? <span className='bg-success text-light p-2'> Yes </span> : <span className=' text-light p-2'> - </span>}</Card.Text>}

                    <Row>
                      <Button className='my-2' onClick={() => checkSchedule(resource, jobAssigned)}>
                        Check Schedule
                      </Button>
                      <Button className='my-2' onClick={() => assignTask(resource)} disabled={!resource.availability && avl}>
                        Assign
                      </Button>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </>
          ))}
        </Row>
      ) : (
        <Card className='p-2'>
          <Card.Body>
            <Card.Text className='text-dark'>No Suitable candidates found</Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default CandidateTable;
