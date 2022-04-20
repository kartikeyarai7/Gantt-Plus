import React from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayJobTable = () => {
  const [db, setDb] = useState([]);

  useEffect(() => {
    getDataHandler();
  }, []); // Fetching Data

  async function getDataHandler() {
    try {
      const { data } = await axios.get('/api/jobs');
      setDb(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr className='text-light'>
            <th>#</th>
            <th>Name</th>
            <th>Team Req</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Segment</th>
            <th>Product </th>
          </tr>
        </thead>
        <tbody>
          {db &&
            db.length !== 0 &&
            db.map((job, index) => (
              <tr className='text-light'>
                <td className={!job.assigned && 'bg-danger'}>{index + 1}</td>
                <td>{job.name}</td>
                <td>{job.skillsReq}</td>
                <td>{job.startDate}</td>
                <td>{job.endDate}</td>
                <td>{job.category}</td>
                <td>{job.machines}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Link to='/jobs' className='btn btn-primary'>
        Manage
      </Link>
    </>
  );
};

export default DisplayJobTable;
