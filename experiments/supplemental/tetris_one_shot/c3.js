// Simple study demonstrating the use of a tablet-designed webpage. 
// Study is designed using simple JS/HTML/CSS, with data saves to a server
// controlled by call to a short php script. 

// Overview: (i) Parameters (ii) Helper Functions (iii) Control Flow

// ---------------- PARAMETERS ------------------

//length of filler (every time fill2 comes up, add 1sec of time)
var fillerpause = 5000;

// must be a multiple of 4 
var numtrials = 1;

var squarewidth = 20;

// ---------------- HELPER ------------------

// show slide function
function showSlide(id) {
  $(".slide").hide(); //jquery - all elements with class of slide - hide
  $("#"+id).show(); //jquery - element with given id - show
}

//array shuffle function
shuffle = function (o) { //v1.0
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

getCurrentDate = function() {
	var currentDate = new Date();
	var day = currentDate.getDate();
	var month = currentDate.getMonth() + 1;
	var year = currentDate.getFullYear();
	return (month + "/" + day + "/" + year);
}

function updateText(value) {
	$("#sliderlabel").html(value + "%");
}


getCurrentTime = function() {
	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();

	if (minutes < 10) minutes = "0" + minutes;
	return (hours + ":" + minutes);
}

getTrainOrTest = function(num) {
	var trialtype = "";
   	if (num < numtraintrials + 1) {
   		trialtype = "train";
   	} else {
   		trialtype = "test";
   	}
   	return trialtype;  
}

drawShape = function(stim, shape, color, x, y) {

	var square1 = stim.find("#square1")
	var square2 = stim.find("#square2")
	var square3 = stim.find("#square3")
	var square4 = stim.find("#square4")
	var square5 = stim.find("#square5")


	if (shape == "A") {
		square1.attr("style","background:"+color+"; position:absolute;left:"+x+"px;top:"+y+"px;")
		square2.attr("style","background:"+color+"; position:absolute;left:"+(x+squarewidth)+"px;top:"+(y+squarewidth)+"px;")
		square3.attr("style","background:"+color+"; position:absolute;left:"+(x+2*squarewidth)+"px;top:"+y+"px;")
		square4.attr("style","background:"+color+"; position:absolute;left:"+x+"px;top:"+(y+2*squarewidth)+"px;")
		square5.attr("style","background:"+color+"; position:absolute;left:"+(x+2*squarewidth)+"px;top:"+(y+2*squarewidth)+"px;")
	} else if (shape == "B") {
		square1.attr("style","background:"+color+"; position:absolute;left:"+x+"px;top:"+y+"px;")
		square2.attr("style","background:"+color+"; position:absolute;left:"+(x+squarewidth)+"px;top:"+(y+squarewidth)+"px;")
		square3.attr("style","background:"+color+"; position:absolute;left:"+(x+2*squarewidth)+"px;top:"+(y+2*squarewidth)+"px;")
		square4.attr("style","background:"+color+"; position:absolute;left:"+(x+3*squarewidth)+"px;top:"+(y+3*squarewidth)+"px;")
		square5.attr("style","background:"+color+"; position:absolute;left:"+(x+4*squarewidth)+"px;top:"+(y+4*squarewidth)+"px;")
	} else if (shape == "C") {
		square1.attr("style","background:"+color+"; position:absolute;left:"+x+"px;top:"+y+"px;")
		square2.attr("style","background:"+color+"; position:absolute;left:"+(x+squarewidth)+"px;top:"+(y)+"px;")
		square3.attr("style","background:"+color+"; position:absolute;left:"+(x+2*squarewidth)+"px;top:"+(y)+"px;")
		square4.attr("style","background:"+color+"; position:absolute;left:"+(x+3*squarewidth)+"px;top:"+(y)+"px;")
		square5.attr("style","background:"+color+"; position:absolute;left:"+(x+4*squarewidth)+"px;top:"+(y)+"px;")
	} else if (shape == "D") {
		square1.attr("style","background:"+color+"; position:absolute;left:"+x+"px;top:"+y+"px;")
		square2.attr("style","background:"+color+"; position:absolute;left:"+(x+squarewidth)+"px;top:"+(y)+"px;")
		square3.attr("style","background:"+color+"; position:absolute;left:"+(x+squarewidth)+"px;top:"+(y+squarewidth)+"px;")
		square4.attr("style","background:"+color+"; position:absolute;left:"+(x+2*squarewidth)+"px;top:"+(y+squarewidth)+"px;")
		square5.attr("style","background:"+color+"; position:absolute;left:"+(x+2*squarewidth)+"px;top:"+(y+2*squarewidth)+"px;")
	} else if (shape == "E") {
		square1.attr("style","background:"+color+"; position:absolute;left:"+x+"px;top:"+y+"px;")
		square2.attr("style","background:"+color+"; position:absolute;left:"+(x+squarewidth)+"px;top:"+(y)+"px;")
		square3.attr("style","background:"+color+"; position:absolute;left:"+(x+2*squarewidth)+"px;top:"+(y)+"px;")
		square4.attr("style","background:"+color+"; position:absolute;left:"+(x)+"px;top:"+(y+squarewidth)+"px;")
		square5.attr("style","background:"+color+"; position:absolute;left:"+(x+squarewidth)+"px;top:"+(y+squarewidth)+"px;")
	} else if (shape == "F") {
		square1.attr("style","background:"+color+"; position:absolute;left:"+(x+squarewidth)+"px;top:"+y+"px;")
		square2.attr("style","background:"+color+"; position:absolute;left:"+(x+2*squarewidth)+"px;top:"+(y)+"px;")
		square3.attr("style","background:"+color+"; position:absolute;left:"+(x+3*squarewidth)+"px;top:"+(y)+"px;")
		square4.attr("style","background:"+color+"; position:absolute;left:"+(x+squarewidth)+"px;top:"+(y+squarewidth)+"px;")
		square5.attr("style","background:"+color+"; position:absolute;left:"+(x+squarewidth)+"px;top:"+(y+2*squarewidth)+"px;")
	} else if (shape == "G") {
		square1.attr("style","background:"+color+"; position:absolute;left:"+x+"px;top:"+y+"px;")
		square2.attr("style","background:"+color+"; position:absolute;left:"+(x+squarewidth)+"px;top:"+(y)+"px;")
		square3.attr("style","background:"+color+"; position:absolute;left:"+(x+2*squarewidth)+"px;top:"+(y)+"px;")
		square4.attr("style","background:"+color+"; position:absolute;left:"+(x+2*squarewidth)+"px;top:"+(y+squarewidth)+"px;")
		square5.attr("style","background:"+color+"; position:absolute;left:"+(x+2*squarewidth)+"px;top:"+(y+2*squarewidth)+"px;")
	} else if (shape == "H") {
		square1.attr("style","background:"+color+"; position:absolute;left:"+(x+squarewidth)+"px;top:"+y+"px;")
		square2.attr("style","background:"+color+"; position:absolute;left:"+(x)+"px;top:"+(y+squarewidth)+"px;")
		square3.attr("style","background:"+color+"; position:absolute;left:"+(x+squarewidth)+"px;top:"+(y+2*squarewidth)+"px;")
		square4.attr("style","background:"+color+"; position:absolute;left:"+(x+2*squarewidth)+"px;top:"+(y+squarewidth)+"px;")
		square5.attr("style","background:"+color+"; position:absolute;left:"+(x+3*squarewidth)+"px;top:"+(y+squarewidth)+"px;")
	} else if (shape == "I") {
		square1.attr("style","background:"+color+"; position:absolute;left:"+(x+squarewidth)+"px;top:"+y+"px;")
		square2.attr("style","background:"+color+"; position:absolute;left:"+(x+squarewidth)+"px;top:"+(y+squarewidth)+"px;")
		square3.attr("style","background:"+color+"; position:absolute;left:"+(x+2*squarewidth)+"px;top:"+(y+squarewidth)+"px;")
		square4.attr("style","background:"+color+"; position:absolute;left:"+(x)+"px;top:"+(y+2*squarewidth)+"px;")
		square5.attr("style","background:"+color+"; position:absolute;left:"+(x+squarewidth)+"px;top:"+(y+3*squarewidth)+"px;")
	} else if (shape == "J") {
		square1.attr("style","background:"+color+"; position:absolute;left:"+x+"px;top:"+y+"px;")
		square2.attr("style","background:"+color+"; position:absolute;left:"+(x+squarewidth)+"px;top:"+(y)+"px;")
		square3.attr("style","background:"+color+"; position:absolute;left:"+(x+2*squarewidth)+"px;top:"+(y)+"px;")
		square4.attr("style","background:"+color+"; position:absolute;left:"+(x+squarewidth)+"px;top:"+(y+squarewidth)+"px;")
		square5.attr("style","background:"+color+"; position:absolute;left:"+(x)+"px;top:"+(y+2*squarewidth)+"px;")
	}
	square1.show();
	square2.show();
	square3.show();
	square4.show();
	square5.show();
}


createStim = function(stim, shape, color, stimx, stimy, i, istarget) {
	
	if (istarget === true) {
		stim.id = target;
	} else {
		stim.id = "distractor" + i;
	}
	

    var x = 200 + Math.floor(Math.random()*800);
    var y = 150 + Math.floor(Math.random()*350);

    var invalid = true;

    //make sure stimuli do not overlap
    while (true) {
    	invalid = true;
	   	for (j = 0; j < stimx.length ; j++) {
    		if (Math.abs(stimx[j] - x) + Math.abs(stimy[j] - y) < 150) {
    			invalid = false;
    			break; 
    		}
		}
		if (invalid === true) {
 			stimx.push(x);
  		  	stimy.push(y);
  		  	break;	
  	 	}
  	 	x = 200 + Math.floor(Math.random()*800);
   		y = 150 + Math.floor(Math.random()*350);
	}

	if (istarget === true) {
		experiment.targetx = x;
		experiment.targety = y;
	}

	drawShape(stim, shape, color, x, y);
    
}




// STIMULI AND TRIAL TYPES

var shapes = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

var colors = ["red", "blue", "green", "orange", "purple", "yellow","pink","tan","teal","gray"];

var words = [["dax","daxes"], ["blicket","blickets"], ["wug","wugs"], ["toma", "tomas"], ["gade", "gades"], ["sprock", "sprocks"]];

var trialtypes = [3];

//-----------------------------------------------

showSlide("prestudy");

// MAIN EXPERIMENT
var experiment = {

	subid: "",

	counter: 1,

	trialtype: 0,

	percentage: 0,

	colorasked: "",

	diffshape: "",

	diffcolor: "",

	targetshape: "",

	targetcolor: "",

	targetword: "",

	distractorshape: "",

	distractorcolor: "",

	numclicks: 0,
		
	date: getCurrentDate(),
		//the date of the experiment
	timestamp: getCurrentTime(),
		//the time that the trial was completed at 
	reactiontime: 0,

	shapes: [],

	colors: [],

	words: [],

	trialtypes: [],

	rttrain: [],

	rttest: [],

	data: [],

	stimxpositions: [],

	stimypositions: [],

	targetx: 0,

	targety: 0,

	object1name: "",

	object2name: "",

	object3name: "",

	attnselected: "",

	preStudy: function() {

		document.body.style.background = "white";
		$("#prestudy").hide();
		setTimeout(function () {
			experiment.instructions();
		}, 100);
	},


	//the end of the experiment
    end: function () {
    	setTimeout(function () {
    		$("#stage").fadeOut();
    	}, 100);
    	
    	setTimeout(function() { turk.submit(experiment, true) }, 1500);
    	showSlide("finish");
    	document.body.style.background = "black";
    },

	//concatenates all experimental variables into a string which represents one "row" of data in the eventual csv, to live in the server
	processOneRow: function() {
		var dataforRound = experiment.subid; 
		dataforRound += "," + experiment.counter + "," + experiment.trialtype + "," + experiment.percentage;
		dataforRound += "," + experiment.colorasked + "," + experiment.diffshape;
		dataforRound += "," + experiment.diffcolor + "," + experiment.targetshape + "," + experiment.targetcolor;
		dataforRound += "," + experiment.distractorshape + "," + experiment.distractorcolor;
		dataforRound += "," + experiment.targetword[0] + "," + experiment.numclicks;
		dataforRound += "," + experiment.date + "," + experiment.timestamp + "," + experiment.rttrain +  "," + experiment.rttest + "\n";
		dataforRound += "," + experiment.object1name + "," + experiment.object2name + "," + experiment.object3name + "," + experiment.attnselected + "\n";
		experiment.data.push(dataforRound);	
	},
	
	attnCheck: function() {

		attnwords = [experiment.targetword[0], experiment.object1name, experiment.object2name, experiment.object3name];
		attnwords = shuffle(attnwords);

        for(i=0;i<attnwords.length;i++){
            thisOne = attnwords[i];
            $("#attnCheckResponses").append("<input class='attnAnswer' type=radio name='foo' id=" +thisOne+ ">")
            $("#attnCheckResponses").append("<label for=" +thisOne+ "> " +thisOne+ " </label><br>")
        }

        showSlide("attnCheck")

        $("#attnCheckButton").click(function(){
            $('.attnAnswer').each(function(){
                if(this.checked){
                	experiment.attnselected = this.id;              
                }
            })
            experiment.processOneRow();
            experiment.end() 
        })
    },

	// MAIN DISPLAY FUNCTION
  	next: function(traintest) {
  		$("#sliderlabel").hide();
  		$("#selector").hide();
  		$("#target").hide();
  		$("#distractor1").hide();
  		$("#distractor2").hide();
  		$("#distractor3").hide();
  		$("#distractor4").hide();

  		


  		experiment.stimxpositions = [];
  		experiment.stimypositions = [];

  		

  		if (experiment.counter > (numtrials)) {
			experiment.attnCheck();
			return;
		}

		experiment.trialtype = experiment.trialtypes[experiment.counter - 1];

		
		if (traintest == "train") {
			experiment.numclicks = 0;
			$("#instructions").hide();
			$("#testingstage").hide();

			clickDisabled = true;
  			$( "#totestbutton" ).attr('disabled', true);

  			experiment.targetword = experiment.words.pop();

  			experiment.targetshape = experiment.shapes.pop();
  			experiment.targetcolor = experiment.colors.pop();



			if (experiment.trialtype == 1 || experiment.trialtype == 3) {
  				experiment.distractorcolor = experiment.colors.pop();
  				experiment.distractorshape = experiment.shapes.pop();
  				experiment.diffcolor = true;
  				experiment.diffshape = true;
			} else if (experiment.trialtype == 2 || experiment.trialtype == 4) {
				experiment.distractorcolor = experiment.targetcolor;
  				experiment.distractorshape = experiment.shapes.pop();
  				experiment.diffcolor = false;
  				experiment.diffshape = true;
			} 			
			
			createStim($("#target"), experiment.targetshape, experiment.targetcolor, experiment.stimxpositions, experiment.stimypositions, 0, true);
			
			createStim($("#distractor1"), experiment.distractorshape, experiment.distractorcolor, experiment.stimxpositions, experiment.stimypositions, 1, false);
			createStim($("#distractor2"), experiment.distractorshape, experiment.distractorcolor, experiment.stimxpositions, experiment.stimypositions, 2, false);
			createStim($("#distractor3"), experiment.distractorshape, experiment.distractorcolor, experiment.stimxpositions, experiment.stimypositions, 3, false);
			createStim($("#distractor4"), experiment.distractorshape, experiment.distractorcolor, experiment.stimxpositions, experiment.stimypositions, 4, false);

			


			if (experiment.counter == 1) {
				
				$( "#distractor1" ).click(function() {
					experiment.numclicks++;
					
				});
				$( "#distractor2" ).click(function() {
					experiment.numclicks++;
					
				});
				$( "#distractor3" ).click(function() {
					experiment.numclicks++;
					
				});
				$( "#distractor4" ).click(function() {
					experiment.numclicks++;
					
				});

				$( "#target" ).click(function() {

					$("#selector").attr("style","position:absolute;left:"+(experiment.targetx - 16)+"px;top:"+(experiment.targety - 16)+"px;")
					$("#selector").show();
					clickDisabled = false;
	  				$( "#totestbutton" ).attr('disabled', false);
				});
			}

			$("#target").css({"border-color": "#FFFFFF", 
         			"border-width":"2px", 
         			"border-style":"solid"});

			$("#target").show();

			$("#distractor1").show();
			$("#distractor2").show();
			$("#distractor3").show();
			$("#distractor4").show();

			if (experiment.trialtype == 1 || experiment.trialtype == 2) {
				experiment.colorasked = true;
				$("#instructions").html("Find the " + experiment.targetcolor + " " +  experiment.targetword[0] + ".");
			} else {
				experiment.colorasked = false;
				$("#instructions").html("Find the " + experiment.targetword[0] + ".");
			}
	    	$("#instructions").show();

		    $("#trainingstage").fadeIn();

		    experiment.starttime = Date.now();


		} else if (traintest == "test") {
			
			$("#instructions").hide();

			$("#trainingstage").hide();
			$("#target").hide();

			$("#distractor1").hide();
			$("#distractor2").hide();
			$("#distractor3").hide();
			$("#distractor4").hide();

	    	$("#testinstructions").html("What percentage of " + experiment.targetword[1] + " do you think are " + experiment.targetcolor + "? <br> Use the slider below to indicate a response.");
	    	$("#testinstructions").show();
	    	$("#sliderlabel").html("");
	    	$("#sliderlabel").show();

	  //   	$( "#slider" ).slider({
	  //   		range: true,
			// 	values: [ 0, 100 ]
			// });

	    	$("#slider").show();

	    	$("#custom-handle").hide();
			

	    	//experiment.percentage = document.getElementById("slider").value = 50;

		    $("#testingstage").fadeIn();
		    experiment.starttime = Date.now();


		}
		
	},

	start: function() {
		$("#prestudyinstructions").hide();
		$("#object1").hide();
		$("#object2").hide();
		$("#object3").hide();
		$("#instructionsslide").fadeOut();
		

		// put column headers in data file
		experiment.data.push("subid, counter, trialtype, percentage, colorasked, diffshape, diffcolor, targetshape, targetcolor, distractorshape, distractorcolor, targetword, numclicks, date, timestamp, rttrain, rttest, object1name, object2name, object3name, attnselected");


		experiment.next("train");
	},

	instructions: function() {
		// randomize order of lists
		experiment.trialtypes = shuffle(trialtypes);
		experiment.shapes = shuffle(shapes);
		experiment.colors = shuffle(colors);
		experiment.words = shuffle(words);

		$("#slider").slider({
	        change: function(event, ui) {
	            $("#custom-handle").show();
	        }
   		});

		// when we move forward in the trial, get the rt, add a line of data, add to the counter
		$( "#nexttrialbutton" ).click(function() {

			experiment.percentage = $("#slider").slider("option", "value");
			experiment.rttest = Date.now() - experiment.starttime;
			
			experiment.counter++;
			$("#testingstage").fadeOut(500);
				setTimeout(function() {
					experiment.next("train");
				}, 550);
			
		});

		$( "#totestbutton" ).click(function() {
			
			experiment.rttrain = Date.now() - experiment.starttime;
			$("#trainingstage").fadeOut(500);
				setTimeout(function() {
					experiment.next("test");
				}, 550);
			
		});

		object1shape = experiment.shapes.pop();
		object2shape = experiment.shapes.pop();
		object3shape = experiment.shapes.pop();

		object1color = experiment.colors.pop();
		object2color = experiment.colors.pop();
		object3color = experiment.colors.pop();


		createStim($("#object1"), object1shape, object1color, experiment.stimxpositions, experiment.stimypositions, 1, false);
		createStim($("#object2"), object2shape, object2color, experiment.stimxpositions, experiment.stimypositions, 2, false);
		createStim($("#object3"), object3shape, object3color, experiment.stimxpositions, experiment.stimypositions, 3, false);

		experiment.object1name = experiment.words.pop()[0];
		experiment.object2name = experiment.words.pop()[0];
		experiment.object3name = experiment.words.pop()[0];



		$("#prestudyinstructions").html("In this study, you will search for objects like the ones below. <br> These objects have names like " + experiment.object1name + ", " + experiment.object2name + " and " + experiment.object3name + ".");


		$("#prestudyinstructions").show();
		$("#instructionsslide").fadeIn();
	}
    
}
		