import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { delEducation } from '../../actions/profile';

//education array passed from parent dashboard
const Education = ({ education, delEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format='DD/MM/YY'>{edu.from}</Moment> -{' '}
        {edu.to === null ? 'Now' : <Moment format='DD/MM/YY'>{edu.to}</Moment>}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => {
            delEducation(edu._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  delEducation: PropTypes.func.isRequired,
};

export default connect(null, { delEducation })(Education);
