/**
 * @file root reducer
 * @date 2023-11-08
 * @author Frank Su
 * @lastModify Frank Su 2023-11-08
 */
import { combineReducers } from 'redux';

// import demoReducer from './moduleA/reducer';

// combine all the reducer in here
const rootReducer = combineReducers({});
// export the root reducer state
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
