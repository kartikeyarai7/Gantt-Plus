import React from 'react';
import { Link } from 'react-router-dom';
import './HomeScreen.css';
import pic from '../../data/homeilus.jpg';

const HomeScreen = () => {
  return (
    <div className='p-4'>
      <section>
        <div className='container-fluid my-5 d-flex align-items-center firstSection w-75'>
          <div>
            <h1>Welcome to Gantt Plus</h1>

            <h5 className='text-secondary my-4'>A resource management application that helps in scheduling jobs, tracking projects, resource assignments, annual activity calendars and generating work reports</h5>
          </div>
          <div>
            <img src={pic} className='img' />
          </div>
        </div>
      </section>

      <h1 className='text-center p-4 mb-4'>Features</h1>
      {/* <h5 className='text-center text-secondary mb-5 font-weight-bold'>This is a resource management application that helps in scheduling resources, generating resource reports, tracking projects and managing activity calendars</h5> */}
      <div className='row m-3'>
        <div className='col  card p-4 m-2 shadow-sm'>
          <h2 className='text-center'>Profiling</h2>
          <p className='my-4'>Manage the database of all field engineers profiled on parameters namely team, segment, skill set,FE Level, customer experience, product experience and leading ability </p>
          <Link to={'/resources'} className='btn btn-primary'>
            VIEW
          </Link>
        </div>
        <div className='col  card p-4 m-2 shadow-sm'>
          <h2 className='text-center'> Scheduling</h2>
          <p className='my-4'>Allocate resources to selected job by posting requirements and assign resources based on ability and availability. Upload the assignments to Gantt PRO </p>
          <Link to={'/jobs'} className='btn btn-primary'>
            VIEW
          </Link>
        </div>
        <div className='col  card p-4 m-2 shadow-sm'>
          <h2 className='text-center'>Reporting</h2>
          <p className='my-4'>Generate performance reports for resources containing list of jobs completed, activity breakdown, leave count and other parameters. Reports can be exported as PDF</p>
          <Link to={'/report'} className='btn btn-primary'>
            VIEW
          </Link>
        </div>
      </div>
      <div className='row m-3'>
        <div className='col  card p-4 m-2 shadow-sm'>
          <h2 className='text-center'>Plan</h2>
          <p className='my-4'>View and edit the annual activity calendar containing the planned dates, count, executioner, customer, country for Preventive maintenance or Inspections for BPS & BDS teams </p>
          <Link to={'/activity-calendar-bps'} className='btn btn-primary mb-2'>
            BPS
          </Link>

          <Link to={'/activity-calendar-bds'} className='btn btn-primary'>
            BDS
          </Link>
        </div>
        <div className='col  card p-4 m-2 shadow-sm'>
          <h2 className='text-center'>Resource-Calendar</h2>
          <p className='my-4'>View the month wise plan for all resources with dates and task names. Connected with Gantt PRO and can be filtered and exported as png for printing </p>
          <Link to={'/resource-schedule'} className='btn btn-primary'>
            VIEW
          </Link>
        </div>
        <div className='col  card p-4 m-2 shadow-sm'>
          <h2 className='text-center'>Project-Calendar</h2>
          <p className='my-4'>View all the ongoing projects in a month with dates and assigned resources. Connected with Gantt PRO and can be filtered and exported as png for printing</p>
          <Link to={'/project-schedule'} className='btn btn-primary'>
            VIEW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
