import React, { createContext, useEffect } from 'react'
import app from 'firebase/app'
import 'firebase/database';
import { useDispatch } from 'react-redux';

var firebaseConfig = {
  apiKey: "AIzaSyDNvEsy7K-407UAPL8DNOmpmXvmWp-ee8w",
  authDomain: "project-plan-7382a.firebaseapp.com",
  databaseURL: "https://project-plan-7382a.firebaseio.com",
  projectId: "project-plan-7382a",
  storageBucket: "project-plan-7382a.appspot.com",
  messagingSenderId: "590713472487",
  appId: "1:590713472487:web:cf2dc7fe6dbe6135746942",
  measurementId: "G-20VTLV70NZ"
};

// we create a React Context, for this to be accessible
// from a component later
const FirebaseContext = createContext(null)
export { FirebaseContext }

export default ({ children }) => {
    let firebase = {
        app: null,
        database: null
    }

    const dispatch = useDispatch();

    // check if firebase app has been initialized previously
    // if not, initialize with the config we saved earlier
    if (!app.apps.length) {
        app.initializeApp(firebaseConfig);
        firebase = {
            app: app,
            database: app.database(),

        }
    }

    return (
        <FirebaseContext.Provider value={firebase}>
            {children}
        </FirebaseContext.Provider>
    )
}