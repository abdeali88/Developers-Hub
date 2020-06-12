import React from 'react';
import PropTypes from 'prop-types';
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

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
