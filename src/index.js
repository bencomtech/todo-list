import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase/app'
import 'firebase/database'
import 'antd/dist/antd.css'

import App from './components/App'
import firebaseConfig from './firebaseConfig'
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker'

firebase.initializeApp(firebaseConfig)

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, { userProfile: 'users' })
)(createStore)

const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))

registerServiceWorker()
