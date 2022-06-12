import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCUtg4HKe63SvTP_sCwpj_fY091LDF59q0",
    authDomain: "you2ube-clone.firebaseapp.com",
    projectId: "you2ube-clone",
    storageBucket: "you2ube-clone.appspot.com",
    messagingSenderId: "850299508082",
    appId: "1:850299508082:web:889e3965d3c9a545f339eb"
};

firebase.initializeApp(firebaseConfig)

export default firebase.auth()