import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

//Custom Reducers
import notifyReducer from './reducers/notifyReducer';

const firebaseConfig = {
    apiKey: "AIzaSyBHc71zuSmyc5XG5JECoTyXOxxD9ZRUm1A",
    authDomain: "react-firebase-client-panel.firebaseapp.com",
    databaseURL: "https://react-firebase-client-panel.firebaseio.com",
    projectId: "react-firebase-client-panel",
    storageBucket: "react-firebase-client-panel.appspot.com",
    messagingSenderId: "1055083206350"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

//initialize firebase instance

firebase.initializeApp(firebaseConfig);


//initialize firestore instance
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), //firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer
});

const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState, compose(
  reactReduxFirebase(firebase),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;
