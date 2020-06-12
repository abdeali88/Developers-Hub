import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import userProfile from './userProfile';

export default combineReducers({ alert, auth, profile, userProfile });
