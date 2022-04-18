import React from 'react';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Card, Row, Col, Table, Form, Button } from 'react-bootstrap';
import { Chart } from 'react-google-charts';
import resourceOptions from '../data/Resources';
import axios from 'axios';
import '../Components/Report.css';
import { duration } from 'moment';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const Report = () => {
  const [nameFilter, setNameFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [projects, setProjects] = useState('');
  // const [rfId, setRfId] = useState('');
  const [displayData, setDisplayData] = useState([]);
  const [resources, setResources] = useState('');
  const [filterProjects, setFilterProjects] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [leaves, setLeaves] = useState(0);
  // const [workingDays, setWorkingDays] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [adapCount, setAdapCount] = useState(0);
  const [pmCount, setPmCount] = useState(0);
  const [insCount, setInsCount] = useState(0);
  const [supportCount, setSupportCount] = useState(0);
  const [inhouseCount, setInhouseCount] = useState(0);
  // const [pieData, setPieData] = useState([]);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [history, userInfo]);

  const data = [
    ['Task', 'Days'],
    ['PM', pmCount],
    ['Installation', insCount],
    ['Onsite-Support', supportCount],
    ['Inhouse', inhouseCount],
    ['Leaves', leaves],
    ['Adaptation', adapCount]
  ];

  // const dataC = [
  //   ['Country', 'Days'],
  //   ['Germany', 30],
  //   ['India', 30],
  //   ['United States', 30],
  //   ['Ghana', 30],
  //   ['Tanzania', 30]
  // ];

  useEffect(() => {
    if (userInfo && userInfo.username) {
      getProjects();
      getDataHandler();
    }
  }, []); //Always Running

  // useEffect(() => {
  //   if (displayData) {
  //     setLoading(false);
  //   }
  // }, [displayData]);

  async function getDataHandler() {
    try {
      const { data } = await axios.get('/users');
      setResources(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getProjects() {
    const { data } = await axios.get('/get_projects');
    setProjects(data);
    console.log(data);
    let ids = [];
    data.forEach(item => {
      ids.push(item.projectId);
    });
    const a = {
      arr: ids
    };
    const pro = await axios.post('/workload', a);
    // console.log(pro);
    // let events = [];
    setFilterProjects(pro.data);
  }

  const options = {
    title: 'Workload Distribution',
    is3D: true
  };

  const handleChangeRes = t => {
    setNameFilter(t.value);
  };

  const filterResults = () => {
    if (nameFilter && startDate && endDate) {
      let a = resources.filter(item => item.name === nameFilter);
      let b = [];
      let d = a[0].gid;
      // setRfId(d);

      filterProjects.forEach(item => {
        item.resources.forEach(res => {
          if (res.resourceId === Number(d)) {
            b.push(item);
          }
        });
      });

      let c = new Set(b);
      let dArr = Array.from(c);
      let D1 = new Date(startDate);
      let D2 = new Date(endDate);
      let fArr = [];
      dArr.forEach((item, i) => {
        let d1 = item.startDate.split(' ')[0];
        d1 = new Date(d1);
        let d2 = item.endDate.split(' ')[0];
        d2 = new Date(d2);
        if (d2 < D1 || d1 > D2) {
          // console.log('DO nothing');
        } else {
          fArr.push(item);
        }
      });
      console.log(fArr);
      console.log(dArr);
      let pCount = [];
      fArr.forEach(item => {
        pCount.push(item.projectId);
      });
      let s = new Set(pCount);
      let arrayPro = Array.from(s);
      setProjectCount(arrayPro.length);
      setDisplayData(fArr);

      // setDisplayData(dArr);

      // let w = 0;
      let wCount = 0;
      fArr.forEach(item => {
        wCount = wCount + Math.abs(new Date(item.startDate.split(' ')[0]) - new Date(item.endDate.split(' ')[0])) / (1000 * 60 * 60 * 24) + 1;
      });

      let leavesArray = fArr.filter(item => item.name.toLowerCase().includes('leave'));
      let count = 0;
      leavesArray.forEach(item => {
        if (new Date(item.startDate.split(' ')[0]) >= new Date(startDate) && new Date(item.endDate.split(' ')[0]) <= new Date(endDate)) {
          count = count + Math.abs(new Date(item.startDate.split(' ')[0]) - new Date(item.endDate.split(' ')[0])) / (1000 * 60 * 60 * 24) + 1;
        } else if (new Date(item.startDate.split(' ')[0]) >= new Date(startDate) && new Date(item.endDate.split(' ')[0]) >= new Date(endDate)) {
          count = count + Math.abs(new Date(item.startDate.split(' ')[0]) - new Date(endDate)) / (1000 * 60 * 60 * 24) + 1;
        } else if (new Date(item.startDate.split(' ')[0]) <= new Date(startDate) && new Date(item.endDate.split(' ')[0]) <= new Date(endDate)) {
          count = count + Math.abs(new Date(startDate) - new Date(item.endDate.split(' ')[0])) / (1000 * 60 * 60 * 24) + 1;
        } else {
          count = count + Math.abs(new Date(startDate) - new Date(endDate)) / (1000 * 60 * 60 * 24) + 1;
        }
        // count = count + Math.abs(new Date(item.startDate.split(' ')[0]) - new Date(item.endDate.split(' ')[0])) / (1000 * 60 * 60 * 24) + 1;
      });
      // w = wCount - count;
      // setWorkingDays(w);
      console.log(leavesArray);
      setLeaves(count);

      let pmC = getCount('PM') + getCount('CC');
      setPmCount(pmC);
      let ihC = getCount('Inhouse') + getCount('Wk');
      setInhouseCount(ihC);
      let rsC = getCount('On-site Support') + getCount('OSS') + getCount('Site Support') + getCount('support') + getCount('on-site');
      setSupportCount(rsC);
      let isC = getCount('nstallation') + getCount('ssembly') + getCount('Unpacking') + getCount('commissioning') + getCount('assembling') + getCount('shift') + getCount('dismantling') + getCount('commisioning') + getCount('positioning');
      setInsCount(isC);

      let adC = getCount('Adaptation') + getCount('Fine tuning') + getCount('fine tuning');
      setAdapCount(adC);

      setLoading(false); // Fix timing to get piechart at once
    } else {
      console.log('Select Name');
    }
  };

  const exportTable = () => {
    window.print();
  };

  const getCount = checker => {
    let c = 0;
    displayData.forEach(item => {
      if (item.name.includes(checker)) {
        if (new Date(item.startDate.split(' ')[0]) >= new Date(startDate) && new Date(item.endDate.split(' ')[0]) <= new Date(endDate)) {
          c = c + Math.abs(new Date(item.startDate.split(' ')[0]) - new Date(item.endDate.split(' ')[0])) / (1000 * 60 * 60 * 24) + 1;
        } else if (new Date(item.startDate.split(' ')[0]) >= new Date(startDate) && new Date(item.endDate.split(' ')[0]) >= new Date(endDate)) {
          c = c + Math.abs(new Date(item.startDate.split(' ')[0]) - new Date(endDate)) / (1000 * 60 * 60 * 24) + 1;
        } else if (new Date(item.startDate.split(' ')[0]) <= new Date(startDate) && new Date(item.endDate.split(' ')[0]) <= new Date(endDate)) {
          c = c + Math.abs(new Date(startDate) - new Date(item.endDate.split(' ')[0])) / (1000 * 60 * 60 * 24) + 1;
        } else {
          c = c + Math.abs(new Date(startDate) - new Date(endDate)) / (1000 * 60 * 60 * 24) + 1;
        }
      }
    });
    return c;
  };

  return (
    <>
      <div className='p-4 bg-light'>
        <Row className='my-3'>
          <Col>
            <Form>
              <Form.Group className='mb-3 text-dark' controlId='formBasicExperience'>
                <Select options={resourceOptions} onChange={handleChangeRes} placeholder='Enter Name' />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicStartDate'>
                <Form.Control type='date' placeholder='Enter Start Date' onChange={e => setStartDate(e.target.value)} value={startDate} />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicStartDate'>
                <Form.Control type='date' placeholder='Enter Start Date' onChange={e => setEndDate(e.target.value)} value={endDate} />
              </Form.Group>
            </Form>
          </Col>
          <Button onClick={filterResults} className='btn-block btn-primary'>
            Generate Report
          </Button>
        </Row>
      </div>

      {!loading && (
        <div className='bg-light' id='section-to-print'>
          <Row className='px-4 pt-4 pb-2'>
            <Col>
              <Row>
                <Col>
                  <Card border='light' className='m-3 shadow'>
                    {/* <Card.Header>Projects</Card.Header> */}
                    <Card.Text className='mx-4 mt-4 text-muted' style={{ fontSize: 19 }}>
                      Projects
                    </Card.Text>
                    <Card.Body>
                      <Card.Title style={{ fontSize: 38, marginLeft: 15 }}>{projectCount}</Card.Title>
                      <Card.Text className='text-muted mx-2 mb-2'>During the selected dates</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card border='light' className='m-3 shadow'>
                    {/* <Card.Header>Projects</Card.Header> */}
                    <Card.Text className='mx-4 mt-4 text-muted' style={{ fontSize: 19 }}>
                      Leaves
                    </Card.Text>
                    <Card.Body>
                      <Card.Title style={{ fontSize: 38, marginLeft: 15 }}>{leaves}</Card.Title>
                      <Card.Text className='text-muted mx-2 mb-2'>Days Accross the range</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                {/* <Col>
                  <Card border='light' className='m-3 shadow'>
                    <Card.Text className='mx-4 mt-4 text-muted' style={{ fontSize: 19 }}>
                      Working Days
                    </Card.Text>
                    <Card.Body>
                      <Card.Title style={{ fontSize: 38, marginLeft: 15 }}>{workingDays}</Card.Title>
                      <Card.Text className='text-muted mx-2 mb-2'>Accross the range</Card.Text>
                    </Card.Body>
                  </Card>
                </Col> */}
              </Row>
            </Col>
            <Col>
              <Card border='light' className='m-3 shadow'>
                <Card.Body>
                  <Chart chartType='PieChart' data={data} options={options} width={'100%'} height={'400px'} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className='p-5'>
            <div>
              <div className='text-center h4 mb-3'>
                {nameFilter} : {startDate} To {endDate}{' '}
              </div>
              <Table hover className='shadow-sm border-dark'>
                <thead>
                  <tr>
                    <th className='text-dark'>#</th>
                    <th className='text-dark'>Project</th>
                    <th className='text-dark'>Task Name</th>
                    <th className='text-dark'>Start Date</th>
                    <th className='text-dark'>End Date</th>
                    <th className='text-dark'>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {displayData.length !== 0 &&
                    displayData.map((item, i) => (
                      <tr>
                        <td className='text-dark'>{i + 1}</td>
                        <td className='text-dark'>{projects.find(pro => pro.projectId === item.projectId).name}</td>
                        <td className='text-dark'>{item.name}</td>
                        <td className='text-dark'>{item.startDate.split(' ')[0]}</td>
                        <td className='text-dark'>{item.endDate.split(' ')[0]}</td>
                        <td className='text-dark'>{new Date(item.startDate.split(' ')[0]) >= new Date(startDate) && new Date(item.endDate.split(' ')[0]) <= new Date(endDate) ? Math.abs(new Date(item.startDate.split(' ')[0]) - new Date(item.endDate.split(' ')[0])) / (1000 * 60 * 60 * 24) + 1 : new Date(item.startDate.split(' ')[0]) >= new Date(startDate) && new Date(item.endDate.split(' ')[0]) >= new Date(endDate) ? Math.abs(new Date(item.startDate.split(' ')[0]) - new Date(endDate)) / (1000 * 60 * 60 * 24) + 1 : new Date(item.startDate.split(' ')[0]) <= new Date(startDate) && new Date(item.endDate.split(' ')[0]) <= new Date(endDate) ? Math.abs(new Date(startDate) - new Date(item.endDate.split(' ')[0])) / (1000 * 60 * 60 * 24) + 1 : Math.abs(new Date(startDate) - new Date(endDate)) / (1000 * 60 * 60 * 24) + 1}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
            <Button onClick={exportTable} className='hide-btn'>
              Export
            </Button>
          </Row>

          {/* <Row className='px-5 py-4 w-50'>
          <Card border='light' className='m-3 shadow'>
            <Card.Body>
              <Chart chartType='GeoChart' width='100%' height='400px' data={dataC} />
            </Card.Body>
          </Card>
        </Row> */}
        </div>
      )}
    </>
  );
};

export default Report;
