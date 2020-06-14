import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile, delAccount } from '../../actions/profile';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DashboardButtons from './DashboardButtons';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ getCurrentProfile, auth, profile, delAccount }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {auth.user && auth.user.name}
      </p>

      {profile.profile !== null ? (
        <Fragment>
          <DashboardButtons user_id={auth.user._id} />
          <Experience experience={profile.profile.experience} />
          <Education education={profile.profile.education} />
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => delAccount()}>
              <i className='fas fa-user-minus'></i>
              {' Delete My Account'}
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet created a profile. Please add some info.</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  delAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, delAccount })(
  Dashboard
);
