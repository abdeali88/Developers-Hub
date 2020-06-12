import React from 'react';
import PropTypes from 'prop-types';
import Education from './Education';

const ProfileEducation = ({ education }) => {
  return (
    <div className='profile-edu bg-white p-2'>
      <h2 className='text-primary'>Education</h2>
      {education.map((edu) => (
        <Education edu={edu} key={edu._id} />
      ))}
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired,
};

export default ProfileEducation;
