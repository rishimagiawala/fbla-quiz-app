import firebase from 'firebase'
//Creates and initializes a Firebase app instance at app startup
firebase.initializeApp( {
    apiKey: "AIzaSyDHrtlWgDCBdViTQu2meJK1u0TsIyGicqY",
    authDomain: "fblaproject-f041f.firebaseapp.com",
    databaseURL: "https://fblaproject-f041f-default-rtdb.firebaseio.com",
    projectId: "fblaproject-f041f",
    storageBucket: "fblaproject-f041f.appspot.com",
    messagingSenderId: "600487225359",
    appId: "1:600487225359:web:c0981df61dfe8ad1429b7a",
    measurementId: "G-VXVPY0NWN2"
  });

  //creating an exportable database object that is connected to the Firebase Realtime Database(However, I default to using firebase.database() anyways)
  export const userDatabase = firebase.initializeApp({
    databaseURL:'https://fblatriviausers.firebaseio.com/'
  }, 'userDatabase')
  
  //creating an auth object for Firebase Google Sign In Functionality
  export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()

//SignInWithGoogle function that is provided in Google Firebase Docs.
export const signInWithGoogle = (googleSignIn) => {
  auth.signInWithPopup(googleProvider).then((res) => {
    
    firebase.database(userDatabase).ref('users/' + res.user.uid).once('value').then((snapshot) => {
      //Checking to see if the user already exists within the database. If not, then it will populate it with user's google info
     if(!snapshot.val()){
      firebase.database(userDatabase).ref('users/' + res.user.uid).set({
        username: res.user.displayName,
        email: res.user.email,
        profile_picture : res.user.photoURL,
        
      }, function(error) {
        if (error) {
          console.log(error)
        } else {
          console.log('user updated in database')
        }
      });
     }
     else{
       console.log('User already exists in the database')
     }
     
    });
    
  
    // console.log(res.user.uid)
    googleSignIn(res.user)
    
  }).catch((error) => {
    console.log(error.message)
   
    
  })

}
// storage object for storing the png of a user's  last attempt(However I default to using firebase.storage() anyways)
export var storageRef = firebase.storage().ref();



  export default firebase