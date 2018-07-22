$(document).ready(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAuRAHyVkNf9DHfIqpyK_KjlxyRQfnHQqI",
    authDomain: "fir-homework-aa7bc.firebaseapp.com",
    databaseURL: "https://fir-homework-aa7bc.firebaseio.com",
    projectId: "fir-homework-aa7bc",
    storageBucket: "fir-homework-aa7bc.appspot.com",
    messagingSenderId: "792771465919"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database().ref("trains");
  dataRef.push({
    trainName: "",
    destination: "",
    frequency: "",
    nextArrival: "",
    minutesAway: "",
  });
  dataRef.on("child_added", function (keySnapshot) {
    var keys = [];
    keys.push(keySnapshot);
    console.log(keySnapshot);
    console.log(keys);
  });
});

