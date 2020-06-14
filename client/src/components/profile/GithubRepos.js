import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRepos } from '../../actions/profile';
import Repo from './Repo';

const GithubRepos = ({ username, getRepos, repos }) => {
  useEffect(() => {
    getRepos(username);
  }, [getRepos, username]);

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>
        <i className='fab fa-github'></i> Github Repos
      </h2>
      {repos.length !== 0 &&
        repos.map((repo) => <Repo key={repo.id} repo={repo} />)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

GithubRepos.propTypes = {
  getRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, { getRepos })(GithubRepos);
