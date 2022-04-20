import React from 'react';
import { useState, useEffect, createRef, useContext } from 'react';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import NotyfContext from '../../Components/NotyfContext';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Button, Row, Form, Col } from 'react-bootstrap';
import './CalendarBDS.css';

const CalendarBDS = () => {
  const [data, setData] = useState([]);
  const [filData, setFilData] = useState([]);
  const [changes, setChanges] = useState([]);
  const [toPrint, setToPrint] = useState(false);
  const [typeFilter, setTypeFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [customerFilter, setCustomerFilter] = useState('');
  const [doneByFilter, setDoneByFilter] = useState('');
  const ref = createRef(null);
  const [inputType, setInputType] = useState('');
  const [inputCountry, setInputCountry] = useState('');
  const [inputCustomer, setInputCustomer] = useState('');
  const [inputPmCount, setInputPmCount] = useState('');
  const [inputDoneBy, setInputDoneBy] = useState('');
  const [readyToSave, setReadyToSave] = useState(false);
  const [image, takeScreenShot] = useScreenshot({
    type: 'image/jpeg',
    quality: 1.0
  });

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();

  const notyf = useContext(NotyfContext);

  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47];

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      getDataHandler();
    }
  }, [history, userInfo]);

  useEffect(() => {
    // getDataHandler(); RELOAD ON CHANGES
    if (data.length !== 0) {
      // console.log(data);
    }
  }, [data]);

  useEffect(() => {
    if (changes.length !== 0) {
      setReadyToSave(true);
    }
  }, [changes]);

  useEffect(() => {
    if (toPrint) {
      takeScreenShot(ref.current).then(download);
    }
  }, [toPrint]);

  async function deleteHandler(i) {
    try {
      const id = { id: data[i]._id };
      const { res } = await axios.post('/api/delete_bds', id);
      notyf.error('Job deleted');
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async function getDataHandler() {
    try {
      const { data } = await axios.get('/api/bds-schedule');
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const download = (image, { name = 'Activity-Calendar-BDS', extension = 'jpg' } = {}) => {
    const a = document.createElement('a');
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
    setToPrint(false);
  };

  const downloadScreenshot = () => {
    setToPrint(true);
  };

  const filterResults = () => {
    let currentAct = [...data];
    let filterResults = [];
    if (typeFilter) {
      filterResults = currentAct.filter(item => item.type === typeFilter);
      if (filterResults.length !== 0) {
        setFilData(filterResults);
      }
    } else if (countryFilter) {
      filterResults = currentAct.filter(item => item.country === countryFilter);
      if (filterResults.length !== 0) {
        setFilData(filterResults);
      }
    } else if (customerFilter) {
      filterResults = currentAct.filter(item => item.customer === customerFilter);
      if (filterResults.length !== 0) {
        setFilData(filterResults);
      }
    } else if (doneByFilter) {
      filterResults = currentAct.filter(item => item.doneBy === doneByFilter);
      if (filterResults.length !== 0) {
        setFilData(filterResults);
      }
    } else if (!customerFilter && !doneByFilter && !countryFilter && !typeFilter) {
      setFilData([]);
    }
  };

  async function saveDataHandler() {
    if (readyToSave) {
      console.log(changes);
      let arrUniq = [...new Map(changes.map(v => [v._id, v])).values()];
      console.log(arrUniq);

      console.log('Uploading to database');
      try {
        const updatedData = {
          data: arrUniq
        };
        const res = await axios.put('/api/edit_bds', updatedData);
        if (res.status === 200) {
          notyf.success('Database updated');
        }
        console.log(res);
      } catch (error) {
        console.log('Error');
      }
    } else {
      console.log('Waiting for state to update');
    }
  }

  async function addActivityHandler() {
    if (inputCountry && inputCustomer && inputDoneBy && inputType && inputPmCount) {
      if (inputCountry.includes('-') || inputType.includes('-') || inputCountry.includes('-') || inputDoneBy.includes('-')) {
        alert('Use of - is not allowed in country field');
      } else {
        let obj = {
          type: inputType,
          country: inputCountry,
          customer: inputCustomer,
          pmCount: inputPmCount,
          doneBy: inputDoneBy,
          range: []
        };
        let curData = [...data];
        curData.push(obj);
        try {
          const { res } = await axios.post('/api/add_bds-schedule', obj);
          notyf.success('New Job added');

          // window.location.reload();
        } catch (error) {
          notyf.error('Invalid Details');
          console.log(error);
        }
      }
    }
  }

  const clickHandler = e => {
    let chg = [...changes];
    let res = e.target.id.split('-');
    let currentType = res[0];
    let currentCountry = res[2];
    let currentCustomer = res[1];
    let currentR = Number(res[res.length - 1]);
    let activites = [...data];

    let type = res[0];
    let col = '';
    if (e.detail === 1) {
      if (type === 'PM') {
        col = '#00b300';
      } else if (type === 'INS') {
        col = '#4da6ff';
      } else if (type === 'OSS') {
        col = '#9900cc';
      } else if (type === 'INSP') {
        col = '#4da6ff';
      } else if (type.toLowerCase().includes('training')) {
        col = '#ffcc00';
      } else {
        col = 'green';
      }
      e.target.style = `background: ${col};`;
      activites.forEach(item => {
        if (item.country === currentCountry && item.customer === currentCustomer && item.type === currentType) {
          item.range.push(currentR);
          let setR = new Set(item.range);
          item.range = Array.from(setR);
          chg.push(item);
        }
      });
      setData(activites);
      setChanges(chg);
    } else if (e.detail === 2) {
      activites.forEach(item => {
        if (item.country === currentCountry && item.customer === currentCustomer && item.type === currentType) {
          if (item && item.range.length !== 0) {
            let ind = item.range.indexOf(currentR);
            item.range.splice(ind, 1);
            chg.push(item);
          }
        }
      });
      setData(activites);
      setChanges(chg);
      e.target.style = `background: white;`;
    }
  };

  const assignClasses = (item, r) => {
    let col = '';
    if (item && item.range && item.range.includes(r)) {
      if (item.type === 'PM') {
        col = `#00b300`;
      } else if (item.type === 'INS' || item.type === 'INSP') {
        col = `#4da6ff`;
      } else if (item.type === 'OSS') {
        col = `#9900cc`;
      } else if (item.type.toLowerCase().includes('training')) {
        col = `#ffcc00`;
      } else {
        col = 'green';
      }
      let tdStyle = {
        background: col
      };
      return tdStyle;
    } else {
      col = '';
      let tdStyle = {
        background: col
      };
      return tdStyle;
    }
  };

  const createRows = (item, index) => {
    let name = '';
    let classColor = assignClasses(item, index + 1);

    return <td id={`${item.type}-${item.customer}-${item.country}-${item.doneBy}-${index + 1}`} onClick={e => clickHandler(e)} style={classColor} className={index % 4 === 0 && 'tbord'}></td>;
  };

  return (
    <>
      <div className='p-4'>
        <Row className='my-3'>
          <Col>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicCategory'>
                <Form.Control type='string' placeholder='Type' value={typeFilter} onChange={e => setTypeFilter(e.target.value)}></Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicCategory'>
                <Form.Control type='string' placeholder='Country' value={countryFilter} onChange={e => setCountryFilter(e.target.value)}></Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicCategory'>
                <Form.Control type='string' placeholder='Customer' value={customerFilter} onChange={e => setCustomerFilter(e.target.value)}></Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicCategory'>
                <Form.Control type='string' placeholder='Done By' value={doneByFilter} onChange={e => setDoneByFilter(e.target.value)}></Form.Control>
              </Form.Group>
            </Form>
          </Col>

          <Button onClick={filterResults} className='btn-block btn-primary'>
            Filter
          </Button>
        </Row>
      </div>
      <div>
        <Button onClick={downloadScreenshot} className='mx-2'>
          <i class='fa-solid fa-image'></i>
        </Button>
        <Button onClick={saveDataHandler}>
          <i class='fa-solid fa-cloud'></i>
        </Button>
      </div>

      <div className='px-3' ref={ref} id='section-to-print'>
        <h2 className='text-center px-4 pb-5 pt-2'>Activity Calendar - BDS</h2>
        <div className={!toPrint ? 'tableFixHead pb-4' : 'pb-4'}>
          <Table bordered hover>
            <thead className='text-light'>
              <tr>
                <th className='bg-dark'>Type</th>
                <th className='bg-dark'>Country</th>
                <th className='bg-dark'>Customer/Site/Task</th>
                <th className='bg-dark'>PM/year</th>
                <th className='bg-dark' colspan='4'>
                  Jan
                </th>
                <th className='bg-dark' colspan='4'>
                  Feb
                </th>
                <th className='bg-dark' colspan='4'>
                  March
                </th>
                <th className='bg-dark' colspan='4'>
                  April
                </th>
                <th className='bg-dark' colspan='4'>
                  May
                </th>
                <th className='bg-dark' colspan='4'>
                  Jun
                </th>
                <th className='bg-dark' colspan='4'>
                  Jul
                </th>
                <th className='bg-dark' colspan='4'>
                  Aug
                </th>
                <th className='bg-dark' colspan='4'>
                  Sep
                </th>
                <th className='bg-dark' colspan='4'>
                  Oct
                </th>
                <th className='bg-dark' colspan='4'>
                  Nov
                </th>
                <th className='bg-dark' colspan='4'>
                  Dec
                </th>
                <th className='bg-dark'>Done by </th>
                {!toPrint && <th className='bg-dark'>Actions </th>}
              </tr>
            </thead>
            <tbody>
              {!filData.length
                ? data.map((item, i) => (
                    <tr>
                      <td>{item.type}</td>
                      <td>{item.country}</td>
                      <td>{item.customer}</td>
                      <td>{item.pmCount}</td>
                      {arr.map(index => createRows(item, index))}
                      <td>{item.doneBy}</td>
                      {!toPrint && (
                        <td>
                          <i className='fas fa-trash-alt mx-1 btn btn-danger btn-sm' onClick={() => deleteHandler(i)}></i>{' '}
                        </td>
                      )}
                    </tr>
                  ))
                : filData.map((item, i) => (
                    <tr>
                      <td>{item.type}</td>
                      <td>{item.country}</td>
                      <td>{item.customer}</td>
                      <td>{item.pmCount}</td>
                      {arr.map(index => createRows(item, index))}
                      <td>{item.doneBy}</td>
                      {!toPrint && (
                        <td>
                          <i className='fas fa-trash-alt mx-1 btn btn-danger btn-sm' onClick={() => deleteHandler(i)}></i>{' '}
                        </td>
                      )}
                    </tr>
                  ))}
            </tbody>
          </Table>
        </div>
      </div>
      <div className='p-4'>
        <Row className='mb-5 mt-3'>
          <Col>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicCategory'>
                <Form.Control type='string' placeholder='Type' value={inputType} onChange={e => setInputType(e.target.value)}></Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicCategory'>
                <Form.Control type='string' placeholder='Country' value={inputCountry} onChange={e => setInputCountry(e.target.value)}></Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicCategory'>
                <Form.Control type='string' placeholder='Customer' value={inputCustomer} onChange={e => setInputCustomer(e.target.value)}></Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicCategory'>
                <Form.Control type='string' placeholder='PM/year' value={inputPmCount} onChange={e => setInputPmCount(e.target.value)}></Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicCategory'>
                <Form.Control type='string' placeholder='Done By' value={inputDoneBy} onChange={e => setInputDoneBy(e.target.value)}></Form.Control>
              </Form.Group>
            </Form>
          </Col>

          <Button onClick={addActivityHandler} className='btn-block btn-primary my-2'>
            Add
          </Button>
        </Row>
      </div>
    </>
  );
};

export default CalendarBDS;
