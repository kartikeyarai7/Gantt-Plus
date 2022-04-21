import React from 'react';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import { Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
// import RangeSlider from 'react-bootstrap-range-slider';

import Creatable from 'react-select/creatable';
import NotyfContext from './NotyfContext';
import experienceOptionsBps from '../data/Exp';

const JobInfo = ({ sendData, projects }) => {
  const [name, setName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [taskId, setTaskId] = useState('');
  const [count, setCount] = useState('');
  const [reps, setReps] = useState([]);
  const [skillsReq, setSkillsReq] = useState('');
  // const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [startTimeStart, setStartTimeStart] = useState('');
  const [endTimeStart, setEndTimeStart] = useState('');
  const [endDate, setEndDate] = useState('');
  const [projectEndDate, setProjectEndDate] = useState('');
  const [feCount, setFeCount] = useState(0);
  const [s, setS] = useState('');
  const [disableAdd, setDisableAdd] = useState(false);
  // const [startTimeEnd, setstartTimeEnd] = useState('');
  // const [endTimeEnd, setEndTimeEnd] = useState('');
  const [type, setType] = useState('');
  const [lead, setLead] = useState('');
  const [showEditForm, setShowEditForm] = useState('');
  const [machines, setMachines] = useState('');
  const [productValue, setProductValue] = useState(''); //Creatable Product
  const [customerValue, setCustomerValue] = useState(''); //Creatable Product
  const [feLevel, setFeLevel] = useState(''); // Required Fe level
  // const [reqDurationStart, setReqDurationStart] = useState(0);
  // const [reqDurationEnd, setReqDurationEnd] = useState(0);
  // const [insExpBps, setInsExpBps] = useState('');
  // const [pmExpBps, setPmExpBps] = useState('');
  // const [cmExpBps, setCmExpBps] = useState('');
  const [exp, setExp] = useState('');
  const [projectGpOptions, setProjectGpOptions] = useState([]);
  const [taskGpOptions, setTaskGpOptions] = useState([]);
  // const [insExpBds, setInsExpBds] = useState('');
  // const [pmExpBds, setPmExpBds] = useState('');
  // const [cmExpBds, setCmExpBds] = useState('');
  // const [upsExpBds, setUpsExpBds] = useState('');

  useEffect(() => {
    // console.log(showEditForm);
    if (sendData) {
      populateData(sendData);
    }
  }, [sendData]);

  useEffect(() => {
    if (projects.length) {
      let arr = [];
      projects.forEach(item => {
        let a = { value: '', label: '' };
        a.value = item.name;
        a.label = item.name;
        arr.push(a);
      });
      setProjectGpOptions(arr);
    }
  }, [projects]);

  useEffect(() => {
    if (projectId) {
      getTasks(projectId);
    }
  }, [projectId]);

  const expOptionsBps = [
    { value: '', label: 'None' },
    { value: 'M3-Beginner', label: 'M3-Beginner' },
    { value: 'M3-Intermediate', label: 'M3-Intermediate' },
    { value: 'M3-Advanced', label: 'M3-Advanced' },
    { value: 'M5-Beginner', label: 'M5-Beginner' },
    { value: 'M5-Intermediate', label: 'M5-Intermediate' },
    { value: 'M5-Advanced', label: 'M5-Advanced' },
    { value: 'M7-Beginner', label: 'M7-Beginner' },
    { value: 'M7-Intermediate', label: 'M7-Intermediate' },
    { value: 'M7-Advanced', label: 'M7-Advanced' },
    { value: 'X9-Beginner', label: 'X9-Beginner' },
    { value: 'X9-Intermediate', label: 'X9-Intermediate' },
    { value: 'X9-Advanced', label: 'X9-Advanced' },
    { value: 'BPS 2000-Beginner', label: 'BPS 2000-Beginner' },
    { value: 'BPS 2000-Intermediate', label: 'BPS 2000-Intermediate' },
    { value: 'BPS 2000-Advanced', label: 'BPS 2000-Advanced' },

    { value: 'C1-Beginner', label: 'C1-Beginner' },
    { value: 'C1-Intermediate', label: 'C1-Intermediate' },
    { value: 'C1-Advanced', label: 'C1-Advanced' },
    { value: 'C2-Beginner', label: 'C2-Beginner' },
    { value: 'C2-Intermediate', label: 'C2-Intermediate' },
    { value: 'C2-Advanced', label: 'C2-Advanced' },
    { value: 'C3-Beginner', label: 'C3-Beginner' },
    { value: 'C3-Intermediate', label: 'C3-Intermediate' },
    { value: 'C3-Advanced', label: 'C3-Advanced' },
    { value: 'C4-Beginner', label: 'C4-Beginner' },
    { value: 'C4-Intermediate', label: 'C4-Intermediate' },
    { value: 'C4-Advanced', label: 'C4-Advanced' },
    { value: 'C5-Beginner', label: 'C5-Beginner' },
    { value: 'C5-Intermediate', label: 'C5-Intermediate' },
    { value: 'C5-Advanced', label: 'C5-Advanced' },
    { value: 'C6-Beginner', label: 'C6-Beginner' },
    { value: 'C6-Intermediate', label: 'C6-Intermediate' },
    { value: 'C6-Advanced', label: 'C6-Advanced' },
    { value: 'Numeron-Beginner', label: 'Numeron-Beginner' },
    { value: 'Numeron-Intermediate', label: 'Numeron-Intermediate' },
    { value: 'Numeron-Advanced', label: 'Numeron-Advanced' },
    { value: 'NP10-Beginner', label: 'NP10-Beginner' },
    { value: 'NP10-Intermediate', label: 'NP10-Intermediate' },
    { value: 'NP10-Advanced', label: 'NP10-Advanced' },
    { value: 'NP20-Beginner', label: 'NP20-Beginner' },
    { value: 'NP20-Intermediate', label: 'NP20-Intermediate' },
    { value: 'NP20-Advanced', label: 'NP20-Advanced' },
    { value: 'NTL-Beginner', label: 'NTL-Beginner' },
    { value: 'NTL-Intermediate', label: 'NTL-Intermediate' },
    { value: 'NTL-Advanced', label: 'NTL-Advanced' },
    { value: 'Pronote-Beginner', label: 'Pronote-Beginner' },
    { value: 'Pronote-Intermediate', label: 'Pronote-Intermediate' },
    { value: 'Pronote-Advanced', label: 'Pronote-Advanced' },
    { value: 'Procoin-Beginner', label: 'Procoin-Beginner' },
    { value: 'Procoin-Intermediate', label: 'Procoin-Intermediate' },
    { value: 'Procoin-Advanced', label: 'Procoin-Advanced' },
    { value: 'SBM-95-Beginner', label: 'SBM-95-Beginner' },
    { value: 'SBM-95-Intermediate', label: 'SBM-95-Intermediate' },
    { value: 'SBM-95-Advanced', label: 'SBM-95-Advanced' },
    { value: 'Ecoremote/Protect-Beginner', label: 'Ecoremote/Protect-Beginner' },
    { value: 'Ecoremote/Protect-Intermediate', label: 'Ecoremote/Protect-Intermediate' },
    { value: 'Ecoremote/Protect-Advanced', label: 'Ecoremote/Protect-Advanced' }
  ];

  const expOptionsBds = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
    { value: '', label: 'None' }
  ];

  const [segmentOptions, setSegmentOptions] = useState([
    { value: 'M-Segment', label: 'M-Segment' },
    { value: 'C-Segment', label: 'C-Segment' },
    { value: 'X-Segment', label: 'X-Segment' }
  ]);

  const teamOptions = [
    { value: 'BPS', label: 'BPS' },
    { value: 'BDS', label: 'BDS' },
    { value: 'Software', label: 'Software' },
    { value: 'Adaptation', label: 'Adaptation' }
  ];

  const [machineOptions, setMachineOptions] = useState([
    { value: 'M3', label: 'M3' },
    { value: 'M5', label: 'M5' },
    { value: 'M7', label: 'M7' },
    { value: 'X9', label: 'X9' },
    { value: 'C3', label: 'C3' },
    { value: 'Pronote', label: 'Pronote' }
  ]);

  const [leadOptions, setLeadOptions] = useState([
    { value: 'Installation', label: 'Installation' },
    { value: 'Preventive Maintenance', label: 'Preventive Maintenance' },
    { value: 'Corrective Maintenance', label: 'Corrective Maintenance' },
    { value: '', label: 'None' }
  ]);

  const customerOptions = [
    { value: 'Algeria', label: 'Algeria' },
    { value: 'Angola', label: 'Angola' },
    { value: 'Bahrain', label: 'Bahrain' },
    { value: 'BCEAO', label: 'BCEAO' },
    { value: 'Congo', label: 'Congo' },
    { value: 'Egypt', label: 'Egypt' },
    { value: 'Ethiopia', label: 'Ethiopia' },
    { value: 'Ghana', label: 'Ghana' },
    { value: 'Guinea', label: 'Guinea' },
    { value: 'Jordan', label: 'Jordan' },
    { value: 'Kenya', label: 'Kenya' },
    { value: 'Kuwait', label: 'Kuwait' },
    { value: 'Lebanon', label: 'Lebanon' },
    { value: 'Morocco', label: 'Morocco' },
    { value: 'Mozambique', label: 'Mozambique' },
    { value: 'Oman', label: 'Oman' },
    { value: 'Pakistan', label: 'Pakistan' },
    { value: 'Qatar', label: 'Qatar' },
    { value: 'Rwanda', label: 'Rwanda' },
    { value: 'Saudi', label: 'Saudi' },
    { value: 'Sierra Leone', label: 'Sierra Leone' },
    { value: 'Somalia', label: 'Somalia' },
    { value: 'Sudan', label: 'Sudan' },
    { value: 'Tanzania', label: 'Tanzania' },
    { value: 'Tunisia', label: 'Tunisia' },
    { value: 'UAE', label: 'UAE' },
    { value: 'Uganda', label: 'Uganda' },
    { value: 'Africa', label: 'Africa' },
    { value: '', label: 'None' }
  ];

  const [experienceOptions, setExperienceOptions] = useState(experienceOptionsBps);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 10
    })
  };

  const [feLevelOptions, setFeLevelOptions] = useState([
    { value: '1', label: 'FE-1' },
    { value: '2', label: 'FE-2' },
    { value: '3', label: 'FE-3' },
    { value: '4', label: 'FE-4' }
  ]);

  const populateData = data => {
    if (data) {
      setName(data.name);
      if (data.name) {
        setShowEditForm('true');
      }
      // setSkills(data.skills);
    }
  };

  // const handleChangeInstallationBps = t => {
  //   setInsExpBps(t.value);
  // };
  // const handleChangePmBps = t => {
  //   setPmExpBps(t.value);
  // };
  // const handleChangeCmBps = t => {
  //   setCmExpBps(t.value);
  // };

  // const handleChangeInstallationBds = t => {
  //   setInsExpBds(t.value);
  // };
  // const handleChangePmBds = t => {
  //   setPmExpBds(t.value);
  // };
  // const handleChangeCmBds = t => {
  //   setCmExpBds(t.value);
  // };
  // const handleChangeUpsBds = t => {
  //   setUpsExpBds(t.value);
  // };

  const handleChangeExp = t => {
    setExp(t.value);
  };

  const handleChange = skills => {
    setSkillsReq(skills.value);
    if (skills.value === 'BDS') {
      setSegmentOptions([
        { value: 'BDS', label: 'BDS' },
        { value: 'UPS', label: 'UPS' }
      ]);

      setMachineOptions([{ value: 'N/A', label: 'N/A' }]);
      setLeadOptions([
        { value: 'BDS Installation', label: 'BDS Installation' },
        { value: 'BDS Preventive Maintenance', label: 'BDS Preventive Maintenance' },
        { value: 'BDS Corrective Maintenance', label: 'BDS Corrective Maintenance' },
        { value: 'UPS', label: 'UPS' },
        { value: '', label: 'None' }
      ]);
      setFeLevelOptions([
        { value: '1', label: 'FE-1' },
        { value: '2', label: 'FE-2' },
        { value: '3', label: 'FE-3' },
        { value: '4', label: 'FE-4' }
      ]);
      setExperienceOptions([
        { value: '', label: 'None' },
        { value: 'BDS-Ins-Beginner', label: 'BDS-Ins-Beginner' },
        { value: 'BDS-PM-Beginner', label: 'BDS-PM-Beginner' },
        { value: 'BDS-CM-Beginner', label: 'BDS-CM-Beginner' },
        { value: 'UPS-Beginner', label: 'UPS-Beginner' },
        { value: 'BDS-Ins-Intermediate', label: 'BDS-Ins-Intermediate' },
        { value: 'BDS-PM-Intermediate', label: 'BDS-PM-Intermediate' },
        { value: 'BDS-CM-Intermediate', label: 'BDS-CM-Intermediate' },
        { value: 'UPS-Intermediate', label: 'UPS-Intermediate' },
        { value: 'BDS-Ins-Advanced', label: 'BDS-Ins-Advanced' },
        { value: 'BDS-PM-Advanced', label: 'BDS-PM-Advanced' },
        { value: 'BDS-CM-Advanced', label: 'BDS-CM-Advanced' },
        { value: 'UPS-Advanced', label: 'UPS-Advanced' }
      ]);
    } else if (skills.value === 'BPS') {
      setSegmentOptions([
        { value: 'M-Segment', label: 'M-Segment' },
        { value: 'C-Segment', label: 'C-Segment' },
        { value: 'X-Segment', label: 'X-Segment' }
      ]);
      setMachineOptions([
        { value: 'M3', label: 'M3' },
        { value: 'M5', label: 'M5' },
        { value: 'M7', label: 'M7' },
        { value: 'X9', label: 'X9' },
        { value: 'NP10', label: 'NP10' },
        { value: 'NP20', label: 'NP20' },
        { value: 'Numeron', label: 'Numeron' },
        { value: 'NTL', label: 'NTL' },
        { value: 'BPS 2000', label: 'BPS 2000' },
        { value: 'X9', label: 'X9' },
        { value: 'Pronote', label: 'Pronote' },
        { value: 'Procoin', label: 'Procoin' },
        { value: 'C1', label: 'C1' },
        { value: 'C2', label: 'C2' },
        { value: 'C3', label: 'C3' },
        { value: 'C4', label: 'C4' },
        { value: 'C5', label: 'C5' },
        { value: 'C6', label: 'C6' },
        { value: 'Ecoremote/Protect', label: 'Ecoremote/Protect' },
        { value: 'SBM-95', label: 'SBM-95' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'M3-Ins', label: 'M3-Ins' },
        { value: 'M5-Ins', label: 'M5-Ins' },
        { value: 'M7-Ins', label: 'M7-Ins' },
        { value: 'X9-Ins', label: 'X9-Ins' },
        { value: 'NP10-Ins', label: 'NP10-Ins' },
        { value: 'NP20-Ins', label: 'NP20-Ins' },
        { value: 'Numeron-Ins', label: 'Numeron-Ins' },
        { value: 'NTL-Ins', label: 'NTL-Ins' },
        { value: 'BPS 2000-Ins', label: 'BPS 2000-Ins' },
        { value: 'X9-Ins', label: 'X9-Ins' },
        { value: 'Pronote-Ins', label: 'Pronote-Ins' },
        { value: 'Procoin-Ins', label: 'Procoin-Ins' },
        { value: 'C1-Ins', label: 'C1-Ins' },
        { value: 'C2-Ins', label: 'C2-Ins' },
        { value: 'C3-Ins', label: 'C3-Ins' },
        { value: 'C4-Ins', label: 'C4-Ins' },
        { value: 'C5-Ins', label: 'C5-Ins' },
        { value: 'C6-Ins', label: 'C6-Ins' },
        { value: 'Ecoremote/Protect-Ins', label: 'Ecoremote/Protect-Ins' },
        { value: 'SBM-95-Ins', label: 'SBM-95-Ins' },
        { value: 'M3-PM', label: 'M3-PM' },
        { value: 'M5-PM', label: 'M5-PM' },
        { value: 'M7-PM', label: 'M7-PM' },
        { value: 'X9-PM', label: 'X9-PM' },
        { value: 'NP10-PM', label: 'NP10-PM' },
        { value: 'NP20-PM', label: 'NP20-PM' },
        { value: 'Numeron-PM', label: 'Numeron-PM' },
        { value: 'NTL-PM', label: 'NTL-PM' },
        { value: 'BPS 2000-PM', label: 'BPS 2000-PM' },
        { value: 'X9-PM', label: 'X9-PM' },
        { value: 'Pronote-PM', label: 'Pronote-PM' },
        { value: 'Procoin-PM', label: 'Procoin-PM' },
        { value: 'C1-PM', label: 'C1-PM' },
        { value: 'C2-PM', label: 'C2-PM' },
        { value: 'C3-PM', label: 'C3-PM' },
        { value: 'C4-PM', label: 'C4-PM' },
        { value: 'C5-PM', label: 'C5-PM' },
        { value: 'C6-PM', label: 'C6-PM' },
        { value: 'Ecoremote/Protect-PM', label: 'Ecoremote/Protect-PM' },
        { value: 'SBM-95-PM', label: 'SBM-95-PM' },
        { value: 'M3-CM', label: 'M3-CM' },
        { value: 'M5-CM', label: 'M5-CM' },
        { value: 'M7-CM', label: 'M7-CM' },
        { value: 'M7-Onsite-Support', label: 'M7-Onsite-Support' },
        { value: 'X9-CM', label: 'X9-CM' },
        { value: 'NP10-CM', label: 'NP10-CM' },
        { value: 'NP20-CM', label: 'NP20-CM' },
        { value: 'Numeron-CM', label: 'Numeron-CM' },
        { value: 'NTL-CM', label: 'NTL-CM' },
        { value: 'BPS 2000-CM', label: 'BPS 2000-CM' },
        { value: 'X9-CM', label: 'X9-CM' },
        { value: 'Pronote-CM', label: 'Pronote-CM' },
        { value: 'Procoin-CM', label: 'Procoin-CM' },
        { value: 'C1-CM', label: 'C1-CM' },
        { value: 'C2-CM', label: 'C2-CM' },
        { value: 'C3-CM', label: 'C3-CM' },
        { value: 'C4-CM', label: 'C4-CM' },
        { value: 'C5-CM', label: 'C5-CM' },
        { value: 'C6-CM', label: 'C6-CM' },
        { value: 'Ecoremote/Protect-CM', label: 'Ecoremote/Protect-CM' },
        { value: 'SBM-95-CM', label: 'SBM-95-CM' },
        { value: '', label: 'None' }
      ]);
      setFeLevelOptions([
        { value: '1', label: 'FE-1' },
        { value: '2', label: 'FE-2' },
        { value: '3', label: 'FE-3' },
        { value: '4', label: 'FE-4' }
      ]);
      setExperienceOptions(experienceOptionsBps);
    } else if (skills.value === 'Adaptation') {
      setSegmentOptions([
        { value: 'M-Segment', label: 'M-Segment' },
        { value: 'C-Segment', label: 'C-Segment' },
        { value: 'X-Segment', label: 'X-Segment' }
      ]);
      setMachineOptions([
        { value: 'M3', label: 'M3' },
        { value: 'M5', label: 'M5' },
        { value: 'M7', label: 'M7' },
        { value: 'X9', label: 'X9' },
        { value: 'BPS 1000', label: 'BPS 1000' },
        { value: 'B1', label: 'B1' },
        { value: 'C1', label: 'C1' },
        { value: 'C2', label: 'C2' },
        { value: 'C3', label: 'C3' },
        { value: 'C4', label: 'C4' },
        { value: 'C5', label: 'C5' },
        { value: 'Numeron', label: 'Numeron' },
        { value: 'GSNA- M7/M5', label: 'GSNA- M7/M5' },
        { value: 'GSNA- C2/C5', label: 'GSNA- C2/C5' },
        { value: 'GSNA- M3', label: 'GSNA- M3' },
        { value: '', label: 'None' }
      ]);
      setFeLevelOptions([
        { value: '1', label: 'Adaptation-Specialist-1' },
        { value: '2', label: 'Adaptation-Specialist-2' },
        { value: '3', label: 'Adaptation-Specialist-3' },
        { value: '4', label: 'Adaptation-Specialist-4' }
      ]);
      setLeadOptions([
        { value: 'Installation', label: 'Installation' },
        { value: 'Preventive Maintenance', label: 'Preventive Maintenance' },
        { value: 'Corrective Maintenance', label: 'Corrective Maintenance' },
        { value: 'Finetuning', label: 'Finetuning' },
        { value: '', label: 'None' }
      ]);
      // setLeadOptions([
      //   { value: 'M3', label: 'M3' },
      //   { value: 'M5', label: 'M5' },
      //   { value: 'M7', label: 'M7' },
      //   { value: 'X9', label: 'X9' },
      //   { value: 'BPS 1000', label: 'BPS 1000' },
      //   { value: 'B1', label: 'B1' },
      //   { value: 'C1', label: 'C1' },
      //   { value: 'C2', label: 'C2' },
      //   { value: 'C3', label: 'C3' },
      //   { value: 'C4', label: 'C4' },
      //   { value: 'C5', label: 'C5' },
      //   { value: 'Numeron', label: 'Numeron' },
      //   { value: 'GSNA-M7/M5', label: 'GSNA-M7/M5' },
      //   { value: 'GSNA-C2/C5', label: 'GSNA-C2/C5' },
      //   { value: 'GSNA-M3', label: 'GSNA-M3' },
      //   { value: 'Finetuning', label: 'Finetuning' },
      //   { value: '', label: 'None' }
      // ]);
      setExperienceOptions([
        { value: 'M3-Beginner', label: 'M3-Beginner' },
        { value: 'M3-Intermediate', label: 'M3-Intermediate' },
        { value: 'M3-Advanced', label: 'M3-Advanced' },
        { value: 'M5-Beginner', label: 'M5-Beginner' },
        { value: 'M5-Intermediate', label: 'M5-Intermediate' },
        { value: 'M5-Advanced', label: 'M5-Advanced' },
        { value: 'M7-Beginner', label: 'M7-Beginner' },
        { value: 'M7-Intermediate', label: 'M7-Intermediate' },
        { value: 'M7-Advanced', label: 'M7-Advanced' },
        { value: 'X9-Beginner', label: 'X9-Beginner' },
        { value: 'X9-Intermediate', label: 'X9-Intermediate' },
        { value: 'X9-Advanced', label: 'X9-Advanced' },
        { value: 'BPS 1000-Beginner', label: 'BPS 1000-Beginner' },
        { value: 'BPS 1000-Intermediate', label: 'BPS 1000-Intermediate' },
        { value: 'BPS 1000-Advanced', label: 'BPS 1000-Advanced' },
        { value: 'B1-Beginner', label: 'B1-Beginner' },
        { value: 'B1-Intermediate', label: 'B1-Intermediate' },
        { value: 'B1-Advanced', label: 'B1-Advanced' },
        { value: 'C1-Beginner', label: 'C1-Beginner' },
        { value: 'C1-Intermediate', label: 'C1-Intermediate' },
        { value: 'C1-Advanced', label: 'C1-Advanced' },
        { value: 'C2-Beginner', label: 'C2-Beginner' },
        { value: 'C2-Intermediate', label: 'C2-Intermediate' },
        { value: 'C2-Advanced', label: 'C2-Advanced' },
        { value: 'C3-Beginner', label: 'C3-Beginner' },
        { value: 'C3-Intermediate', label: 'C3-Intermediate' },
        { value: 'C3-Advanced', label: 'C3-Advanced' },
        { value: 'C4-Beginner', label: 'C4-Beginner' },
        { value: 'C4-Intermediate', label: 'C4-Intermediate' },
        { value: 'C4-Advanced', label: 'C4-Advanced' },
        { value: 'C5-Beginner', label: 'C5-Beginner' },
        { value: 'C5-Intermediate', label: 'C5-Intermediate' },
        { value: 'C5-Advanced', label: 'C5-Advanced' },
        { value: 'Numeron-Beginner', label: 'Numeron-Beginner' },
        { value: 'Numeron-Intermediate', label: 'Numeron-Intermediate' },
        { value: 'Numeron-Advanced', label: 'Numeron-Advanced' },
        { value: 'GSNA- M7/M5-Beginner', label: 'GSNA- M7/M5-Beginner' },
        { value: 'GSNA- M7/M5-Intermediate', label: 'GSNA- M7/M5-Intermediate' },
        { value: 'GSNA- M7/M5-Advanced', label: 'GSNA- M7/M5-Advanced' },
        { value: 'GSNA- C2/C5-Beginner', label: 'GSNA- C2/C5-Beginner' },
        { value: 'GSNA- C2/C5-Intermediate', label: 'GSNA- C2/C5-Intermediate' },
        { value: 'GSNA- C2/C5-Advanced', label: 'GSNA- C2/C5-Advanced' },
        { value: 'GSNA- M3-Beginner', label: 'GSNA- M3-Beginner' },
        { value: 'GSNA- M3-Intermediate', label: 'GSNA- M3-Intermediate' },
        { value: 'GSNA- M3-Advanced', label: 'GSNA- M3-Advanced' }
      ]);
    } else if (skills.value === 'Software') {
      setSegmentOptions([
        { value: 'Compass VMS', label: 'Compass VMS' },
        { value: 'CWC', label: 'CWC' }
      ]);
      setMachineOptions([
        { value: 'VMS Compass Full', label: 'VMS Compass Full' },
        { value: 'VMS Compass Starter', label: 'VMS Compass Starter' },

        { value: 'CWC', label: 'CWC' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'Installation', label: 'Installation' },
        { value: 'SIT', label: 'SIT' },
        { value: 'UAT', label: 'UAT' },
        { value: 'Corrective Maintenance', label: 'Corrective Maintenance' },
        { value: '', label: 'None' }
      ]);
      setFeLevelOptions([
        { value: '1', label: 'FE-1' },
        { value: '2', label: 'FE-2' },
        { value: '3', label: 'FE-3' },
        { value: '4', label: 'FE-4' }
      ]);
      setExperienceOptions([
        { value: '', label: 'None' },
        { value: 'Ins-Intermediate', label: 'Ins-Intermediate' },
        { value: 'Ins-Advanced', label: 'Ins-Advanced' },
        { value: 'CM-Intermediate', label: 'CM-Intermediate' },
        { value: 'CM-Advanced', label: 'CM-Advanced' },
        { value: 'SIT-Intermediate', label: 'SIT-Intermediate' },
        { value: 'SIT-Advanced', label: 'SIT-Advanced' },
        { value: 'UAT-Intermediate', label: 'UAT-Intermediate' },
        { value: 'UAT-Advanced', label: 'UAT-Advanced' }
      ]);
    }
  };

  const handleChangeSegment = t => {
    setCategory(t.value);
    if (t.value === 'M-Segment' && skillsReq === 'BPS') {
      setMachineOptions([
        { value: 'M3', label: 'M3' },
        { value: 'M5', label: 'M5' },
        { value: 'M7', label: 'M7' },
        { value: 'NP10', label: 'NP10' },
        { value: 'NP20', label: 'NP20' },
        { value: 'NTL', label: 'NTL' },
        { value: 'Ecoremote/Protect', label: 'Ecoremote/Protect' },

        { value: '', label: 'None' }
      ]);
    } else if (t.value === 'C-Segment' && skillsReq === 'BPS') {
      setMachineOptions([
        { value: 'Pronote', label: 'Pronote' },
        { value: 'Procoin', label: 'Procoin' },
        { value: 'C1', label: 'C1' },
        { value: 'C2', label: 'C2' },
        { value: 'C3', label: 'C3' },
        { value: 'C4', label: 'C4' },
        { value: 'C5', label: 'C5' },
        { value: 'C6', label: 'C6' },
        { value: 'SBM-95', label: 'SBM-95' },
        { value: 'Numeron', label: 'Numeron' },
        { value: '', label: 'None' }
      ]);
    } else if (t.value === 'X-Segment' && skillsReq === 'BPS') {
      setMachineOptions([
        { value: 'X9', label: 'X9' },
        { value: 'BPS 2000', label: 'BPS 2000' },
        { value: '', label: 'None' }
      ]);
    } else if (t.value === 'Compass VMS') {
      setMachineOptions([
        { value: 'VMS Compass Full', label: 'VMS Compass Full' },
        { value: 'VMS Compass Starter', label: 'VMS Compass Starter' },
        { value: '', label: 'None' }
      ]);
    } else if (t.value === 'CWC') {
      setMachineOptions([
        { value: 'CWC', label: 'CWC' },
        { value: '', label: 'None' }
      ]);
    } else if (t.value === 'BDS') {
      setExperienceOptions([
        { value: 'BDS-Ins-Beginner', label: 'BDS-Ins-Beginner' },
        { value: 'BDS-PM-Beginner', label: 'BDS-PM-Beginner' },
        { value: 'BDS-CM-Beginner', label: 'BDS-CM-Beginner' },
        { value: 'BDS-Ins-Intermediate', label: 'BDS-Ins-Intermediate' },
        { value: 'BDS-PM-Intermediate', label: 'BDS-PM-Intermediate' },
        { value: 'BDS-CM-Intermediate', label: 'BDS-CM-Intermediate' },
        { value: 'BDS-Ins-Advanced', label: 'BDS-Ins-Advanced' },
        { value: 'BDS-PM-Advanced', label: 'BDS-PM-Advanced' },
        { value: 'BDS-CM-Advanced', label: 'BDS-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
    } else if (t.value === 'UPS') {
      setExperienceOptions([
        { value: 'UPS-Beginner', label: 'UPS-Beginner' },
        { value: 'UPS-Intermediate', label: 'UPS-Intermediate' },
        { value: 'UPS-Advanced', label: 'UPS-Advanced' },
        { value: '', label: 'None' }
      ]);
    } else if (t.value === 'M-Segment' && skillsReq === 'Adaptation') {
      setMachineOptions([
        { value: 'M3', label: 'M3' },
        { value: 'M5', label: 'M5' },
        { value: 'M7', label: 'M7' },
        { value: 'BPS 1000', label: 'BPS 1000' },
        { value: 'GSNA- M7/M5', label: 'GSNA- M7/M5' },
        { value: 'GSNA- M3', label: 'GSNA- M3' },
        { value: '', label: 'None' }
      ]);
    } else if (t.value === 'C-Segment' && skillsReq === 'Adaptation') {
      setMachineOptions([
        { value: 'B1', label: 'B1' },
        { value: 'C1', label: 'C1' },
        { value: 'C2', label: 'C2' },
        { value: 'C3', label: 'C3' },
        { value: 'C4', label: 'C4' },
        { value: 'C5', label: 'C5' },
        { value: 'GSNA- C2/C5', label: 'GSNA- C2/C5' },
        { value: 'Numeron', label: 'Numeron' },
        { value: '', label: 'None' }
      ]);
    } else if (t.value === 'X-Segment' && skillsReq === 'Adaptation') {
      setMachineOptions([
        { value: 'X9', label: 'X9' },
        { value: '', label: 'None' }
      ]);
    }
  };

  // const handleChangeCountry = t => {
  //   setCountry(t.value);
  // };

  const handleChangeLead = t => {
    setLead(t.value);
  };

  const handleChangeMachines = t => {
    setMachines(t.value);
  };

  const handleChangeFeLevel = t => {
    setFeLevel(t.value);
  };

  const handleCreateProduct = (field, value) => {
    switch (field) {
      case 'productOptions':
        setProductValue(value);
        handleJobExperience(value);
        break;

      default:
        break;
    }
  };

  const handleCreateCustomer = (field, value) => {
    switch (field) {
      case 'customerOptions':
        setCustomerValue(value);
        break;

      default:
        break;
    }
  };

  const handleJobExperience = item => {
    if (item.value === 'M3' && skillsReq === 'Adaptation') {
      setExperienceOptions([
        { value: 'M3-Beginner', label: 'M3-Beginner' },
        { value: 'M3-Intermediate', label: 'M3-Intermediate' },
        { value: 'M3-Advanced', label: 'M3-Advanced' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'M5' && skillsReq === 'Adaptation') {
      setExperienceOptions([
        { value: 'M5-Beginner', label: 'M5-Beginner' },
        { value: 'M5-Intermediate', label: 'M5-Intermediate' },
        { value: 'M5-Advanced', label: 'M5-Advanced' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'M7' && skillsReq === 'Adaptation') {
      setExperienceOptions([
        { value: 'M7-Beginner', label: 'M7-Beginner' },
        { value: 'M7-Intermediate', label: 'M7-Intermediate' },
        { value: 'M7-Advanced', label: 'M7-Advanced' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'X9' && skillsReq === 'Adaptation') {
      setExperienceOptions([
        { value: 'X9-Beginner', label: 'X9-Beginner' },
        { value: 'X9-Intermediate', label: 'X9-Intermediate' },
        { value: 'X9-Advanced', label: 'X9-Advanced' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'BPS 1000' && skillsReq === 'Adaptation') {
      setExperienceOptions([
        { value: 'BPS 1000-Beginner', label: 'BPS 1000-Beginner' },
        { value: 'BPS 1000-Intermediate', label: 'BPS 1000-Intermediate' },
        { value: 'BPS 1000-Advanced', label: 'BPS 1000-Advanced' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'GSNA- M3' && skillsReq === 'Adaptation') {
      setExperienceOptions([
        { value: 'GSNA- M3-Beginner', label: 'GSNA- M3-Beginner' },
        { value: 'GSNA- M3-Intermediate', label: 'GSNA- M3-Intermediate' },
        { value: 'GSNA- M3-Advanced', label: 'GSNA- M3-Advanced' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'GSNA- M7/M5' && skillsReq === 'Adaptation') {
      setExperienceOptions([
        { value: 'GSNA- M7/M5-Beginner', label: 'GSNA- M7/M5-Beginner' },
        { value: 'GSNA- M7/M5-Intermediate', label: 'GSNA- M7/M5-Intermediate' },
        { value: 'GSNA- M7/M5-Advanced', label: 'GSNA- M7/M5-Advanced' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'B1' && skillsReq === 'Adaptation') {
      setExperienceOptions([
        { value: 'B1-Beginner', label: 'B1-Beginner' },
        { value: 'B1-Intermediate', label: 'B1-Intermediate' },
        { value: 'B1-Advanced', label: 'B1-Advanced' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'C1' && skillsReq === 'Adaptation') {
      setExperienceOptions([
        { value: 'C1-Beginner', label: 'C1-Beginner' },
        { value: 'C1-Intermediate', label: 'C1-Intermediate' },
        { value: 'C1-Advanced', label: 'C1-Advanced' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'C2' && skillsReq === 'Adaptation') {
      setExperienceOptions([
        { value: 'C2-Beginner', label: 'C2-Beginner' },
        { value: 'C2-Intermediate', label: 'C2-Intermediate' },
        { value: 'C2-Advanced', label: 'C2-Advanced' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'C3' && skillsReq === 'Adaptation') {
      setExperienceOptions([
        { value: 'C3-Beginner', label: 'C3-Beginner' },
        { value: 'C3-Intermediate', label: 'C3-Intermediate' },
        { value: 'C3-Advanced', label: 'C3-Advanced' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'C4' && skillsReq === 'Adaptation') {
      setExperienceOptions([
        { value: 'C4-Beginner', label: 'C4-Beginner' },
        { value: 'C4-Intermediate', label: 'C4-Intermediate' },
        { value: 'C4-Advanced', label: 'C4-Advanced' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'C5' && skillsReq === 'Adaptation') {
      setExperienceOptions([
        { value: 'C5-Beginner', label: 'C5-Beginner' },
        { value: 'C5-Intermediate', label: 'C5-Intermediate' },
        { value: 'C5-Advanced', label: 'C5-Advanced' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'GSNA- C2/C5' && skillsReq === 'Adaptation') {
      setExperienceOptions([
        { value: 'GSNA- C2/C5-Beginner', label: 'GSNA- C2/C5-Beginner' },
        { value: 'GSNA- C2/C5-Intermediate', label: 'GSNA- C2/C5-Intermediate' },
        { value: 'GSNA- C2/C5-Advanced', label: 'GSNA- C2/C5-Advanced' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'Numeron' && skillsReq === 'Adaptation') {
      setExperienceOptions([
        { value: 'Numeron-Beginner', label: 'Numeron-Beginner' },
        { value: 'Numeron-Intermediate', label: 'Numeron-Intermediate' },
        { value: 'Numeron-Advanced', label: 'Numeron-Advanced' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'M3' && skillsReq === 'BPS') {
      setExperienceOptions([
        { value: 'M3-Ins-Beginner', label: '    M3-Ins-Beginner' },
        { value: 'M3-Ins-Intermediate', label: 'M3-Ins-Intermediate' },
        { value: 'M3-Ins-Advanced', label: '    M3-Ins-Advanced' },
        { value: 'M3-PM-Beginner', label: '     M3-PM-Beginner' },
        { value: 'M3-PM-Intermediate', label: ' M3-PM-Intermediate' },
        { value: 'M3-PM-Advanced', label: '     M3-PM-Advanced' },
        { value: 'M3-CM-Beginner', label: '     M3-CM-Beginner' },
        { value: 'M3-CM-Intermediate', label: ' M3-CM-Intermediate' },
        { value: 'M3-CM-Advanced', label: '     M3-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'M3-Ins', label: 'M3-Ins' },
        { value: 'M3-PM', label: 'M3-PM' },
        { value: 'M3-CM', label: 'M3-CM' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'M5' && skillsReq === 'BPS') {
      setExperienceOptions([
        { value: 'M5-Ins-Beginner', label: 'M5-Ins-Beginner' },
        { value: 'M5-Ins-Intermediate', label: 'M5-Ins-Intermediate' },
        { value: 'M5-Ins-Advanced', label: 'M5-Ins-Advanced' },
        { value: 'M5-PM-Beginner', label: '    M5-PM-Beginner' },
        { value: 'M5-PM-Intermediate', label: 'M5-PM-Intermediate' },
        { value: 'M5-PM-Advanced', label: '    M5-PM-Advanced' },
        { value: 'M5-CM-Beginner', label: '    M5-CM-Beginner' },
        { value: 'M5-CM-Intermediate', label: 'M5-CM-Intermediate' },
        { value: 'M5-CM-Advanced', label: '    M5-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'M5-Ins', label: 'M5-Ins' },
        { value: 'M5-PM', label: 'M5-PM' },
        { value: 'M5-CM', label: 'M5-CM' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'M7' && skillsReq === 'BPS') {
      setExperienceOptions([
        { value: 'M7-Ins-Beginner', label: 'M7-Ins-Beginner' },
        { value: 'M7-Ins-Intermediate', label: 'M7-Ins-Intermediate' },
        { value: 'M7-Ins-Advanced', label: 'M7-Ins-Advanced' },
        { value: 'M7-Onsite-Support', label: 'M7-Onsite-Support' },
        { value: 'M7-PM-Beginner', label: '    M7-PM-Beginner' },
        { value: 'M7-PM-Intermediate', label: 'M7-PM-Intermediate' },
        { value: 'M7-PM-Advanced', label: '    M7-PM-Advanced' },
        { value: 'M7-CM-Beginner', label: '    M7-CM-Beginner' },
        { value: 'M7-CM-Intermediate', label: 'M7-CM-Intermediate' },
        { value: 'M7-CM-Advanced', label: '    M7-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'M7-Ins', label: 'M7-Ins' },
        { value: 'M7-PM', label: 'M7-PM' },
        { value: 'M7-CM', label: 'M7-CM' },
        { value: 'M7-Onsite-Support', label: 'M7-Onsite-Support' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'X9' && skillsReq === 'BPS') {
      setExperienceOptions([
        { value: 'X9-Ins-Beginner', label: 'X9-Ins-Beginner' },
        { value: 'X9-Ins-Intermediate', label: 'X9-Ins-Intermediate' },
        { value: 'X9-Ins-Advanced', label: 'X9-Ins-Advanced' },
        { value: 'X9-PM-Beginner', label: '    X9-PM-Beginner' },
        { value: 'X9-PM-Intermediate', label: 'X9-PM-Intermediate' },
        { value: 'X9-PM-Advanced', label: '    X9-PM-Advanced' },
        { value: 'X9-CM-Beginner', label: '    X9-CM-Beginner' },
        { value: 'X9-CM-Intermediate', label: 'X9-CM-Intermediate' },
        { value: 'X9-CM-Advanced', label: '    X9-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'X9-Ins', label: 'X9-Ins' },
        { value: 'X9-PM', label: 'X9-PM' },
        { value: 'X9-CM', label: 'X9-CM' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'BPS 2000' && skillsReq === 'BPS') {
      setExperienceOptions([
        { value: 'BPS 2000-Ins-Beginner', label: 'BPS 2000-Ins-Beginner' },
        { value: 'BPS 2000-Ins-Intermediate', label: 'BPS 2000-Ins-Intermediate' },
        { value: 'BPS 2000-Ins-Advanced', label: 'BPS 2000-Ins-Advanced' },
        { value: 'BPS 2000-PM-Beginner', label: 'BPS 2000-PM-Beginner' },
        { value: 'BPS 2000-PM-Intermediate', label: 'BPS 2000-PM-Intermediate' },
        { value: 'BPS 2000-PM-Advanced', label: 'BPS 2000-PM-Advanced' },
        { value: 'BPS 2000-CM-Beginner', label: '    BPS 2000-CM-Beginner' },
        { value: 'BPS 2000-CM-Intermediate', label: 'BPS 2000-CM-Intermediate' },
        { value: 'BPS 2000-CM-Advanced', label: '    BPS 2000-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'BPS 2000-Ins', label: 'BPS 2000-Ins' },
        { value: 'BPS 2000-PM', label: 'BPS 2000-PM' },
        { value: 'BPS 2000-CM', label: 'BPS 2000-CM' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'NP10' && skillsReq === 'BPS') {
      setExperienceOptions([
        { value: 'NP10-Ins-Beginner', label: '    NP10-Ins-Beginner' },
        { value: 'NP10-Ins-Intermediate', label: 'NP10-Ins-Intermediate' },
        { value: 'NP10-Ins-Advanced', label: '    NP10-Ins-Advanced' },
        { value: 'NP10-PM-Beginner', label: '    NP10-PM-Beginner' },
        { value: 'NP10-PM-Intermediate', label: 'NP10-PM-Intermediate' },
        { value: 'NP10-PM-Advanced', label: '    NP10-PM-Advanced' },
        { value: 'NP10-CM-Beginner', label: '    NP10-CM-Beginner' },
        { value: 'NP10-CM-Intermediate', label: 'NP10-CM-Intermediate' },
        { value: 'NP10-CM-Advanced', label: '    NP10-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'NP10-Ins', label: 'NP10-Ins' },
        { value: 'NP10-PM', label: 'NP10-PM' },
        { value: 'NP10-CM', label: 'NP10-CM' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'NP20' && skillsReq === 'BPS') {
      setExperienceOptions([
        { value: 'NP20-Ins-Beginner', label: '    NP20-Ins-Beginner' },
        { value: 'NP20-Ins-Intermediate', label: 'NP20-Ins-Intermediate' },
        { value: 'NP20-Ins-Advanced', label: '    NP20-Ins-Advanced' },
        { value: 'NP20-PM-Beginner', label: '     NP20-PM-Beginner' },
        { value: 'NP20-PM-Intermediate', label: ' NP20-PM-Intermediate' },
        { value: 'NP20-PM-Advanced', label: '     NP20-PM-Advanced' },
        { value: 'NP20-CM-Beginner', label: '     NP20-CM-Beginner' },
        { value: 'NP20-CM-Intermediate', label: ' NP20-CM-Intermediate' },
        { value: 'NP20-CM-Advanced', label: '     NP20-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'NP20-Ins', label: 'NP20-Ins' },
        { value: 'NP20-PM', label: 'NP20-PM' },
        { value: 'NP20-CM', label: 'NP20-CM' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'NTL' && skillsReq === 'BPS') {
      setExperienceOptions([
        { value: 'NTL-Ins-Beginner', label: '     NTL-Ins-Beginner' },
        { value: 'NTL-Ins-Intermediate', label: ' NTL-Ins-Intermediate' },
        { value: 'NTL-Ins-Advanced', label: '     NTL-Ins-Advanced' },
        { value: 'NTL-PM-Beginner', label: '     NTL-PM-Beginner' },
        { value: 'NTL-PM-Intermediate', label: ' NTL-PM-Intermediate' },
        { value: 'NTL-PM-Advanced', label: '     NTL-PM-Advanced' },
        { value: 'NTL-CM-Beginner', label: '    NTL-CM-Beginner' },
        { value: 'NTL-CM-Intermediate', label: 'NTL-CM-Intermediate' },
        { value: 'NTL-CM-Advanced', label: '    NTL-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'NTL-Ins', label: 'NTL-Ins' },
        { value: 'NTL-PM', label: 'NTL-PM' },
        { value: 'NTL-CM', label: 'NTL-CM' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'Numeron' && skillsReq === 'BPS') {
      setExperienceOptions([
        { value: 'Numeron-Ins-Beginner', label: 'Numeron-Ins-Beginner' },
        { value: 'Numeron-Ins-Intermediate', label: 'Numeron-Ins-Intermediate' },
        { value: 'Numeron-Ins-Advanced', label: 'Numeron-Ins-Advanced' },
        { value: 'Numeron-PM-Beginner', label: 'Numeron-PM-Beginner' },
        { value: 'Numeron-PM-Intermediate', label: 'Numeron-PM-Intermediate' },
        { value: 'Numeron-PM-Advanced', label: 'Numeron-PM-Advanced' },
        { value: 'Numeron-CM-Beginner', label: 'Numeron-CM-Beginner' },
        { value: 'Numeron-CM-Intermediate', label: 'Numeron-CM-Intermediate' },
        { value: 'Numeron-CM-Advanced', label: 'Numeron-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'Numeron-Ins', label: 'Numeron-Ins' },
        { value: 'Numeron-PM', label: 'Numeron-PM' },
        { value: 'Numeron-CM', label: 'Numeron-CM' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'Pronote' && skillsReq === 'BPS') {
      setExperienceOptions([
        { value: 'Pronote-Ins-Beginner', label: '    Pronote-Ins-Beginner' },
        { value: 'Pronote-Ins-Intermediate', label: 'Pronote-Ins-Intermediate' },
        { value: 'Pronote-Ins-Advanced', label: '    Pronote-Ins-Advanced' },
        { value: 'Pronote-PM-Beginner', label: '     Pronote-PM-Beginner' },
        { value: 'Pronote-PM-Intermediate', label: ' Pronote-PM-Intermediate' },
        { value: 'Pronote-PM-Advanced', label: '     Pronote-PM-Advanced' },
        { value: 'Pronote-CM-Beginner', label: '     Pronote-CM-Beginner' },
        { value: 'Pronote-CM-Intermediate', label: ' Pronote-CM-Intermediate' },
        { value: 'Pronote-CM-Advanced', label: '     Pronote-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'Pronote-Ins', label: 'Pronote-Ins' },
        { value: 'Pronote-PM', label: 'Pronote-PM' },
        { value: 'Pronote-CM', label: 'Pronote-CM' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'Procoin' && skillsReq === 'BPS') {
      setExperienceOptions([
        { value: 'Procoin-Ins-Beginner', label: '    Procoin-Ins-Beginner' },
        { value: 'Procoin-Ins-Intermediate', label: 'Procoin-Ins-Intermediate' },
        { value: 'Procoin-Ins-Advanced', label: '    Procoin-Ins-Advanced' },
        { value: 'Procoin-PM-Beginner', label: '     Procoin-PM-Beginner' },
        { value: 'Procoin-PM-Intermediate', label: ' Procoin-PM-Intermediate' },
        { value: 'Procoin-PM-Advanced', label: '     Procoin-PM-Advanced' },
        { value: 'Procoin-CM-Beginner', label: '     Procoin-CM-Beginner' },
        { value: 'Procoin-CM-Intermediate', label: ' Procoin-CM-Intermediate' },
        { value: 'Procoin-CM-Advanced', label: '     Procoin-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'Procoin-Ins', label: 'Procoin-Ins' },
        { value: 'Procoin-PM', label: 'Procoin-PM' },
        { value: 'Procoin-CM', label: 'Procoin-CM' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'C1' && skillsReq === 'BPS') {
      setExperienceOptions([
        { value: 'C1-Ins-Beginner', label: '    C1-Ins-Beginner' },
        { value: 'C1-Ins-Intermediate', label: 'C1-Ins-Intermediate' },
        { value: 'C1-Ins-Advanced', label: '    C1-Ins-Advanced' },
        { value: 'C1-PM-Beginner', label: '     C1-PM-Beginner' },
        { value: 'C1-PM-Intermediate', label: ' C1-PM-Intermediate' },
        { value: 'C1-PM-Advanced', label: '     C1-PM-Advanced' },
        { value: 'C1-CM-Beginner', label: '     C1-CM-Beginner' },
        { value: 'C1-CM-Intermediate', label: ' C1-CM-Intermediate' },
        { value: 'C1-CM-Advanced', label: '     C1-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'C1-Ins', label: 'C1-Ins' },
        { value: 'C1-PM', label: 'C1-PM' },
        { value: 'C1-CM', label: 'C1-CM' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'C2' && skillsReq === 'BPS') {
      setExperienceOptions([
        { value: 'C2-Ins-Beginner', label: '    C2-Ins-Beginner' },
        { value: 'C2-Ins-Intermediate', label: 'C2-Ins-Intermediate' },
        { value: 'C2-Ins-Advanced', label: '    C2-Ins-Advanced' },
        { value: 'C2-PM-Beginner', label: '     C2-PM-Beginner' },
        { value: 'C2-PM-Intermediate', label: ' C2-PM-Intermediate' },
        { value: 'C2-PM-Advanced', label: '     C2-PM-Advanced' },
        { value: 'C2-CM-Beginner', label: '     C2-CM-Beginner' },
        { value: 'C2-CM-Intermediate', label: ' C2-CM-Intermediate' },
        { value: 'C2-CM-Advanced', label: '     C2-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'C2-Ins', label: 'C2-Ins' },
        { value: 'C2-PM', label: 'C2-PM' },
        { value: 'C2-CM', label: 'C2-CM' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'C3' && skillsReq === 'BPS') {
      setExperienceOptions([
        { value: 'C3-Ins-Beginner', label: '    C3-Ins-Beginner' },
        { value: 'C3-Ins-Intermediate', label: 'C3-Ins-Intermediate' },
        { value: 'C3-Ins-Advanced', label: '    C3-Ins-Advanced' },
        { value: 'C3-PM-Beginner', label: '     C3-PM-Beginner' },
        { value: 'C3-PM-Intermediate', label: ' C3-PM-Intermediate' },
        { value: 'C3-PM-Advanced', label: '     C3-PM-Advanced' },
        { value: 'C3-CM-Beginner', label: '     C3-CM-Beginner' },
        { value: 'C3-CM-Intermediate', label: ' C3-CM-Intermediate' },
        { value: 'C3-CM-Advanced', label: '     C3-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'C3-Ins', label: 'C3-Ins' },
        { value: 'C3-PM', label: 'C3-PM' },
        { value: 'C3-CM', label: 'C3-CM' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'C4' && skillsReq === 'BPS') {
      setExperienceOptions([
        { value: 'C4-Ins-Beginner', label: '    C4-Ins-Beginner' },
        { value: 'C4-Ins-Intermediate', label: 'C4-Ins-Intermediate' },
        { value: 'C4-Ins-Advanced', label: '    C4-Ins-Advanced' },
        { value: 'C4-PM-Beginner', label: '     C4-PM-Beginner' },
        { value: 'C4-PM-Intermediate', label: ' C4-PM-Intermediate' },
        { value: 'C4-PM-Advanced', label: '     C4-PM-Advanced' },
        { value: 'C4-CM-Beginner', label: '     C4-CM-Beginner' },
        { value: 'C4-CM-Intermediate', label: ' C4-CM-Intermediate' },
        { value: 'C4-CM-Advanced', label: '     C4-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'C4-Ins', label: 'C4-Ins' },
        { value: 'C4-PM', label: 'C4-PM' },
        { value: 'C4-CM', label: 'C4-CM' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'C5' && skillsReq === 'BPS') {
      setExperienceOptions([
        { value: 'C5-Ins-Beginner', label: '    C5-Ins-Beginner' },
        { value: 'C5-Ins-Intermediate', label: 'C5-Ins-Intermediate' },
        { value: 'C5-Ins-Advanced', label: '    C5-Ins-Advanced' },
        { value: 'C5-PM-Beginner', label: '     C5-PM-Beginner' },
        { value: 'C5-PM-Intermediate', label: ' C5-PM-Intermediate' },
        { value: 'C5-PM-Advanced', label: '     C5-PM-Advanced' },
        { value: 'C5-CM-Beginner', label: '     C5-CM-Beginner' },
        { value: 'C5-CM-Intermediate', label: ' C5-CM-Intermediate' },
        { value: 'C5-CM-Advanced', label: '     C5-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'C5-Ins', label: 'C5-Ins' },
        { value: 'C5-PM', label: 'C5-PM' },
        { value: 'C5-CM', label: 'C5-CM' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'C6' && skillsReq === 'BPS') {
      setExperienceOptions([
        { value: 'C6-Ins-Beginner', label: '    C6-Ins-Beginner' },
        { value: 'C6-Ins-Intermediate', label: 'C6-Ins-Intermediate' },
        { value: 'C6-Ins-Advanced', label: '    C6-Ins-Advanced' },
        { value: 'C6-PM-Beginner', label: '     C6-PM-Beginner' },
        { value: 'C6-PM-Intermediate', label: ' C6-PM-Intermediate' },
        { value: 'C6-PM-Advanced', label: '     C6-PM-Advanced' },
        { value: 'C6-CM-Beginner', label: '     C6-CM-Beginner' },
        { value: 'C6-CM-Intermediate', label: ' C6-CM-Intermediate' },
        { value: 'C6-CM-Advanced', label: '     C6-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'C6-Ins', label: 'C6-Ins' },
        { value: 'C6-PM', label: 'C6-PM' },
        { value: 'C6-CM', label: 'C6-CM' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'SBM-95' && skillsReq === 'BPS') {
      setExperienceOptions([
        { value: 'SBM-95-Ins-Beginner', label: '    SBM-95-Ins-Beginner' },
        { value: 'SBM-95-Ins-Intermediate', label: 'SBM-95-Ins-Intermediate' },
        { value: 'SBM-95-Ins-Advanced', label: '    SBM-95-Ins-Advanced' },
        { value: 'SBM-95-PM-Beginner', label: '     SBM-95-PM-Beginner' },
        { value: 'SBM-95-PM-Intermediate', label: ' SBM-95-PM-Intermediate' },
        { value: 'SBM-95-PM-Advanced', label: '     SBM-95-PM-Advanced' },
        { value: 'SBM-95-CM-Beginner', label: '     SBM-95-CM-Beginner' },
        { value: 'SBM-95-CM-Intermediate', label: ' SBM-95-CM-Intermediate' },
        { value: 'SBM-95-CM-Advanced', label: '     SBM-95-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'SBM-95-Ins', label: 'SBM-95-Ins' },
        { value: 'SBM-95-PM', label: 'SBM-95-PM' },
        { value: 'SBM-95-CM', label: 'SBM-95-CM' },
        { value: '', label: 'None' }
      ]);
    } else if (item.value === 'Ecoremote/Protect' && skillsReq === 'BPS') {
      setExperienceOptions([
        { value: 'Ecoremote/Protect-Ins-Beginner', label: '    Ecoremote/Protect-Ins-Beginner' },
        { value: 'Ecoremote/Protect-Ins-Intermediate', label: 'Ecoremote/Protect-Ins-Intermediate' },
        { value: 'Ecoremote/Protect-Ins-Advanced', label: '    Ecoremote/Protect-Ins-Advanced' },
        { value: 'Ecoremote/Protect-PM-Beginner', label: '     Ecoremote/Protect-PM-Beginner' },
        { value: 'Ecoremote/Protect-PM-Intermediate', label: ' Ecoremote/Protect-PM-Intermediate' },
        { value: 'Ecoremote/Protect-PM-Advanced', label: '     Ecoremote/Protect-PM-Advanced' },
        { value: 'Ecoremote/Protect-CM-Beginner', label: '     Ecoremote/Protect-CM-Beginner' },
        { value: 'Ecoremote/Protect-CM-Intermediate', label: ' Ecoremote/Protect-CM-Intermediate' },
        { value: 'Ecoremote/Protect-CM-Advanced', label: '     Ecoremote/Protect-CM-Advanced' },
        { value: '', label: 'None' }
      ]);
      setLeadOptions([
        { value: 'Ecoremote/Protect-Ins', label: 'Ecoremote/Protect-Ins' },
        { value: 'Ecoremote/Protect-PM', label: 'Ecoremote/Protect-PM' },
        { value: 'Ecoremote/Protect-CM', label: 'Ecoremote/Protect-CM' },
        { value: '', label: 'None' }
      ]);
    }
  };

  const notyf = useContext(NotyfContext);

  const data = {
    projectName,
    taskId,
    // projectStartDate, FETCHED FROM GANTT PRO
    // projectEndDate,
    name,
    startDate,
    endDate,
    skillsReq,
    category,
    country: customerValue.value,
    machines: productValue.value,
    lead,
    feLevel,
    exp,
    feCount
    // startTimeStart,
    // startTimeEnd,
    // endTimeEnd,
    // endTimeStart
    // startDateHours: reqDurationStart,
    // endDateHours: reqDurationEnd
    // insExpBds,
    // pmExpBds,
    // cmExpBds,
    // insExpBps,
    // pmExpBps,
    // cmExpBps,
    // upsExpBds,
  };

  const handleChangeGp = t => {
    setProjectName(t.value);
    // setProjectId()
    let a = projects.filter(item => item.name === t.value);
    // console.log(a);
    setProjectId(a[0].projectId);
    // console.log(a[0].projectId); PROJECT ID
  };

  const handleChangeTask = t => {
    console.log(t.value);
    // console.log(t.label);
    setName(t.label);
    setTaskId(t.value);
  };

  async function getTasks(id) {
    const options = {
      projectId: id
    };
    const res = await axios.post('/api/get_project', options);
    let array = [];
    res.data.forEach(item => {
      let a = { value: '', label: '' };
      a.value = item.id;
      a.label = item.name;
      array.push(a);
    });
    setTaskGpOptions(array);
    console.log(res.data);
  }
  // Use switch here to prevent multiple requests
  async function updateHandler(e) {
    // console.log(data);
    e.preventDefault();
    let deny = false;
    try {
      // console.log(data);
      // console.log(editedData);
      for (const [key, value] of Object.entries(data)) {
        if (!value && key !== 'projectName' && key !== 'taskId' && key !== 'lead' && key !== 'country' && key !== 'exp') {
          console.log('Missing value for ' + key);
          deny = true;
          return notyf.error('Missing update details');
        }
        // else {
        //   const updatedData = {
        //     data: data,
        //     id: sendData._id
        //   };
        //   const { res } = await axios.put('/edit_job', updatedData);
        //   emptyForm();
        //   window.location.reload();
        // }
      }
      if (!deny) {
        const updatedData = {
          data: data,
          id: sendData._id
        };
        const { res } = await axios.put('/api/edit_job', updatedData);
        emptyForm();
        // window.location.reload();
      }
    } catch (error) {
      console.log('Errors');
    }
  }

  async function submitHandler(e) {
    // console.log(productValue.value);
    // setMachines(productValue.value);
    // setCountry(customerValue.value);
    // console.log(productValue.value);
    // console.log(customerValue.value);
    // console.log(startTimeStart);
    // console.log(startTimeEnd);
    // console.log(endTimeStart);
    // console.log(endTimeEnd);

    e.preventDefault();
    try {
      console.log(data);
      const { res } = await axios.post('/api/add_job', data);
      emptyForm();
      notyf.success('New Job added');
      // window.location.reload();
    } catch (error) {
      notyf.error('Invalid Details');
      console.log(error);
    }
  }

  const emptyForm = () => {
    setName('');
    setSkillsReq('');
    setType('');
    // setCountry('');
    setLead('');
    setStartDate('');
    setEndDate('');
  };

  let rep = [];
  const getCount = () => {
    if (projectName) {
      for (let i = 0; i < Number(count); i++) {
        rep.push(i);
      }
      setReps(rep);
    }
  };

  return (
    <>
      <Form>
        <Form.Group className='mb-3 text-dark' controlId='formBasicGanttProProjects'>
          <Form.Label className='text-light'>Choose Project</Form.Label>
          <Select options={projectGpOptions} onChange={handleChangeGp} />
        </Form.Group>
        <Form.Group className='mb-3 text-dark' controlId='formBasicGanttProProjectTasks'>
          <Form.Label className='text-light'>Choose Task</Form.Label>
          <Select options={taskGpOptions} onChange={handleChangeTask} />
        </Form.Group>
        {/* <Form.Group className='mb-3 mt-5' controlId='formBasicName'>
          <Form.Label>Project Name</Form.Label>
          <Form.Control type='string' placeholder='Enter name' onChange={e => setProjectName(e.target.value)} value={projectName} />
        </Form.Group> */}
        {/* <Form.Group className='mb-3' controlId='formBasicStartDatePro'>
          <Form.Label>Start Date </Form.Label>
          <Form.Control type='date' placeholder='Enter Start Date' onChange={e => setProjectStartDate(e.target.value)} value={projectStartDate} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicEndDatePro'>
          <Form.Label>End Date </Form.Label>
          <Form.Control type='date' placeholder='Enter End Date' onChange={e => setProjectEndDate(e.target.value)} value={projectEndDate} />
        </Form.Group> */}
        <Form.Group className='mb-3' controlId='formBasicPeople'>
          <Form.Label>Number of Stages </Form.Label>
          <Form.Control type='string' placeholder='Enter number' onChange={e => setCount(e.target.value)} value={count} />
        </Form.Group>

        <Row className='my-4'>
          <Col>
            <Button onClick={getCount}>Submit </Button>
          </Col>
        </Row>
        {/*Choose second one as it is subtitle*/}

        {count > 0 &&
          reps.map((item, index) => (
            <>
              {reps.length > 1 ? <h4 className='mt-5'>Stage {index + 1} </h4> : <h4 className='mt-5'>Requirements </h4>}

              <Form.Group className='my-3   text-dark' controlId='formBasicTeam'>
                <Form.Label className='text-light'>Team</Form.Label>
                <Select options={teamOptions} onChange={handleChange} />
              </Form.Group>

              {/* <Form.Group className='mb-3' controlId='formBasicName'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='string' placeholder='Enter name' onChange={e => setName(e.target.value)} value={name} />
              </Form.Group> */}

              <Form.Group className='mb-3' controlId='formBasicStartDate'>
                <Form.Label>Start Date </Form.Label>
                <Form.Control type='date' placeholder='Enter Start Date' onChange={e => setStartDate(e.target.value)} value={startDate} />
              </Form.Group>

              {/* <Row>
                <Col>
                  <Form.Group className='mb-3' controlId='formBasicStartTime'>
                    <Form.Label>Start Time </Form.Label>
                    <Form.Control type='time' placeholder='Enter Start Time' onChange={e => setStartTimeStart(e.target.value)} value={startTimeStart} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className='mb-3' controlId='formBasicEndTime'>
                    <Form.Label>End Time </Form.Label>
                    <Form.Control type='time' placeholder='Enter End Time' onChange={e => setEndTimeStart(e.target.value)} value={endTimeStart} />
                  </Form.Group>
                </Col>
              </Row> */}

              {/* <Form.Group className='mb-3' controlId='formBasicStartTime'>
          <Form.Label>Start Time </Form.Label>
          <Form.Control type='time' placeholder='Enter Start Time' onChange={e => setStartTime(e.target.value)} value={startTime} />
        </Form.Group> */}

              {/* <Form.Group>
          <Form.Label>Required Hours (Start Date)</Form.Label>
          <RangeSlider value={reqDurationStart} onChange={changeEvent => setReqDurationStart(changeEvent.target.value)} max={9} />
        </Form.Group> */}

              {/* <Form.Group className='mb-3' controlId='formBasicStartDate'>
          <Form.Label>Start Time </Form.Label>
          <Form.Control type='time' placeholder='Enter Start Date' onChange={e => setStartDate(e.target.value)} value={startDate} />
        </Form.Group> */}

              <Form.Group className='mb-3' controlId='formBasicEndDate'>
                <Form.Label>End Date </Form.Label>
                <Form.Control type='date' placeholder='Enter End Date' onChange={e => setEndDate(e.target.value)} value={endDate} />
              </Form.Group>

              {/* <Row>
          <Col>
            <Form.Group className='mb-3' controlId='formBasicStartTime'>
              <Form.Label>Start Time </Form.Label>
              <Form.Control type='time' placeholder='Enter Start Time' onChange={e => setstartTimeEnd(e.target.value)} value={startTimeEnd} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='formBasicEndTime'>
              <Form.Label>End Time </Form.Label>
              <Form.Control type='time' placeholder='Enter End Time' onChange={e => setEndTimeEnd(e.target.value)} value={endTimeEnd} />
            </Form.Group>
          </Col>
        </Row> */}

              {/* <Form.Group>
          <Form.Label>Required Hours (End Date)</Form.Label>
          <RangeSlider value={reqDurationEnd} onChange={changeEvent => setReqDurationEnd(changeEvent.target.value)} max={9} />
        </Form.Group> */}

              {/* <Form.Group className='mb-3' controlId='formBasicEndDate'>
          <Form.Label>End Time </Form.Label>
          <Form.Control type='time' placeholder='Enter End Date' onChange={e => setEndDate(e.target.value)} value={endDate} />
        </Form.Group> */}

              <Form.Group className='mb-3 text-dark' controlId='formBasicSegment'>
                <Form.Label className='text-light'>Required Segment</Form.Label>
                <Select options={segmentOptions} onChange={handleChangeSegment} />
              </Form.Group>

              {/* <Form.Group className='mb-3 text-dark' controlId='formBasicProduct'>
          <Form.Label className='text-light'>Required Product Experience</Form.Label>
          <Select options={machineOptions} onChange={handleChangeMachines} />
        </Form.Group> */}

              <Form.Group className='mb-3 text-dark' controlId='formBasicProducts'>
                <Form.Label className='text-light'>Required Product Experience</Form.Label>
                <Creatable onChange={value => handleCreateProduct('productOptions', value)} options={machineOptions} value={productValue} styles={customStyles} />
              </Form.Group>

              <Form.Group className='mb-3 text-dark' controlId='formBasicExperience'>
                <Form.Label className='text-light'>Required Minimum Job Experience</Form.Label>
                <Select options={experienceOptions} onChange={handleChangeExp} />
              </Form.Group>

              {/* <Form.Group className='mb-3 text-dark' controlId='formBasicCustomer'>
          <Form.Label className='text-light'> Required Customer Experience </Form.Label>
          <Select options={customerOptions} onChange={handleChangeCountry} />
        </Form.Group> */}
              <Form.Group className='mb-3 text-dark' controlId='formBasicCustomer'>
                <Form.Label className='text-light'> Customer </Form.Label>
                <Creatable onChange={value => handleCreateCustomer('customerOptions', value)} options={customerOptions} value={customerValue} styles={customStyles} />
                {/* <Form.Text className='text-muted'>Only Engineers with above experience will be considered</Form.Text> */}
              </Form.Group>

              <Form.Group className='mb-3 text-dark' controlId='formBasicSegment'>
                <Form.Label className='text-light'> Required Minimum FE-Level </Form.Label>
                <Select options={feLevelOptions} onChange={handleChangeFeLevel} />
              </Form.Group>

              <Form.Group className='mb-3 text-dark' controlId='formBasicSegment'>
                <Form.Label className='text-light'> Required Team Lead For </Form.Label>
                <Select options={leadOptions} onChange={handleChangeLead} />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicFieldEngineersRequired'>
                <Form.Label>Number of Field Engineers Required</Form.Label>
                <Form.Control type='string' placeholder='Number of Field Engineers' onChange={e => setFeCount(e.target.value)} value={feCount} />
              </Form.Group>

              {/* {skillsReq === 'BPS' && (
          <>
            <Form.Group className='mb-3 text-dark'>
              <Form.Label className='text-light'>Required Installation Experience</Form.Label>
              <Select options={expOptionsBps} onChange={handleChangeInstallationBps} />
            </Form.Group>

            <Form.Group className='mb-3 text-dark'>
              <Form.Label className='text-light'>Required Preventive Maintenance Experience</Form.Label>
              <Select options={expOptionsBps} onChange={handleChangePmBps} />
            </Form.Group>

            <Form.Group className='mb-3 text-dark'>
              <Form.Label className='text-light'>Required Corrective Maintenance Experience</Form.Label>
              <Select options={expOptionsBps} onChange={handleChangeCmBps} />
            </Form.Group>
          </>
        )} */}

              {/* {skillsReq === 'BDS' && (
          <>
            <Form.Group className='mb-3 text-dark'>
              <Form.Label className='text-light'>Required Installation Experience</Form.Label>
              <Select options={expOptionsBds} onChange={handleChangeInstallationBds} />
            </Form.Group>

            <Form.Group className='mb-3 text-dark'>
              <Form.Label className='text-light'>Required Preventive Maintenance Experience</Form.Label>
              <Select options={expOptionsBds} onChange={handleChangePmBds} />
            </Form.Group>

            <Form.Group className='mb-3 text-dark'>
              <Form.Label className='text-light'>Required Corrective Maintenance Experience</Form.Label>
              <Select options={expOptionsBds} onChange={handleChangeCmBds} />
            </Form.Group>

            <Form.Group className='mb-3 text-dark'>
              <Form.Label className='text-light'>Required UPS Experience</Form.Label>
              <Select options={expOptionsBds} onChange={handleChangeUpsBds} />
            </Form.Group>
          </>
        )} */}

              <Row className='my-3'>
                <Col>
                  <Button variant='primary' type='submit' onClick={submitHandler} className='my-2'>
                    Submit
                  </Button>
                </Col>
                {/* <Col>
                  <Button variant='primary' type='submit' onClick={updateHandler} className='my-2'>
                    Update
                  </Button>
                </Col> */}
              </Row>

              {/* {index === reps.length - 1 && (
                <>
                  <Form>
                    <Form.Group className='mb-3 mt-5' controlId='formStages'>
                      <Form.Label>Add Requirement</Form.Label>
                      <Form.Control type='string' placeholder='Number of requirements' onChange={e => setS(e.target.value)} value={s} />
                    </Form.Group>
                  </Form>
                  <Button onClick={addStage}>Add</Button>
                </>
              )} */}
            </>
          ))}
      </Form>
      {showEditForm === 'true' && (
        <Form className='mt-5'>
          <h4 className='my-3'>Edit Form </h4>
          <Form.Group className='mb-3   text-dark' controlId='formBasicTeam'>
            <Form.Label className='text-light'>Team</Form.Label>
            <Select options={teamOptions} onChange={handleChange} />
          </Form.Group>

          {/* <Form.Group className='mb-3' controlId='formBasicName'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='string' placeholder='Enter name' onChange={e => setName(e.target.value)} value={name} />
          </Form.Group> */}

          <Form.Group className='mb-3' controlId='formBasicStartDate'>
            <Form.Label>Start Date </Form.Label>
            <Form.Control type='date' placeholder='Enter Start Date' onChange={e => setStartDate(e.target.value)} value={startDate} />
          </Form.Group>

          {/* <Row>
            <Col>
              <Form.Group className='mb-3' controlId='formBasicStartTime'>
                <Form.Label>Start Time </Form.Label>
                <Form.Control type='time' placeholder='Enter Start Time' onChange={e => setStartTimeStart(e.target.value)} value={startTimeStart} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='formBasicEndTime'>
                <Form.Label>End Time </Form.Label>
                <Form.Control type='time' placeholder='Enter End Time' onChange={e => setEndTimeStart(e.target.value)} value={endTimeStart} />
              </Form.Group>
            </Col>
          </Row> */}

          <Form.Group className='mb-3' controlId='formBasicEndDate'>
            <Form.Label>End Date </Form.Label>
            <Form.Control type='date' placeholder='Enter End Date' onChange={e => setEndDate(e.target.value)} value={endDate} />
          </Form.Group>

          <Form.Group className='mb-3 text-dark' controlId='formBasicSegment'>
            <Form.Label className='text-light'>Required Segment</Form.Label>
            <Select options={segmentOptions} onChange={handleChangeSegment} />
          </Form.Group>

          <Form.Group className='mb-3 text-dark' controlId='formBasicProducts'>
            <Form.Label className='text-light'>Required Product Experience</Form.Label>
            <Creatable onChange={value => handleCreateProduct('productOptions', value)} options={machineOptions} value={productValue} styles={customStyles} />
          </Form.Group>

          {
            // Removed isClearable to prevent bug
          }

          <Form.Group className='mb-3 text-dark' controlId='formBasicExperience'>
            <Form.Label className='text-light'>Required Minimum Job Experience</Form.Label>
            <Select options={experienceOptions} onChange={handleChangeExp} />
          </Form.Group>

          <Form.Group className='mb-3 text-dark' controlId='formBasicCustomer'>
            <Form.Label className='text-light'>Customer </Form.Label>
            <Creatable onChange={value => handleCreateCustomer('customerOptions', value)} options={customerOptions} value={customerValue} styles={customStyles} />
          </Form.Group>

          <Form.Group className='mb-3 text-dark' controlId='formBasicSegment'>
            <Form.Label className='text-light'> Required Minimum FE-Level </Form.Label>
            <Select options={feLevelOptions} onChange={handleChangeFeLevel} />
          </Form.Group>

          <Form.Group className='mb-3 text-dark' controlId='formBasicSegment'>
            <Form.Label className='text-light'> Required Team Lead For </Form.Label>
            <Select options={leadOptions} onChange={handleChangeLead} />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicFieldEngineersRequired'>
            <Form.Label>Number of Field Engineers Required</Form.Label>
            <Form.Control type='string' placeholder='Number of Field Engineers' onChange={e => setFeCount(e.target.value)} value={feCount} />
          </Form.Group>
          <Button variant='primary' type='submit' onClick={updateHandler} className='my-2'>
            Update
          </Button>
        </Form>
      )}
    </>
  );
};

export default JobInfo;
