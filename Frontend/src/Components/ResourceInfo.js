import React from 'react';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';

import { Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import Creatable from 'react-select/creatable';
// import RangeSlider from 'react-bootstrap-range-slider';
import NotyfContext from './NotyfContext';
import 'react-step-progress/dist/index.css';
import experienceOptionsBps from '../data/Exp';
import nationalityOptions from '../data/Countries';

const ResourceInfo = ({ sendData }) => {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState(''); //Team
  const [machines, setMachines] = useState([]); //segment
  const [products, setProducts] = useState([]); //Product Experience, Not being saved right now
  // const [productExp, setProductExp] = useState([]);
  const [countries, setCountries] = useState([]);
  const [experience, setExperience] = useState('');
  const [nationality, setNationality] = useState('');
  // const [insExpBds, setInsExpBds] = useState('');
  // const [insExpBps, setInsExpBps] = useState([]);
  // const [PMExpBds, setPMExpBds] = useState('');
  // const [PMExpBps, setPMExpBps] = useState([]);
  // const [CMExpBds, setCMExpBds] = useState('');
  // const [CMExpBps, setCMExpBps] = useState([]);
  // const [upsExpBds, setUpsExpBds] = useState('');
  // const [expBds, setExpBds] = useState([]);
  const [exp, setExp] = useState([]);
  const [editing, setEditing] = useState(false);
  // const [btnStatus, setBtnStatus] = useState('Submit');
  // const [m3Value, setM3Value] = useState(0);
  // const [m5Value, setM5Value] = useState(0);
  // const [m7Value, setM7Value] = useState(0);
  // const [x9Value, setX9Value] = useState(0);
  const [isLeader, setIsLeader] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [type, setType] = useState('');
  const [feLevel, setFeLevel] = useState('');
  const [religion, setReligion] = useState('');
  const [productValue, setProductValue] = useState(''); //Creatable Product
  const [customerValue, setCustomerValue] = useState(''); //Creatable Product
  const [editedTeam, setEditedTeam] = useState('');
  const [editedFeLevel, setEditedFeLevel] = useState('');
  const [editedproductExp, setEditedProductExp] = useState([]);
  const [editedCountries, setEditedCountries] = useState([]);
  const [editedLead, setEditedLead] = useState([]);
  const [editedNationality, setEditedNationality] = useState('');
  const [editedMachines, setEditedMachines] = useState([]);
  const [editedExp, setEditedExp] = useState([]);
  // const [availability, setAvailability] = useState('');

  // const [pronoteValue, setPronoteValue] = useState(0);
  // const [cSegmentValue, setCValue] = useState(0);

  // const [valueUpdated, setValueUpdated] = useState(false);

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

  const [experienceOptions, setExperienceOptions] = useState([
    { value: '', label: 'None' },
    { value: 'M3-Ins-Beginner', label: 'M3-Ins-Beginner' },
    { value: 'M3-Ins-Intermediate', label: 'M3-Ins-Intermediate' },
    { value: 'M3-Ins-Advanced', label: 'M3-Ins-Advanced' },
    { value: 'M5-Ins-Beginner', label: 'M5-Ins-Beginner' },
    { value: 'M5-Ins-Intermediate', label: 'M5-Ins-Intermediate' },
    { value: 'M5-Ins-Advanced', label: 'M5-Ins-Advanced' },
    { value: 'M7-Ins-Beginner', label: 'M7-Ins-Beginner' },
    { value: 'M7-Ins-Intermediate', label: 'M7-Ins-Intermediate' },
    { value: 'M7-Ins-Advanced', label: 'M7-Ins-Advanced' },
    { value: 'X9-Ins-Beginner', label: 'X9-Ins-Beginner' },
    { value: 'X9-Ins-Intermediate', label: 'X9-Ins-Intermediate' },
    { value: 'X9-Ins-Advanced', label: 'X9-Ins-Advanced' },
    { value: 'BPS 2000-Ins-Beginner', label: 'BPS 2000-Ins-Beginner' },
    { value: 'BPS 2000-Ins-Intermediate', label: 'BPS 2000-Ins-Intermediate' },
    { value: 'BPS 2000-Ins-Advanced', label: 'BPS 2000-Ins-Advanced' },
    { value: 'C1-Ins-Beginner', label: '    C1-Ins-Beginner' },
    { value: 'C1-Ins-Intermediate', label: 'C1-Ins-Intermediate' },
    { value: 'C1-Ins-Advanced', label: '    C1-Ins-Advanced' },
    { value: 'C2-Ins-Beginner', label: '    C2-Ins-Beginner' },
    { value: 'C2-Ins-Intermediate', label: 'C2-Ins-Intermediate' },
    { value: 'C2-Ins-Advanced', label: '    C2-Ins-Advanced' },
    { value: 'C3-Ins-Beginner', label: '    C3-Ins-Beginner' },
    { value: 'C3-Ins-Intermediate', label: 'C3-Ins-Intermediate' },
    { value: 'C3-Ins-Advanced', label: '    C3-Ins-Advanced' },
    { value: 'C4-Ins-Beginner', label: '    C4-Ins-Beginner' },
    { value: 'C4-Ins-Intermediate', label: 'C4-Ins-Intermediate' },
    { value: 'C4-Ins-Advanced', label: '    C4-Ins-Advanced' },
    { value: 'C5-Ins-Beginner', label: '    C5-Ins-Beginner' },
    { value: 'C5-Ins-Intermediate', label: 'C5-Ins-Intermediate' },
    { value: 'C5-Ins-Advanced', label: '    C5-Ins-Advanced' },
    { value: 'C6-Ins-Beginner', label: '    C6-Ins-Beginner' },
    { value: 'C6-Ins-Intermediate', label: 'C6-Ins-Intermediate' },
    { value: 'C6-Ins-Advanced', label: '    C6-Ins-Advanced' },
    { value: 'Numeron-Ins-Beginner', label: 'Numeron-Ins-Beginner' },
    { value: 'Numeron-Ins-Intermediate', label: 'Numeron-Ins-Intermediate' },
    { value: 'Numeron-Ins-Advanced', label: 'Numeron-Ins-Advanced' },
    { value: 'NP10-Ins-Beginner', label: '    NP10-Ins-Beginner' },
    { value: 'NP10-Ins-Intermediate', label: 'NP10-Ins-Intermediate' },
    { value: 'NP10-Ins-Advanced', label: '    NP10-Ins-Advanced' },
    { value: 'NP20-Ins-Beginner', label: '    NP20-Ins-Beginner' },
    { value: 'NP20-Ins-Intermediate', label: 'NP20-Ins-Intermediate' },
    { value: 'NP20-Ins-Advanced', label: '    NP20-Ins-Advanced' },
    { value: 'NTL-Ins-Beginner', label: '     NTL-Ins-Beginner' },
    { value: 'NTL-Ins-Intermediate', label: ' NTL-Ins-Intermediate' },
    { value: 'NTL-Ins-Advanced', label: '     NTL-Ins-Advanced' },
    { value: 'Pronote-Ins-Beginner', label: '    Pronote-Ins-Beginner' },
    { value: 'Pronote-Ins-Intermediate', label: 'Pronote-Ins-Intermediate' },
    { value: 'Pronote-Ins-Advanced', label: '    Pronote-Ins-Advanced' },
    { value: 'Procoin-Ins-Beginner', label: '    Procoin-Ins-Beginner' },
    { value: 'Procoin-Ins-Intermediate', label: 'Procoin-Ins-Intermediate' },
    { value: 'Procoin-Ins-Advanced', label: '    Procoin-Ins-Advanced' },
    { value: 'SBM-95-Ins-Beginner', label: 'SBM-95-Ins-Beginner' },
    { value: 'SBM-95-Ins-Intermediate', label: 'SBM-95-Ins-Intermediate' },
    { value: 'SBM-95-Ins-Advanced', label: 'SBM-95-Ins-Advanced' },
    { value: 'Ecoremote/Protect-Ins-Beginner', label: 'Ecoremote/Protect-Ins-Beginner' },
    { value: 'Ecoremote/Protect-Ins-Intermediate', label: 'Ecoremote/Protect-Ins-Intermediate' },
    { value: 'Ecoremote/Protect-Ins-Advanced', label: 'Ecoremote/Protect-Ins-Advanced' },
    { value: 'M3-PM-Beginner', label: 'M3-PM-Beginner' },
    { value: 'M3-PM-Intermediate', label: 'M3-PM-Intermediate' },
    { value: 'M3-PM-Advanced', label: 'M3-PM-Advanced' },
    { value: 'M5-PM-Beginner', label: 'M5-PM-Beginner' },
    { value: 'M5-PM-Intermediate', label: 'M5-PM-Intermediate' },
    { value: 'M5-PM-Advanced', label: 'M5-PM-Advanced' },
    { value: 'M7-PM-Beginner', label: 'M7-PM-Beginner' },
    { value: 'M7-PM-Intermediate', label: 'M7-PM-Intermediate' },
    { value: 'M7-PM-Advanced', label: 'M7-PM-Advanced' },
    { value: 'X9-PM-Beginner', label: 'X9-PM-Beginner' },
    { value: 'X9-PM-Intermediate', label: 'X9-PM-Intermediate' },
    { value: 'X9-PM-Advanced', label: 'X9-PM-Advanced' },
    { value: 'BPS 2000-PM-Beginner', label: 'BPS 2000-PM-Beginner' },
    { value: 'BPS 2000-PM-Intermediate', label: 'BPS 2000-PM-Intermediate' },
    { value: 'BPS 2000-PM-Advanced', label: 'BPS 2000-PM-Advanced' },
    { value: 'C1-PM-Beginner', label: 'C1-PM-Beginner' },
    { value: 'C1-PM-Intermediate', label: 'C1-PM-Intermediate' },
    { value: 'C1-PM-Advanced', label: 'C1-PM-Advanced' },
    { value: 'C2-PM-Beginner', label: 'C2-PM-Beginner' },
    { value: 'C2-PM-Intermediate', label: 'C2-PM-Intermediate' },
    { value: 'C2-PM-Advanced', label: 'C2-PM-Advanced' },
    { value: 'C3-PM-Beginner', label: 'C3-PM-Beginner' },
    { value: 'C3-PM-Intermediate', label: 'C3-PM-Intermediate' },
    { value: 'C3-PM-Advanced', label: 'C3-PM-Advanced' },
    { value: 'C4-PM-Beginner', label: 'C4-PM-Beginner' },
    { value: 'C4-PM-Intermediate', label: 'C4-PM-Intermediate' },
    { value: 'C4-PM-Advanced', label: 'C4-PM-Advanced' },
    { value: 'C5-PM-Beginner', label: 'C5-PM-Beginner' },
    { value: 'C5-PM-Intermediate', label: 'C5-PM-Intermediate' },
    { value: 'C5-PM-Advanced', label: 'C5-PM-Advanced' },
    { value: 'C6-PM-Beginner', label: 'C6-PM-Beginner' },
    { value: 'C6-PM-Intermediate', label: 'C6-PM-Intermediate' },
    { value: 'C6-PM-Advanced', label: 'C6-PM-Advanced' },
    { value: 'Numeron-PM-Beginner', label: 'Numeron-PM-Beginner' },
    { value: 'Numeron-PM-Intermediate', label: 'Numeron-PM-Intermediate' },
    { value: 'Numeron-PM-Advanced', label: 'Numeron-PM-Advanced' },
    { value: 'NP10-PM-Beginner', label: '    NP10-PM-Beginner' },
    { value: 'NP10-PM-Intermediate', label: 'NP10-PM-Intermediate' },
    { value: 'NP10-PM-Advanced', label: '    NP10-PM-Advanced' },
    { value: 'NP20-PM-Beginner', label: '    NP20-PM-Beginner' },
    { value: 'NP20-PM-Intermediate', label: 'NP20-PM-Intermediate' },
    { value: 'NP20-PM-Advanced', label: '    NP20-PM-Advanced' },
    { value: 'NTL-PM-Beginner', label: '     NTL-PM-Beginner' },
    { value: 'NTL-PM-Intermediate', label: ' NTL-PM-Intermediate' },
    { value: 'NTL-PM-Advanced', label: '     NTL-PM-Advanced' },
    { value: 'Pronote-PM-Beginner', label: '    Pronote-PM-Beginner' },
    { value: 'Pronote-PM-Intermediate', label: 'Pronote-PM-Intermediate' },
    { value: 'Pronote-PM-Advanced', label: '    Pronote-PM-Advanced' },
    { value: 'Procoin-PM-Beginner', label: '    Procoin-PM-Beginner' },
    { value: 'Procoin-PM-Intermediate', label: 'Procoin-PM-Intermediate' },
    { value: 'Procoin-PM-Advanced', label: '    Procoin-PM-Advanced' },
    { value: 'SBM-95-PM-Beginner', label: '    SBM-95-PM-Beginner' },
    { value: 'SBM-95-PM-Intermediate', label: 'SBM-95-PM-Intermediate' },
    { value: 'SBM-95-PM-Advanced', label: '    SBM-95-PM-Advanced' },
    { value: 'Ecoremote/Protect-PM-Beginner', label: '    Ecoremote/Protect-PM-Beginner' },
    { value: 'Ecoremote/Protect-PM-Intermediate', label: 'Ecoremote/Protect-PM-Intermediate' },
    { value: 'Ecoremote/Protect-PM-Advanced', label: '    Ecoremote/Protect-PM-Advanced' },
    { value: 'M3-CM-Beginner', label: 'M3-CM-Beginner' },
    { value: 'M3-CM-Intermediate', label: 'M3-CM-Intermediate' },
    { value: 'M3-CM-Advanced', label: 'M3-CM-Advanced' },
    { value: 'M5-CM-Beginner', label: 'M5-CM-Beginner' },
    { value: 'M5-CM-Intermediate', label: 'M5-CM-Intermediate' },
    { value: 'M5-CM-Advanced', label: 'M5-CM-Advanced' },
    { value: 'M7-CM-Beginner', label: 'M7-CM-Beginner' },
    { value: 'M7-CM-Intermediate', label: 'M7-CM-Intermediate' },
    { value: 'M7-CM-Advanced', label: 'M7-CM-Advanced' },
    { value: 'X9-CM-Beginner', label: 'X9-CM-Beginner' },
    { value: 'X9-CM-Intermediate', label: 'X9-CM-Intermediate' },
    { value: 'X9-CM-Advanced', label: 'X9-CM-Advanced' },
    { value: 'BPS 2000-CM-Beginner', label: 'BPS 2000-CM-Beginner' },
    { value: 'BPS 2000-CM-Intermediate', label: 'BPS 2000-CM-Intermediate' },
    { value: 'BPS 2000-CM-Advanced', label: 'BPS 2000-CM-Advanced' },
    { value: 'C1-CM-Beginner', label: 'C1-CM-Beginner' },
    { value: 'C1-CM-Intermediate', label: 'C1-CM-Intermediate' },
    { value: 'C1-CM-Advanced', label: 'C1-CM-Advanced' },
    { value: 'C2-CM-Beginner', label: 'C2-CM-Beginner' },
    { value: 'C2-CM-Intermediate', label: 'C2-CM-Intermediate' },
    { value: 'C2-CM-Advanced', label: 'C2-CM-Advanced' },
    { value: 'C3-CM-Beginner', label: 'C3-CM-Beginner' },
    { value: 'C3-CM-Intermediate', label: 'C3-CM-Intermediate' },
    { value: 'C3-CM-Advanced', label: 'C3-CM-Advanced' },
    { value: 'C4-CM-Beginner', label: 'C4-CM-Beginner' },
    { value: 'C4-CM-Intermediate', label: 'C4-CM-Intermediate' },
    { value: 'C4-CM-Advanced', label: 'C4-CM-Advanced' },
    { value: 'C5-CM-Beginner', label: 'C5-CM-Beginner' },
    { value: 'C5-CM-Intermediate', label: 'C5-CM-Intermediate' },
    { value: 'C5-CM-Advanced', label: 'C5-CM-Advanced' },
    { value: 'C6-CM-Beginner', label: 'C6-CM-Beginner' },
    { value: 'C6-CM-Intermediate', label: 'C6-CM-Intermediate' },
    { value: 'C6-CM-Advanced', label: 'C6-CM-Advanced' },
    { value: 'Numeron-CM-Beginner', label: '    Numeron-CM-Beginner' },
    { value: 'Numeron-CM-Intermediate', label: 'Numeron-CM-Intermediate' },
    { value: 'Numeron-CM-Advanced', label: '    Numeron-CM-Advanced' },
    { value: 'NP10-CM-Beginner', label: '    NP10-CM-Beginner' },
    { value: 'NP10-CM-Intermediate', label: 'NP10-CM-Intermediate' },
    { value: 'NP10-CM-Advanced', label: '    NP10-CM-Advanced' },
    { value: 'NP20-CM-Beginner', label: '    NP20-CM-Beginner' },
    { value: 'NP20-CM-Intermediate', label: 'NP20-CM-Intermediate' },
    { value: 'NP20-CM-Advanced', label: '    NP20-CM-Advanced' },
    { value: 'NTL-CM-Beginner', label: '    NTL-CM-Beginner' },
    { value: 'NTL-CM-Intermediate', label: 'NTL-CM-Intermediate' },
    { value: 'NTL-CM-Advanced', label: '    NTL-CM-Advanced' },
    { value: 'Pronote-CM-Beginner', label: '    Pronote-CM-Beginner' },
    { value: 'Pronote-CM-Intermediate', label: 'Pronote-CM-Intermediate' },
    { value: 'Pronote-CM-Advanced', label: '    Pronote-CM-Advanced' },
    { value: 'Procoin-CM-Beginner', label: '    Procoin-CM-Beginner' },
    { value: 'Procoin-CM-Intermediate', label: 'Procoin-CM-Intermediate' },
    { value: 'Procoin-CM-Advanced', label: '    Procoin-CM-Advanced' },
    { value: 'SBM-95-CM-Beginner', label: '    SBM-95-CM-Beginner' },
    { value: 'SBM-95-CM-Intermediate', label: 'SBM-95-CM-Intermediate' },
    { value: 'SBM-95-CM-Advanced', label: '    SBM-95-CM-Advanced' },
    { value: 'Ecoremote/Protect-CM-Beginner', label: '    Ecoremote/Protect-CM-Beginner' },
    { value: 'Ecoremote/Protect-CM-Intermediate', label: 'Ecoremote/Protect-CM-Intermediate' },
    { value: 'Ecoremote/Protect-CM-Advanced', label: '    Ecoremote/Protect-CM-Advanced' }
  ]);

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

  const avlOptions = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ];

  const expOptions = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ];

  const [productOptions, setProductOptions] = useState([
    { value: 'M3', label: 'M3' },
    { value: 'M5', label: 'M5' },
    { value: 'M7', label: 'M7' },
    { value: 'X9', label: 'X9' },
    { value: 'Pronote', label: 'Pronote' },
    { value: 'C3', label: 'C3' }
  ]);

  const religionOptions = [
    {
      value: 'Hindu',
      label: 'Hindu'
    },
    {
      value: 'Muslim',
      label: 'Muslim'
    },
    {
      value: 'Christian',
      label: 'Christian'
    }
  ];

  const languageOptions = [
    {
      value: 'English',
      label: 'English'
    },
    {
      value: 'Hindi',
      label: 'Hindi'
    },
    {
      value: 'Spanish',
      label: 'Spanish'
    },
    {
      value: 'Portugese',
      label: 'Portugese'
    },
    {
      value: 'French',
      label: 'French'
    },
    {
      value: 'Arabic',
      label: 'Arabic'
    }
  ];

  const [leadOptions, setLeadOptions] = useState([
    { value: 'Installation', label: 'Installation' },
    { value: 'Preventive Maintenance', label: 'Preventive Maintenance' },
    { value: 'Corrective Maintenance', label: 'Corrective Maintenance' },
    { value: '', label: 'None' }
  ]);

  const [feLevelOptions, setFeLevelOptions] = useState([
    { value: '1', label: 'FE-1' },
    { value: '2', label: 'FE-2' },
    { value: '3', label: 'FE-3' },
    { value: '4', label: 'FE-4' }
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
    { value: 'Africa', label: 'Africa' },
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
    { value: '', label: 'None' }
  ];

  const notyf = useContext(NotyfContext);

  const data = {
    name,
    skills,
    machines,
    countries,
    isLeader,
    nationality,
    productExp: products,
    feLevel,
    exp
  };

  async function submitHandler(e) {
    e.preventDefault();

    console.log(data);
    if (productValue.length !== 0) {
      productValue.forEach(element => {
        products.push(element.value);
      });
    }

    if (customerValue.length !== 0) {
      customerValue.forEach(element => {
        countries.push(element.value);
      });
    }

    try {
      const { res } = await axios.post('/add_user', data);
      emptyForm();
      notyf.success('New resource added');
      window.location.reload();
      // if (btnStatus === 'Submit') {
      //   const { res } = await axios.post('/add_user', data);
      //   emptyForm();
      //   notyf.success('New resource added');
      // } else {
      //   console.log(sendData);
      //   console.log(data);
      //   const updatedData = {
      //     data: data,
      //     id: sendData._id
      //   };
      //   const { res } = await axios.put('/edit_user', updatedData);
      //   console.log(updatedData);
      //   emptyForm();
      //   setBtnStatus('Submit');
      // }
    } catch (error) {
      console.log(error);
      notyf.error('Missing required details');
    }
  }

  const emptyForm = () => {
    setName('');
    setExperience('');
    setSkills('');
    setType('');
    setMachines([]);
  };

  useEffect(() => {
    if (sendData) {
      populateData(sendData);
    }
  }, [sendData]);

  const populateData = data => {
    // console.log(data);

    if (data) {
      setEditing(true);
      setName(data.name);
      setSkills(data.skills);
      setEditedTeam(data.skills);
      setEditedFeLevel(data.feLevel);
      setEditedCountries(data.countries);
      setEditedExp(data.exp);
      setEditedProductExp(data.productExp);
      setEditedLead(data.isLeader);
      setEditedNationality(data.nationality);
      setEditedMachines(data.machines);
      // selectInputRef.current.select.setValue(data.skills);
    }
  };

  async function updateHandler(e) {
    e.preventDefault();
    let deny = false;

    if (productValue.length !== 0) {
      productValue.forEach(element => {
        products.push(element.value);
      });
    }

    if (customerValue.length !== 0) {
      customerValue.forEach(element => {
        countries.push(element.value);
      });
    }

    console.log(data);

    try {
      for (const [key, value] of Object.entries(data)) {
        if (!value) {
          deny = true;
          return notyf.error('Missing update details');
        }
        // else {
        //   const updatedData = {
        //     data: data,
        //     id: sendData._id
        //   };
        //   const { res } = await axios.put('/edit_user', updatedData);
        //   emptyForm();
        //   window.location.reload();
        // }
      }
      if (!deny) {
        const updatedData = {
          data: data,
          id: sendData._id
        };
        const { res } = await axios.put('/edit_user', updatedData);
        setEditedLead([]);
        setEditedCountries([]);
        setEditedExp([]);
        setEditedProductExp([]);
        setEditedTeam('');
        setEditedMachines([]);
        setEditedFeLevel('');
        setIsLeader([]);
        setNationality('');
        emptyForm();
        window.location.reload();
      }
    } catch (error) {
      console.log('Errors');
    }
  }

  const handleChange = skills => {
    setSkills(skills.value);
    if (skills.value === 'BDS') {
      setSegmentOptions([
        { value: 'BDS', label: 'BDS' },
        { value: 'UPS', label: 'UPS' }
      ]);
      setProductOptions([{ value: 'N/A', label: 'N/A' }]);
      setLeadOptions([
        { value: 'BDS Installation', label: 'BDS Installation' },
        { value: 'BDS Preventive Maintenance', label: 'BDS Preventive Maintenance' },
        { value: 'BDS Corrective Maintenance', label: 'BDS Corrective Maintenance' },
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
      setProductOptions([
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
      setProductOptions([
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
      setProductOptions([
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
        { value: 'Ins-Beginner', label: 'Ins-Beginner' },
        { value: 'Ins-Intermediate', label: 'Ins-Intermediate' },
        { value: 'Ins-Advanced', label: 'Ins-Advanced' },
        { value: 'CM-Beginner', label: 'CM-Beginner' },
        { value: 'CM-Intermediate', label: 'CM-Intermediate' },
        { value: 'CM-Advanced', label: 'CM-Advanced' },
        { value: 'SIT-Beginner', label: 'SIT-Beginner' },
        { value: 'SIT-Intermediate', label: 'SIT-Intermediate' },
        { value: 'SIT-Advanced', label: 'SIT-Advanced' },
        { value: 'UAT-Beginner', label: 'UAT-Beginner' },
        { value: 'UAT-Intermediate', label: 'UAT-Intermediate' },
        { value: 'UAT-Advanced', label: 'UAT-Advanced' }
      ]);
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 10
    })
  };

  const handleChangeSegment = t => {
    const seg = [];
    t.map(item => {
      seg.push(item.value);
      if (item.value === 'M-Segment' && skills === 'BPS') {
        setProductOptions([
          { value: 'M3', label: 'M3' },
          { value: 'M5', label: 'M5' },
          { value: 'M7', label: 'M7' },
          { value: 'NP10', label: 'NP10' },
          { value: 'NP20', label: 'NP20' },
          { value: 'NTL', label: 'NTL' },
          { value: 'Ecoremote/Protect', label: 'Ecoremote/Protect' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'C-Segment' && skills === 'BPS') {
        setProductOptions([
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
      } else if (item.value === 'X-Segment' && skills === 'BPS') {
        setProductOptions([
          { value: 'X9', label: 'X9' },
          { value: 'BPS 2000', label: 'BPS 2000' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'Compass VMS') {
        setProductOptions([
          { value: 'VMS Compass Full', label: 'VMS Compass Full' },
          { value: 'VMS Compass Starter', label: 'VMS Compass Starter' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'CWC') {
        setProductOptions([
          { value: 'CWC', label: 'CWC' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'BDS') {
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
      } else if (item.value === 'UPS') {
        setExperienceOptions([
          { value: 'UPS-Beginner', label: 'UPS-Beginner' },
          { value: 'UPS-Intermediate', label: 'UPS-Intermediate' },
          { value: 'UPS-Advanced', label: 'UPS-Advanced' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'M-Segment' && skills === 'Adaptation') {
        // console.log(skills + ' ' + item.value);
        setProductOptions([
          { value: 'M3', label: 'M3' },
          { value: 'M5', label: 'M5' },
          { value: 'M7', label: 'M7' },
          { value: 'BPS 1000', label: 'BPS 1000' },
          { value: 'GSNA- M7/M5', label: 'GSNA- M7/M5' },
          { value: 'GSNA- M3', label: 'GSNA- M3' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'C-Segment' && skills === 'Adaptation') {
        setProductOptions([
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
      } else if (item.value === 'X-Segment' && skills === 'Adaptation') {
        setProductOptions([
          { value: 'X9', label: 'X9' },
          { value: '', label: 'None' }
        ]);
      }
    });
    setMachines(seg);
  };

  const handleChangeLead = t => {
    const lead = [];
    t.map(item => {
      lead.push(item.value);
    });
    setIsLeader(lead);
  };

  const handleChangeLanguages = t => {
    const l = [];
    t.map(item => {
      l.push(item.value);
    });
    setLanguages(l);
  };

  const handleChangeFeLevel = t => {
    setFeLevel(t.value);
  };
  const handleChangeReligion = t => {
    setReligion(t.value);
  };

  const handleChangeExp = t => {
    const e1 = [];
    t.map(item => {
      e1.push(item.value);
    });
    setExp(e1);
  };

  // const handleChangeAvailability = t => {
  //   setAvailability(t.value);
  // };
  const handleChangeNationality = t => {
    setNationality(t.value);
  };

  const handleCreateProduct = (field, value) => {
    switch (field) {
      case 'productOptions':
        setProductValue(value);
        handleProductExperience(value);
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

  const handleProductExperience = items => {
    console.log(items);
    items.forEach(item => {
      if (item.value === 'M3' && skills === 'Adaptation') {
        setExperienceOptions([
          { value: 'M3-Beginner', label: 'M3-Beginner' },
          { value: 'M3-Intermediate', label: 'M3-Intermediate' },
          { value: 'M3-Advanced', label: 'M3-Advanced' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'M5' && skills === 'Adaptation') {
        setExperienceOptions([
          { value: 'M5-Beginner', label: 'M5-Beginner' },
          { value: 'M5-Intermediate', label: 'M5-Intermediate' },
          { value: 'M5-Advanced', label: 'M5-Advanced' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'M7' && skills === 'Adaptation') {
        setExperienceOptions([
          { value: 'M7-Beginner', label: 'M7-Beginner' },
          { value: 'M7-Intermediate', label: 'M7-Intermediate' },
          { value: 'M7-Advanced', label: 'M7-Advanced' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'X9' && skills === 'Adaptation') {
        setExperienceOptions([
          { value: 'X9-Beginner', label: 'X9-Beginner' },
          { value: 'X9-Intermediate', label: 'X9-Intermediate' },
          { value: 'X9-Advanced', label: 'X9-Advanced' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'BPS 1000' && skills === 'Adaptation') {
        setExperienceOptions([
          { value: 'BPS 1000-Beginner', label: 'BPS 1000-Beginner' },
          { value: 'BPS 1000-Intermediate', label: 'BPS 1000-Intermediate' },
          { value: 'BPS 1000-Advanced', label: 'BPS 1000-Advanced' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'GSNA- M3' && skills === 'Adaptation') {
        setExperienceOptions([
          { value: 'GSNA- M3-Beginner', label: 'GSNA- M3-Beginner' },
          { value: 'GSNA- M3-Intermediate', label: 'GSNA- M3-Intermediate' },
          { value: 'GSNA- M3-Advanced', label: 'GSNA- M3-Advanced' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'GSNA- M7/M5' && skills === 'Adaptation') {
        setExperienceOptions([
          { value: 'GSNA- M7/M5-Beginner', label: 'GSNA- M7/M5-Beginner' },
          { value: 'GSNA- M7/M5-Intermediate', label: 'GSNA- M7/M5-Intermediate' },
          { value: 'GSNA- M7/M5-Advanced', label: 'GSNA- M7/M5-Advanced' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'B1' && skills === 'Adaptation') {
        setExperienceOptions([
          { value: 'B1-Beginner', label: 'B1-Beginner' },
          { value: 'B1-Intermediate', label: 'B1-Intermediate' },
          { value: 'B1-Advanced', label: 'B1-Advanced' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'C1' && skills === 'Adaptation') {
        setExperienceOptions([
          { value: 'C1-Beginner', label: 'C1-Beginner' },
          { value: 'C1-Intermediate', label: 'C1-Intermediate' },
          { value: 'C1-Advanced', label: 'C1-Advanced' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'C2' && skills === 'Adaptation') {
        setExperienceOptions([
          { value: 'C2-Beginner', label: 'C2-Beginner' },
          { value: 'C2-Intermediate', label: 'C2-Intermediate' },
          { value: 'C2-Advanced', label: 'C2-Advanced' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'C3' && skills === 'Adaptation') {
        setExperienceOptions([
          { value: 'C3-Beginner', label: 'C3-Beginner' },
          { value: 'C3-Intermediate', label: 'C3-Intermediate' },
          { value: 'C3-Advanced', label: 'C3-Advanced' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'C4' && skills === 'Adaptation') {
        setExperienceOptions([
          { value: 'C4-Beginner', label: 'C4-Beginner' },
          { value: 'C4-Intermediate', label: 'C4-Intermediate' },
          { value: 'C4-Advanced', label: 'C4-Advanced' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'C5' && skills === 'Adaptation') {
        setExperienceOptions([
          { value: 'C5-Beginner', label: 'C5-Beginner' },
          { value: 'C5-Intermediate', label: 'C5-Intermediate' },
          { value: 'C5-Advanced', label: 'C5-Advanced' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'GSNA- C2/C5' && skills === 'Adaptation') {
        setExperienceOptions([
          { value: 'GSNA- C2/C5-Beginner', label: 'GSNA- C2/C5-Beginner' },
          { value: 'GSNA- C2/C5-Intermediate', label: 'GSNA- C2/C5-Intermediate' },
          { value: 'GSNA- C2/C5-Advanced', label: 'GSNA- C2/C5-Advanced' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'Numeron' && skills === 'Adaptation') {
        setExperienceOptions([
          { value: 'Numeron-Beginner', label: 'Numeron-Beginner' },
          { value: 'Numeron-Intermediate', label: 'Numeron-Intermediate' },
          { value: 'Numeron-Advanced', label: 'Numeron-Advanced' },
          { value: '', label: 'None' }
        ]);
      } else if (item.value === 'M3' && skills === 'BPS') {
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
      } else if (item.value === 'M5' && skills === 'BPS') {
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
      } else if (item.value === 'M7' && skills === 'BPS') {
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
      } else if (item.value === 'X9' && skills === 'BPS') {
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
      } else if (item.value === 'BPS 2000' && skills === 'BPS') {
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
      } else if (item.value === 'NP10' && skills === 'BPS') {
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
      } else if (item.value === 'NP20' && skills === 'BPS') {
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
      } else if (item.value === 'NTL' && skills === 'BPS') {
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
      } else if (item.value === 'Numeron' && skills === 'BPS') {
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
      } else if (item.value === 'Pronote' && skills === 'BPS') {
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
      } else if (item.value === 'Procoin' && skills === 'BPS') {
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
      } else if (item.value === 'C1' && skills === 'BPS') {
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
      } else if (item.value === 'C2' && skills === 'BPS') {
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
      } else if (item.value === 'C3' && skills === 'BPS') {
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
      } else if (item.value === 'C4' && skills === 'BPS') {
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
      } else if (item.value === 'C5' && skills === 'BPS') {
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
      } else if (item.value === 'C6' && skills === 'BPS') {
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
      } else if (item.value === 'SBM-95' && skills === 'BPS') {
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
      } else if (item.value === 'Ecoremote/Protect' && skills === 'BPS') {
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
      }
    });
  };

  // const handleChangeProduct = t => {
  //   const product = [];
  //   t.map(item => {
  //     product.push(item.value);
  //   });
  //   setProducts(product);
  // };
  // const handleChangeCustomer = t => {
  //   const customer = [];
  //   t.map(item => {
  //     customer.push(item.value);
  //   });
  //   setCountries(customer);
  // };

  return (
    <>
      <Form>
        <Form.Group className='mb-3  text-dark' controlId='formBasicName'>
          <Form.Label className='text-light'>Full Name</Form.Label>
          <Form.Control type='string' placeholder='Full name' onChange={e => setName(e.target.value)} value={name} />
          {name && name.split(' ').length < 2 && <Form.Text className='text-muted'>Enter full name</Form.Text>}
          {name && name[0] === ' ' && <Form.Text className='text-muted'>Remove starting spaces</Form.Text>}
        </Form.Group>

        {/* <Form.Group className='mb-3  text-dark' controlId='formBasicTeam'>
          <Form.Label className='text-light'>Team*</Form.Label>
          <Select options={teamOptions} onChange={handleChange} value={editedTeam && teamOptions.find(option => option.value === editedTeam)} />
        </Form.Group> */}
        {/* <Form.Group className='mb-3  text-dark' controlId='formBasicTeam'>
          <Form.Label className='text-light'>Team*</Form.Label>
          <Select options={teamOptions} onChange={handleChange} defaultValue={skills} />
        </Form.Group> */}
        <Form.Group className='mb-3  text-dark' controlId='formBasicTeam'>
          <Form.Label className='text-light'>Team</Form.Label>
          <Select options={teamOptions} onChange={handleChange} placeholder={editedTeam ? editedTeam : 'Select...'} />
        </Form.Group>

        <Form.Group className='mb-3 text-dark' controlId='formBasicSegment'>
          <Form.Label className='text-light'>Segment</Form.Label>
          <Select options={segmentOptions} isMulti name='segment' className='basic-multi-select' classNamePrefix='select' onChange={handleChangeSegment} placeholder={editedMachines && editedMachines.length !== 0 ? editedMachines.map(item => item + ' ') : 'Select...'} />
          {/* <Form.Text className='text-muted'>{editing && data.machines[0]}</Form.Text> */}
        </Form.Group>

        {/* <Form.Group className='mb-3 text-dark' controlId='formBasicProducts'>
          <Form.Label className='text-light'>Product Experience</Form.Label>
          <Select options={productOptions} isMulti name='customer' className='basic-multi-select' classNamePrefix='select' onChange={handleChangeProduct} />
        </Form.Group> */}

        <Form.Group className='mb-3 text-dark' controlId='formBasicProducts'>
          <Form.Label className='text-light'>Product Experience</Form.Label>
          <Creatable onChange={value => handleCreateProduct('productOptions', value)} options={productOptions} value={productValue} isMulti isClearable styles={customStyles} placeholder={editedproductExp && editedproductExp.length !== 0 ? editedproductExp.map(item => item + ' ') : 'Select...'} />
        </Form.Group>

        <Form.Group className='mb-3 text-dark' controlId='formBasicExperience'>
          <Form.Label className='text-light'> Job Experience</Form.Label>
          <Select options={experienceOptions} isMulti name='experience' className='basic-multi-select' classNamePrefix='select' onChange={handleChangeExp} placeholder={editedExp && editedExp.length ? editedExp.map(item => item + ' ') : 'Select...'} />
        </Form.Group>

        {/* <Form.Group className='mb-3 text-dark' controlId='formBasicCustomer'>
          <Form.Label className='text-light'>Customer Experience</Form.Label>
          <Select options={customerOptions} isMulti name='customer' className='basic-multi-select' classNamePrefix='select' onChange={handleChangeCustomer} />
        </Form.Group> */}

        <Form.Group className='mb-3 text-dark' controlId='formBasicCustomer'>
          <Form.Label className='text-light'>Customer Experience</Form.Label>
          <Creatable onChange={value => handleCreateCustomer('customerOptions', value)} options={customerOptions} value={customerValue} isMulti isClearable styles={customStyles} placeholder={editedCountries && editedCountries.length ? editedCountries.map(item => item + ' ') : 'Select...'} />
        </Form.Group>

        {/* <Form.Group className='mb-3 text-dark' controlId='formBasicFe'>
          <Form.Label className='text-light'>FE Levels</Form.Label>
          <Select options={feLevelOptions} onChange={handleChangeFeLevel} value={editedFeLevel && feLevelOptions.find(option => option.value === editedFeLevel)} />
        </Form.Group> */}
        <Form.Group className='mb-3 text-dark' controlId='formBasicFe'>
          <Form.Label className='text-light'>FE Levels</Form.Label>
          <Select options={feLevelOptions} onChange={handleChangeFeLevel} placeholder={editedFeLevel ? editedFeLevel : 'Select...'} />
        </Form.Group>

        <Form.Group className='mb-3 text-dark' controlId='formBasicLead'>
          <Form.Label className='text-light'>Can Lead</Form.Label>
          <Select options={leadOptions} isMulti name='leading-ability' className='basic-multi-select' classNamePrefix='select' onChange={handleChangeLead} placeholder={editedLead && editedLead.length !== 0 ? editedLead.map(item => item + ' ') : 'Select...'} />
        </Form.Group>

        <Form.Group className='mb-3 text-dark' controlId='formBasicNationality'>
          <Form.Label className='text-light'>Nationality</Form.Label>
          <Select options={nationalityOptions} onChange={handleChangeNationality} placeholder={editedNationality ? editedNationality : 'Select...'} />
        </Form.Group>

        {/* <Form.Group className='mb-3 text-dark' controlId='formBasicLead'>
          <Form.Label className='text-light'>Languages</Form.Label>
          <Select options={languageOptions} isMulti name='languages' className='basic-multi-select' classNamePrefix='select' onChange={handleChangeLanguages} />
        </Form.Group>
        <Form.Group className='mb-3 text-dark' controlId='formBasicLead'>
          <Form.Label className='text-light'>Religion</Form.Label>
          <Select options={religionOptions} name='religion' className='basic-multi-select' classNamePrefix='select' onChange={handleChangeReligion} />
        </Form.Group> */}

        {/* <Form.Group className='mb-3 text-dark' controlId='formBasicNationality'>
          <Form.Label className='text-light'>Nationality</Form.Label>
          <Select options={nationalityOptions} onChange={handleChangeNationality} value={editedNationality && nationalityOptions.find(option => option.value === editedNationality)} />
        </Form.Group> */}

        {/* {skills == 'BPS' && (
          <>
            <h4 className='mt-5 mb-4'>Installation</h4>

            <Form.Group>
              <Form.Label>M3 Experience</Form.Label>
              <RangeSlider value={m3Value} onChange={changeEvent => setM3Value(changeEvent.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>M5 Experience</Form.Label>
              <RangeSlider value={m5Value} onChange={changeEvent => setM5Value(changeEvent.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>M7 Experience</Form.Label>
              <RangeSlider value={m7Value} onChange={changeEvent => setM7Value(changeEvent.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>X9 Experience</Form.Label>
              <RangeSlider value={x9Value} onChange={changeEvent => setX9Value(changeEvent.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Pronote Experience</Form.Label>
              <RangeSlider value={pronoteValue} onChange={changeEvent => setPronoteValue(changeEvent.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>C Segment Experience</Form.Label>
              <RangeSlider value={cSegmentValue} onChange={changeEvent => setCValue(changeEvent.target.value)} />
            </Form.Group>
          </>
        )} */}
        {/* {skills == 'BPS' && (
          <>
            <h4 className='mt-5 mb-4'>Preventive Maintenance</h4>

            <Form.Group>
              <Form.Label>M3 Experience</Form.Label>
              <RangeSlider value={m3Value} onChange={changeEvent => setM3Value(changeEvent.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>M5 Experience</Form.Label>
              <RangeSlider value={m5Value} onChange={changeEvent => setM5Value(changeEvent.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>M7 Experience</Form.Label>
              <RangeSlider value={m7Value} onChange={changeEvent => setM7Value(changeEvent.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>X9 Experience</Form.Label>
              <RangeSlider value={x9Value} onChange={changeEvent => setX9Value(changeEvent.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Pronote Experience</Form.Label>
              <RangeSlider value={pronoteValue} onChange={changeEvent => setPronoteValue(changeEvent.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>C Segment Experience</Form.Label>
              <RangeSlider value={cSegmentValue} onChange={changeEvent => setCValue(changeEvent.target.value)} />
            </Form.Group>
          </>
        )} */}
        {/* {skills == 'BPS' && (
          <>
            <h4 className='mt-5 mb-4'>Corrective Maintenance</h4>

            <Form.Group>
              <Form.Label>M3 Experience</Form.Label>
              <RangeSlider value={m3Value} onChange={changeEvent => setM3Value(changeEvent.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>M5 Experience</Form.Label>
              <RangeSlider value={m5Value} onChange={changeEvent => setM5Value(changeEvent.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>M7 Experience</Form.Label>
              <RangeSlider value={m7Value} onChange={changeEvent => setM7Value(changeEvent.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>X9 Experience</Form.Label>
              <RangeSlider value={x9Value} onChange={changeEvent => setX9Value(changeEvent.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Pronote Experience</Form.Label>
              <RangeSlider value={pronoteValue} onChange={changeEvent => setPronoteValue(changeEvent.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>C Segment Experience</Form.Label>
              <RangeSlider value={cSegmentValue} onChange={changeEvent => setCValue(changeEvent.target.value)} />
            </Form.Group>
          </>
        )} */}
        {/* {skills == 'BPS' && (
          <>
            <Form.Group className='mb-3 text-dark'>
              <Form.Label className='text-light'>Installation Experience</Form.Label>
              <Select options={expOptionsBps} isMulti name='BpsInstallation' className='basic-multi-select' classNamePrefix='select' onChange={handleChangeInstallationBps} />
            </Form.Group>
            <Form.Group className='mb-3 text-dark'>
              <Form.Label className='text-light'>Preventive Maintenance Experience </Form.Label>
              <Select options={expOptionsBps} isMulti name='BpsPM' className='basic-multi-select' classNamePrefix='select' onChange={handleChangePMBps} />
            </Form.Group>
            <Form.Group className='mb-3 text-dark'>
              <Form.Label className='text-light'>Corrective Maintenance Experience</Form.Label>
              <Select options={expOptionsBps} isMulti name='BpsCM' className='basic-multi-select' classNamePrefix='select' onChange={handleChangeCMBps} />
            </Form.Group>
          </>
        )} */}

        {/* {skills === 'BDS' && (
          <>
            <Form.Group className='mb-3  text-dark' controlId='formBasicTeam'>
              <Form.Label className='text-light'>Installation Experience</Form.Label>
              <Select options={expOptions} onChange={handleChangeInsExpBds} />
            </Form.Group>
            <Form.Group className='mb-3  text-dark' controlId='formBasicTeam'>
              <Form.Label className='text-light'>Preventive Maintenance Experience</Form.Label>
              <Select options={expOptions} onChange={handleChangePMExpBds} />
            </Form.Group>
            <Form.Group className='mb-3  text-dark' controlId='formBasicTeam'>
              <Form.Label className='text-light'>Corrective Maintenance Experience</Form.Label>
              <Select options={expOptions} onChange={handleChangeCMExpBds} />
            </Form.Group>
            <Form.Group className='mb-3  text-dark' controlId='formBasicTeam'>
              <Form.Label className='text-light'>UPS Experience</Form.Label>
              <Select options={expOptions} onChange={handleChangeUpsExpBds} />
            </Form.Group>
            
          </>
        )} */}

        <Row>
          <Col>
            <Button variant='primary' type='submit' onClick={submitHandler} className='my-3'>
              {/* {btnStatus} */}
              Submit
            </Button>
          </Col>
          <Col>
            <Button variant='primary' type='submit' onClick={updateHandler} className='my-3'>
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ResourceInfo;
