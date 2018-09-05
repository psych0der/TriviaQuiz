import { combineReducers } from 'redux';
import questions from './questions';
import quiz from './quiz';
export default combineReducers({
  questions,
  quiz,
});
