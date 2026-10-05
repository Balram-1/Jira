require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Project = require('./src/models/Project');
const Issue = require('./src/models/Issue');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jira_db');
    console.log('Connected to DB');

    // 1. Upgrade all existing users to ADMIN so they aren't stuck
    await User.updateMany({}, { role: 'ADMIN' });
    console.log('Upgraded existing users to ADMIN');

    const users = await User.find();
    if (users.length === 0) {
      console.log('No users found to assign projects to. Please register a user first.');
      process.exit(0);
    }
    
    const mainUser = users[0];

    // 2. Create some fake projects if they don't exist
    const existingProjects = await Project.find();
    let project1, project2;

    if (existingProjects.length === 0) {
      project1 = await Project.create({
        name: 'Website Redesign',
        description: 'Overhauling the main corporate website with React',
        key: 'WEB',
        owner: mainUser._id,
        members: [{ user: mainUser._id, role: 'MANAGER' }]
      });

      project2 = await Project.create({
        name: 'Mobile App V2',
        description: 'React Native mobile application',
        key: 'MOB',
        owner: mainUser._id,
        members: [{ user: mainUser._id, role: 'MANAGER' }]
      });
      console.log('Created fake projects');

      // 3. Create fake issues
      await Issue.create([
        {
          title: 'Design new landing page',
          description: 'Figma designs need to be converted to React components.',
          project: project1._id,
          status: 'TODO',
          priority: 'HIGH',
          assignee: mainUser._id,
          reporter: mainUser._id
        },
        {
          title: 'Fix navigation bug on mobile',
          description: 'Hamburger menu doesn\'t open on iOS Safari.',
          project: project1._id,
          status: 'IN_PROGRESS',
          priority: 'CRITICAL',
          assignee: mainUser._id,
          reporter: mainUser._id
        },
        {
          title: 'Setup push notifications',
          description: 'Integrate Firebase for Android/iOS push notifications.',
          project: project2._id,
          status: 'TODO',
          priority: 'MEDIUM',
          assignee: mainUser._id,
          reporter: mainUser._id
        }
      ]);
      console.log('Created fake issues');
    } else {
      console.log('Projects already exist, skipping seed.');
    }

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
