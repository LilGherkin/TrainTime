var firebaseConfig = {
    apiKey: "AIzaSyD0mL-g0VdTOQHpUm3FEg0pb7lDQSJn6z8",
    authDomain: "traintime-aa520.firebaseapp.com",
    databaseURL: "https://traintime-aa520.firebaseio.com",
    projectId: "traintime-aa520",
    storageBucket: "traintime-aa520.appspot.com",
    messagingSenderId: "975185818965",
    appId: "1:975185818965:web:fbe652e88e30aee9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  // 2. Button for adding new trains
  $("#AddTrainButton").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var TrainName = $("#TrainNameInput").val().trim();
    var TrainDestination = $("#TrainDestinationInput").val().trim();
    var FirstTrainTime = moment($("#FirstTrainTimeInput").val().trim(), "HH:mm").format("X");
    var Frequency = $("#FrequencyInput").val().trim();
  
    // Creates local "temporary" object for holding new train data
    var NewTrain = {
      Name: TrainName,
      Destination: TrainDestination,
      FirstTime: FirstTrainTime,
      FrequencyMM: Frequency
    };
  
    // Uploads train data to the database
    database.ref().push(NewTrain);
  
    // Logs everything to console
    console.log(NewTrain.Name);
    console.log(NewTrain.Destination);
    console.log(NewTrain.FirstTime);
    console.log(NewTrain.FrequencyMM);
  
    alert("Train Added");
  
    // Clears all of the text-boxes
    $("#TrainNameInput").val("");
    $("#TrainDestinationInput").val("");
    $("#FirstTrainTimeInput").val("");
    $("#FrequencyInput").val("");
  });
  
  // 3. Create Firebase event for adding a train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var TrainsName = childSnapshot.val().Name;
    var TrainsDestination = childSnapshot.val().Destination;
    var TrainsFirstTime = childSnapshot.val().FirstTime;
    var TrainsFrequency = childSnapshot.val().Frequency;
  
    // Employee Info
    console.log(TrainsName);
    console.log(TrainsDestination);
    console.log(TrainsFirstTime);
    console.log(TrainsFrequency);
  
    // Calculate the time until the next train.
    /*
    var empMonths = moment().diff(moment(empStart, "X"), "months");
    console.log(empMonths);
  
    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);
  */
    // Create the new row
    var NewRow = $("<tr>").append(
      $("<td>").text(TrainName),
      $("<td>").text(TrainDestination),
      $("<td>").text(TrainsFirstTime),
      $("<td>").text(Frequency),
    );
  
    // Append the new row to the table
    $("#TrainTable > tbody").append(newRow);
  });
  