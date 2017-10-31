// Initialize Firebase
var config = {
  apiKey: "AIzaSyCCziNgg3oHbg-1ImkhY7YjLejP57RFI2A",
  authDomain: "fir-c9d10.firebaseapp.com",
  databaseURL: "https://fir-c9d10.firebaseio.com",
  projectId: "fir-c9d10",
  storageBucket: "fir-c9d10.appspot.com",
  messagingSenderId: "336146428963"
};
firebase.initializeApp(config);

var header = document.getElementById("header");

var databaseReference = firebase
  .database()
  .ref()
  .child("header");

databaseReference.on("value", function(snap) {
  header.innerText = snap.val();
});

var signInButton = document.getElementById("singInButton");

var signOutButton = document.getElementById("singOutButton");

var provider = new firebase.auth.GoogleAuthProvider();

signInButton.addEventListener("click", function() {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(user) {
      if (user) {
        databaseReference.on("value", function(snap) {
          header.innerText = snap.val();
        });
        playgroundReference.on("value", function(snap) {
          playground.value = snap.val();
        });
      }
    });
});

signOutButton.addEventListener("click", function() {
    firebase.auth().signOut().then(function () {
        header.innerText = 'Sing in with google to see your firebase data!'
        playground.value = 'You need to sign in to play here!'

    })
});

var playground = document.getElementById('playground');
var playgroundReference = firebase.database().ref().child('playground');

playground.addEventListener('keyup', function () {
    playgroundReference.set(playground.value);
});
