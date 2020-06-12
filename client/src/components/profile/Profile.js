import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layouts/Spinner';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import GithubRepos from './GithubRepos';
import { Link } from 'react-router-dom';

const Profile = ({
  profile: { profile, loading },
  getProfileById,
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.user_id);
  }, [getProfileById, match.params.user_id]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/profiles' className='btn btn-light'>
        Back to Profile
      </Link>
      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.user._id && (
          <Link to='/edit-profile' className='btn btn-dark'>
            Edit Profile
          </Link>
        )}
      <div className='profile-grid my-1'>
        <ProfileTop profile={profile}></ProfileTop>
        <ProfileAbout profile={profile}></ProfileAbout>
        {profile.experience.length > 0 && (
          <ProfileExperience experience={profile.experience} />
        )}
        {profile.education.length > 0 && (
          <ProfileEducation education={profile.education} />
        )}
        {profile.githubusername && (
          <GithubRepos username={profile.githubusername} />
        )}
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapSTateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapSTateToProps, { getProfileById })(Profile);
