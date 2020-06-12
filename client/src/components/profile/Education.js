import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Education = ({
  edu: { from, to, degree, current, fieldofstudy, school, description },
}) => {
  return (
    <div>
      <h3>{school}</h3>
      <p>
        <Moment format='DD/MM/YYYY'>{from}</Moment> -{' '}
        {current ? 'Current' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

Education.propTypes = {
  edu: PropTypes.object.isRequired,
};

export default Education;
