import React, { useState, useEffect, createRef } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import Timeline from 'react-calendar-timeline';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import 'react-calendar-timeline/lib/Timeline.css';
import Select from 'react-select';
import moment from 'moment';
import axios from 'axios';
import Spinner from 'react-spinner-material';
import { jsPDF } from 'jspdf';

const ResourceSchedule = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filgroups, setFilGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [projects, setProjects] = useState([]);
  const [idsArray, setIdsArray] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [skillsFilter, setSkillsFilter] = useState('');
  const [proCountry, setProCountry] = useState('');

  const [loading, setLoading] = useState(true);

  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: 'image/jpeg',
    quality: 1.0
  });

  useEffect(() => {
    getProjects();
    getDataHandler();
  }, []);

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);
  const downloadPdf = () => takeScreenShot(ref.current).then(printPdf);

  const exportSchedule = () => {
    window.print();
  };

  const printPdf = image => {
    // const doc = new jsPDF();
    // doc.addImage(image, 'png', 0, 0, 212, 297);

    const doc = new jsPDF('p', 'mm', 'a4');
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
    doc.addImage(image, 'png', 0, 0, width, height);
    doc.save('Schedule.pdf');
  };

  const download = (image, { name = 'Report', extension = 'jpg' } = {}) => {
    const a = document.createElement('a');
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  async function getProjects() {
    const { data } = await axios.get('/api/get_projects');
    setProjects(data);
    let ids = [];
    data.forEach(item => {
      ids.push(item.projectId);
    });
    setIdsArray(ids);
    const a = {
      arr: ids
    };
    const pro = await axios.post('/api/workload', a);
    console.log(pro.data);
    let events = [];

    pro.data.forEach(item => {
      item.resources.forEach(res => {
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

        event.start_time = t1;
        event.end_time = t2;
        event.title = item.name;
        event.id = res.resourceId;
        event.group = res.resourceId;
        events.push(event);
      });
    });
    setItems(events);
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
      setResources(data);
      let gpGroups = [];
      data.forEach(item => {
        let a = {
          id: '',
          title: ''
        };
        a.id = item.gid;
        a.title = item.name;
        gpGroups.push(a);
      });
      console.log(gpGroups);

      setGroups(gpGroups);
      setFilGroups(gpGroups);
    } catch (error) {
      console.log(error);
    }
  }

  async function filterResults() {
    let a = [];
    let gpGroups = [];

    if (nameFilter && skillsFilter) {
      resources.forEach(item => {
        if (item.name.trim().toLowerCase().includes(nameFilter.trim().toLowerCase()) && item.skills.trim().toLowerCase() === skillsFilter.trim().toLowerCase()) {
          a.push(item);
        }
      });
    } else if (nameFilter && !skillsFilter) {
      resources.forEach(item => {
        if (item.name.trim().toLowerCase().includes(nameFilter.trim().toLowerCase())) {
          a.push(item);
        }
      });
    } else if (!nameFilter && skillsFilter) {
      resources.forEach(item => {
        if (item.skills.trim().toLowerCase() === skillsFilter.trim().toLowerCase()) {
          a.push(item);
        }
      });
    } else {
      resources.forEach(item => {
        a.push(item);
      });
    }

    a.forEach(item => {
      let b = {
        id: '',
        title: ''
      };
      b.id = item.gid;
      b.title = item.name;
      gpGroups.push(b);
    });

    setFilGroups(gpGroups);
  }

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
                  <Form.Control type='string' placeholder='Full Name' value={nameFilter} onChange={e => setNameFilter(e.target.value)}></Form.Control>
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
            <Timeline groups={filgroups} items={items} defaultTimeStart={new Date('03-01-2022')} defaultTimeEnd={new Date('03-31-2022')}></Timeline>
          </div>
        </div>
      ) : (
        <>
          <div className='d-flex justify-content-center vh-100 align-items-center'>
            {' '}
            <Spinner radius={100} color={'#333'} stroke={2} visible={true} />
          </div>
        </>
      )}
    </>
  );
};

export default ResourceSchedule;
