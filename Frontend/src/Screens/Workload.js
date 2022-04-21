import React, { createRef, useState, useEffect } from 'react';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar } from '@mobiscroll/react';
import { Button, Row, Form, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import '../Workload.css';
import { jsPDF } from 'jspdf';
import Spinner from 'react-spinner-material';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const Workload = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [myResources, setMyResources] = useState([]);
  const [skillsFilter, setSkillsFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [nationalityFilter, setNationalityFilter] = useState('');
  const [tasks, setTasks] = useState('');
  const [projects, setProjects] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [toPrint, setToPrint] = useState(false);
  const [loading, setLoading] = useState(true);
  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: 'image/jpeg',
    quality: 1.0
  });

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [history, userInfo]);

  const softwareIds = [1990442, 1990443, 1990444, 1990445, 1990446];

  const download = (image, { name = 'Report', extension = 'jpg' } = {}) => {
    const a = document.createElement('a');
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
    setToPrint(false);
  };

  useEffect(() => {
    if (toPrint) {
      takeScreenShot(ref.current).then(download);
    }
  }, [toPrint]);

  const downloadScreenshot = () => {
    // if (toPrint) {
    //   takeScreenShot(ref.current).then(download);
    // } else {
    //   window.alert('Please change to print mode');
    // }
    setToPrint(true);
  };
  // const getImage = () => takeScreenshot(ref.current);

  useEffect(() => {
    if (filteredResources.length === 0) {
      getDataHandler();
      let a = [];
      if (resources.length !== 0) {
        resources.forEach(item => {
          let b = { id: '', name: '', color: '' };
          b.id = item.gid;
          b.name = item.name;
          // b.color = '#00b300';
          a.push(b);
        });
        setMyResources(a);
      }
    } else {
      if (filteredResources.length !== 0) {
        let a = [];
        filteredResources.forEach(item => {
          let b = { id: '', name: '', color: '' };
          b.id = item.gid;
          b.name = item.name;
          // b.color = '#00b300';
          a.push(b);
        });
        setMyResources(a);
      }
    }
  }, [resources, filteredResources]);

  useEffect(() => {
    getProjects();
  }, []);

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
    // console.log(pro);
    let events = [];
    console.log(pro.data);

    pro.data.forEach(item => {
      if (item.name.toLowerCase().includes('leave')) {
        let event = {
          start: '',
          end: '',
          title: '',
          resource: '',
          color: ''
        };
        let t1 = item.startDate.split(' ')[0];
        t1 = t1 + 'T00:00';
        let t2 = item.endDate.split(' ')[0];
        t2 = t2 + 'T24:00';
        let rArr = [];

        item.resources.forEach(res => {
          rArr.push(res.resourceId);
        });

        event.title = item.name;
        event.start = t1;
        event.end = t2;
        event.resource = rArr;
        event.color = '#94b8b8';
        events.push(event);
      } else {
        let event = {
          start: '',
          end: '',
          title: '',
          resource: '',
          color: ''
        };
        let t1 = item.startDate.split(' ')[0];
        t1 = t1 + 'T09:00';
        let t2 = item.endDate.split(' ')[0];
        t2 = t2 + 'T18:00';
        let rArr = [];

        item.resources.forEach(res => {
          rArr.push(res.resourceId);
        });

        if (item.name.includes('PM')) {
          event.color = '#00b300';
        } else if (item.name.toLowerCase().includes('installation')) {
          event.color = '#4da6ff';
        } else if (item.name.toLowerCase().includes('training')) {
          event.color = '#ffcc00';
        } else if (item.name.includes('OSS') || item.name.toLowerCase().includes('support')) {
          event.color = '#9900cc';
        } else if (item.name.includes('Wk')) {
          event.color = '#2eb8b8';
        } else if ((item.name.toLowerCase().includes('adaptation') && item.name.toLowerCase().includes('inhouse')) || (item.name.toLowerCase().includes('emission') && item.name.toLowerCase().includes('inhouse')) || (item.name.toLowerCase().includes('fine tuning') && item.name.toLowerCase().includes('inhouse')) || (item.name.toLowerCase().includes('finetuning') && item.name.toLowerCase().includes('inhouse'))) {
          event.color = '#843c0b';
        } else if ((item.name.toLowerCase().includes('adaptation') && item.name.toLowerCase().includes('onsite')) || (item.name.toLowerCase().includes('emission') && item.name.toLowerCase().includes('onsite')) || (item.name.toLowerCase().includes('fine tuning') && item.name.toLowerCase().includes('onsite')) || (item.name.toLowerCase().includes('finetuning') && item.name.toLowerCase().includes('onsite'))) {
          event.color = '#ed7d31';
        }

        event.title = item.name;
        event.start = t1;
        event.end = t2;
        event.resource = rArr;
        events.push(event);
      }
    });

    setLiveEvents(events);
    console.log(events);
    setLoading(false);
  }

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
      // console.log(data);
      let dataAr = [];
      data.forEach((item, i) => {
        if (item.name.includes('Daniel') || item.name.includes('Daryl') || item.name.includes('Christopher') || item.name.includes('Franz')) {
          // console.log('Do nothing')
        } else {
          dataAr.push(item);
        }
      });
      // console.log(data);
      // console.log(dataAr);
      setResources(dataAr);
    } catch (error) {
      console.log(error);
    }
  }

  async function filterResults() {
    // console.log('Filter results for ' + nameFilter);
    let a = [];
    if (!skillsFilter) {
      if (nameFilter && !nationalityFilter) {
        resources.forEach(item => {
          if (item.name.trim().toLowerCase().includes(nameFilter.trim().toLowerCase())) {
            a.push(item);
          }
        });
      }
      if (nationalityFilter && !nameFilter) {
        resources.forEach(item => {
          if (item.nationality.trim().toLowerCase().includes(nationalityFilter.trim().toLowerCase())) {
            a.push(item);
          }
        });
      }
      if (nationalityFilter && nameFilter) {
        resources.forEach(item => {
          if (item.nationality.trim().toLowerCase().includes(nationalityFilter.trim().toLowerCase()) && item.name.trim().toLowerCase().includes(nameFilter.trim().toLowerCase())) {
            a.push(item);
          }
        });
      }
    } else {
      if (nameFilter && !nationalityFilter) {
        resources.forEach(item => {
          if (item.name.trim().toLowerCase().includes(nameFilter.trim().toLowerCase()) && item.skills.trim().toLowerCase() === skillsFilter.trim().toLowerCase()) {
            a.push(item);
          }
        });
      }
      if (nationalityFilter && !nameFilter) {
        resources.forEach(item => {
          if (item.nationality.trim().toLowerCase().includes(nationalityFilter.trim().toLowerCase()) && item.skills.trim().toLowerCase() === skillsFilter.trim().toLowerCase()) {
            a.push(item);
          }
        });
      }
      if (nationalityFilter && nameFilter) {
        resources.forEach(item => {
          if (item.nationality.trim().toLowerCase().includes(nationalityFilter.trim().toLowerCase()) && item.name.trim().toLowerCase().includes(nameFilter.trim().toLowerCase()) && item.skills.trim().toLowerCase() === skillsFilter.trim().toLowerCase()) {
            a.push(item);
          }
        });
      }
      if (!nationalityFilter && !nameFilter) {
        resources.forEach(item => {
          if (item.skills.trim().toLowerCase() === skillsFilter.trim().toLowerCase()) {
            a.push(item);
          }
        });
      }
    }
    setFilteredResources(a);
  }

  const view = React.useMemo(() => {
    return {
      timeline: {
        type: 'month'
      }
    };
  }, []);

  const weekends = [
    {
      background: '#efffea',
      recurring: {
        repeat: 'weekly',
        weekDays: 'SA,SU'
      }
    }
  ];

  const exportSchedule = () => {
    window.print();
  };

  const downloadPdf = () => takeScreenShot(ref.current).then(printPdf);

  const printPdf = image => {
    const doc = new jsPDF();
    doc.addImage(image, 'png', 0, 0, 212, 297);
    doc.save('Schedule.pdf');
  };

  return (
    <>
      {loading ? (
        <div className='d-flex justify-content-center vh-100 align-items-center'>
          {' '}
          <Spinner radius={100} color={'#333'} stroke={2} visible={true} />
        </div>
      ) : (
        <div className='p-4'>
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
            {/* <Col>
              <Form>
                <Form.Group className='mb-3' controlId='formBasicCategory'>
                  <Form.Control type='string' placeholder='Nationality' value={nationalityFilter} onChange={e => setNationalityFilter(e.target.value)}></Form.Control>
                </Form.Group>
              </Form>
            </Col> */}
            <Button onClick={filterResults} className='btn-block btn-primary'>
              Filter
            </Button>
          </Row>
          {/* <Button onClick={printPdf}>
            <i class='fa-solid fa-file-arrow-down'></i>
          </Button> */}
          <Button onClick={downloadScreenshot}>
            <i class='fa-solid fa-image'></i>
          </Button>
          {/* <img width={'80%'} src={image} alt={'Screenshot'} /> */}

          <div id='section-to-print' ref={ref} className={toPrint ? 'p-2' : 'vh-100 p-2'}>
            <h2 className='text-center pt-2'>{skillsFilter && toPrint ? skillsFilter + ` - Resource Schedule updated till ${new Date()}` : ''}</h2>
            <Eventcalendar theme='windows' themeVariant='light' view={view} data={liveEvents} resources={myResources} colors={weekends} />
            <div className='row'>
              {/* {skillsFilter === 'Software' && (
                <div className='col'>
                  <Table striped bordered hover className=' p-2 mt-3'>
                    <thead>
                      <tr>
                        <td>Task </td>
                        <td>Project </td>
                        <td>Assigned</td>
                        <td>Start </td>
                        <td>End </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>CMS Support prior to go live</td>
                        <td>CMS </td>
                        <td>Kamal El Horr</td>
                        <td>31-03-22</td>
                        <td>06-04-22</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              )} */}
              <div className='col'></div>

              <div className='col'>
                {/* <Table striped bordered hover className={skillsFilter === 'Software' ? 'w-50 ms-auto p-2 mt-3' : 'w-25 ms-auto p-2 mt-3'}> */}
                <Row>
                  <Col>
                    <Table striped bordered hover className={'ms-auto p-2 mt-3'}>
                      <tbody>
                        <tr>
                          <td style={{ background: '#ffcc00' }}>Yellow</td>
                          <td>Training</td>
                        </tr>
                        <tr>
                          <td style={{ background: '#00b300', color: 'white' }}>Green</td>
                          <td>Preventive/ Corrective Maintenance</td>
                        </tr>
                        <tr>
                          <td style={{ background: '#94b8b8' }}>Grey</td>
                          <td>Leave</td>
                        </tr>
                        <tr>
                          <td style={{ background: '#9900cc', color: 'white' }}>Purple</td>
                          <td>Site Support</td>
                        </tr>
                        <tr>
                          <td style={{ background: '#4da6ff', color: 'white' }}>Blue</td>
                          <td>Project Installation</td>
                        </tr>
                        <tr>
                          <td style={{ background: '#2eb8b8' }}>Cyan</td>
                          <td>Inhouse</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col>
                    <Table striped bordered hover className={'ms-auto p-2 mt-3'}>
                      <tbody>
                        <tr>
                          <td style={{ background: '#843c0b', color: 'white' }}>Brown</td>
                          <td>Adaptation Finetuning/Fresh Adaptation/SNR Adaptation - Inhouse</td>
                        </tr>
                        <tr>
                          <td style={{ background: '#843c0b', color: 'white' }}>Brown</td>
                          <td>Adding new emission– Inhouse</td>
                        </tr>
                        <tr>
                          <td style={{ background: '#ed7d31' }}>Orange</td>
                          <td>Adaptation Finetuning/Fresh Adaptation/SNR Adaptation - Onsite</td>
                        </tr>
                        <tr>
                          <td style={{ background: '#ed7d31', color: 'white' }}>Orange</td>
                          <td>Adding new emission– Onsite</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Workload;
