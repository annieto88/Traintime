
var trainData = new Firebase("https://ggfirebase.firebaseio.com/");

$("#addTrainBtn").on("click", function(){
	
	var trainName = $("#trainNameInput").val().trim();
	var trainDestination = $("#destinationInput").val().trim();
	var trainFirst = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(1,"years").format("X");
	var trainFrequency = $("#frequencyInput").val().trim();
	
	var newTrain = {
		name:  trainName,
		destination: trainDestination,
		trainFirst: trainFirst,
		frequency: trainFrequency
	}

	trainData.push(newTrain);

	
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

	
	return false;
});

trainData.on("child_added", function(childSnapshot, prevChildKey){

var trainName = childSnapshot.val().name;
var trainDestination = childSnapshot.val().destination;
var trainFirst = childSnapshot.val().trainFirst;
var trainFrequency = childSnapshot.val().frequency;

var timeDifference = moment().diff(moment.unix(trainFirst), "minutes");

var minutesAway = trainFrequency - (timeDifference % trainFrequency);

var nextTrain = moment().add(minutesAway, "minutes").format('HH:mm');

$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td></tr>");

});

setInterval(date,1000);

function date(){

	$("#todaydate").html(moment(new Date()).format('LTS'));

}

