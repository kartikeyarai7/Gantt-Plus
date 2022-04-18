import React from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DisplayResourceTable = () => {
  const [db, setDb] = useState([]);

  useEffect(() => {
    getDataHandler();
  }, []); // Fetching Data

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
            <th>Team</th>
            <th>Segment Experience</th>
            <th>Product Experience</th>
          </tr>
        </thead>
        <tbody>
          {db &&
            db.map((user, index) => (
              <tr className='text-light'>
                {/* <td className={!user.assignedTo && 'bg-danger'}>{index + 1}</td> */}
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.skills}</td>
                <td>{user.machines.map(machine => machine + ', ')}</td>
                <td>{user.productExp.map(machine => machine + ', ')}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Link to='/resources' className='btn btn-primary'>
        Manage
      </Link>
    </>
  );
};

export default DisplayResourceTable;
