// Simple study demonstrating the use of a tablet-designed webpage. 
// Study is designed using simple JS/HTML/CSS, with data saves to a server
// controlled by call to a short php script. 

// Overview: (i) Parameters (ii) Helper Functions (iii) Control Flow

// ---------------- PARAMETERS ------------------

var numtrials = 6;

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

function preloadImage(url) {
    var img=new Image();
    img.src=url;
}


// STIMULI AND TRIAL TYPES

var shapes = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];

var colors = ["red", "blue", "green", "purple"];

var sizes = ["big","small"];

var words = [["dax","daxes"], ["blicket","blickets"], ["wug","wugs"], ["toma", "tomas"], ["gade", "gades"], ["sprock", "sprocks"]];

var trialtypes = [3,4,5,6];

var checkwords = ["wug", "gade", "toma", "blicket"]

var foilwords = ["almo", "warb", "fugle", "larby"]

var colorchecks = [["red","green"],["blue","green"],["blue","purple"],["red","purple"]];





//-----------------------------------------------

showSlide("prestudy");



// MAIN EXPERIMENT
var experiment = {

	subid: "",

	counter: 1,

	trialtype: 0,

	percentage: 0,

	observationtype: "",

	utttype: "",

	searchtype: "",

	targetshape: "",

	targetcolor: "",

	targetword: "",

	targetsize: "big",

	chosetarget: false,

	distractorshape1: "",

	distractorshape2: "",

	distractorcolor: "",

	numclicks: 0,
		
	date: getCurrentDate(),
		//the date of the experiment
	timestamp: getCurrentTime(),
		//the time that the trial was completed at 

	shapes: [],

	colors: [],

	words: [],

	trialtypes: [],

	rttrain: [],

	rtsearch: [],

	rttest: [],

	data: [],

	attnselected: "",

	targetpos: 0,

	foilpos: 0,

	condition: "color",

	attncheckscore: 0,


	preStudy: function() {

		document.body.style.background = "white";
		$("#prestudy").hide();
		setTimeout(function () {
			showSlide("secondInstructions")
		}, 100);
	},

	startExperiment: function() {

		document.body.style.background = "white";
		$("#secondInstructions").hide();
		setTimeout(function () {
			experiment.start();
		}, 100);
	},


	//the end of the experiment
    end: function () {
    	setTimeout(function () {
    		$("#colorcheck").fadeOut();
    	}, 100);
    	
    	setTimeout(function() { turk.submit(experiment, true) }, 1500);
    	showSlide("finish");
    	document.body.style.background = "black";
    },

    

	//concatenates all experimental variables into a string which represents one "row" of data in the eventual csv, to live in the server
	processOneRow: function() {
		var dataforRound = experiment.subid + "," + experiment.condition; 
		dataforRound += "," + experiment.counter + "," + experiment.trialtype + "," + experiment.percentage;
		dataforRound += "," + experiment.utttype;
		dataforRound += "," + experiment.searchtype + "," + experiment.targetshape + "," + experiment.targetcolor + "," + experiment.targetsize + "," + experiment.targetword[0] + "," + experiment.chosetarget;
		dataforRound += "," + experiment.distractorshape1 + "," + experiment.distractorshape2 + "," + experiment.distractorcolor;
		dataforRound += "," + experiment.date + "," + experiment.timestamp + "," + experiment.rtsearch + "," + experiment.rttest + "," + experiment.targetpos + "," + experiment.foilpos + "," + experiment.attncheckscore + "\n";
		experiment.data.push(dataforRound);	
	},

	attnCheck: function() {
		setTimeout(function () {
    		$("#stage").fadeOut();
    	}, 100);

    	showSlide("attnCheck")
		
    },
	

	// MAIN DISPLAY FUNCTION
  	next: function(phase) {
  		$("#sliderlabel").hide();
  		$("#selector").hide();
  		$("#target").hide();
  		$("#distractor1").hide();
  		$("#distractor2").hide();

 
  		if (experiment.counter > (numtrials)) {
			experiment.attnCheck();
			return;
		}

		experiment.trialtype = experiment.trialtypes[experiment.counter - 1];

		if (experiment.trialtype%2 == 0) {
			experiment.searchtype = "contrast";
		} else {
			experiment.searchtype = "differentshapes";
		} 

		if (experiment.trialtype == 1 || experiment.trialtype == 2) {
			experiment.utttype = "noutt";
		} else if (experiment.trialtype == 3 || experiment.trialtype == 4) {
			experiment.utttype = "adj";
		} else if (experiment.trialtype == 5 || experiment.trialtype == 6) {
			experiment.utttype = "noadj";
		}


		if (phase == "search") {

			$("#instructions").hide();
			$("#testingstage").hide();
			experiment.numclicks = 0;
			$("#sselector").hide();
			$("#instructions").hide();
			$("#trainingstage").hide();
			$("#object1").hide();
			$("#object2").hide();
			$("#object3").hide();
			$("#sobject1").hide();
			$("#sobject2").hide();
			$("#sobject3").hide();
			$("#bubble1").hide()
			$("#speech1").hide()


			clickDisabled = true;
  	 		$( "#totestbutton" ).attr('disabled', true);

			var rightstims = ["target", "distractor1"];
			var leftstims = ["distractor2", "distractor3"];
			rightstims = shuffle(rightstims);
			leftstims = shuffle(leftstims);


			experiment.targetword = experiment.words.pop();
  			experiment.targetshape = experiment.shapes.pop();
  			trialcolors = shuffle(experiment.colors).slice();
  			experiment.targetcolor = trialcolors.pop();
  			experiment.distractorshape1 = experiment.shapes.pop();
			experiment.distractorshape2 = experiment.shapes.pop();
			experiment.distractorcolor = trialcolors.pop();

			$("#emptyslot").attr("src", "stim-images/emptyimage.jpg");
			$("#receiver").attr("src", "stim-images/emptyimage.jpg");
			$("#alien1").attr("src", "stim-images/alien1.png");
			$("#alien2").attr("src", "stim-images/alien2.png");
			$("#bubble1").attr("src", "stim-images/speechbubble.jpg");
			
			

			if (experiment.searchtype == "contrast") {
				for (i = 0; i < rightstims.length; i++) {
					if (rightstims[i] == "target") {
						var targetnum = 2+i+1;
						var targetobject = "#sobject" + targetnum;
						experiment.targetpos = 2+i+1;
						$(targetobject).attr("src", "stim-images/object" + experiment.targetshape + experiment.targetcolor + ".jpg");
					} else if (rightstims[i] == "distractor1") {
						var object = "#sobject" + (2+i+1);
						experiment.foilpos = 2+i+1;
						$(object).attr("src", "stim-images/object" + experiment.targetshape + experiment.distractorcolor + ".jpg");
					} 
					if (leftstims[i] == "distractor2") {
						var object = "#sobject" + (i+1);
						$(object).attr("src", "stim-images/object" + experiment.distractorshape1 + experiment.distractorcolor + ".jpg");
					} else if (leftstims[i] == "distractor3") {
						var object = "#sobject" + (i+1);
						$(object).attr("src", "stim-images/object" + experiment.distractorshape2 + experiment.targetcolor + ".jpg");
					}
				}
  			} else if (experiment.searchtype == "differentshapes") {
				for (i = 0; i < rightstims.length; i++) {
					if (rightstims[i] == "target") {
						var targetnum = 2+i+1;
						var targetobject = "#sobject" + targetnum;
						experiment.targetpos = 2+i+1;
						$(targetobject).attr("src", "stim-images/object" + experiment.targetshape + experiment.targetcolor + ".jpg");
					} else if (rightstims[i] == "distractor1") {
						var object = "#sobject" + (2+i+1);
						$(object).attr("src", "stim-images/object" + experiment.distractorshape2 + experiment.distractorcolor + ".jpg");
					}
					if (leftstims[i] == "distractor2") {
						var object = "#sobject" + (i+1);
						$(object).attr("src", "stim-images/object" + experiment.distractorshape1 + experiment.targetcolor + ".jpg");
					} else if (leftstims[i] == "distractor3") {
						var object = "#sobject" + (i+1);
						experiment.foilpos = i+1;
						$(object).attr("src", "stim-images/object" + experiment.targetshape + experiment.distractorcolor + ".jpg");
					}
				}
  			} 
	

			if (experiment.utttype == "adj") {
				$("#speech1").html("Hey, pass me the <b>" + experiment.targetcolor + " " +  experiment.targetword[0] + "</b>.");
			} else if (experiment.utttype == "noadj") {
				$("#speech1").html("Hey, pass me the <b>" + experiment.targetword[0] + "</b>.");
			} else if (experiment.utttype == "noutt") {
				$("#speech1").html("Zem, noba bi yix <b>" + experiment.targetword[0] + "</b>.");
			}
			
			
			setTimeout(function() {
				$("#searchstage").fadeIn(250);
				$("#sobject1").show();
				$("#sobject2").show();
				$("#sobject3").show();
				$("#sobject4").show();
				$("#alien1").show();
				$("#alien2").show();
				}, 250);
		    
		    

		    setTimeout(function() {
		    	$("#bubble1").fadeTo(0,1)
				$("#speech1").fadeTo(0,1)
		    	$("#bubble1").show()
				$("#speech1").show()
		    	}, 2000);

		    setTimeout(function() {
		    		$("#bubble1").fadeTo(100,0.5)
					$("#speech1").fadeTo(100,0.5)
				}, 4500);

		    setTimeout(function() {
					$("#bubble2").attr("src", "stim-images/speechbubble2.jpg");
					if (experiment.utttype == "noutt") {
						$("#speech2").html("Pila rem sa!");
					} else {
						$("#speech2").html("Here you go!");
					}
					$("#bubble2").fadeTo(0,1)
					$("#speech2").fadeTo(0,1)
					$("#bubble2").show()
					$("#speech2").show()
				}, 5000);

		    setTimeout(function() {
					$(targetobject).attr("src", "stim-images/emptyimage.jpg");
					$("#receiver").attr("src", "stim-images/object" + experiment.targetshape + experiment.targetcolor + ".jpg");
					$("#receiver").show()
				}, 6000);

		    setTimeout(function() {
		    		$("#bubble2").fadeTo(100,0.5)
					$("#speech2").fadeTo(100,0.5)
					clickDisabled = false;
  	 				$( "#totestbutton" ).attr('disabled', false);
				}, 6500);

		    experiment.starttime = Date.now();
		    


		} else if (phase == "test") {

			$("#sselector").hide();
			$("#sobject1").hide();
			$("#sobject2").hide();
			$("#sobject3").hide();
			$("#sobject4").hide();
			$("#receiver").hide();
			$("#bubble1").hide()
			$("#speech1").hide()
			$("#bubble2").hide()
			$("#speech2").hide()

			$("#alien1").hide();
			$("#alien2").hide();
			
			$("#sinstructions").hide();


			$("#trainingstage").hide();

			clickDisabled = true;
  	 		$( "#nexttrialbutton" ).attr('disabled', true);

	    	$("#tinstructions").html("On this planet, what percentage of <b>" + experiment.targetword[1] + "</b> do you think are the color shown below? <br> Use the slider below to indicate a response.");
	    	$("#tinstructions").show();
	    	$("#targetimg").attr("src", "stim-images/object" + experiment.targetshape + experiment.targetcolor + ".jpg");
	    	$("#targetimg").show()
	    	$("#slider").show();
	    	$("#custom-handle").hide();

	    	experiment.percentage = document.getElementById("slider").value = 0;

		    $("#testingstage").fadeIn();
		    experiment.starttime = Date.now();
		}
		
	},

	colorcheck: function() {

		if (experiment.counter == numtrials + 1) {
			var thisword = ""
			for (i = 0; i < checkwords.length; i++) {
				thisword = "#" + checkwords[i]
				if ($(thisword).is(":checked")) {
					experiment.attncheckscore++;
				}
			}
			for (i = 0; i < foilwords.length; i++) {
				thisword = "#" + foilwords[i]
				if (!$(thisword).is(":checked")) {
					experiment.attncheckscore++;
				}
			}

			
			$("#attnCheck").fadeOut()
			
			experiment.percentage = 0
			experiment.utttype = ""
			experiment.trialtype = 0
			experiment.targetcolor = ""
			experiment.targetsize = ""
			experiment.targetshape = 0
			experiment.targetword = ""
			experiment.searchtype = "attncheck"
			experiment.processOneRow();
			experiment.counter++;
		}

		experiment.searchtype = "colorcheck"

		if (experiment.counter > numtrials + 5) {
			experiment.end()
		} else {
			experiment.pick = Math.floor(Math.random() * 2);
			experiment.targetcolor = colorchecks[experiment.counter - 8][0]
			experiment.distractorcolor1 = colorchecks[experiment.counter - 8][1]
			$("#cinstructions").text("Pick the " + experiment.targetcolor + " one.")

			if (experiment.pick == 1) {
				$("#cobject1").attr("src", "stim-images/object" + experiment.counter + experiment.distractorcolor1 + ".jpg");
				$("#cobject2").attr("src", "stim-images/object" + experiment.counter + experiment.targetcolor + ".jpg");
			} else {
				$("#cobject1").attr("src", "stim-images/object" + experiment.counter + experiment.targetcolor + ".jpg");
				$("#cobject2").attr("src", "stim-images/object" + experiment.counter + experiment.distractorcolor1 + ".jpg");
			}
			if (experiment.counter == numtrials + 2) {
				$( "#cobject1" ).click(function() {
					if (experiment.canclick) {
						experiment.canclick = false;
						if (experiment.pick == 0) {
							experiment.chosetarget = true;
						} else {
							experiment.chosetarget = false;
						}
						$("#colorcheck").fadeOut(50);
						experiment.processOneRow();

						experiment.counter++;

						setTimeout(function() {
							experiment.colorcheck();
						}, 100);
					}
				});
				$( "#cobject2" ).click(function() {
					if (experiment.canclick) {
						experiment.canclick = false;
						if (experiment.pick == 1) {
							experiment.chosetarget = true;
						} else {
							experiment.chosetarget = false;
						}
						$("#colorcheck").fadeOut(50);
						experiment.processOneRow();

						experiment.counter++;

						setTimeout(function() {
							experiment.colorcheck();
						}, 100);
					}
				});
			}

			
			experiment.canclick = true;
			setTimeout(function(){$("#colorcheck").fadeIn(500)},1000);

		}
	},

	start: function() {

		// put column headers in data file
		experiment.data.push("subid, condition, counter, trialtype, percentage, utttype, searchtype, targetshape, targetcolor, targetsize, targetword, chosetarget, distractorshape1, distractorshape2, distractorcolor, date, timestamp, rtsearch, rttest, targetpos, foilpos, attncheckscore");

		// randomize order of trial types
		experiment.trialtypes = shuffle(trialtypes);
		var firsttrials = [1,2]
		firsttrials = shuffle(firsttrials)
		experiment.trialtypes.unshift(firsttrials[0],firsttrials[1])
		experiment.shapes = shuffle(shapes);
		experiment.colors = shuffle(colors);
		experiment.words = shuffle(words);

		var imagedict = {};
		var image;
		var imgurl = "";
		var imgname = "";

		for (i=0; i < experiment.shapes.length; i++) {
			for (j =0; j < experiment.colors.length; j++) {
				//for (k = 0; k < experiment.sizes.length; k++) {
				imgurl = "stim-images/object" + experiment.shapes[i] + experiment.colors[j] + ".jpg";
				imgname = "" + experiment.shapes[i] + experiment.colors[j];
				image = preloadImage(imgurl);
				imagedict[imgname] = image;
				//}	
			}
		}

		preloadImage("stim-images/speechbubble2.jpg")
		preloadImage("stim-images/speechbubble.jpg")

		// when we move forward in the trial, get the rt, add a line of data, add to the counter
		$( "#nexttrialbutton" ).click(function() {
			experiment.percentage = $("#slider").slider("option", "value");
			experiment.rttest = Date.now() - experiment.starttime;
			experiment.timestamp = getCurrentTime()
			experiment.processOneRow();
			experiment.counter++;
			$("#testingstage").fadeOut(500);
				setTimeout(function() {
					experiment.next("search");
				}, 550);
			
		});

		$( "#totestbutton" ).click(function() {
			experiment.rtsearch = Date.now() - experiment.starttime;
			$("#trainingstage").fadeOut(500);
				setTimeout(function() {
					experiment.next("test");
				}, 550);
			
		});


		$( "#tosearchbutton" ).click(function() {
			experiment.rttrain = Date.now() - experiment.starttime;
			$("#trainingstage").fadeOut(500);
				setTimeout(function() {
					experiment.next("search");
				}, 550);
			
		});

		$("#slider").slider({
	        change: function(event, ui) {
	            $("#custom-handle").show();
	            clickDisabled = false;
  	 			$( "#nexttrialbutton" ).attr('disabled', false);
	        }
   		});

		setTimeout(function() {
		experiment.next("search");
			}, 1000);
	},

    
}
		