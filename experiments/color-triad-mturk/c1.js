
// Overview: (i) Parameters (ii) Helper Functions (iii) Control Flow

// ---------------- PARAMETERS ------------------

// must be a multiple of 4
var numtrials = 8;

var usesound = true;

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

//currently not called; could be useful for reaction time?
getCurrentTime = function() {
	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();

	if (minutes < 10) minutes = "0" + minutes;
	return (hours + ":" + minutes);
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function preloadImage(url) {
    var img=new Image();
    img.src=url;
}




// STIMULI AND TRIAL TYPES

var shapes = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"];

var colors = ["red", "blue", "green", "purple"];

var words = ["dax", "blicket", "wug", "toma", "gade", "sprock","koba","zorp", "flib", "boti", "quen", "lomet"];

var trialtypes = [1,1,2,2,3,3,4,4];

var checkwords = ["wug", "gade", "toma", "blicket"]

var foilwords = ["almo", "warb", "fugle", "larby"]

var colorchecks = [["red","green"],["blue","green"],["blue","purple"],["red","purple"]];


//-----------------------------------------------

showSlide("prestudy");

// MAIN EXPERIMENT
var experiment = {

	subid: "",

	subage: 0,

	counter: 1,

	trialtype: 0,

	colorasked: "",

	searchtype: "",

	targetshape: "",

	targetcolor: "",

	targetsize: "big",

	targetword: "",

	distractorshape1: "",

	distractorcolor1: "",

	numclicks: 0,

	chosetarget: false,

	choselure: false,

	targetpos: 0,

	lurepos: 0,
		
	date: getCurrentDate(),

	timestamp: getCurrentTime(),

	shapes: [],

	colors: [],

	words: [],

	trialtypes: [],

	rtsearch: 0,

	data: [],

	trialsounds: [],

	allstims: [],

	choseunique: false,

	uniqueness: [false,false,false,false],

	canclick: false,

	objects: [],

	attncheckscore: 0,

	condition: "color",

	pick: 0,


	startexp: function() {

		document.body.style.background = "white";
		$("#pauseslide").hide();
		setTimeout(function () {
			experiment.start();
		}, 100);

	},

	pauseslide: function() {

		experiment.trialtypes = shuffle(trialtypes);
		experiment.shapes = shuffle(shapes);
		experiment.colors = shuffle(colors);
		experiment.words = shuffle(words);

		if (usesound) {
			for (i=0; i < words.length; i++) {
				
		    	stimsound = new WebAudioAPISound("stimsounds/"+words[i]);
		    	experiment.trialsounds.push(stimsound);
		    	experiment.allstims.push(words[i]);
		    	for (j=0; j < colors.length; j++) {
		    		stimsound = new WebAudioAPISound("stimsounds/"+colors[j] + words[i]);
		    		experiment.trialsounds.push(stimsound);
		    		experiment.allstims.push(colors[j]+words[i]);
		    	}	
			}
		}

		var imagedict = {};
		var image;
		var imgurl = "";
		var imgname = "";

		

		for (i=0; i < experiment.shapes.length; i++) {
			for (j =0; j < experiment.colors.length; j++) {
				imgurl = "stim-images/object" + experiment.shapes[i] + experiment.colors[j] + ".jpg";
				imgname = "" + experiment.shapes[i] + experiment.colors[j];
				image = preloadImage(imgurl);
				imagedict[imgname] = image;
				
			}
		}

		$("#prestudy").hide();
		$(startimg).attr("src", "images/orange-button.png");

		$( "#startimg" ).click(function() {
			setTimeout(function() {
				$("#pauseslide").fadeOut(1000);
				experiment.startexp();
			}, 1000);
		});

		showSlide("pauseslide");
		
	},

	checkInput: function() {
		experiment.pauseslide();
	},


	//the end of the experiment
    end: function () {
    	setTimeout(function () {
    		$("#colorcheck").fadeOut();
    	}, 100);
    	
    	// use line below for mmturkey version
    	setTimeout(function() { turk.submit(experiment, true) }, 1500);
    	showSlide("finish");
    	document.body.style.background = "black";
    },

	//concatenates all experimental variables into a string which represents one "row" of data in the eventual csv, to live in the server
	processOneRow: function() {
		
		var dataforRound = experiment.subid + "," + experiment.condition; 
		dataforRound += "," + experiment.counter + "," + experiment.trialtype + "," + experiment.chosetarget + "," + experiment.choselure + "," + experiment.attncheckscore + "," + experiment.targetname + "," + experiment.chosenname;
		dataforRound += "," + experiment.colorasked + "," + experiment.targetsize;
		dataforRound += "," + experiment.searchtype + "," + experiment.choseunique + "," + experiment.targetshape + "," + experiment.targetcolor + "," + experiment.targetword;
		dataforRound += "," + experiment.distractorshape1 + "," + experiment.distractorcolor1;
		dataforRound += "," + experiment.date + "," + experiment.timestamp + "," + experiment.rtsearch;
		dataforRound += "," + experiment.targetpos + "," + experiment.lurepos;
		dataforRound += "," + experiment.objects[0][0] + "," + experiment.objects[0][1] + "," + experiment.objects[1][0] + "," + experiment.objects[1][1] + "," + experiment.objects[2][0] + "," + experiment.objects[2][1] + "\n";
		// use line below for mmturkey version
		experiment.data.push(dataforRound);	
	},

	
	attncheck: function() {
		setTimeout(function () {
			$("#stage").fadeOut();
		}, 100);

		showSlide("attnCheck")
	},

	// MAIN DISPLAY FUNCTION
  	next: function(phase) {

  		experiment.objects = createArray(3,2)

  		$("#sliderlabel").hide();
  		$("#selector").hide();
  		$("#target").hide();
  		$("#distractor1").hide();
  		$("#distractor2").hide();
  		$("#distractor3").hide();
  		$("#searchstage").hide();

  		experiment.canclick = false;

  		experiment.targetname = "";
  		experiment.chosenname = "";
  		experiment.chosetarget = false;
  		experiment.choselure = false;
  		experiment.choseunique = false;
  		experiment.uniqueness = [false,false,false,false];
  		experiment.targetpos = 0;
  		experiment.lurepos = 0;


  		if (experiment.counter > numtrials) {
			experiment.attncheck()
			return;
		}

		experiment.trialtype = experiment.trialtypes[experiment.counter - 1];


		if (experiment.trialtype == 1 || experiment.trialtype == 2) {
			experiment.searchtype = "contrast";
		} else if (experiment.trialtype == 3 || experiment.trialtype == 4) {
			experiment.searchtype = "uniquetarget";
		} 

		if (experiment.trialtype%2 == 0) {
			experiment.colorasked = true;
		} else {
			experiment.colorasked = false;
		}
	

		if (phase == "search") {

			trialcolors = experiment.colors.slice();

			trialcolors = shuffle(trialcolors);

			experiment.targetword = experiment.words.pop();

  			experiment.targetshape = experiment.shapes.pop();
  			experiment.targetcolor = trialcolors.pop();

			experiment.numclicks = 0;

		
			var stimslist = ["target", "distractor1", "distractor2"];
			stimslist = shuffle(stimslist);


			if (experiment.searchtype == "contrast") {
				experiment.distractorshape1 = experiment.shapes.pop();
				experiment.distractorcolor1 = trialcolors.pop();
				for (i = 0; i < stimslist.length; i++) {
					if (stimslist[i] == "target") {
						experiment.targetpos = i+1;
						var targetobject = "#sobject" + experiment.targetpos;
						experiment.objects[i][0] = "" + experiment.targetshape 
						experiment.objects[i][1] = "" + experiment.targetcolor;
						experiment.targetname = experiment.targetshape + experiment.targetcolor + ".jpg";
						$(targetobject).attr("src", "stim-images/object" + experiment.targetshape + experiment.targetcolor + "big.jpg");
					} else if (stimslist[i] == "distractor1") {
						var object = "#sobject" + (i+1);
						experiment.objects[i][0] = "" + experiment.targetshape 
						experiment.objects[i][1] = "" + experiment.distractorcolor1;
						$(object).attr("src", "stim-images/object" + experiment.targetshape + experiment.distractorcolor1 + "big.jpg");
					} else if (stimslist[i] == "distractor2") {
						experiment.uniqueness[i] = true;
						var object = "#sobject" + (i+1);
						experiment.lurepos = i+1;
						experiment.objects[i][0] = "" + experiment.distractorshape1 
						experiment.objects[i][1] = "" + experiment.targetcolor;
						$(object).attr("src", "stim-images/object" + experiment.distractorshape1 + experiment.targetcolor + "big.jpg");
					} 
				}

  			} else if (experiment.searchtype == "uniquetarget") {
  				experiment.distractorshape1 = experiment.shapes.pop();
				experiment.distractorcolor1 = trialcolors.pop();
				for (i = 0; i < stimslist.length; i++) {
					if (stimslist[i] == "target") {
						experiment.uniqueness[i] = true;
						experiment.targetpos = i+1;
						var targetobject = "#sobject" + experiment.targetpos;
						experiment.objects[i][0] = "" + experiment.targetshape 
						experiment.objects[i][1] = "" + experiment.targetcolor;
						experiment.targetname = experiment.targetshape + experiment.targetcolor + ".jpg";
						$(targetobject).attr("src", "stim-images/object" + experiment.targetshape + experiment.targetcolor + "big.jpg");
					} else if (stimslist[i] == "distractor1") {
						var object = "#sobject" + (i+1);
						experiment.objects[i][0] = "" + experiment.distractorshape1 
						experiment.objects[i][1] = "" + experiment.distractorcolor1;
						$(object).attr("src", "stim-images/object" + experiment.distractorshape1 + experiment.distractorcolor1 + "big.jpg");
					} else if (stimslist[i] == "distractor2") {
						var object = "#sobject" + (i+1);
						experiment.objects[i][0] = "" + experiment.distractorshape1 
						experiment.objects[i][1] = "" + experiment.distractorcolor1;
						$(object).attr("src", "stim-images/object" + experiment.distractorshape1 + experiment.distractorcolor1 + "big.jpg");
					} 
				}
  			} 
	


			$(sobject1).css({"border-color": "#FFFFFF", 
         			"border-width":"2px", 
         			"border-style":"solid"});
			$(sobject2).css({"border-color": "#FFFFFF", 
         			"border-width":"2px", 
         			"border-style":"solid"});
			$(sobject3).css({"border-color": "#FFFFFF", 
         			"border-width":"2px", 
         			"border-style":"solid"});


  			if (experiment.counter == 1) {
				$( "#sobject1" ).click(function() {
					if (experiment.canclick) {
						experiment.canclick = false;
						$(sobject1).css({"border-color": "#000000", 
	         			"border-width":"2px", 
	         			"border-style":"solid"});

	         			experiment.rtsearch = Date.now() - experiment.starttime;

	         			experiment.choseunique = experiment.uniqueness[0];

	         			if (experiment.targetpos == 1) {
	         				experiment.chosetarget = true;
	         				experiment.chosenname = experiment.targetname;
	         			} else {
	         				experiment.chosetarget = false;
	         				experiment.chosenname = $("#sobject1").attr('src');
	         				if (experiment.lurepos == 1) {
	         					experiment.choselure = true;
	         				}
	         			}
				
						experiment.processOneRow();

						
						experiment.counter++;
						
						setTimeout(function() {
							$("#searchstage").fadeOut(1000);
							experiment.next("search");
						}, 1000);
					}
				});
				$( "#sobject2" ).click(function() {
					if (experiment.canclick) {
						experiment.canclick = false;
						$(sobject2).css({"border-color": "#000000", 
	         			"border-width":"2px", 
	         			"border-style":"solid"});

	         			experiment.rtsearch = Date.now() - experiment.starttime;

	         			experiment.choseunique = experiment.uniqueness[1];

	         			if (experiment.targetpos == 2) {
	         				experiment.chosetarget = true;
	         				experiment.chosenname = experiment.targetname;
	         			} else {
	         				experiment.chosetarget = false;
	         				experiment.chosenname = $( "#sobject2" ).attr('src');
	         				if (experiment.lurepos == 2) {
	         					experiment.choselure = true;
	         				}
	         				
	         			}

	         			experiment.processOneRow();
						
				
						experiment.counter++;
						
						setTimeout(function() {
							$("#searchstage").fadeOut(1000);
							experiment.next("search");
						}, 1000);
					}
				});
				$( "#sobject3" ).click(function() {
					if (experiment.canclick) {
						experiment.canclick = false;
						$(sobject3).css({"border-color": "#000000", 
	         			"border-width":"2px", 
	         			"border-style":"solid"});

	         			experiment.rtsearch = Date.now() - experiment.starttime;

	         			experiment.choseunique = experiment.uniqueness[2];

	         			if (experiment.targetpos == 3) {
	         				experiment.chosetarget = true;
	         				experiment.chosenname = experiment.targetname;
	         			} else {
	         				experiment.chosetarget = false;
	         				experiment.chosenname = $( "#sobject3" ).attr('src')
	         				if (experiment.lurepos == 3) {
	         					experiment.choselure = true;
	         				}
	         				
	         			}

	         			experiment.processOneRow();

				
						experiment.counter++;
						
						setTimeout(function() {
							$("#searchstage").fadeOut(1000);
							experiment.next("search");
						}, 1000);
					}
				});
			}


			setTimeout(function(){$("#searchstage").fadeIn(500)},300);
					

			if (usesound) {
				if (experiment.colorasked == true) {
					trialsound = experiment.trialsounds[experiment.allstims.indexOf(experiment.targetcolor+experiment.targetword)]
				} else {
					trialsound = experiment.trialsounds[experiment.allstims.indexOf(experiment.targetword)]
				}
			}
			
		    experiment.starttime = Date.now();
		    if (usesound) {setTimeout(function() {trialsound.play();}, 1000)}
		    setTimeout(function() {experiment.canclick = true;}, 2500)

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

			
			$("#attnCheck").fadeOut();
			


			experiment.trialtype = 0
			experiment.searchtype = "attncheck"
			experiment.processOneRow();
			experiment.counter++;
		}

		experiment.searchtype = "colorcheck"

		if (experiment.counter > numtrials + 5) {
			experiment.end()
		} else {
			experiment.pick = Math.floor(Math.random() * 2);
			experiment.targetcolor = colorchecks[experiment.counter - 10][0]
			experiment.distractorcolor1 = colorchecks[experiment.counter - 10][1]
			$("#cinstructions").text("Pick the " + experiment.targetcolor + " one.")

			if (experiment.pick == 1) {
				$("#cobject1").attr("src", "stim-images/object" + experiment.counter + experiment.distractorcolor1 + "big.jpg");
				$("#cobject2").attr("src", "stim-images/object" + experiment.counter + experiment.targetcolor + "big.jpg");
			} else {
				$("#cobject1").attr("src", "stim-images/object" + experiment.counter + experiment.targetcolor + "big.jpg");
				$("#cobject2").attr("src", "stim-images/object" + experiment.counter + experiment.distractorcolor1 + "big.jpg");
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
		var coltitles = "subid, condition, counter, trialtype, chosetarget, choselure, attncheckscore, targetname, chosenname, colorasked, targetsize, searchtype, choseunique, targetshape, targetcolor, targetword, distractorshape1, distractorcolor1, date, timestamp, rtsearch, targetpos, lurepos, obj1shape,obj1color,obj2shape,obj2color,obj3shape,obj3color \n";
		experiment.data.push(coltitles)

		
		experiment.next("search");
	},

    
}
		