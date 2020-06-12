import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getMyProfile } from '../../actions/userProfile';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layouts/Spinner';
import DashboardButtons from './DashboardButtons';
import Experience from './Experience';
import Education from './Education';
import { delAccount } from '../../actions/userProfile';

const Dashboard = ({ getMyProfile, auth, userProfile, delAccount }) => {
  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  return userProfile.loading || auth.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {auth.user && (
        <Fragment>
          <h1 className='large text-primary'>Dashboard</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Welcome {auth.user.name}
          </p>
        </Fragment>
      )}
      {userProfile.myProfile !== null ? (
        <Fragment>
          <DashboardButtons />
          <Experience experience={userProfile.myProfile.experience} />
          <Education education={userProfile.myProfile.education} />
          <div className='my-2'>
            <button className='btn btn-danger' onClick={delAccount}>
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
  auth: PropTypes.object.isRequired,
  userProfile: PropTypes.object.isRequired,
  delAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  userProfile: state.userProfile,
});

export default connect(mapStateToProps, { getMyProfile, delAccount })(
  Dashboard
);
