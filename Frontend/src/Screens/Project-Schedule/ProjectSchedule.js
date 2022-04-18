import React, { createRef, useState, useEffect } from 'react';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar } from '@mobiscroll/react';
import Select from 'react-select';
import { Button, Row, Form, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import './ProjectSchedule.css';
import Spinner from 'react-spinner-material';
import { jsPDF } from 'jspdf';
import projectCountryOptions from '../../data/ProCountries';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const ProjectSchedule = () => {
  const [groups, setGroups] = useState([]);
  const [filGroups, setFilGroups] = useState([]);
  const [resources, setResources] = useState('');
  const [items, setItems] = useState([]);
  const [projects, setProjects] = useState([]);
  const [idsArray, setIdsArray] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [skillsFilter, setSkillsFilter] = useState('');
  const [proCountry, setProCountry] = useState('');
  const [proLabel, setProLabel] = useState('');
  const [currentStart, setCurrentStart] = useState('');
  const [currentEnd, setCurrentEnd] = useState('');
  const [toPrint, setToPrint] = useState(false);
  const [loading, setLoading] = useState(true);
  const [relGroups, setRelGroups] = useState([]);

  let resourcesStatic = [];

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

  useEffect(() => {
    getDataHandler();
    getProjects();
  }, []);

  useEffect(() => {
    if (toPrint) {
      takeScreenShot(ref.current).then(download);
    }
  }, [toPrint]);

  useEffect(() => {
    if (currentEnd && currentStart && items && groups) {
      filterOnLoad(currentStart, currentEnd, items, groups);
      // filterResources(currentStart, currentEnd);
    }
  }, [currentStart, currentEnd, groups, items]);

  const selectStyles = {
    menu: base => ({
      ...base,
      zIndex: 100
    })
  };

  async function getDataHandler() {
    try {
      const { data } = await axios.get('/users');
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
      setResources(data);
      resourcesStatic = JSON.parse(JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  async function getProjects() {
    const { data } = await axios.get('/get_projects');
    setProjects(data);

    let gpGroups = [];
    data.forEach(item => {
      let a = {
        id: '',
        name: '',
        color: ''
      };
      a.id = item.projectId;
      a.name = item.name;
      gpGroups.push(a);
    });
    // console.log(gpGroups);

    setGroups(gpGroups);
    setFilGroups(gpGroups);

    let ids = [];
    data.forEach(item => {
      ids.push(item.projectId);
    });
    setIdsArray(ids);
    const a = {
      arr: ids
    };
    const pro = await axios.post('/workload', a);
    let events = [];
    // console.log(pro.data);

    pro.data.forEach((item, i) => {
      if (item.name.toLowerCase().includes('leave')) {
        let decodeArr = [];
        item.resources.forEach(res => {
          decodeArr.push(res.resourceId);
        });
        let suffixName = decodeResourceName(decodeArr);

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

        if (item.name.includes('PM')) {
          event.color = '#00b300';
        } else if (item.name.toLowerCase().includes('installation')) {
          event.color = '#4da6ff';
        } else if (item.name.includes('Leave') || item.name.includes('leave') || item.name.includes('Privelege')) {
          event.color = '#94b8b8';
        } else if (item.name.toLowerCase().includes('training')) {
          event.color = '#ffcc00';
        } else if (item.name.includes('OSS') || item.name.toLowerCase().includes('support')) {
          event.color = '#9900cc';
        } else if (item.name.includes('Wk')) {
          event.color = '#2eb8b8';
        }

        event.title = item.name + ' - ' + suffixName;
        event.start = t1;
        event.end = t2;
        event.resource = item.projectId;
        events.push(event);
      } else {
        let decodeArr = [];
        item.resources.forEach(res => {
          decodeArr.push(res.resourceId);
        });
        let suffixName = decodeResourceName(decodeArr);
        // console.log(suffixName);
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

        if (item.name.includes('PM') || item.name.includes('Tunis') || item.name.includes('Sunyani') || item.name.includes('Accra CC')) {
          event.color = '#00b300';
        } else if (item.name.toLowerCase().includes('installation')) {
          event.color = '#4da6ff';
        } else if (item.name.toLowerCase().includes('training')) {
          event.color = '#ffcc00';
        } else if (item.name.includes('OSS') || item.name.toLowerCase().includes('support')) {
          event.color = '#9900cc';
        } else if (item.name.includes('Wk')) {
          event.color = '#2eb8b8';
        }

        event.title = item.name + ' - ' + suffixName;
        event.start = t1;
        event.end = t2;
        event.resource = item.projectId;
        events.push(event);
      }
    });
    // console.log(leaveNames);
    // console.log(events);
    setLoading(false);
    setItems(events);
  }
  // Getting the array of resource ids and returning string containing resource name
  const decodeResourceName = ids => {
    if (resourcesStatic.length !== 0) {
      let str = '';
      let finalStr = '';
      ids.forEach(id => {
        let result = [];
        resourcesStatic.forEach(e => {
          if (Number(e.gid) === id) {
            result.push(e);
          }
        });
        if (result.length === 1) {
          str = str + ' ' + result[0].name + ',';
        }
      });
      // console.log(str);
      finalStr = str.slice(0, -1);

      return finalStr;
    } else {
      console.log('Not executing');
    }
  };

  const filterOnLoad = (a, b, items, groups) => {
    // setCurrentEnd(b);
    // setCurrentStart(a);
    let t1 = new Date(a);
    let t2 = new Date(b);
    let filArr = [];
    items.forEach(item => {
      let startT = new Date(item.start.substring(0, 10));
      let endT = new Date(item.end.substring(0, 10));
      if (startT > t2 || endT < t1) {
        // console.log('doing nothing');
      } else {
        filArr.push(item.resource);
      }
    });
    let filSet = new Set(filArr);
    let res = Array.from(filSet);
    // console.log(res);
    let dateFil = [];
    groups.forEach(item => {
      if (res.includes(item.id)) {
        dateFil.push(item);
      }
    });
    setFilGroups(dateFil);
    setRelGroups(dateFil);
  };

  const downloadScreenshot = () => {
    setToPrint(true);
  };
  const downloadPdf = () => takeScreenShot(ref.current).then(printPdf);

  const printPdf = image => {
    const doc = new jsPDF();
    doc.addImage(image, 'png', 0, 0, 212, 297);
    doc.save('Schedule.pdf');
  };

  const exportSchedule = () => {
    window.print();
  };

  const filterResources = (a, b) => {
    // setCurrentEnd(b);
    // setCurrentStart(a);
    let t1 = new Date(a);
    let t2 = new Date(b);
    let filArr = [];
    items.forEach(item => {
      let startT = new Date(item.start.substring(0, 10));
      let endT = new Date(item.end.substring(0, 10));
      if (startT > t2 || endT < t1) {
        // console.log('doing nothing');
      } else {
        filArr.push(item.resource);
      }
    });
    let filSet = new Set(filArr);
    let res = Array.from(filSet);
    // console.log(res);
    let dateFil = [];
    groups.forEach(item => {
      if (res.includes(item.id)) {
        dateFil.push(item);
      }
    });
    setFilGroups(dateFil);
    setRelGroups(dateFil);
  };

  const download = (image, { name = 'Report', extension = 'jpg' } = {}) => {
    const a = document.createElement('a');
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
    setToPrint(false);
  };

  const filterResults = () => {
    if (relGroups.length !== 0) {
      if (nameFilter) {
        if (skillsFilter && proCountry) {
          let arr = relGroups.filter(item => item.name.includes(nameFilter) && item.name.includes(skillsFilter) && (item.name.includes(proCountry) || item.name.includes(proLabel)));
          setFilGroups(arr);
        } else if (skillsFilter && !proCountry) {
          let arr = relGroups.filter(item => item.name.includes(nameFilter) && item.name.includes(skillsFilter));
          setFilGroups(arr);
        } else if (!skillsFilter && proCountry) {
          let arr = relGroups.filter(item => (item.name.includes(nameFilter) && item.name.includes(proCountry)) || item.name.includes(proLabel));
          setFilGroups(arr);
        } else if (!skillsFilter && !proCountry) {
          let arr = relGroups.filter(item => item.name.includes(nameFilter));
          setFilGroups(arr);
        }
      } else {
        if (skillsFilter && proCountry) {
          let arr = relGroups.filter(item => item.name.includes(skillsFilter) && (item.name.includes(proCountry) || item.name.includes(proLabel)));
          setFilGroups(arr);
        } else if (skillsFilter && !proCountry) {
          let arr = relGroups.filter(item => item.name.includes(skillsFilter));
          setFilGroups(arr);
        } else if (!skillsFilter && proCountry) {
          let arr = relGroups.filter(item => item.name.includes(proCountry) || item.name.includes(proLabel));
          setFilGroups(arr);
        } else {
          console.log('Nothing to filter. Reload');
        }
      }
    } else {
      console.log('Waiting for data to mount');
    }
  };

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

  const handleChangeprojectCountry = t => {
    setProLabel(t.label);
    setProCountry(t.value);
  };

  return (
    <>
      {!loading ? (
        <div className='p-3'>
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
                  <Form.Control type='string' placeholder='Project Name' value={nameFilter} onChange={e => setNameFilter(e.target.value)}></Form.Control>
                </Form.Group>
              </Form>
            </Col>

            <Col>
              <Form>
                <Form.Group className='mb-3 text-dark' controlId='formBasicExperience'>
                  <Select options={projectCountryOptions} name='experience' className='basic-multi-select' classNamePrefix='select' onChange={handleChangeprojectCountry} placeholder='Country' styles={selectStyles} />
                </Form.Group>
              </Form>
            </Col>

            <Button onClick={filterResults} className='btn-block btn-primary'>
              Filter
            </Button>
          </Row>

          {/* <Button onClick={downloadPdf}>
            <i class='fa-solid fa-file-arrow-down'></i>
          </Button> */}
          <Button onClick={downloadScreenshot}>
            <i class='fa-solid fa-image'></i>
          </Button>
          <div id='section-to-print' ref={ref} className={toPrint ? 'p-2' : 'vh-100 p-2'}>
            <h2 className='text-center pt-2'>{skillsFilter && toPrint ? skillsFilter + ` Schedule updated till ${new Date()}` : ''}</h2>
            <Eventcalendar
              theme='windows'
              themeVariant='light'
              view={view}
              data={items}
              resources={filGroups}
              // onPageChange={function (event, inst) {
              //   filterResources(event.firstDay, event.lastDay);
              // }}
              onPageLoading={function (event, inst) {
                setCurrentStart(event.firstDay);
                setCurrentEnd(event.lastDay);
              }}
              colors={weekends}
            />
            <Table striped bordered hover className='w-25 ms-auto p-2 mt-3'>
              <tbody>
                <tr>
                  <td style={{ background: '#ffcc00' }}>Yellow</td>
                  <td>Training</td>
                </tr>
                <tr>
                  <td style={{ background: '#00b300', color: 'white' }}>Green</td>
                  <td>Preventive Maintenace</td>
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
          </div>
        </div>
      ) : (
        <div className='d-flex justify-content-center vh-100 align-items-center'>
          {' '}
          <Spinner radius={100} color={'#333'} stroke={2} visible={true} />
        </div>
      )}
    </>
  );
};

export default ProjectSchedule;
