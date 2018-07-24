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
  var mins;
  var nextOne;

  var datetime;
  var date;

  //live updates time in the header ever second
  var update = function () {
    date = moment(new Date());
    datetime.html(date.format("dddd, Do MMMM YYYY, h:mm:ss a"));
  };
  $(document).ready(function () {
    datetime = $('.train-time');
    update();
    setInterval(update, 1000);
  });


  // dataRef.on("child_added", function (snapshot) {
  //   keys.push(snapshot.key);
  //   console.log(snapshot.key);
  //   console.log(keys);
  // });
  dataRef.on('child_added', function (snapshot) {
    keys.push(snapshot.key);
    oakToOak = snapshot.val();
    appendTrain(snapshot.val());
  });


  function appendTrain(train) {
    nextArrival(train.firstTrain, train.frequency);
    // console.log(nextTrainTime);
    console.log(mins);
    var newRow = $('<tr>');
  
    newRow.append('<td>' + train.trainName + '</td>');
    newRow.append('<td>' + train.destination + '</td>');
    newRow.append('<td>' + train.frequency + '</td>');
    newRow.append('<td>' + nextOne + '</td>');
    newRow.append('<td>' + mins + '</td>');
    $('.mainTable').append(newRow);
  }

  function nextArrival(firstTrain, interval) {
    var firstTrainToday = moment(new Date()).format("dddd, Do MMMM YYYY " + firstTrain);
    console.log(firstTrainToday);
    //changing firstTrain time to include ms
    console.log(firstTrain);
    //the current time as a variable
    var now = moment(new Date());
    //first train of the day as a variable
    var firstGuy = moment(firstTrainToday, 'dddd, Do MMMM YYYY HH:mm');
    console.log('first train came at ' + firstGuy.format('HH:mm'));
    //how many minutes have passed since the first train
    var diff = now.diff(firstGuy, 'minutes');   
    console.log('mins since first train ' + diff);
    //minutes passed/interval gives us the number of trains that have already gone by
    var trainsPassed = Math.floor(diff/interval);
    console.log('trains passed ' + trainsPassed);
    //adding 1 to this gives us the next train's times
    var nextTrain = (trainsPassed + 1) * interval;
    console.log('next train time' + nextTrain);
    //shows the time of the next train
    var nextTrainTime = firstGuy.add(nextTrain, 'minutes').format('dddd, Do MMMM YYYY HH:mm');
    var nextTrainHR = firstGuy.add(nextTrain, 'minutes').format('hh:mm a');
    console.log(nextTrainHR);
    var minutesAway = moment(nextTrainTime , 'Do MMMM YYYY HH:mm:ss').diff(now, 'minutes');
    console.log('minutes away: ' + minutesAway);
    mins = minutesAway;
    nextOne = nextTrainHR;
    console.log(nextOne);
    console.log(mins);
    // $('.test-time').html(nextTrainTime);
  }
  

  function addTrain() {
    dataRef.push({
      destination: "Charlotte",
      firstTrain: "04:00",
      frequency: "120",
      trainName: "QC: Queens Carriage"      
    });
  }
  // addTrain();
});

