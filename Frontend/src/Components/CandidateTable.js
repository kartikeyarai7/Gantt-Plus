import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import NotyfContext from './NotyfContext';
import { useContext } from 'react';

// import { Card, Row, Col, Button, ProgressBar } from 'react-bootstrap';

const CandidateTable = ({ resourceArray, assignTask, jobAssigned, projects }) => {
  const notyf = useContext(NotyfContext);

  // useEffect(() => {
  //   if (resourceArray) {
  //     resourceArray.sort((a, b) => (a.feLevel < b.feLevel ? 1 : -1));
  //   }
  // }, [resourceArray]);

  async function checkSchedule(resource, jobAssigned) {
    console.log(resource.name);
    const rName = resource.name.trim();
    const pro = [];
    projects.forEach(item => {
      pro.push(item.projectId);
    });
    const options = { name: rName, projectsGp: pro };
    try {
      const res = await axios.post('/gantt_pro', options);
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
      const res = await axios.post('/gantt_proCheck', options);
      console.log(res);
      if (res.data === 'Not available') {
        notyf.error('Not Available');
      } else {
        notyf.success('Available');
        // setAvl(true);
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
                    {/* <Card.Text className='text-dark'>
                      {' '}
                      Religion : <span> {resource.religion} </span>
                    </Card.Text>
                    <Card.Text className='text-dark'>
                      {' '}
                      Languages : <span> {resource.languages && resource.languages.map(i => i + ', ')} </span>
                    </Card.Text> */}
                    {/* <Card.Text className='text-dark'>
                      M3 Experience : <ProgressBar now={resource.m3Value} />
                    </Card.Text>
                    <Card.Text className='text-dark'>
                      M5 Experience : <ProgressBar now={resource.m5Value} />
                    </Card.Text>
                    <Card.Text className='text-dark'>
                      M7 Experience : <ProgressBar now={resource.m7Value} />
                    </Card.Text>
                    <Card.Text className='text-dark'>
                      X9 Experience : <ProgressBar now={resource.x9Value} />
                    </Card.Text>
                    <Card.Text className='text-dark'>
                      C Experience : <ProgressBar now={resource.cSegmentValue} />
                    </Card.Text>
                    <Card.Text className='text-dark'>
                      Pronote Experience : <ProgressBar now={resource.pronoteValue} />
                    </Card.Text> */}
                    <Row>
                      <Button className='my-2' onClick={() => checkSchedule(resource, jobAssigned)}>
                        Check Schedule
                      </Button>
                      <Button className='my-2' onClick={() => assignTask(resource)}>
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
