import React from 'react';
import Experience from './Experience';

const ProfileExperience = ({ experience }) => {
  return (
    <div className='profile-exp bg-white p-2'>
      <h2 className='text-primary'>Experience</h2>
      {experience.map((exp) => (
        <Experience exp={exp} key={exp._id} />
      ))}
    </div>
  );
};

export default ProfileExperience;
