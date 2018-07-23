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

  var keys = [];
  var dataRef = firebase.database().ref("trains");
  var oakKey = "-LI2tjawUqlYWUnl-VTR";
  var oakToOak;
  console.log(oakToOak);


  dataRef.on("child_added", function(snapshot) {
    keys.push(snapshot.key);
    console.log(snapshot.key);
    console.log(keys);
  });
  dataRef.on('value', function(snapshot) {
    console.log(snapshot.val());
    oakToOak = snapshot.val()[oakKey];
    console.log(oakToOak);
    console.log(oakToOak.trainName);
    appendTrain(oakToOak);
  });

  // appendTrain(oakToOak);
  console.log("global " + oakToOak);
  function appendTrain(train) {
    var newRow = $('<tr>');
    var newTD = $('<td>');
    newRow.append('<td>' + train.trainName + '</td>');
    newRow.append('<td>' + train.destination + '</td>');
    newRow.append('<td>' + train.frequency + '</td>');
    newRow.append('<td>' + "Next Arrival" + '</td>');
    newRow.append('<td>' + "Mins Away" + '</td>');
    $('.mainTable').append(newRow);
  }



  function addTrain() {
    dataRef.push({
      trainName: "",
      destination: "",
      frequency: "",
      nextArrival: "",
      minutesAway: "",

    });
  }
});

