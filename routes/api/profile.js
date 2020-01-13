const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const config = require('config');
const request = require('request');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

//Get my profile
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Create and Update my profile
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //Update
        await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      //Create Profile
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//Get all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.msg);
    return res.status(500).send('Server Error');
  }
});

//Get Profile by user id
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.msg);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    return res.status(500).send('Server Error');
  }
});

//Delete Profile and User
router.delete('/', auth, async (req, res) => {
  try {
    //Deleting Profile
    await Profile.findOneAndRemove({ user: req.user.id });

    //Deleting User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User Deleted' });
  } catch (err) {
    console.error(err.msg);
    return res.status(500).send('Server Error');
  }
});

//Add Profile Experience
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('from', 'From is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title: title,
      company: company,
      location: location,
      from: from,
      to: to,
      current: current,
      description: description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

//Delete Profile Experience
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const expIds = profile.experience.map(exp => exp._id.toString());
    // toString because in req.params.exp_id is of string
    const remIndex = expIds.indexOf(req.params.exp_id);
    // console.log('remIndex', remIndex);
    if (remIndex === -1) {
      return res.status(500).json({ msg: 'Server error' });
    } else {
      profile.experience.splice(remIndex, 1);
      await profile.save();
      return res.status(200).json(profile);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

//Add Profile Education
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required')
        .not()
        .isEmpty(),
      check('degree', 'Degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Field of Study is required')
        .not()
        .isEmpty(),
      check('from', 'From is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school: school,
      degree: degree,
      fieldofstudy: fieldofstudy,
      from: from,
      to: to,
      current: current,
      description: description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

//Delete Profile Education
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get index of education being removed
    const remIndex = profile.education
      .map(item => item._id.toString())
      .indexOf(req.params.edu_id);
    if (remIndex === -1) {
      return res.status(500).json({ msg: 'Server error' });
    } else {
      profile.education.splice(remIndex, 1);
      await profile.save();
      return res.json(profile);
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

//Get github profile repos
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: encodeURI(
        `https://api.github.com/users/${
          req.params.username
        }/repos?per_page=5&sort=created:asc&client_id=${config.get(
          'githubClientId'
        )}&client_secret=${config.get('githubSecret')}`
      ),
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error(err.message);
      }

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No github profile found' });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    return res.send('Server Error');
  }
});
module.exports = router;
