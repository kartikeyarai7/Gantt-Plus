import React, { useState, useEffect, createRef } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import Timeline from 'react-calendar-timeline';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import 'react-calendar-timeline/lib/Timeline.css';
import projectCountryOptions from '../data/ProCountries';
import Select from 'react-select';
import { jsPDF } from 'jspdf';
import moment from 'moment';
import axios from 'axios';
import Spinner from 'react-spinner-material';

const Schedule = () => {
  const [liveGroups, setLiveGroups] = useState([]);
  const [liveItems, setLiveItems] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filGroups, setFilGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [projects, setProjects] = useState([]);
  const [idsArray, setIdsArray] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [skillsFilter, setSkillsFilter] = useState('');
  const [proCountry, setProCountry] = useState('');
  const [proLabel, setProLabel] = useState('');

  const [loading, setLoading] = useState(true);

  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: 'image/jpeg',
    quality: 1.0
  });

  useEffect(() => {
    getProjects();
  }, []);

  async function getProjects() {
    const { data } = await axios.get('/api/get_projects');
    setProjects(data);

    let gpGroups = [];
    data.forEach(item => {
      let a = {
        id: '',
        title: ''
      };
      a.id = item.projectId;
      a.title = item.name;
      gpGroups.push(a);
    });
    console.log(gpGroups);

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
    const pro = await axios.post('/api/workload', a);
    let events = [];

    pro.data.forEach((item, i) => {
      let event = {
        id: '',
        group: '',
        title: '',
        start_time: '',
        end_time: '',
        canMove: false,
        canResize: false,
        canChangeGroup: false,
        itemProps: {
          // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
          'data-custom-attribute': 'Random content',
          'aria-hidden': true,
          onDoubleClick: () => {
            console.log('You clicked double!');
          },
          className: 'weekend',
          style: {
            background: 'green'
          }
        }
      };

      let t1 = item.startDate.split(' ')[0];
      t1 = t1 + ' 09:00:00';
      t1 = Math.round(new Date(t1).getTime());
      let t2 = item.endDate.split(' ')[0];
      t2 = t2 + ' 18:00:00';
      t2 = Math.round(new Date(t2).getTime());

      // let rArr = [];

      // item.resources.forEach(res => {
      //   rArr.push(res.resourceId);
      // });

      event.start_time = t1;
      event.end_time = t2;
      event.title = item.name;
      event.id = item.projectId;
      event.group = item.projectId;
      events.push(event);
    });
    // console.log(events);
    // console.log(pro.data);
    // setLiveItems(events);
    console.log(events);
    setLoading(false);
    setItems(events);
  }

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);
  const downloadPdf = () => takeScreenShot(ref.current).then(printPdf);

  const printPdf = image => {
    const doc = new jsPDF();
    doc.addImage(image, 'png', 0, 0, 212, 297);
    doc.save('Schedule.pdf');
  };

  const exportSchedule = () => {
    window.print();
  };

  const download = (image, { name = 'Report', extension = 'jpg' } = {}) => {
    const a = document.createElement('a');
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const filterResults = () => {
    console.log(proCountry);
    console.log(proLabel);

    if (nameFilter) {
      if (skillsFilter && proCountry) {
        let arr = groups.filter(item => item.title.includes(nameFilter) && item.title.includes(skillsFilter) && (item.title.includes(proCountry) || item.title.includes(proLabel)));
        setFilGroups(arr);
      } else if (skillsFilter && !proCountry) {
        let arr = groups.filter(item => item.title.includes(nameFilter) && item.title.includes(skillsFilter));
        setFilGroups(arr);
      } else if (!skillsFilter && proCountry) {
        let arr = groups.filter(item => (item.title.includes(nameFilter) && item.title.includes(proCountry)) || item.title.includes(proLabel));
        setFilGroups(arr);
      } else if (!skillsFilter && !proCountry) {
        let arr = groups.filter(item => item.title.includes(nameFilter));
        setFilGroups(arr);
      }
    } else {
      if (skillsFilter && proCountry) {
        let arr = groups.filter(item => item.title.includes(skillsFilter) && (item.title.includes(proCountry) || item.title.includes(proLabel)));
        setFilGroups(arr);
      } else if (skillsFilter && !proCountry) {
        let arr = groups.filter(item => item.title.includes(skillsFilter));
        setFilGroups(arr);
      } else if (!skillsFilter && proCountry) {
        let arr = groups.filter(item => item.title.includes(proCountry) || item.title.includes(proLabel));
        setFilGroups(arr);
      } else {
        console.log('Nothing to filter. Reload');
      }
    }
  };

  const handleChangeprojectCountry = t => {
    setProLabel(t.label);
    setProCountry(t.value);
  };

  // const groups2 = [
  //   { id: 1634533200000, title: 'Kuwait' },
  //   { id: 1634533200001, title: 'Qatar' }
  // ];

  // const items2 = [
  //   {
  //     id: 1634533200000,
  //     group: 1634533200000,
  //     title: 'item 1',
  //     start_time: moment(),
  //     end_time: moment().add(1, 'hour')
  //   }
  // ];
  return (
    <>
      {!loading ? (
        <div className='p-3 bg-light'>
          <Row className='my-3'>
            <Col>
              <Form>
                <Form.Group className='mb-3 text-dark' controlId='formBasicExperience'>
                  <Select options={projectCountryOptions} name='experience' className='basic-multi-select' classNamePrefix='select' onChange={handleChangeprojectCountry} placeholder='Country' />
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
            <Col>
              <Form>
                <Form.Group className='mb-3' controlId='formBasicCategory'>
                  <Form.Control type='string' placeholder='Project Name' value={nameFilter} onChange={e => setNameFilter(e.target.value)}></Form.Control>
                </Form.Group>
              </Form>
            </Col>

            <Button onClick={filterResults} className='btn-block btn-primary'>
              Filter
            </Button>
          </Row>

          <Button onClick={downloadPdf}>
            <i class='fa-solid fa-file-arrow-down'></i>
          </Button>
          <Button onClick={downloadScreenshot}>
            <i class='fa-solid fa-image'></i>
          </Button>
          <div ref={ref} id='section-to-print'>
            <Timeline groups={filGroups ? filGroups : groups} items={items} defaultTimeStart={new Date('03-01-2022')} defaultTimeEnd={new Date('03-31-2022')}></Timeline>
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

export default Schedule;
