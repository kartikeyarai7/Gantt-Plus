const activityData = [
  {
    type: 'PM',
    country: 'Angola',
    customer: 'BNA',
    pmCount: 2,
    doneBy: 'Brithol',
    range: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42]
  },
  {
    type: 'PM',
    country: 'Bahrain',
    customer: 'Central Bank',
    pmCount: 2,
    doneBy: 'GDAECT',
    range: [19, 20, 39, 40]
  },
  {
    type: 'PM',
    country: 'BCEAO',
    customer: 'BCEAO',
    pmCount: 4,
    doneBy: 'Sagam',
    range: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
  },
  {
    type: 'PM',
    country: 'Guinea',
    customer: 'BCRG Conakry',
    pmCount: 2,
    doneBy: 'ABS',
    range: [19, 20, 41, 42]
  },
  {
    type: 'PM',
    country: 'Ghana',
    customer: 'BOG',
    pmCount: 'M7-2, 1000-1',
    doneBy: 'GDAECT',
    range: [13, 14, 15, 16, 17, 18, 19, 20, 21, 28, 29, 30, 31, 32, 33, 35, 36, 37, 38, 39, 40, 41, 42, 43]
  },
  {
    type: 'PM',
    country: 'Ivory Coast',
    customer: 'Central Bank (Yammou)',
    pmCount: 1,
    doneBy: 'Sagam',
    range: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  },
  {
    type: 'PM',
    country: 'Jordan',
    customer: 'AIICC',
    pmCount: 2,
    doneBy: 'GDAECT',
    range: [9, 10, 28, 29]
  },
  {
    type: 'PM',
    country: 'Kenya',
    customer: 'Central Bank',
    pmCount: 2,
    doneBy: 'GDAECT',
    range: [9, 10, 11, 12, 13, 14, 15, 16, 17, 33, 34, 35, 36, 37, 38, 39, 40, 41]
  },
  {
    type: 'PM',
    country: 'Kuwait',
    customer: 'Central Bank',
    pmCount: 1,
    doneBy: 'GDAECT',
    range: [25, 26, 27, 28, 29]
  },
  {
    type: 'PM',
    country: 'Lebanon',
    customer: 'Bank de Leban',
    pmCount: 2,
    doneBy: 'GDAECT',
    range: [18, 19, 20, 21, 22, 42, 43, 44, 45, 46]
  },
  {
    type: 'PM',
    country: 'Morocco',
    customer: 'BAM',
    pmCount: 2,
    doneBy: 'GD Iberia',
    range: [23, 24, 25, 42, 43, 44]
  },
  {
    type: 'PM',
    country: 'Oman',
    customer: 'Central Bank',
    pmCount: 2,
    doneBy: 'GDAECT',
    range: [9, 10, 11, 31, 32, 33]
  },
  {
    type: 'PM',
    country: 'Pakistan',
    customer: 'State Bank',
    pmCount: 2,
    doneBy: 'GDAECT',
    range: [6, 7, 8, 30, 31, 32]
  },
  {
    type: 'PM',
    country: 'Qatar',
    customer: 'Commercial Bank',
    pmCount: 2,
    doneBy: 'GP & GDAECT',
    range: [19, 20, 43, 44]
  },
  {
    type: 'PM',
    country: 'Qatar',
    customer: 'Central Bank',
    pmCount: 2,
    doneBy: 'GDAECT',
    range: [21, 22, 45, 46]
  },
  {
    type: 'PM',
    country: 'Rwanda',
    customer: 'National Bank',
    pmCount: 2,
    doneBy: 'GDAECT',
    range: [18, 19, 20, 21, 40, 41, 42, 43]
  },
  {
    type: 'PM',
    country: 'Sierra Leone',
    customer: 'Central Bank',
    pmCount: 2,
    doneBy: 'GDACT/ GD Nigeria*',
    range: [19, 20, 21, 43, 44, 45]
  },
  {
    type: 'PM',
    country: 'Sudan',
    customer: 'Central Bank',
    pmCount: 2,
    doneBy: 'GDAECT',
    range: [16, 17, 18, 19, 20, 21, 39, 40, 41, 42, 43, 44]
  },
  {
    type: 'PM',
    country: 'Sudan',
    customer: 'SCPP',
    pmCount: 3,
    doneBy: 'GDAECT',
    range: [8, 9, 10, 11, 27, 28, 29, 30, 43, 44, 45, 46]
  },
  {
    type: 'PM',
    country: 'Tunisia',
    customer: 'Central Bank',
    pmCount: 2,
    doneBy: 'GDAECT',
    range: [18, 19, 20, 21, 22, 41, 42, 43, 44, 45]
  },
  {
    type: 'PM',
    country: 'UAE',
    customer: 'Central Bank',
    pmCount: 1,
    doneBy: 'GDAECT',
    range: [10, 11, 12, 13, 14, 15]
  },
  {
    type: 'PM',
    country: 'UAE',
    customer: 'Transguard',
    pmCount: 4,
    doneBy: 'CNS',
    range: [6, 7, 18, 19, 30, 31, 42, 43]
  },
  {
    type: 'PM',
    country: 'Algeria',
    customer: 'Bank Of Algeria',
    pmCount: 2,
    doneBy: 'GDAECT',
    range: [10, 11, 12, 13, 14, 15, 34, 35, 36, 37, 38, 39]
  },
  {
    type: 'INSP',
    country: 'Uganda',
    customer: 'Bank Of Uganda',
    pmCount: 2,
    doneBy: 'GDAECT',
    range: [33, 44]
  },
  {
    type: 'PM',
    country: 'Uganda',
    customer: 'Bank Of Uganda',
    pmCount: 1,
    doneBy: 'GDAECT',
    range: [18, 19, 20, 21, 22]
  }
];

export default activityData;
