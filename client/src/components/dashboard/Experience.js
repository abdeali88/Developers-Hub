import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { delExperience } from '../../actions/profile';

//experience array passed from parent dashboard
const Experience = ({ experience, delExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format='DD/MM/YY'>{exp.from}</Moment> -{' '}
        {exp.to === null ? 'Now' : <Moment format='DD/MM/YY'>{exp.to}</Moment>}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => {
            delExperience(exp._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  delExperience: PropTypes.func.isRequired,
};

export default connect(null, { delExperience })(Experience);
