import * as firebase from 'firebase/app'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCde5_X0MXI3xqUowt9AA7OQF1Xyylpnj8",
    authDomain: "home-land-2019.firebaseapp.com",
    databaseURL: "https://home-land-2019.firebaseio.com",
    projectId: "home-land-2019",
    storageBucket: "home-land-2019.appspot.com",
    messagingSenderId: "103632097463",
    appId: "1:103632097463:web:0f84ac02126d018a"
  })
}

export default firebase
