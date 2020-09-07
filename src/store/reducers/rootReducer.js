// import { firestore } from "firebase";
// import { firestoreReducer } from "react-redux-firebase";

import { firebaseReducer } from "react-redux-firebase";

const { combineReducers } = require("redux");
const { default: authReducer } = require("./authReducer");
const { default: projectReducer } = require("./projectReducer");
// import {firestoreReducer} from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    // firestore: firestoreReducer
    firebase: firebaseReducer
})

export default rootReducer