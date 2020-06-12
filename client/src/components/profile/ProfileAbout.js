import React from 'react';

const ProfileAbout = ({
  profile: {
    skills,
    githubusername,
    bio,
    user: { name },
  },
}) => {
  return (
    <div className='profile-about bg-light p-2'>
      <h2 className='text-primary'>{`${name.split(' ')[0]}'s`} Bio</h2>
      <p>{bio}</p>
      <div className='line'></div>
      <h2 className='text-primary'>Skill Set</h2>
      <div className='skills'>
        {skills.split(',').map((skill, index) => (
          <div key={index} className='p-1'>
            <i className='fa fa-check'></i> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileAbout;
