import React from 'react';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import activityData from '../../data/ActivityData';
import './ActivityCalendar.css';

const ActivityCalendar = () => {
  const [active, setActive] = useState(false);
  const [data, setData] = useState(activityData);

  return (
    <>
      <div className='p-3'>
        <h2 className='text-center p-4'>Activity Calendar 2022</h2>

        <center>
          <iframe src='https://docs.google.com/spreadsheets/d/1UL3EpneDI50BdXdc_nDqPC5zKNGb8L3kE4ZpnxtMTrg/edit?usp=sharing' width='80%' height='1500'></iframe>
        </center>
      </div>
    </>
  );
};

export default ActivityCalendar;
