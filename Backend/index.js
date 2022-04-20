const express = require('express');
require('dotenv').config({ path: __dirname + '../../.env' });
const axios = require('axios');
const app = express();
const path = require('path');

const dayjs = require('dayjs');
const isBetween = require('dayjs/plugin/isBetween');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

const mongoose = require('mongoose');
const userModel = require('./mongod/usermodel');
const jobModel = require('./mongod/jobmodel');
const bpsCalModel = require('./mongod/bpscalendarmodel');
const bdsCalModel = require('./mongod/bdscalendarmodel');
const adminControllerModel = require('./mongod/admincontrollermodel');

const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function main() {
  try {
    console.log(process.env.MONGO_URI);
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function () {
      console.log('Connected successfully');
    });
  } catch (error) {
    console.log(error);
  }
}

main().catch(console.error);

// Checking for user
app.post('/api/check_user', async (req, res) => {
  const { id } = req.body;
  try {
    if (mongoose.isValidObjectId(id)) {
      const user = await userModel.findOne({ _id: id });
      if (user) {
        res.json(user);
      } else {
        res.json('Not found');
      }
    }
  } catch (error) {
    console.log(error);
    res.json('Error');
  }
});

app.post('/api/check_job', async (req, res) => {
  const { id } = req.body;
  try {
    if (mongoose.isValidObjectId(id)) {
      const job = await jobModel.findOne({ _id: id });
      if (job) {
        res.json(job);
      } else {
        res.json('Not found');
      }
    }
  } catch (error) {
    console.log(error);
    res.json('Error');
  }
});

// New Resource
app.post('/api/add_user', async (request, response) => {
  const user = new userModel(request.body);

  try {
    await user.save();
    response.send('Added new resource');
  } catch (error) {
    response.status(500).send(error);
  }
});

//New Job
app.post('/api/add_job', async (request, response) => {
  // const { projectStartDate, projectEndDate, startDate, endDate } = request.body;
  const job = new jobModel(request.body);

  try {
    // if (dayjs(endDate).isAfter(projectEndDate) || dayjs(startDate).isBefore(projectStartDate) || dayjs(startDate).isAfter(endDate)) {
    //   throw 'Invalid Project dates';
    // } else {
    //   await job.save();
    //   response.send('Added a new job');
    // }
    await job.save();
    response.send('Added a new job');
  } catch (error) {
    response.status(500).send(error);
  }
});

// Assign Resource
app.post('/api/assign_resource', async (req, res) => {
  const { name, jobId, id } = req.body;

  try {
    if (mongoose.isValidObjectId(jobId)) {
      const user = await userModel.findOne({ _id: id });
      const job = await jobModel.findOne({ _id: jobId });

      const data = {
        name: job.name,
        startDate: job.startDate,
        endDate: job.endDate,
        category: job.category,
        country: job.country
        // startTimeStart: job.startTimeStart,
        // endTimeStart: job.endTimeStart
        // Removed the start and end times for end date
      };
      // console.log(user);
      // console.log(job);

      if (job.assignedCount < job.feCount) {
        if (job.assigned.includes(user.name)) {
          res.status(200).send('Duplicate');
        } else {
          await jobModel.updateOne({ _id: jobId }, { $push: { assigned: name } });
          // await userModel.updateOne({ _id: id }, { $set: { availability: 'No' } });
          await jobModel.updateOne({ _id: jobId }, { $inc: { assignedCount: 1 } });
          await userModel.updateOne({ _id: id }, { $push: { assignedTo: data } });
          res.status(200).send('Assigned');
        }
      } else {
        // throw 'Requirement Filled';
        // res.json('Filled');
        res.status(200).send('Filled');
      }
    }
  } catch (error) {
    console.log(error);
  }

  // res.json('Assigning job to ' + name + ' where jobId is ' + jobId);
});

app.post('/api/filter_jobs', async (req, res) => {
  const { team } = req.body;
  try {
    if (team === 'Choose') {
      const jobs = await jobModel.find({});
      res.json(jobs);
    } else {
      const jobs = await jobModel.find({ skillsReq: team });
      // console.log(jobs);
      // console.log(team);
      res.json(jobs);
    }
  } catch (error) {
    console.log(error);
  }
});

// Get all users
app.get('/api/users', async (request, response) => {
  const users = await userModel.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

//Authenticate Admins
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await adminControllerModel.findOne({ username: username });
    console.log(user);
    if (user && username && password) {
      if (user.password === password) {
        res.json({
          username: user.username
        });
      }
    } else {
      throw new Error('Invalid Details');
    }
    // users.forEach((item, i) => {
    //   if (item.username === username && item.password === password) {
    //     user = { ...item };
    //   }
    // });
    // if (user && user.username && user.password) {
    //   res.json({
    //     username: user.username
    //   });
    // } else {
    //   throw new Error('Invalid username or password');
    // }
  } catch (error) {
    console.log(error);
    response.status(401).send(error);
  }
});

//Get all jobs
app.get('/api/jobs', async (request, response) => {
  const jobs = await jobModel.find({});

  try {
    response.send(jobs);
  } catch (error) {
    response.status(500).send(error);
  }
});

//Delete Resource
app.post('/api/delete', async (req, res) => {
  const { id } = req.body;
  try {
    userModel.deleteOne({ _id: id }, () => {
      res.json('Deleted');
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete Job
app.post('/api/delete_job', async (req, res) => {
  const { id } = req.body;
  let users = [];
  let user;
  try {
    const job = await jobModel.findOne({ _id: id });

    // if (job.assigned && job.assigned.length !== 0) {
    //   job.assigned.forEach(item => {
    //     changeAssignments(item);
    //   });
    // }

    // async function changeAssignments(item) {
    //   try {
    //     user = await userModel.findOne({ name: item });
    //     console.log('user is ' + user);
    //     console.log('id is ' + user.id);
    //     await userModel.findOneAndUpdate({ name: item }, { $pull: { 'user.assignedTo': { name: job.name } } });
    //     user.updateOne(
    //       {
    //         assignedTo: { name: job.name }
    //       },
    //       {
    //         $pull: { assignedTo: { name: job.name } }
    //       },
    //       {
    //         new: true
    //       }
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    jobModel.deleteOne({ _id: id }, () => {
      res.json('deleted');
    });
  } catch (error) {
    console.log(error);
  }
});

//Find suitable candidates
//FE-Level to Min-FE-Level
app.post('/api/assign_job', async (req, res) => {
  const { skills, machines, country, startDate, endDate, productExp, feLevel, exp, isLeader } = req.body;
  //Removed the start and end time for last dates
  let d1 = dayjs(startDate);
  let d2 = dayjs(endDate);
  if (isLeader) {
    // if (country) {
    //   try {
    //     let result = await userModel.find({
    //       $and: [
    //         {
    //           machines: { $in: [machines] }
    //         },
    //         {
    //           skills: skills
    //         },
    //         {
    //           productExp: { $in: [productExp] }
    //         },
    //         { countries: { $in: [country] } },
    //         // {
    //         //   feLevel: feLevel
    //         // },
    //         {
    //           feLevel: { $gte: feLevel }
    //         },
    //         {
    //           exp: { $in: [exp] }
    //         },
    //         {
    //           isLeader: { $in: [isLeader] }
    //         }
    //       ]
    //     });

    //     // console.log('Initial result is ' + result);

    //     // Trying to accomodate multiple jobs in a day, only for both leader and country
    //     // let filteredArray = [];
    //     // result = result.filter(function (item) {
    //     //   let block = false;
    //     //   if (item && item.assignedTo && item.assignedTo.length !== 0) {
    //     //     item.assignedTo.forEach(i => {
    //     //       if (dayjs(i.startDate).isBetween(startDate, endDate) || dayjs(i.endDate).isBetween(startDate, endDate) || dayjs(i.startDate).isSame(startDate) || dayjs(i.endDate).isSame(endDate) || (i.startTimeStart && dayjs(i.startDate).isSame(endDate) && Number(i.startTimeStart.slice(0, 2)) < Number(endTimeEnd.slice(0, 2))) || (i.endTimeEnd && dayjs(i.endDate).isSame(startDate) && Number(i.endTimeEnd.slice(0, 2)) > Number(startTimeStart.slice(0, 2))) || (dayjs(i.startDate).isAfter(startDate) && dayjs(i.endDate).isBefore(endDate)) || (dayjs(i.startDate).isBefore(startDate) && dayjs(i.endDate).isAfter(endDate))) {
    //     //         console.log('This needs to be removed' + item.name);
    //     //         block = true;
    //     //       } else {
    //     //         console.log('Assigned but available' + item.name);
    //     //         // filteredArray.push(item);
    //     //         return item;
    //     //       }
    //     //     });
    //     //     if (!block) {
    //     //       filteredArray.push(item);
    //     //     }
    //     //   } else {
    //     //     console.log('Not assigned');
    //     //     filteredArray.push(item);
    //     //     return item;
    //     //   }
    //     // });

    //     // console.log('Final result is ' + filteredArray);

    //     // filteredArray = [...new Set(filteredArray)];
    //     // res.json(filteredArray);
    //     res.json(result);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    try {
      let result = await userModel.find({
        $and: [
          {
            machines: { $in: [machines] }
          },
          {
            skills: { $in: [skills] }
          },
          {
            productExp: { $in: [productExp] }
          },
          {
            exp: { $in: [exp] }
          },
          { isLeader: { $in: [isLeader] } },
          {
            feLevel: { $gte: feLevel }
          }
          // {
          //   feLevel: feLevel
          // }
        ]
      });

      // let filteredArray = [];
      // result = result.filter(function (item) {
      //   let block = false;
      //   if (item && item.assignedTo && item.assignedTo.length !== 0) {
      //     item.assignedTo.forEach(i => {
      //       if (dayjs(i.startDate).isBetween(startDate, endDate) || dayjs(i.endDate).isBetween(startDate, endDate) || dayjs(i.startDate).isSame(startDate) || dayjs(i.endDate).isSame(endDate) || dayjs(i.startDate).isSame(endDate) || dayjs(i.endDate).isSame(startDate)) {
      //         console.log('This needs to be removed');
      //         block = true;
      //       } else {
      //         console.log('Assigned but available');
      //         // filteredArray.push(item);
      //         return item;
      //       }
      //     });
      //     if (!block) {
      //       filteredArray.push(item);
      //     }
      //   } else {
      //     console.log('Not assigned anywhere');
      //     filteredArray.push(item);
      //     return item;
      //   }
      // });

      // filteredArray = [...new Set(filteredArray)];
      // res.json(filteredArray);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      let result = await userModel.find({
        $and: [
          {
            machines: { $in: [machines] }
          },
          {
            skills: { $in: [skills] }
          },
          {
            productExp: { $in: [productExp] }
          },
          {
            exp: { $in: [exp] }
          },
          {
            feLevel: { $gte: feLevel }
          }
          // {
          //   feLevel: feLevel
          // }
        ]
      });
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
});

app.post('/api/assign_jobs', async (req, res) => {
  const { skills, machines, productExp, feLevel, exp, isLeader } = req.body;
  if (skills === 'BPS' || skills === 'Adaptation') {
    if (isLeader) {
      try {
        if (exp.includes('Beginner')) {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              { isLeader: { $in: [isLeader] } },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        } else if (exp.includes('Intermediate')) {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                exp: { $regex: productExp + '.*Advanced|' + productExp + '.*Intermediate' }
              },
              { isLeader: { $in: [isLeader] } },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        } else if (exp.includes('Advanced')) {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                exp: { $in: [exp] }
              },
              { isLeader: { $in: [isLeader] } },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        } else {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                exp: { $in: [exp] }
              },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        if (exp.includes('Beginner')) {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        } else if (exp.includes('Intermediate')) {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                exp: { $regex: productExp + '.*Advanced|' + productExp + '.*Intermediate' }
              },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        } else if (exp.includes('Advanced')) {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                exp: { $in: [exp] }
              },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        } else {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                exp: { $in: [exp] }
              },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        }
      } catch (error) {
        console.log(error);
      }
    }
  } else if (skills === 'BDS') {
    if (isLeader) {
      try {
        if (exp.includes('Beginner')) {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              { isLeader: { $in: [isLeader] } },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        } else if (exp.includes('Intermediate')) {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                exp: { $regex: machines + '.*Advanced|' + machines + '.*Intermediate' }
              },
              { isLeader: { $in: [isLeader] } },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        } else if (exp.includes('Advanced')) {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                exp: { $in: [exp] }
              },
              { isLeader: { $in: [isLeader] } },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        } else {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                exp: { $in: [exp] }
              },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        if (exp.includes('Beginner')) {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        } else if (exp.includes('Intermediate')) {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                exp: { $regex: machines + '.*Advanced|' + machines + '.*Intermediate' }
              },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        } else if (exp.includes('Advanced')) {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                exp: { $in: [exp] }
              },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        }
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    if (isLeader) {
      try {
        if (exp.includes('Beginner')) {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              { isLeader: { $in: [isLeader] } },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        } else if (exp.includes('Intermediate')) {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                exp: { $regex: 'd' }
              },
              { isLeader: { $in: [isLeader] } },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        } else if (exp.includes('Advanced')) {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                exp: { $in: [exp] }
              },
              { isLeader: { $in: [isLeader] } },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        } else {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                exp: { $in: [exp] }
              },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        if (exp.includes('Beginner')) {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        } else if (exp.includes('Intermediate')) {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                exp: { $regex: 'd' }
              },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        } else if (exp.includes('Advanced')) {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                exp: { $in: [exp] }
              },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        } else {
          let result = await userModel.find({
            $and: [
              {
                machines: { $in: [machines] }
              },
              {
                skills: { $in: [skills] }
              },
              {
                productExp: { $in: [productExp] }
              },
              {
                exp: { $in: [exp] }
              },
              {
                feLevel: { $gte: feLevel }
              }
            ]
          });
          res.json(result);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  // if (isLeader) {
  //   try {
  //     if (exp.includes('Beginner')) {
  //       let result = await userModel.find({
  //         $and: [
  //           {
  //             machines: { $in: [machines] }
  //           },
  //           {
  //             skills: { $in: [skills] }
  //           },
  //           {
  //             productExp: { $in: [productExp] }
  //           },
  //           { isLeader: { $in: [isLeader] } },
  //           {
  //             feLevel: { $gte: feLevel }
  //           }
  //         ]
  //       });
  //       res.json(result);
  //     } else if (exp.includes('Intermediate')) {
  //       let result = await userModel.find({
  //         $and: [
  //           {
  //             machines: { $in: [machines] }
  //           },
  //           {
  //             skills: { $in: [skills] }
  //           },
  //           {
  //             productExp: { $in: [productExp] }
  //           },
  //           {
  //             exp: { $regex: 'd' }
  //           },
  //           { isLeader: { $in: [isLeader] } },
  //           {
  //             feLevel: { $gte: feLevel }
  //           }
  //         ]
  //       });
  //       res.json(result);
  //     } else if (exp.includes('Advanced')) {
  //       let result = await userModel.find({
  //         $and: [
  //           {
  //             machines: { $in: [machines] }
  //           },
  //           {
  //             skills: { $in: [skills] }
  //           },
  //           {
  //             productExp: { $in: [productExp] }
  //           },
  //           {
  //             exp: { $in: [exp] }
  //           },
  //           { isLeader: { $in: [isLeader] } },
  //           {
  //             feLevel: { $gte: feLevel }
  //           }
  //         ]
  //       });
  //       res.json(result);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // } else {
  //   try {
  //     if (exp.includes('Beginner')) {
  //       let result = await userModel.find({
  //         $and: [
  //           {
  //             machines: { $in: [machines] }
  //           },
  //           {
  //             skills: { $in: [skills] }
  //           },
  //           {
  //             productExp: { $in: [productExp] }
  //           },
  //           {
  //             feLevel: { $gte: feLevel }
  //           }
  //         ]
  //       });
  //       res.json(result);
  //     } else if (exp.includes('Intermediate')) {
  //       let result = await userModel.find({
  //         $and: [
  //           {
  //             machines: { $in: [machines] }
  //           },
  //           {
  //             skills: { $in: [skills] }
  //           },
  //           {
  //             productExp: { $in: [productExp] }
  //           },
  //           {
  //             exp: { $regex: 'd' }
  //           },
  //           {
  //             feLevel: { $gte: feLevel }
  //           }
  //         ]
  //       });
  //       res.json(result);
  //     } else if (exp.includes('Advanced')) {
  //       let result = await userModel.find({
  //         $and: [
  //           {
  //             machines: { $in: [machines] }
  //           },
  //           {
  //             skills: { $in: [skills] }
  //           },
  //           {
  //             productExp: { $in: [productExp] }
  //           },
  //           {
  //             exp: { $in: [exp] }
  //           },
  //           {
  //             feLevel: { $gte: feLevel }
  //           }
  //         ]
  //       });
  //       res.json(result);
  //     } else {
  //       let result = await userModel.find({
  //         $and: [
  //           {
  //             machines: { $in: [machines] }
  //           },
  //           {
  //             skills: { $in: [skills] }
  //           },
  //           {
  //             productExp: { $in: [productExp] }
  //           },
  //           {
  //             exp: { $in: [exp] }
  //           },
  //           {
  //             feLevel: { $gte: feLevel }
  //           }
  //         ]
  //       });
  //       res.json(result);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
});

//test
app.post('/api/schedule', async (req, res) => {
  try {
    res.json('Assigning task here');
  } catch (error) {
    console.log(error);
  }
});

//Delete Schedule

app.post('/api/delete_schedule', async (request, response) => {
  const { id, nameDel } = request.body;
  try {
    if (mongoose.isValidObjectId(id)) {
      // await userModel.updateOne({_id : id},{$pull: assignedTo: {name}})
      await userModel.updateOne({ _id: id }, { $pull: { assignedTo: { name: nameDel } } });
      response.json('User updated');
    }
  } catch (error) {
    console.log(error);
  }
});

//Editing resource
app.put('/api/edit_user', async (request, response) => {
  const { data, id } = request.body;
  try {
    if (mongoose.isValidObjectId(id)) {
      await userModel.updateMany({ _id: id }, [
        { $set: { name: data.name } },
        { $set: { skills: data.skills } },
        { $set: { isLeader: data.isLeader } },
        { $set: { machines: data.machines } },
        { $set: { countries: data.countries } },
        // { $set: { assignedTo: data.assignedTo ? data.assignedTo : [] } },
        { $set: { productExp: data.productExp } },
        { $set: { exp: data.exp } },
        { $set: { feLevel: data.feLevel } },
        { $set: { nationality: data.nationality } }

        // { $set: { m3Value: data.m3Value } },
        // { $set: { m5Value: data.m5Value } },
        // { $set: { m7Value: data.m7Value } },
        // { $set: { x9Value: data.x9Value } },
        // { $set: { cSegmentValue: data.cSegmentValue } },
        // { $set: { pronoteValue: data.pronoteValue } }
      ]);
      response.json('User updated');
    }
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

//Edit Job
app.put('/api/edit_job', async (request, response) => {
  const { data, id } = request.body;
  // console.log(data);
  try {
    if (mongoose.isValidObjectId(id)) {
      await jobModel.updateMany({ _id: id }, [
        { $set: { name: data.name } },
        { $set: { skillsReq: data.skillsReq } },
        { $set: { startDate: data.startDate } },
        { $set: { endDate: data.endDate } },
        { $set: { category: data.category } },
        { $set: { machines: data.machines } },
        { $set: { country: data.country } },
        { $set: { feCount: data.feCount } },
        //  { $set: { assigned: data.assigned } },
        { $set: { feLevel: data.feLevel } },
        { $set: { lead: data.lead } },
        { $set: { exp: data.exp } }
      ]);
      response.json('Job updated');
    }
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.put('/api/delete_assigned', async (request, response) => {
  const { id, resourceArray } = request.body;
  try {
    if (mongoose.isValidObjectId(id)) {
      await jobModel.updateOne(
        { _id: id },
        {
          $pull: { assigned: { $in: resourceArray } },
          $set: { assignedCount: 0 }
        }
      );
      response.send('Updated job');
    }
  } catch (error) {
    console.log(error);
  }
});

// GANTT PRO INTEGRATION
// 1. GENERATING URL LINK FOR TASKLIST

app.post('/api/gantt_pro', async (req, res) => {
  const { name, projectsGp } = req.body;
  // console.log(req.body);
  const url = 'https://api.ganttpro.com/v1.0/resources';
  const options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-Key': `${process.env.KEY}` } };
  try {
    const { data } = await axios.get(url, options);
    const filteredData = data.filter(item => item.name.includes(name));
    const arr = [];
    const arr2 = [];
    let resourceId = filteredData[0].id;
    let str = '';
    filteredData[0].resourceProjects.forEach(item => {
      arr.push(item.projectId);
    });
    // arr is the list of projects
    //Compare Arr and projectGp
    arr.forEach(item => {
      if (projectsGp.includes(item)) {
        arr2.push(item);
      }
    });

    // console.log(arr2.length); THIS IS THE FILTERED ARRAY CONTAINING VALID PROJECTS
    // console.log(arr.length);

    arr2.forEach(item => {
      str = str + item + ',';
    });
    const str2 = str.slice(0, -1);

    // res.json(str2);
    const url2 = `https://api.ganttpro.com/v1.0/tasks?projectId=${str2}`;
    const d = {
      link: url2,
      id: resourceId
    };
    res.json(d);
  } catch (error) {
    console.log(error);
    res.sendStatus(400).send(error);
  }
});

//CHECKING PROJECTS
app.get('/api/get_projects', async (req, res) => {
  try {
    const url = 'https://api.ganttpro.com/v1.0/projects';
    const options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-Key': `${process.env.KEY}` } };
    const { data } = await axios.get(url, options);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/get_project', async (req, res) => {
  const { projectId } = req.body;
  try {
    const url = `https://api.ganttpro.com/v1.0/tasks?projectId=${projectId}`;
    const options = {
      method: 'GET',
      headers: { Accept: 'application/json', 'X-API-Key': `${process.env.KEY}` }
    };
    const { data } = await axios.get(url, options);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.get('/api/get_resource', async (req, res) => {
  try {
    const url = 'https://api.ganttpro.com/v1.0/resources';
    const options = {
      method: 'GET',
      headers: { Accept: 'application/json', 'X-API-Key': `${process.env.KEY}` }
    };
    const { data } = await axios.get(url, options);

    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/assign_ganttPro', async (req, res) => {
  const { resources, taskId } = req.body;
  const resourceArray = [];
  const url = `https://api.ganttpro.com/v1.0/tasks/${taskId}/assignResource`;

  const headers = { Accept: 'application/json', 'Content-Type': 'application/json', 'X-API-Key': `${process.env.KEY}` };
  resources.forEach(i => {
    let rItem = { resourceId: '' };
    rItem.resourceId = i;
    resourceArray.push(rItem);
  });
  const body = { resources: resourceArray };
  // console.log(body);

  try {
    const d1 = await axios.post(url, body, { headers: headers });
    res.json('Updated');
  } catch (error) {
    console.log(error);
    res.json('Server Error');
  }
});

// 2. SCRAPING TASKLIST FOR AVAILABILITY
app.post('/api/gantt_proCheck', async (req, res) => {
  const { url, startDate, endDate, id } = req.body;
  const options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-Key': `${process.env.KEY}` } };
  try {
    const { data } = await axios.get(url, options);
    let clash = false;
    data.forEach(item => {
      let ids = [];
      item.resources.forEach(i => {
        ids.push(i.resourceId);
      });
      if (item.resources.length && ids.includes(id)) {
        if (dayjs(item.startDate.split(' ')[0]).isBetween(startDate, endDate) || dayjs(item.endDate.split(' ')[0]).isBetween(startDate, endDate) || dayjs(item.startDate.split(' ')[0]).isSame(startDate) || dayjs(item.endDate.split(' ')[0]).isSame(endDate) || dayjs(item.startDate.split(' ')[0]).isSame(endDate) || dayjs(item.endDate.split(' ')[0]).isSame(startDate) || (dayjs(item.startDate.split(' ')[0]).isAfter(startDate) && dayjs(item.endDate.split(' ')[0]).isBefore(endDate)) || (dayjs(item.startDate.split(' ')[0]).isBefore(startDate) && dayjs(item.endDate.split(' ')[0]).isAfter(endDate))) {
          clash = true;
          console.log('Clashed with ' + item.name + ' ' + item.id);
          console.log(item);
        }
      }
    });
    if (clash) {
      res.json('Not available');
    } else {
      res.json('Available');
    }
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/workload', async (req, res) => {
  const { arr } = req.body;
  let ids = '';
  arr.forEach(item => {
    ids = ids + ',' + item;
  });
  let a = ids.length;
  let b = ids.substring(1, a);

  const url = `https://api.ganttpro.com/v1.0/tasks?projectId=${b}`;
  const options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-Key': `${process.env.KEY}` } };

  try {
    let filteredData = [];
    const { data } = await axios.get(url, options);

    data.filter(item => {
      if (item.resources.length !== 0) {
        filteredData.push(item);
      }
    });
    // res.json(data);
    res.json(filteredData);
  } catch (error) {
    console.log(error);
  }
});

// ADD BPS Schedule
app.post('/api/add_bps-schedule', async (request, response) => {
  const bps = new bpsCalModel(request.body);

  try {
    await bps.save();
    response.send('Added new schedule');
  } catch (error) {
    response.status(500).send(error);
  }
});

//GET BPS Schedule
app.get('/api/bps-schedule', async (request, response) => {
  const schedule = await bpsCalModel.find({});
  try {
    response.send(schedule);
  } catch (error) {
    response.status(500).send(error);
  }
});

// DELETE ENTRY
app.post('/api/delete_bps', async (req, res) => {
  const { id } = req.body;
  let users = [];
  let user;
  try {
    const job = await bpsCalModel.findOne({ _id: id });
    bpsCalModel.deleteOne({ _id: id }, () => {
      res.json('deleted');
    });
  } catch (error) {
    console.log(error);
  }
});

// UPDATE ROUTES
app.put('/api/edit_bps', async (request, response) => {
  const { data } = request.body;

  async function updateSchedules(item) {
    await bpsCalModel.updateOne({ _id: item._id }, [{ $set: { range: item.range } }]);
  }

  try {
    data.forEach(item => {
      if (mongoose.isValidObjectId(item._id)) {
        updateSchedules(item);
      }
    });
    response.status(200).send('Schedule updated');
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

// BDS Calendar Routes

// ADD BDS Schedule
app.post('/api/add_bds-schedule', async (request, response) => {
  const bds = new bdsCalModel(request.body);

  try {
    await bds.save();
    response.send('Added new schedule');
  } catch (error) {
    response.status(500).send(error);
  }
});

//GET BDS Schedule
app.get('/api/bds-schedule', async (request, response) => {
  const schedule = await bdsCalModel.find({});
  try {
    response.send(schedule);
  } catch (error) {
    response.status(500).send(error);
  }
});

// DELETE ENTRY
app.post('/api/delete_bds', async (req, res) => {
  const { id } = req.body;
  let users = [];
  let user;
  try {
    const job = await bdsCalModel.findOne({ _id: id });
    bdsCalModel.deleteOne({ _id: id }, () => {
      res.json('deleted');
    });
  } catch (error) {
    console.log(error);
  }
});

// UPDATE ROUTES
app.put('/api/edit_bds', async (request, response) => {
  const { data } = request.body;

  async function updateSchedules(item) {
    await bdsCalModel.updateOne({ _id: item._id }, [{ $set: { range: item.range } }]);
  }

  try {
    data.forEach(item => {
      if (mongoose.isValidObjectId(item._id)) {
        updateSchedules(item);
      }
    });
    response.status(200).send('Schedule updated');
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Frontend/build')));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'Frontend', 'build', 'index.html')));
} else {
  app.get('/', (req, res) => {
    res.send('Helloooo');
  });
}

//

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening at ${port} `);
});
